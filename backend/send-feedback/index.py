import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет анкету обратной связи от родителя на email владельца центра"""

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
    reason = str(body.get('reason', '')).strip()
    reason_other = str(body.get('reasonOther', '')).strip()
    rating = str(body.get('rating', '')).strip()
    missing = str(body.get('missing', '')).strip()
    phone = str(body.get('phone', '')).strip()

    if not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Телефон обязателен'})
        }

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    to_email = 'ribkadolli@mail.ru'

    reason_row = reason
    if reason_other:
        reason_row += f' — «{reason_other}»'

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 560px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #006D77; margin-top: 0;">🌱 Новая анкета обратной связи — Рыбка Долли</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #888; width: 200px; vertical-align: top;">Причина отказа от абонемента:</td>
          <td style="padding: 8px 0; font-weight: bold;">{reason_row or '—'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; vertical-align: top;">Оценка сотрудника:</td>
          <td style="padding: 8px 0; font-weight: bold;">{rating or '—'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; vertical-align: top;">Чего не хватило:</td>
          <td style="padding: 8px 0;">{missing or '—'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888;">Телефон:</td>
          <td style="padding: 8px 0; font-weight: bold;"><a href="tel:{phone}">{phone}</a></td>
        </tr>
      </table>
      <p style="margin-top: 16px; color: #E85D04; font-weight: bold; font-size: 13px;">Не забудьте лично отправить чек-лист в течение 24 часов!</p>
      <p style="margin-top: 8px; color: #888; font-size: 13px;">Анкета отправлена с сайта ribkadollilend.ru</p>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Анкета обратной связи — {phone}'
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
