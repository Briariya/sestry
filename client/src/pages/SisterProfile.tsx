/* Style: individual archive sheet — editorial profile, warm paper, oversized serif name, concise metadata and generous whitespace. */
import { useEffect } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowLeft, ArrowUpRight, Circle } from "lucide-react";
import { sisters, ZHDET_RAZDEL } from "@/lib/sisters";
import NotFound from "./NotFound";

export default function SisterProfile() {
  const [, params] = useRoute("/sisters/:slug");
  const [, setLocation] = useLocation();
  const sister = sisters.find((item) => item.slug === params?.slug);
  useEffect(() => { window.scrollTo(0, 0); }, [params?.slug]);
  if (!sister) return <NotFound />;
  const currentIndex = sisters.findIndex((item) => item.slug === sister.slug);
  const nextSister = sisters[(currentIndex + 1) % sisters.length];
  const kSestram = () => {
    try { sessionStorage.setItem(ZHDET_RAZDEL, "preview"); } catch { /* без хранилища — просто на главную */ }
    setLocation("/");
  };

  return (
    <div className="profile-page">
      <header className="topbar profile-topbar">
        <Link className="brand" href="/" aria-label="Вернуться на главную"><img src="mark.svg" alt="" className="brand-mark" /><span>Сёстры<span className="brand-dot">.</span></span></Link>
        <a className="back-link" href="#/" onClick={(e) => { e.preventDefault(); kSestram(); }}><ArrowLeft size={16} /> Все сёстры</a>
      </header>
      <main>
        <section className="profile-hero">
          <div className="profile-hero-meta"><span>Личное дело / {sister.id}</span><span>Архив характеров</span></div>
          <div className="profile-hero-grid">
            <div className="profile-title"><p className="eyebrow"><span className="eyebrow-line" /> Профиль персонажа</p><h1>{sister.name}<span className="profile-period">.</span></h1></div>
            <div className="profile-portrait">{sister.image ? <img src={sister.image} alt={`Портрет ${sister.name}`} /> : <span className="bez-portreta">{sister.name[0]}</span>}<span className="portrait-stamp">{sister.id} / {sisters.length}</span></div>
          </div>
        </section>
        {sister.razdely.length > 0 ? (
          <section className="profile-story" aria-label="Анкета">
            {sister.razdely.map((r, index) => <article className="story-row" key={`${r.metka}-${index}`}><div className="story-index">{String(index + 1).padStart(2, "0")}</div><div className="story-label">{r.metka}</div><div className="story-body"><h2>{r.zagolovok}</h2><p>{r.tekst}</p></div></article>)}
          </section>
        ) : (
          <section className="profile-content">
            <div className="profile-content-label"><Circle size={10} fill="currentColor" /> Анкета</div>
            <div className="profile-content-main"><p className="profile-lead">Анкета пересобирается.</p></div>
          </section>
        )}
        <section className="profile-next"><p className="eyebrow">Следующее дело</p><button onClick={() => setLocation(`/sisters/${nextSister.slug}`)}><span>{nextSister.id}</span><b>{nextSister.name}</b><ArrowUpRight size={24} /></button></section>
      </main>
      <footer className="footer"><Link className="brand footer-brand" href="/"><img src="mark.svg" alt="" className="brand-mark" /><span>Сёстры<span className="brand-dot">.</span></span></Link><p>Архив ИИ-персонажей<br />в процессе знакомства.</p><span>© 2026 / 01</span></footer>
    </div>
  );
}
