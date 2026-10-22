import {Link} from 'react-router-dom';
import {ArrowDown, ArrowRight, ArrowUpRight, Code2, Palette, Sparkles, MoveUpRight, Layers3} from 'lucide-react';
import {useProjects} from '../lib/useProjects';
import {configured} from '../lib/supabase';
import {useI18n} from '../i18n';
import {localizedProject} from '../i18n/projects';
import ProjectCard from '../components/ProjectCard';
import LoadState from '../components/LoadState';
import HeroShowcase3D from '../components/HeroShowcase3D';

export default function Home(){
 const {language,t}=useI18n();
 const {projects,loading,error}=useProjects();
 const featured=projects.filter(p=>p.featured).slice(0,4);
 const shown=featured.length?featured:projects.slice(0,4);
 return <>
 <section className="neone-hero" aria-labelledby="hero-title">
  <div className="hero-grid" aria-hidden="true"/>
  <div className="horizon-aura" aria-hidden="true">
   <div className="horizon-core"/>
   <svg className="horizon-svg" viewBox="0 0 1440 360" preserveAspectRatio="none" focusable="false">
    <defs>
     <linearGradient id="hero-horizon-stroke" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#416bea" stopOpacity="0"/><stop offset=".18" stopColor="#659cf3" stopOpacity=".5"/><stop offset=".5" stopColor="#b9eaff" stopOpacity=".97"/><stop offset=".82" stopColor="#659cf3" stopOpacity=".5"/><stop offset="1" stopColor="#416bea" stopOpacity="0"/></linearGradient>
    </defs>
    <path className="horizon-svg-glow" d="M 0 300 Q 720 -135 1440 300"/>
    <path className="horizon-svg-line" d="M 0 300 Q 720 -135 1440 300" stroke="url(#hero-horizon-stroke)"/>
   </svg>
  </div>
  <div className="hero-content container">
   <div className="hero-pill"><Sparkles size={14}/> <span>{t('hero.pill')}</span> <span className="pill-dot"/> <span>PORTFOLIO</span></div>
   <h1 id="hero-title" className="neone-headline"><span className="headline-primary">{t('hero.title1')}</span><span className="headline-accent">{t('hero.title2')}</span></h1>
   <p className="neone-subtitle">{t('hero.subtitle')}</p>
   <div className="hero-actions"><Link className="primary-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric" to="/work">{t('hero.viewWork')} <ArrowUpRight size={18}/></Link><Link className="ghost-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric" to="/contact">{t('hero.collaborate')} <ArrowRight size={17}/></Link></div>
   <div className="hero-trust"><span className="availability"><i className="hero-dot"/> {t('hero.available')}</span><span className="trust-location">{t('hero.based')}</span></div>
  </div>
  <div className="showcase-wrap container" aria-label="Design and development showcase">
   <div className="showcase-glow" aria-hidden="true"/>
   <div className="showcase-window">
    <div className="showcase-bar"><div className="window-dots"><i/><i/><i/></div><span>PHAN HUU / CREATIVE STUDIO</span><div className="window-right">{t('showcase.online')} <span>↗</span></div></div>
    <div className="showcase-body"><div className="showcase-side"><div className="showcase-mini-label">{t('showcase.welcome')} <span>✦</span></div><h2>{t('showcase.where')} <em>{t('showcase.design')}</em><br/>{t('showcase.meets')} <em>{t('showcase.code')}</em></h2><p>{t('showcase.description')}</p><div className="showcase-chips"><span><Code2 size={14}/> {t('showcase.development')}</span><span><Palette size={14}/> {t('showcase.visual')}</span><span><Layers3 size={14}/> {t('showcase.creative')}</span></div><Link to="/work" className="showcase-explore">{t('showcase.view')} <ArrowUpRight size={16}/></Link></div>
     <HeroShowcase3D/>
    </div>
   </div>
  </div>
  <a href="#selected-work" className="scroll-explore"><ArrowDown size={16}/> {t('hero.scroll')}</a>
 </section>
 <section className="selected-section container" id="selected-work"><div className="section-heading"><div><span className="eyebrow"><span className="eyebrow-star">✦</span> {t('home.curated')}</span><h2>{t('home.selected')} <em>{t('home.selectedAccent')}</em></h2><p className="section-intro">{t('home.intro')}</p></div><Link to="/work" className="round-link">{t('home.all')} <ArrowUpRight size={18}/></Link></div>
 {!configured&&<p className="sample-notice">{t('home.sample')}</p>}
 <LoadState error={error} loading={loading}/><div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2">{shown.map((p,i)=><ProjectCard key={p.id} project={localizedProject(p,language)} index={i}/>)}</div>{!loading&&!error&&shown.length===0&&<div className="empty-work">{t('home.noProjects')}</div>}</section>
 <section className="marquee" aria-hidden="true"><div>{t('home.marqueeA')} <Sparkles/> {t('home.marqueeB')} <Sparkles/> {t('home.marqueeA')} <Sparkles/> {t('home.marqueeB')} <Sparkles/></div></section>
 <section className="about-preview container"><div><span className="eyebrow"><span className="eyebrow-star">✦</span> {t('home.story')}</span><h2>{t('home.storyTitle1')}<br/><em>{t('home.storyTitle2')}</em><br/>{t('home.storyTitle3')}<br/>{t('home.storyTitle4')}</h2></div><div className="about-preview-copy"><div className="big-asterisk">✳</div><p>{t('home.storyBody')}</p><Link to="/about" className="text-link">{t('home.meet')} <ArrowRight size={20}/></Link><div className="skills-mini"><span>{t('home.skillA')}</span><span>{t('home.skillB')}</span><span>{t('home.skillC')}</span></div></div></section>
 <section className="service-section container"><div className="section-heading"><div><span className="eyebrow"><span className="eyebrow-star">✦</span> {t('home.expertise')}</span><h2>{t('home.create')} <em>{t('home.createAccent')}</em></h2></div></div><div className="services"><div><b>01</b><h3>{t('home.serviceA')}</h3><span>{t('home.serviceDescA')}</span><MoveUpRight/></div><div><b>02</b><h3>{t('home.serviceB')}</h3><span>{t('home.serviceDescB')}</span><MoveUpRight/></div><div><b>03</b><h3>{t('home.serviceC')}</h3><span>{t('home.serviceDescC')}</span><MoveUpRight/></div></div></section>
 </>;
}
