import os
import smtplib
import urllib.request
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

ADMIN_EMAIL = 'ribkadolli@mail.ru'
TEMPLATE_URL = 'https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/1638245e-ae08-406e-983c-fab153011f25.docx'


def _template_bytes():
    try:
        with urllib.request.urlopen(TEMPLATE_URL, timeout=8) as r:
            return r.read()
    except Exception:
        return None


def _connect():
    server = smtplib.SMTP_SSL(os.environ.get('SMTP_HOST', 'smtp.mail.ru'), int(os.environ.get('SMTP_PORT', '465')), timeout=15)
    server.login(os.environ['SMTP_USER'], os.environ['SMTP_PASS'])
    return server


def send_code(email: str, code: str) -> None:
    user = os.environ['SMTP_USER']
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Код для подписания договора'
    msg['From'] = user
    msg['To'] = email
    text = f'Ваш код для подписания договора: {code}. Код действителен 15 минут.'
    html_body = (
        '<div style="font-family:Arial,sans-serif;max-width:480px;padding:20px;">'
        f'<p>Ваш код для подписания договора: <strong style="font-size:24px;letter-spacing:3px;">{code}</strong>.</p>'
        '<p>Код действителен 15 минут.</p>'
        '<p style="color:#888;font-size:13px;">Если вы не заполняли анкету на сайте, просто проигнорируйте это письмо.</p></div>'
    )
    msg.attach(MIMEText(text, 'plain', 'utf-8'))
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))
    with _connect() as server:
        server.sendmail(user, email, msg.as_string())


def _word_doc(number: int, body_html: str) -> bytes:
    doc = (
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" '
        'xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8">'
        f'<title>Договор № {number}</title></head>'
        '<body style="font-family:Arial,sans-serif;font-size:12pt;">' + body_html + '</body></html>'
    )
    return ('\ufeff' + doc).encode('utf-8')


def send_signed(parent_email: str, number: int, html_body: str) -> None:
    user = os.environ['SMTP_USER']
    signed_doc = _word_doc(number, html_body)
    template = _template_bytes()
    text = (
        f'Договор № {number} подписан простой электронной подписью.\n\n'
        'Подписанный договор с Приложениями и анкетой — во вложении (файл Word). '
        'Его можно открыть, сохранить и распечатать.'
    )
    html_text = (
        f'<p>Договор № {number} подписан простой электронной подписью.</p>'
        '<p>Подписанный договор с Приложениями и анкетой — во вложении (файл Word). '
        'Его можно открыть, сохранить и распечатать.</p>'
    )
    with _connect() as server:
        recipients = [(parent_email, f'Договор № {number} подписан')]
        if parent_email.strip().lower() != ADMIN_EMAIL.lower():
            recipients.append((ADMIN_EMAIL, f'Подписан договор № {number}'))
        for to, subject in recipients:
            msg = MIMEMultipart('mixed')
            msg['Subject'] = subject
            msg['From'] = user
            msg['To'] = to
            alt = MIMEMultipart('alternative')
            alt.attach(MIMEText(text, 'plain', 'utf-8'))
            alt.attach(MIMEText(html_text, 'html', 'utf-8'))
            msg.attach(alt)
            att = MIMEApplication(signed_doc, _subtype='msword')
            att.add_header('Content-Disposition', 'attachment', filename=f'Dogovor_{number}_podpisan.doc')
            msg.attach(att)
            if template:
                tpl = MIMEApplication(template, _subtype='vnd.openxmlformats-officedocument.wordprocessingml.document')
                tpl.add_header('Content-Disposition', 'attachment', filename='Dogovor_shablon.docx')
                msg.attach(tpl)
            server.sendmail(user, to, msg.as_string())