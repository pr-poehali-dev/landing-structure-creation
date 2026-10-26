export interface SvedenDoc {
  title: string;
  url: string;
}

const B = "https://cdn.poehali.dev/projects/806f3e0c-84d0-4138-96fe-1f0a9797bd1a/bucket";

export const SVEDEN_DOCUMENTS: SvedenDoc[] = [
  { title: "Положение о порядке пользования и выбора учебников и учебных пособий обучающимися", url: `${B}/0b0e9ec0-2e7b-43d2-b658-3a14ae08001a.pdf` },
  { title: "Положение об информационной открытости и официальном сайте", url: `${B}/0c3e2e06-186d-4158-b82f-14fc038f22e3.pdf` },
  { title: "Положение о комиссии по урегулированию споров между участниками образовательных отношений", url: `${B}/46530c99-9d6f-4e3e-a5ec-b413901c0ae0.pdf` },
  { title: "Положение об обработке персональных данных", url: `${B}/dd60c99c-6247-4da4-9890-fac8c3a89a6f.pdf` },
  { title: "Положение о порядке рассмотрения обращений граждан", url: `${B}/55d5903b-9d68-4ae9-a2d3-3a7cc676c3cb.pdf` },
];
