import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет чек-листы на email клиента и уведомление нам — блок лид-магнит"""

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
    email = body.get('email', '').strip()

    if not name or not email:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и email обязательны'})
        }

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    our_email = 'ribkadolli@mail.ru'

    # Письмо клиенту с чек-листами
    client_html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 560px; padding: 32px; background: #fff8f0; border-radius: 12px;">
      <h2 style="color: #e87c1e; margin-top: 0;">🎁 Ваши чек-листы, {name}!</h2>
      <p style="color: #555; font-size: 15px;">Спасибо, что доверяете нам! Держите ваши материалы:</p>

      <div style="background: #fff; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 4px solid #e87c1e;">
        <p style="margin: 0 0 8px; font-weight: bold; color: #333;">📋 Советы по адаптации к детскому саду</p>
        <a href="https://disk.yandex.ru/i/SIR462VgCvSWFA"
           style="display: inline-block; background: #e87c1e; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px;">
          Скачать чек-лист →
        </a>
      </div>

      <div style="background: #fff; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 4px solid #e87c1e;">
        <p style="margin: 0 0 8px; font-weight: bold; color: #333;">📚 5 упражнений, чтобы ребёнок понимал прочитанное</p>
        <a href="https://disk.yandex.ru/i/IAc_t1vpQQ61qA"
           style="display: inline-block; background: #e87c1e; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px;">
          Скачать чек-лист →
        </a>
      </div>

      <p style="color: #888; font-size: 13px; margin-top: 24px;">
        Вы также подписались на наш блог — полезные статьи будут приходить на этот адрес.<br>
        <a href="https://blogribkadolli.ru" style="color: #e87c1e;">blogribkadolli.ru</a>
      </p>
      <p style="color: #aaa; font-size: 12px;">Центр развития «Рыбка Долли»</p>
    </div>
    """

    msg_client = MIMEMultipart('alternative')
    msg_client['Subject'] = '🎁 Ваши чек-листы от центра «Рыбка Долли»'
    msg_client['From'] = smtp_user
    msg_client['To'] = email
    msg_client.attach(MIMEText(client_html, 'html', 'utf-8'))

    # Уведомление нам
    notify_html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #e87c1e; margin-top: 0;">🐟 Новый подписчик — чек-листы</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #888; width: 100px;">Имя:</td><td style="padding: 8px 0; font-weight: bold;">{name}</td></tr>
        <tr><td style="padding: 8px 0; color: #888;">Email:</td><td style="padding: 8px 0;"><a href="mailto:{email}">{email}</a></td></tr>
      </table>
    </div>
    """

    msg_notify = MIMEMultipart('alternative')
    msg_notify['Subject'] = f'Новый подписчик: {name} — {email}'
    msg_notify['From'] = smtp_user
    msg_notify['To'] = our_email
    msg_notify.attach(MIMEText(notify_html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, email, msg_client.as_string())
        server.sendmail(smtp_user, our_email, msg_notify.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
