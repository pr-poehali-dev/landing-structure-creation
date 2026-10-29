export const ATLAS_HERO_IMG = "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/a190b1df-8426-42cb-b1af-a61174b5c361.png";
export const ATLAS_PAGE_IMG = "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/bcde675a-126a-4250-bb2d-27b1f212cc41.png";

export interface AtlasProgram {
  image: string;
  imageAlt: string;
  icon: string;
  age: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  external?: boolean;
}

export const ATLAS_PROGRAMS: AtlasProgram[] = [
  {
    image: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/2d75fb35-cc3f-44e4-b290-ba4350651022.png",
    imageAlt: "Занятие в яслях: воспитатель играет с малышами за круглым столом",
    icon: "Baby",
    age: "1,5 – 3 года",
    title: "Ясли",
    text: "Мягкая адаптация без стресса. В Атласе вы видите, как малыш засыпает, сколько съедает и осваивает первые навыки самообслуживания. Педагог-психолог фиксирует его эмоциональный комфорт.",
    cta: "Подробнее о наших яслях",
    href: "/yasli",
  },
  {
    image: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/240e100f-8fa5-4676-818c-6cc3ce05c25a.png",
    imageAlt: "Педагог играет с детьми в старшей группе",
    icon: "Palette",
    age: "3 – 5 лет",
    title: "Старшая группа",
    text: "Мир открытий и первых друзей. Развиваем речь, моторику и творчество. В Атласе копятся «жемчужины» за каждое новое умение, а вы видите реальный прогресс в социализации.",
    cta: "О старшей группе",
    href: "/podgotovka-k-shkole",
  },
  {
    image: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/70b2d160-3418-4ac5-9028-fcdb83bdafff.png",
    imageAlt: "Занятия по подготовке к школе: программы «Фундамент» и «Подготовка к школе»",
    icon: "BookOpen",
    age: "2 раза в неделю",
    title: "Подготовка к школе",
    text: "Только занятия, без полного дня пребывания. Учимся читать, считать и дружить с дисциплиной в игровом формате. Идеально для тех, кто уже ходит в другой сад или остается дома.",
    cta: "О подготовке к школе",
    href: "/podgotovka-k-shkole-2",
  },
  {
    image: "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket/bc9fb8cf-6ca3-4539-961e-64b2656191fb.png",
    imageAlt: "Школьники играют на английском на продленке",
    icon: "Languages",
    age: "Школьники",
    title: "Продленка и английский",
    text: "Учимся с интересом, а не из-под палки. В Атласе ребенок собирает «жемчужины» за выполненные миссии, а вы видите его реальный прогресс в английском языке и развитие soft skills.",
    cta: "О продленке и английском",
    href: "https://schooldolli.ru/?utm_source=ribkadollilend&utm_medium=atlas&utm_content=prodlenka",
    external: true,
  },
];

export const ATLAS_SAFETY = [
  { icon: "Home", text: "Уютные, светлые группы по адресу ул. Циолковского, 12" },
  { icon: "FileCheck", text: "Полная лицензия Министерства образования Крыма — мы работаем официально" },
  { icon: "ShieldCheck", text: "Видеонаблюдение и электронные замки" },
  { icon: "Salad", text: "Сбалансированное питание и строгое соблюдение всех норм СанПиН" },
  { icon: "GraduationCap", text: "4 педагога-организатора с профильным высшим образованием" },
];

export const ATLAS_FEATURES = [
  { icon: "Camera", text: "Ежедневные фотоотчеты" },
  { icon: "MessageCircleHeart", text: "Обратная связь от воспитателя" },
  { icon: "ChartNoAxesCombined", text: "Ежемесячные отчеты о навыках" },
  { icon: "Gem", text: "Игровые задания и «жемчужины»" },
];
