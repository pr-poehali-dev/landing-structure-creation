import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на email ribkadolli@mail.ru — v4"""

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