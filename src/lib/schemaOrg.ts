// Schema.org разметка, перенесённая из старого index.html
export const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "С какого возраста принимаете?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Принимаем детей от 1,5 лет. Группы раннего развития — от 1,5 до 3 лет, дошкольные группы — от 3 до 7 лет."
      }
    },
    {
      "@type": "Question",
      "name": "Как проходит адаптация?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Несколько дней малыш ходит неполный день. Как только он освоится, оставляем на сон. Воспитатель обязательно предупредит заранее и расскажет как проходит адаптация."
      }
    },
    {
      "@type": "Question",
      "name": "Что нужно с собой?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Сменная одежда (2 комплекта), сменная обувь, памперсы при необходимости. Полный список выдаём при оформлении."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли забирать раньше или позже?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, работаем с 8:00 до 18:00. Можно забрать в любое удобное время в рамках вашего формата, просто предупредите воспитателя."
      }
    },
    {
      "@type": "Question",
      "name": "Как кормите детей?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "4-разовое питание: завтрак, обед, полдник, ужин. Меню разработано педиатром, готовим вкусно и с любовью."
      }
    },
    {
      "@type": "Question",
      "name": "Есть ли видеонаблюдение?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, видеокамеры установлены во всех групповых комнатах, коридорах и на территории. Родители могут посмотреть запись по запросу."
      }
    },
    {
      "@type": "Question",
      "name": "Сколько стоит посещение?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "У нас три формата: полный абонемент (8:00–18:00), короткий абонемент (8:00–13:00) и посещение по дням. Точная стоимость зависит от даты начала и количества дней — рассчитаем индивидуально."
      }
    },
    {
      "@type": "Question",
      "name": "Забираете ли из школы?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Забираем из школ, расположенных близко территориально."
      }
    }
  ]
};

export const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  "name": "Детский центр «Рыбка Долли»",
  "alternateName": "Рыбка Долли",
  "url": "https://ribkadollilend.ru",
  "logo": "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/05246deb-af27-4e0c-be50-d0635a2372ab.png",
  "image": "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/files/og-image-1776801804911.png",
  "description": "Частный детский сад и детский развивающий центр в Керчи. Ясли от 1 года, подготовка к школе, продлёнка, английский язык, летний клуб. Маленькие группы до 12 человек, питание, индивидуальный подход.",
  "telephone": [
    "+79881521698",
    "+79787120353"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Циолковского",
    "addressLocality": "Керчь",
    "addressRegion": "Республика Крым",
    "addressCountry": "RU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "45.3526",
    "longitude": "36.4682"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "от 300 ₽/ч",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47",
    "bestRating": "5"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Программы центра",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Частный детский сад (полный день)",
        "description": "Ясли и садик для детей от 1,5 лет, полный день 8:00–18:00, питание включено"
      },
      {
        "@type": "Offer",
        "name": "Ясли от 1 года",
        "description": "Мягкая адаптация для малышей от 1 года, маленькие группы"
      },
      {
        "@type": "Offer",
        "name": "Подготовка к школе в Керчи",
        "description": "Курсы подготовки к школе: чтение, письмо, счёт, логика, психологическая готовность"
      },
      {
        "@type": "Offer",
        "name": "Продлёнка в Керчи",
        "description": "Группа продлённого дня для школьников, помощь с уроками"
      },
      {
        "@type": "Offer",
        "name": "Английский для детей в Керчи",
        "description": "Разговорный английский для дошкольников и школьников"
      },
      {
        "@type": "Offer",
        "name": "Летний лагерь Керчь 2025",
        "description": "Летний клуб для детей 4–14 лет: море, мастер-классы, квесты, смены"
      }
    ]
  },
  "sameAs": [
    "https://vk.com/rybka_dolli"
  ]
};
