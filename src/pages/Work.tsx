import {useMemo,useState} from 'react';
import {Search} from 'lucide-react';
import {useProjects} from '../lib/useProjects';
import {useI18n} from '../i18n';
import {localizedProject} from '../i18n/projects';
import ProjectCard from '../components/ProjectCard';
import LoadState from '../components/LoadState';

/** The filter toolbar and responsive project grid use Tailwind v4. */
export default function Work(){
 const {language,t}=useI18n();
 const {projects,loading,error}=useProjects();
 const [filter,setFilter]=useState('all');
 const [query,setQuery]=useState('');
 const shown=useMemo(()=>projects.map(p=>localizedProject(p,language)).filter(p=>(filter==='all'||p.kind===filter)&&(`${p.title} ${p.category} ${p.technologies.join(' ')}`.toLowerCase().includes(query.toLowerCase()))),[projects,language,filter,query]);
 const options=[
   {value:'all',label:t('work.all')},
   {value:'development',label:t('work.development')},
   {value:'design',label:t('work.design')},
 ];
 return <section className="container inner-page">
  <span className="eyebrow">{t('work.eyebrow')}</span>
  <div className="page-headline"><h1>{t('work.title')} <em>{t('work.titleAccent')}</em></h1><p>{t('work.subtitle')}</p></div>
  <div className="mb-8 flex flex-col gap-4 border-y border-outline py-5 lg:flex-row lg:items-center lg:justify-between">
   <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t('work.eyebrow')}>
    {options.map(option=><button
      key={option.value}
      type="button"
      onClick={()=>setFilter(option.value)}
      aria-pressed={filter===option.value}
      className={`inline-flex min-h-10 items-center gap-1 rounded-xl border px-4 py-2 font-sans text-xs font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric ${filter===option.value?'border-electric/50 bg-electric/15 text-ice shadow-[0_0_18px_rgba(99,154,255,.12)]':'border-outline/70 bg-navy/50 text-mist hover:border-electric/50 hover:text-ice'}`}>
      {option.label}{option.value==='all'&&<sup className="ml-1 text-[10px] text-electric">{projects.length}</sup>}
    </button>)}
   </div>
   <label className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-outline bg-midnight/60 px-4 text-mist transition-colors focus-within:border-electric/70 lg:w-72">
    <Search size={17} aria-hidden="true"/>
    <input className="w-full min-w-0 bg-transparent py-3 text-xs text-white outline-none placeholder:text-mist/60"
      placeholder={t('work.search')} aria-label={t('work.search')} value={query} onChange={e=>setQuery(e.target.value)}/>
   </label>
  </div>
  <LoadState error={error} loading={loading}/>
  <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2">{shown.map((p,i)=><ProjectCard project={p} key={p.id} index={i}/>)}</div>
  {!loading&&!error&&!shown.length&&<p className="empty-work">{t('work.noResults')}</p>}
 </section>;
}
