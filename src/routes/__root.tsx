import type {ReactNode} from "react";
import {HeadContent, Outlet, Scripts, createRootRoute, redirect} from "@tanstack/react-router";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import appCss from "@/index.css?url";
import {FAQ_LD, ORG_LD} from "@/lib/schemaOrg";
import NotFound from "@/pages/NotFound";
import ServiceAwareWidgets from "@/components/ServiceAwareWidgets";

const TITLE = "Частный детский центр «Рыбка Долли» в Керчи — ясли от 1 года, подготовка к школе, продлёнка";
const DESCRIPTION =
    "Частный детский центр «Рыбка Долли» в Керчи на ул. Циолковского. Ясли , подготовка к школе,  английский. Маленькие группы, питание, отзывы родителей.";
const OG_TITLE = "Частный детский центр «Рыбка Долли» в Керчи";
const OG_IMAGE = "https://cdn.poehali.dev/projects/***/files/og-image-1776801804911.png";
const FAVICON = "https://cdn.poehali.dev/projects/***/bucket/05246deb-af27-4e0c-be50-d0635a2372ab.png";
const KEYWORDS =
    "частный детский центр керчь, детский центр керчь цены, ясли керчь, детский центр циолковского керчь, частный детский центр керчь цены, детский центр керчь отзывы, ясли керчь от 1 года, детский центр керчь маленькие группы, домашний детский центр керчь, детский центр керчь с питанием, летний лагерь керчь, летний лагерь керчь 2025, летний лагерь керчь цены, куда отдать ребенка на лето керчь, детский лагерь керчь, летний клуб для детей керчь, летний лагерь керчь с морем, подготовка к школе керчь, подготовка к школе керчь цены, курсы подготовки к школе керчь, продленка керчь, продленка для школьников керчь, продленка с уроками керчь, английский для детей керчь, английский для дошкольников керчь, разговорный английский для детей керчь, частный детский центр керчь отзывы, детский центр керчь стоимость, частные ясли керчь";

const METRIKA = `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108711263', 'ym');
ym(108711263, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

// Старый адрес страницы «Подготовка к школе 2 раза в неделю» — постоянный редирект на новый.
const LEGACY_PREP_2X = "/podgotovka-k-shkole-2-raza-v-nedelyu";

export const Route = createRootRoute({
    beforeLoad: ({location}) => {
        if (location.pathname === LEGACY_PREP_2X || location.pathname === LEGACY_PREP_2X + "/") {
            throw redirect({
                href: `/podgotovka-k-shkole-2${location.searchStr ?? ""}${location.hash ? "#" + location.hash : ""}`,
                statusCode: 301,
            });
        }
    },
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0"},
            {title: TITLE},
            {name: "description", content: DESCRIPTION},
            {name: "keywords", content: KEYWORDS},
            {name: "author", content: "ДДЦ Рыбка Долли"},
            {name: "robots", content: "index, follow"},
            {name: "yandex-verification", content: "23ae7152f945a5bc"},
            {name: "geo.region", content: "RU-CR"},
            {name: "geo.placename", content: "Керчь"},
            {property: "og:type", content: "website"},
            {property: "og:locale", content: "ru_RU"},
            {property: "og:title", content: OG_TITLE},
            {property: "og:description", content: DESCRIPTION},
            {property: "og:image", content: OG_IMAGE},
            {property: "og:image:width", content: "1200"},
            {property: "og:image:height", content: "630"},
            {property: "og:image:alt", content: "Частный детский центр Рыбка Долли — Керчь"},
            {property: "og:url", content: "https://ribkadollilend.ru/"},
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:title", content: OG_TITLE},
            {name: "twitter:description", content: "Ясли от 1 года, подготовка к школе, продлёнка, английский. Маленькие группы. Запишитесь на экскурсию!"},
            {name: "twitter:image", content: OG_IMAGE},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "stylesheet", href: appCss},
            {rel: "icon", type: "image/png", href: FAVICON},
            {rel: "apple-touch-icon", href: FAVICON},
            {rel: "preconnect", href: "https://fonts.googleapis.com"},
            {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Golos+Text:wght@400;500;700&family=Caveat:wght@500;600;700&family=Montserrat:wght@600;700;800&family=Open+Sans:wght@400;600;700&display=swap",
            },
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            {type: "application/ld+json", children: JSON.stringify(FAQ_LD)},
            {type: "application/ld+json", children: JSON.stringify(ORG_LD)},
            {children: METRIKA},
        ],
    }),
    notFoundComponent: NotFound,
    component: RootComponent,
});

function RootComponent() {
    return (
        <RootDocument>
            <TooltipProvider>
                <Toaster/>
                <Sonner/>
                <ServiceAwareWidgets/>
                <Outlet/>
            </TooltipProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <noscript>
            <div><img src="https://mc.yandex.ru/watch/108711263" style={{position: "absolute", left: "-9999px"}} alt=""/></div>
        </noscript>
        <Scripts/>
        </body>
        </html>
    );
}
