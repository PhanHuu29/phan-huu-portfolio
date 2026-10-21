import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {useLocation, useOutlet} from 'react-router-dom';
import {useI18n} from '../i18n';

/** Deterministic, CSS-animated particles: no animation loop, no API requests. */
export function ParticleField(){
  return <div className="motion-particles" aria-hidden="true">{Array.from({length:34},(_,i)=>{
    const x=(i*47.31+19.2)%100;
    const y=(i*29.13+7.5)%100;
    const size=1+(i%4)*.65;
    return <span key={i} className="motion-particle" style={{
      '--particle-x':`${x}%`, '--particle-y':`${y}%`,
      '--particle-size':`${size}px`, '--particle-delay':`${-(i%17)*.65}s`,
      '--particle-duration':`${11+(i%9)*2.2}s`,
    } as CSSProperties}/>;
  })}</div>;
}

function prefersReduced(){
  return typeof window!=='undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Intro appears once per tab; never traps keyboard or blocks reduced-motion users. */
export function IntroLoader(){
  const {t}=useI18n();
  const [visible,setVisible]=useState(()=>{
    if(typeof window==='undefined'||prefersReduced())return false;
    try{return window.sessionStorage.getItem('ph-intro-seen')!=='1'}catch{return true}
  });
  const [exiting,setExiting]=useState(false);
  useEffect(()=>{
    if(!visible)return;
    document.documentElement.classList.add('intro-active');
    const start=window.setTimeout(()=>setExiting(true),1050);
    const end=window.setTimeout(()=>{
      setVisible(false);
      document.documentElement.classList.remove('intro-active');
      try{window.sessionStorage.setItem('ph-intro-seen','1')}catch{/* storage may be unavailable */}
    },1510);
    return()=>{window.clearTimeout(start);window.clearTimeout(end);document.documentElement.classList.remove('intro-active')};
  },[visible]);
  if(!visible)return null;
  return <div className={`intro-loader ${exiting?'intro-loader-exit':''}`} aria-label={t('intro.open')} role="status" aria-live="polite">
    <div className="intro-halo" aria-hidden="true"/>
    <div className="intro-logo-ring"><img src="/images/phan-huu-logo.png" alt=""/></div>
    <div className="intro-wordmark">PHAN <b>HỮU</b></div>
    <div className="intro-subline">{t('footer.discipline')}</div>
    <div className="intro-meter"><span/></div>
    <span className="intro-caption">{t('intro.crafting')}</span>
  </div>;
}

/** RAF-throttled pointer glow, disabled for touch and reduced motion. */
export function CursorGlow(){
  const spot=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(prefersReduced()||!window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
    let raf=0,x=window.innerWidth/2,y=window.innerHeight/2;
    const update=()=>{if(spot.current){spot.current.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%)`}raf=0};
    const move=(e:PointerEvent)=>{
      if(e.pointerType!=='mouse'&&e.pointerType!=='pen')return;
      x=e.clientX;y=e.clientY;
      spot.current?.classList.add('visible');
      const target=e.target;
      spot.current?.classList.toggle('is-interactive',target instanceof Element && Boolean(target.closest('a,button,.technology-chip,.project-card')));
      if(!raf)raf=requestAnimationFrame(update);
    };
    const hide=()=>spot.current?.classList.remove('visible');
    document.addEventListener('pointermove',move,{passive:true});
    document.addEventListener('pointerleave',hide);
    window.addEventListener('blur',hide);
    return()=>{document.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',hide);window.removeEventListener('blur',hide);if(raf)cancelAnimationFrame(raf)};
  },[]);
  return <div ref={spot} className="cursor-glow" aria-hidden="true"/>;
}

/** Per-route enter transition + reveal-on-scroll with dynamically loaded project cards. */
export function AnimatedOutlet(){
  const location=useLocation();
  const outlet=useOutlet();
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const reduced=prefersReduced();
    if(location.hash){
      requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());
    }else window.scrollTo({top:0,behavior:'auto'});
    if(reduced||!root.current||typeof IntersectionObserver==='undefined')return;
    const container=root.current;
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target)}
      });
    },{threshold:.06,rootMargin:'0px 0px -28px 0px'});
    const seen=new WeakSet<Element>();
    const targets='.section-heading, .project-card, .about-preview, .services > div, .page-headline, .work-toolbar, .project-gallery-block, .detail-grid, .about-feature, .contact-links, .detail-subtitle';
    const scan=()=>container.querySelectorAll(targets).forEach((el,index)=>{
      if(seen.has(el))return;
      seen.add(el);
      if(el.getBoundingClientRect().top<window.innerHeight*.9){el.classList.add('is-revealed');return}
      el.classList.add('reveal-on-scroll');
      (el as HTMLElement).style.setProperty('--reveal-delay',`${Math.min(index%4,3)*65}ms`);
      observer.observe(el);
    });
    scan();
    const changes=new MutationObserver(scan);
    changes.observe(container,{childList:true,subtree:true});
    return()=>{changes.disconnect();observer.disconnect()};
  },[location.pathname,location.hash]);
  return <div key={location.pathname} ref={root} className={`page-motion-shell ${location.pathname === "/" ? "page-is-home" : "page-is-inner"}`}><div className="page-motion-flare" aria-hidden="true"/>{outlet}</div>;
}
