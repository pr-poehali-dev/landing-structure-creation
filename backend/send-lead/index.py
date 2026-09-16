import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def render_quiz_block(quiz: dict) -> str:
    """Формирует HTML-блок с результатом квиза (вердикт + шкалы), если он передан в заявке"""
    if not quiz or not isinstance(quiz, dict):
        return ''

    quiz_id = str(quiz.get('quizId', '')).strip()
    verdict_title = str(quiz.get('verdictTitle', '')).strip()
    score = quiz.get('score')
    scales = quiz.get('scales') or []

    if not quiz_id and not verdict_title:
        return ''

    rows = ''
    if quiz_id:
        rows += f"""
        <tr>
          <td style="padding: 6px 0; color: #888; width: 120px;">Квиз:</td>
          <td style="padding: 6px 0;">{quiz_id}</td>
        </tr>
        """
    if verdict_title:
        rows += f"""
        <tr>
          <td style="padding: 6px 0; color: #888;">Вердикт:</td>
          <td style="padding: 6px 0; font-weight: bold;">{verdict_title}</td>
        </tr>
        """
    if score is not None:
        rows += f"""
        <tr>
          <td style="padding: 6px 0; color: #888;">Баллы:</td>
          <td style="padding: 6px 0;">{score}</td>
        </tr>
        """

    scales_html = ''
    if isinstance(scales, list) and scales:
        items = ''.join(
            f"<li style=\"padding: 3px 0;\">{s.get('label', '')}: <strong>{s.get('percent', 0)}%</strong></li>"
            for s in scales if isinstance(s, dict)
        )
        scales_html = f"""
        <div style="margin-top: 10px;">
          <div style="color: #888; margin-bottom: 4px;">Шкалы:</div>
          <ul style="margin: 0; padding-left: 18px;">{items}</ul>
        </div>
        """

    if not rows and not scales_html:
        return ''

    return f"""
    <div style="margin-top: 16px; padding: 14px 16px; background: #fff7ec; border-radius: 8px; border: 1px solid #f3d9b1;">
      <div style="color: #e87c1e; font-weight: bold; margin-bottom: 8px;">📋 Результат теста</div>
      <table style="width: 100%; border-collapse: collapse;">{rows}</table>
      {scales_html}
    </div>
    """


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на email ribkadolli@mail.ru — v5"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    age = body.get('age', '').strip()
    source = body.get('source', 'Форма на сайте')
    quiz = body.get('quiz')

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    to_email = 'ribkadolli@mail.ru'

    quiz_block = render_quiz_block(quiz)

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #e87c1e; margin-top: 0;">🐟 Новая заявка — Рыбка Долли</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #888; width: 120px;">Имя:</td>
          <td style="padding: 8px 0; font-weight: bold;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888;">Телефон:</td>
          <td style="padding: 8px 0; font-weight: bold;"><a href="tel:{phone}">{phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888;">Возраст:</td>
          <td style="padding: 8px 0;">{age if age else '—'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888;">Источник:</td>
          <td style="padding: 8px 0;">{source}</td>
        </tr>
      </table>
      {quiz_block}
      <p style="margin-top: 16px; color: #888; font-size: 13px;">Заявка отправлена с сайта ribkadolli.ru</p>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка: {name} — {phone}'
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }