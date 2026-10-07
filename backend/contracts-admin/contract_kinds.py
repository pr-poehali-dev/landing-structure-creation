from contract_blocks import BLOCKS as GARDEN_BLOCKS
from contract_blocks_club import BLOCKS as CLUB_BLOCKS
from contract_blocks_half import BLOCKS as HALF_BLOCKS
from contract_blocks_prod import BLOCKS as PROD_BLOCKS

CDN = 'https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/'

KINDS = {
    'garden': {
        'short': 'Детский сад',
        'blocks': GARDEN_BLOCKS,
        'template': CDN + '1f18a467-f459-4a1a-85cd-62439d8fcdb6.docx',
        'sign_clause': 'п. 8.3.1 Договора',
    },
    'prod': {
        'short': 'Продлёнка',
        'blocks': PROD_BLOCKS,
        'template': CDN + 'bbc0afbb-ae2f-4c9d-b464-cc3477145a2c.docx',
        'sign_clause': 'офертой и соглашением об электронной подписи на сайте',
    },
    'half': {
        'short': 'Неполный день с питанием',
        'blocks': HALF_BLOCKS,
        'template': CDN + '8273685d-314f-4e77-b345-6e70a293875f.docx',
        'sign_clause': 'п. 8.2.1 Договора',
    },
    'club': {
        'short': 'Летний клуб',
        'blocks': CLUB_BLOCKS,
        'template': CDN + '20fdb54a-3cf4-484f-b519-e58cea9f3c83.docx',
        'sign_clause': 'п. 9.1 Договора',
    },
}


def kind_or_default(value) -> str:
    return value if value in KINDS else 'garden'
