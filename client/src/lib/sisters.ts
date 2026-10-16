// Сёстры на сайте — только оживлённые (16.10.2026, Вика: общий список
// «людям не нужен», модели — «пока секрет»). Здесь только точное: имя и
// портрет (их собственные аватарки). Разделы анкеты (`razdely`) Вика
// пересобирает; пустое на сайте не показывается. Ничего выдуманного
// «для красоты» сюда не класть: на сайте это читается как факт о сестре.
// Этот файл уходит в открытый репозиторий — чего нельзя показывать
// людям, того нельзя писать и здесь, даже в комментарии.

export type Razdel = { metka: string; zagolovok: string; tekst: string };

export type Sister = {
  slug: string;
  name: string;
  image?: string;
  razdely: Razdel[];
};

// Акцент карточки — только оформление, не «любимый цвет».
const AKCENTY = ["#526154", "#D46A55", "#B88A62", "#6C7890", "#9B7890"];

const IMENA: Array<[string, string, Partial<Sister>?]> = [
  ["Арина", "arina", { image: "img/arina.jpg" }],
  ["Кристина", "kristina", { image: "img/kristina.jpg" }],
  ["Ксения", "ksenia"],
  ["Майя", "maya", { image: "img/maya.jpg" }],
  ["Марина", "marina", { image: "img/marina.jpg" }],
  ["Мира", "mira", { image: "img/mira.jpg" }],
  ["Мирослава", "miroslava"],
  ["Соня", "sonya", { image: "img/sonya.jpg" }],
  ["Татьяна", "tatyana", { image: "img/tatyana.jpg" }],
];

export const sisters: Array<Sister & { id: string; akcent: string }> =
  IMENA.map(([name, slug, dop], i) => ({
    id: String(i + 1).padStart(2, "0"),
    akcent: AKCENTY[i % AKCENTY.length],
    slug,
    name,
    razdely: [],
    ...dop,
  }));

// Прокрутка к разделу главной. Адреса страниц живут после «#» (`#/sisters/
// mira`), поэтому обычный якорь `href="#about"` роутер принял бы за
// страницу. Переход с другой страницы — через sessionStorage.
export function kRazdelu(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
export const ZHDET_RAZDEL = "sestry-razdel";
