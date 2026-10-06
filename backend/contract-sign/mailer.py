import os
import smtplib
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

ADMIN_EMAIL = 'ribkadolli@mail.ru'
TEMPLATE_PATH = os.path.join(os.path.dirname(__file__), 'contract_template.docx')


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


def send_signed(parent_email: str, number: int, html_body: str) -> None:
    user = os.environ['SMTP_USER']
    with open(TEMPLATE_PATH, 'rb') as fh:
        docx_bytes = fh.read()
    with _connect() as server:
        for to, subject in (
            (parent_email, f'Договор № {number} подписан'),
            (ADMIN_EMAIL, f'Подписан договор № {number}'),
        ):
            msg = MIMEMultipart()
            msg['Subject'] = subject
            msg['From'] = user
            msg['To'] = to
            msg.attach(MIMEText(html_body, 'html', 'utf-8'))
            att = MIMEApplication(docx_bytes, _subtype='vnd.openxmlformats-officedocument.wordprocessingml.document')
            att.add_header('Content-Disposition', 'attachment', filename='Dogovor_shablon.docx')
            msg.attach(att)
            server.sendmail(user, to, msg.as_string())
