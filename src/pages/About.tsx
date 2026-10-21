import {ArrowUpRight,Asterisk} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useI18n} from '../i18n';

export default function About(){
 const {t}=useI18n();
 const capabilities=[
  {name:t('about.technical'),text:'React · TypeScript · JavaScript · Node.js · REST APIs · SQL · Supabase'},
  {name:t('about.creative'),text:'Figma · Photoshop · Illustrator · Premiere Pro · UI/UX · Brand Design'},
 ];
 return <section className="container inner-page about-page">
  <span className="eyebrow">{t('about.eyebrow')}</span>
  <h1>{t('about.heading1')}<br/><em>{t('about.heading2')}</em></h1>
  <div className="about-feature"><div className="about-graphic"><Asterisk strokeWidth={.7}/><span>THINK / BUILD / CREATE</span></div><div className="about-text"><span className="eyebrow">{t('about.hello')}</span><h2>{t('about.design')}<br/>{t('about.design2')}<span className="orange-dot">.</span></h2><p>{t('about.p1')}</p><p>{t('about.p2')}</p><Link to="/contact" className="text-link">{t('about.collaborate')} <ArrowUpRight/></Link></div></div>
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
   {capabilities.map(cap=><div key={cap.name} className="ph-glass px-6 py-7 transition-colors duration-300 hover:border-electric/50 md:px-8 md:py-9">
    <span className="eyebrow">{t('about.toolkit')}</span>
    <h3 className="mt-3 mb-4 font-display text-3xl font-semibold tracking-tight text-white">{cap.name}</h3>
    <p className="m-0 text-sm leading-7 text-mist">{cap.text}</p>
   </div>)}
  </div>
 </section>;
}
