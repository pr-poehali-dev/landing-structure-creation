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

    def consume_and_create_contract(self, code_id: int, form: dict, ip: str) -> int:
        cur = self.conn.cursor()
        cur.execute(f"UPDATE {S}.contract_codes SET used = TRUE WHERE id = {code_id} AND used = FALSE RETURNING id")
        if cur.fetchone() is None:
            self.conn.rollback()
            return 0
        cur.execute(
            f"INSERT INTO {S}.contracts (full_name, email, tariff, ip, form_json) VALUES "
            f"({q(form['fullName'])}, {q(form['email'])}, {q(form['tariff'])}, {q(ip)}, "
            f"{q(json.dumps(form, ensure_ascii=False))}) RETURNING id"
        )
        number = cur.fetchone()[0]
        self.conn.commit()
        return number
