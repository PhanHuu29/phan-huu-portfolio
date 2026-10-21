import {useEffect, useRef, useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {ArrowUpRight, Menu, X, Github, Linkedin, Sparkles, ArrowRight} from 'lucide-react';
import {safeUrl, formatDate} from '../lib/utils';
import {useI18n} from '../i18n';
import {AnimatedOutlet,CursorGlow,IntroLoader,ParticleField} from './MotionExperience';

export default function Layout(){
  const {t}=useI18n();
  const [menu,setMenu]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const header=useRef<HTMLElement>(null);
  const scrollBar=useRef<HTMLSpanElement>(null);
  const location=useLocation();
  const github=safeUrl(import.meta.env.VITE_GITHUB_URL);
  const linkedin=safeUrl(import.meta.env.VITE_LINKEDIN_URL);
  const links=[
    {href:'/',name:t('nav.home'),end:true},
    {href:'/work',name:t('nav.projects')},
    {href:'/about',name:t('nav.about')},
    {href:'/contact',name:t('nav.contact')},
  ];
  useEffect(()=>{setMenu(false)},[location.pathname]);
  useEffect(()=>{
    let scheduled=false;
    const update=()=>{
      scheduled=false;
      const top=window.scrollY;
      setScrolled(top>24);
      const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
      if(scrollBar.current)scrollBar.current.style.transform=`scaleX(${Math.min(1,top/max)})`;
    };
    const onScroll=()=>{if(!scheduled){scheduled=true;window.requestAnimationFrame(update)}};
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)};
  },[]);
  useEffect(()=>{
    const desktop=window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop=()=>{if(desktop.matches)setMenu(false)};
    desktop.addEventListener('change',closeOnDesktop);
    return()=>desktop.removeEventListener('change',closeOnDesktop);
  },[]);
  useEffect(()=>{
    if(!menu)return;
    const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setMenu(false);header.current?.querySelector<HTMLButtonElement>('.mobile-menu')?.focus()}};
    const onOutside=(e:PointerEvent)=>{if(e.target instanceof Node&&!header.current?.contains(e.target))setMenu(false)};
    document.addEventListener('keydown',onKey);
    document.addEventListener('pointerdown',onOutside);
    return()=>{document.removeEventListener('keydown',onKey);document.removeEventListener('pointerdown',onOutside)};
  },[menu]);

  return <div className="site-shell min-h-svh w-full font-sans" data-layout-version="v10-responsive">
    <a className="skip-link" href="#main-content">{t('nav.skip')}</a>
    <IntroLoader/><CursorGlow/><ParticleField/>
    <div className="site-ambient" aria-hidden="true"><span className="ambient-orb orb-one"/><span className="ambient-orb orb-two"/><span className="ambient-orb orb-three"/><span className="ambient-line line-one"/><span className="ambient-line line-two"/></div>
    <header ref={header} className={`site-header container polished-header${scrolled?' is-scrolled':''}${menu?' is-menu-open':''}`}>
      <div className="header-topline" aria-hidden="true"/>
      <Link to="/" className="brand premium-brand" aria-label={`PHAN HỮU — ${t('nav.home')}`} onClick={()=>setMenu(false)}>
        <span className="brand-emblem"><img src="/images/phan-huu-logo.png" alt=""/><span className="brand-emblem-shine"/></span>
        <span className="brand-wordmark"><span className="brand-main">PHAN <strong>HỮU</strong></span><small>{t('nav.brandTagline')}</small></span>
      </Link>
      <nav id="portfolio-primary-nav" className={`site-nav premium-nav${menu?' is-open':''}`} aria-label={t('nav.explore')}>
        <span className="nav-label">{t('nav.explore')}</span>
        {links.map(link=><NavLink key={link.href} to={link.href} end={link.end} onClick={()=>setMenu(false)} className={({isActive})=>isActive?'active':''}>{link.name}</NavLink>)}
        <Link className="mobile-nav-cta" to="/contact" onClick={()=>setMenu(false)}>{t('nav.collaborate')} <ArrowUpRight size={17}/></Link>
      </nav>
      <div className="header-actions">
        <span className="header-discipline"><span className="discipline-indicator"/> DESIGN <span className="discipline-slash">/</span> CODE</span>
        <Link to="/contact" className="nav-contact premium-contact">{t('nav.talk')} <span className="contact-arrow"><ArrowUpRight size={16}/></span></Link>
        <button className="mobile-menu premium-menu" type="button" aria-controls="portfolio-primary-nav" aria-expanded={menu} onClick={()=>setMenu(value=>!value)} aria-label={menu?t('nav.menuClose'):t('nav.menuOpen')}>{menu?<X size={21}/>:<Menu size={21}/>}</button>
      </div>
      <span ref={scrollBar} className="header-scroll-meter" aria-hidden="true"/>
    </header>
    <main id="main-content" tabIndex={-1}><AnimatedOutlet/></main>
    <footer className="footer"><div className="container"><div className="footer-lead"><span><Sparkles size={15}/> {t('footer.idea')}</span><Link to="/contact">{t('footer.build1')}<br/><em>{t('footer.build2')}</em> <ArrowUpRight/></Link></div><div className="footer-bottom"><span>© {formatDate()} PHAN HỮU — {t('footer.copyright')}</span><div>{github&&<a href={github} rel="noreferrer" target="_blank" aria-label="GitHub"><Github size={17}/></a>}{linkedin&&<a href={linkedin} rel="noreferrer" target="_blank" aria-label="LinkedIn"><Linkedin size={17}/></a>}<Link to="/work" aria-label={t('nav.projects')}><ArrowRight size={17}/></Link></div><span>{t('footer.discipline')}</span></div></div></footer>
  </div>;
}
