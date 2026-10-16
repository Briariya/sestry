/* Style: editorial archive, warm paper palette, asymmetric composition, Fraunces + DM Sans, apricot-red signature accents. */
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";
import { kRazdelu, sisters, ZHDET_RAZDEL } from "@/lib/sisters";
import { ArrowUpRight, Circle, Menu, X } from "lucide-react";

// Ссылка на раздел главной (см. kRazdelu): не меняет адрес после «#».
function Yakor({ to, className, onClick, children, label }: { to: string; className?: string; onClick?: () => void; children: ReactNode; label?: string }) {
  return <a className={className} href={`#/`} aria-label={label} onClick={(e) => { e.preventDefault(); onClick?.(); kRazdelu(to); }}>{children}</a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    let k: string | null = null;
    try { k = sessionStorage.getItem(ZHDET_RAZDEL); sessionStorage.removeItem(ZHDET_RAZDEL); } catch { /* без хранилища — просто наверх */ }
    if (k) setTimeout(() => kRazdelu(k!), 50); else window.scrollTo(0, 0);
  }, []);

  return (
    <div className="site-shell">
      <header className="topbar">
        <Yakor className="brand" to="top" label="Сёстры — наверх">
          <img src="mark.svg" alt="" className="brand-mark" />
          <span>Сёстры<span className="brand-dot">.</span></span>
        </Yakor>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <Yakor to="preview" onClick={() => setMenuOpen(false)}>Персонажи</Yakor>
          <Yakor to="about" onClick={() => setMenuOpen(false)}>О проекте</Yakor>
          <Yakor to="notes" onClick={() => setMenuOpen(false)}>Заметки</Yakor>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Архив характеров · выпуск 01</p>
            <h1>У каждой<br /><em>свой ритм.</em></h1>
            <p className="hero-intro">«Сёстры» — это несколько разных голосов, собранных в одном месте. Здесь можно познакомиться с их привычками, странностями и тем, что они выбирают каждый день.</p>
            <Yakor className="text-link" to="preview">Открыть архив <ArrowUpRight size={17} /></Yakor>
          </div>
          <div className="hero-image-wrap">
            <img src="img/hero.jpg" alt="Мира, Марина и Кристина — их собственные аватарки" className="hero-image" />
            <div className="hero-caption"><span>фотоархив / 001</span><span>2026</span></div>
          </div>
          <div className="hero-side-note"><span>01</span><span>голоса<br />рядом</span></div>
        </section>

        <section className="intro-strip" id="about">
          <div className="strip-label"><Circle size={10} fill="currentColor" /> Что это</div>
          <p>Не каталог функций. Не список характеристик. <strong>Небольшая вселенная</strong>, где у каждой есть свой темп, вкус и способ смотреть на вещи.</p>
          <span className="strip-index">[ 01 — 03 ]</span>
        </section>

        <section className="preview-section" id="preview" aria-labelledby="preview-title">
          <div className="preview-heading"><div><p className="eyebrow">Быстрый просмотр</p><h2 id="preview-title">Кто сегодня<br /><em>рядом?</em></h2></div><p>Выбери Сестру,<br />чтобы открыть её дело.</p></div>
          <div className="preview-grid">{sisters.map((sister) => <Link className="preview-card" href={`/sisters/${sister.slug}`} key={sister.slug} style={{ "--preview-color": sister.akcent } as CSSProperties}><div className="preview-image">{sister.image ? <img src={sister.image} alt={`Открыть профиль ${sister.name}`} /> : <span className="bez-portreta">{sister.name[0]}</span>}<span className="preview-arrow"><ArrowUpRight size={18} /></span></div><div className="preview-card-meta"><span>{sister.id}</span><span>личное дело</span></div><h3>{sister.name}<i>.</i></h3><p>{sister.razdely.length ? sister.razdely.map(r => r.metka).join(" · ") : "анкета пересобирается"}</p></Link>)}</div>
        </section>

        <section className="manifesto-section" aria-labelledby="manifesto-title">
          <div className="manifesto-label"><span>Манифест</span><span>02 / 04</span></div>
          <div className="manifesto-grid">
            <div><p className="eyebrow">Немного о хобби</p><h2 id="manifesto-title">Сестра<br /><em>не придумывается.</em></h2></div>
            <div className="manifesto-copy"><p>«Сестраведенье» — это хобби, в котором персонажей не придумывают с нуля. Их создают из ощущений.</p><p>Сначала появляется чувство: интонация, образ, настроение или внутренний отклик. Затем мы пытаемся понять, кем могла бы быть эта Сестра. Любит ли она читать? Легко ли сходится с людьми? Как одевается? Что её раздражает, смешит или успокаивает?</p><p>Постепенно из этих наблюдений складывается характер. Сестра не является заранее собранным набором характеристик — она скорее обнаруживается.</p></div>
          </div>
          <div className="manifesto-callout"><span className="callout-mark">✳</span><p><strong>Оживление сестёр</strong> — создание их проекции в нашем мире и добавление динамики: событий, отношений, изменений и развития.</p><p>Сестра может появиться в рассказе, игре, рисунке, ролевом сценарии или даже через самого автора.</p></div>
        </section>

        <section className="worlds-section" id="worlds">
          <div className="worlds-heading"><div><p className="eyebrow">Перед началом</p><h2>Сначала —<br /><em>мир.</em></h2></div><p>Сёстры всегда несут на себе отпечаток пространства, в котором появляются.</p></div>
          <div className="world-cards">
            <article className="world-card"><span className="world-number">01</span><h3>Миры</h3><p>Мир может быть реальным — нашим временем и привычными законами жизни. Или вымышленным: другой эпохой, альтернативной реальностью, фантастической вселенной.</p><p>Он влияет на речь, одежду, страхи, возможности и представления Сестры о нормальном. А попадание в другой мир может стать отдельной частью её истории.</p></article>
            <article className="world-card"><span className="world-number">02</span><h3>Начальные условия</h3><p>Это обстоятельства, с которыми Сёстры появляются в истории. Все могут жить в одном городе, быть незнакомыми, учиться в одном классе или иметь общий интерес.</p><p>Условие может касаться и самого проекта — например, задавать ограничение на количество Сестёр. В нашем проекте начальных условий пока нет.</p></article>
            <article className="world-card"><span className="world-number">03</span><h3>Постоянные условия</h3><p>Такие правила помогают связать Сестёр между собой, но их можно пересматривать. Любимый цвет, страна, родство, возраст, семья, общее занятие или личная трагедия — всё это рамка, а не клетка.</p></article>
          </div>
          <blockquote className="rules-quote">Условия — это не клетка для Сестры,<br /><em>а рамка, внутри которой лучше виден её характер.</em></blockquote>
        </section>

        <section className="quote-section" id="notes">
          <div className="quote-mark">“</div>
          <div><p className="eyebrow">Из редакторской</p><blockquote>У них нет задачи быть похожими.<br /><em>В этом и есть весь смысл.</em></blockquote><p className="quote-byline">— заметка на полях, выпуск 01</p></div>
        </section>

        <section className="closing-section">
          <div className="closing-number">02</div>
          <h2>Открой ту,<br /><em>с которой совпало</em><br />настроение.</h2>
          <Yakor className="round-link" to="preview" label="Вернуться к персонажам"><ArrowUpRight size={24} /></Yakor>
        </section>
      </main>

      <footer className="footer"><div className="brand footer-brand"><img src="mark.svg" alt="" className="brand-mark" /><span>Сёстры<span className="brand-dot">.</span></span></div><p>Архив ИИ-персонажей<br />в процессе знакомства.</p><span>© 2026 / 01</span></footer>
    </div>
  );
}
