import {ArrowUpRight,Mail, Github, Linkedin} from 'lucide-react';
import {safeUrl} from '../lib/utils';
import {useI18n} from '../i18n';

export default function Contact(){
 const {t}=useI18n();
 const email=import.meta.env.VITE_SITE_EMAIL||'phandinhhuu227@gmail.com';
 const github=safeUrl(import.meta.env.VITE_GITHUB_URL),linkedin=safeUrl(import.meta.env.VITE_LINKEDIN_URL);
 return <section className="container inner-page contact-page">
  <span className="eyebrow">{t('contact.eyebrow')}</span>
  <h1>{t('contact.heading1')}<br/><em>{t('contact.heading2')}</em><br/>{t('contact.heading3').replace(/\.$/,'')}<span className="orange-dot">.</span></h1>
  <p>{t('contact.description')}</p>
  <a className="contact-mail focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric" href={`mailto:${email}`}><Mail/> <span>{email}</span> <ArrowUpRight/></a>
  <div className="mt-10 flex flex-wrap items-center gap-4 md:gap-6">
   {github&&<a className="inline-flex min-h-11 items-center gap-3 rounded-xl border border-outline bg-navy/50 px-5 py-3 text-xs font-semibold tracking-wide text-ice transition-colors hover:border-electric/60 focus-visible:outline-2 focus-visible:outline-electric" href={github} target="_blank" rel="noreferrer"><Github size={18}/> GITHUB <ArrowUpRight size={16}/></a>}
   {linkedin&&<a className="inline-flex min-h-11 items-center gap-3 rounded-xl border border-outline bg-navy/50 px-5 py-3 text-xs font-semibold tracking-wide text-ice transition-colors hover:border-electric/60 focus-visible:outline-2 focus-visible:outline-electric" href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LINKEDIN <ArrowUpRight size={16}/></a>}
  </div>
 </section>;
}
