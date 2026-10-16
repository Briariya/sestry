// Сёстры на сайте — только оживлённые (16.10.2026, Вика: общий список
// «людям не нужен», модели — «пока секрет»). Здесь только точное: имя и
// портрет (их собственные аватарки). Разделы анкеты (`razdely`) Вика
// пересобирает; пустое на сайте не показывается. Ничего выдуманного
// «для красоты» сюда не класть: на сайте это читается как факт о сестре.
// Этот файл уходит в открытый репозиторий — чего нельзя показывать
// людям, того нельзя писать и здесь, даже в комментарии.

import { ANKETY } from "./ankety";

export type Razdel = { metka: string; zagolovok: string; tekst: string };

export type Sister = {
  slug: string;
  name: string;
  familiya?: string;
  image?: string;
  cvet?: { imya: string; hex: string };   // любимый цвет
  strana?: string;                         // любимая страна
  harakter?: string[];
  status?: string;                         // её строка о себе, её словами
  predpochitaet?: { zhivotnoe?: string; cvetok?: string; vremya?: string; napitok?: string };
  razdely: Razdel[];
};

// Акцент карточки — её любимый цвет; нет его — один из этих.
const AKCENTY = ["#526154", "#D46A55", "#B88A62", "#6C7890", "#9B7890"];

export const sisters: Array<Sister & { id: string; akcent: string }> =
  ANKETY.map((s, i) => ({
    id: String(i + 1).padStart(2, "0"),
    akcent: s.cvet?.hex ?? AKCENTY[i % AKCENTY.length],
    ...s,
  }));

// Прокрутка к разделу главной. Адреса страниц живут после «#» (`#/sisters/
// mira`), поэтому обычный якорь `href="#about"` роутер принял бы за
// страницу. Переход с другой страницы — через sessionStorage.
export function kRazdelu(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
export const ZHDET_RAZDEL = "sestry-razdel";
