INVALID_OFFER = 'Ссылка недействительна, обратитесь к администратору'


def apply_offer(raw: dict, offer: dict) -> dict:
    """Подставляет в сырую анкету программу, ФИО ребёнка и служебный тариф: родитель их изменить не может"""
    raw = dict(raw)
    raw['kind'] = offer['program']
    raw['childName'] = offer['child_name']
    if offer['program'] == 'garden':
        raw['tariff'] = 'personal'
    return raw


def stamp_offer(form: dict, offer: dict) -> None:
    """Фиксирует в очищенной анкете код, название тарифа, цену и комментарий из предложения"""
    form['offerCode'] = offer['code']
    form['offerTariff'] = offer['tariff_name']
    form['offerPrice'] = int(offer['price_month'])
    form['offerComment'] = offer['comment']


def public_offer(offer: dict) -> dict:
    return {
        'program': offer['program'],
        'child_name': offer['child_name'],
        'tariff_name': offer['tariff_name'],
        'price_month': int(offer['price_month']),
        'comment': offer['comment'],
    }
