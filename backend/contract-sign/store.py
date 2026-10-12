import json
import os

import psycopg2

S = os.environ.get('MAIN_DB_SCHEMA', 't_p54774028_landing_structure_cr')

CODE_TTL_MIN = 15
MAX_ATTEMPTS = 3
BLOCK_MIN = 5
MAX_CODES_PER_HOUR = 3


def q(s) -> str:
    return "'" + str(s).replace("'", "''") + "'"


class Store:
    def __init__(self):
        self.conn = psycopg2.connect(os.environ['DATABASE_URL'])

    def close(self):
        self.conn.close()

    def codes_last_hour(self, email: str) -> int:
        cur = self.conn.cursor()
        cur.execute(
            f"SELECT COUNT(*) FROM {S}.contract_codes WHERE email = {q(email)} AND created_at > NOW() - INTERVAL '60 minutes'"
        )
        return cur.fetchone()[0]

    def create_code(self, email: str, code_hash: str, form: dict) -> None:
        cur = self.conn.cursor()
        cur.execute(f"UPDATE {S}.contract_codes SET used = TRUE WHERE email = {q(email)} AND used = FALSE")
        cur.execute(
            f"INSERT INTO {S}.contract_codes (email, code_hash, form_json, expires_at) VALUES "
            f"({q(email)}, {q(code_hash)}, {q(json.dumps(form, ensure_ascii=False))}, NOW() + INTERVAL '{CODE_TTL_MIN} minutes')"
        )
        self.conn.commit()

    def latest_active(self, email: str):
        """Последний неиспользованный код: (id, hash, form_json, attempts, заблокирован_сейчас, истёк)"""
        cur = self.conn.cursor()
        cur.execute(
            "SELECT id, code_hash, form_json, attempts, (blocked_until IS NOT NULL AND blocked_until > NOW()), "
            f"(expires_at < NOW()) FROM {S}.contract_codes WHERE email = {q(email)} AND used = FALSE "
            "ORDER BY created_at DESC LIMIT 1"
        )
        return cur.fetchone()

    def register_failure(self, code_id: int) -> bool:
        """Фиксирует неверную попытку. Возвращает True, если после неё включена блокировка"""
        cur = self.conn.cursor()
        cur.execute(f"UPDATE {S}.contract_codes SET attempts = attempts + 1 WHERE id = {code_id} RETURNING attempts")
        attempts = cur.fetchone()[0]
        blocked = attempts >= MAX_ATTEMPTS
        if blocked:
            cur.execute(
                f"UPDATE {S}.contract_codes SET attempts = 0, blocked_until = NOW() + INTERVAL '{BLOCK_MIN} minutes' "
                f"WHERE id = {code_id}"
            )
        self.conn.commit()
        return blocked

    def get_offer(self, code: str):
        """Персональное предложение по коду или None"""
        cur = self.conn.cursor()
        cur.execute(
            "SELECT id, program, child_name, tariff_name, price_month, comment, status "
            f"FROM {S}.personal_offers WHERE code = {q(code)}"
        )
        r = cur.fetchone()
        if r is None:
            return None
        return {
            'id': r[0], 'code': code, 'program': r[1], 'child_name': r[2], 'tariff_name': r[3],
            'price_month': r[4], 'comment': r[5], 'status': r[6],
        }

    def consume_and_create_contract(self, code_id: int, form: dict, ip: str) -> int:
        """Возвращает номер договора, 0 — код уже использован, -1 — персональное предложение недоступно"""
        cur = self.conn.cursor()
        cur.execute(f"UPDATE {S}.contract_codes SET used = TRUE WHERE id = {code_id} AND used = FALSE RETURNING id")
        if cur.fetchone() is None:
            self.conn.rollback()
            return 0
        offer_id = None
        if form.get('offerCode'):
            cur.execute(
                f"UPDATE {S}.personal_offers SET status = 'used' "
                f"WHERE code = {q(form['offerCode'])} AND status = 'active' RETURNING id"
            )
            row = cur.fetchone()
            if row is None:
                self.conn.rollback()
                return -1
            offer_id = row[0]
        cur.execute(
            f"INSERT INTO {S}.contracts (full_name, email, tariff, ip, form_json, kind) VALUES "
            f"({q(form['fullName'])}, {q(form['email'])}, {q(form['tariff'])}, {q(ip)}, "
            f"{q(json.dumps(form, ensure_ascii=False))}, {q(form.get('kind', 'garden'))}) RETURNING id"
        )
        number = cur.fetchone()[0]
        if offer_id is not None:
            cur.execute(f"UPDATE {S}.personal_offers SET contract_id = {number} WHERE id = {offer_id}")
        self.conn.commit()
        return number
