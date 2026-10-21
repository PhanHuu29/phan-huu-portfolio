import {useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import Artwork from '../components/Artwork';
import {getProject} from '../lib/projects';
import {safeUrl} from '../lib/utils';
import {useI18n} from '../i18n';
import {localizedProject} from '../i18n/projects';
import TechnologyBadges from '../components/TechnologyBadges';
import MediaGallery from '../components/MediaGallery';
import type {Project} from '../lib/types';

export default function ProjectDetail(){
 const {language,t}=useI18n();
 const {slug=''}=useParams();const [storedProject,setProject]=useState<Project|null>(null);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
 useEffect(()=>{let alive=true;setLoading(true);setError('');getProject(slug).then(p=>{if(alive)setProject(p)}).catch((e:Error)=>{if(alive)setError(e.message)}).finally(()=>{if(alive)setLoading(false)});return()=>{alive=false}},[slug]);
 if(loading)return <div className="container inner-page">{t('detail.loading')}</div>;
 if(error)return <div className="container inner-page error-message">{error}</div>;
 if(!storedProject)return <div className="container inner-page"><h1>{t('detail.notFound')}</h1><Link to="/work">{t('detail.back')}</Link></div>;
 const project=localizedProject(storedProject,language);
 const demo=safeUrl(project.demo_url),github=safeUrl(project.github_url);
 const isExternalDemo=project.kind==='development' && Boolean(demo);
 return <article className="container project-detail"><Link className="back-link" to="/work"><ArrowLeft size={18}/> {t('detail.back')}</Link><span className="eyebrow">{project.kind==='development'?t('card.development'):t('card.design')} / {project.year}</span><h1>{project.title}<span className="orange-dot">.</span></h1><p className="detail-subtitle">{project.subtitle}</p><Artwork project={project} detail/><div className="detail-grid"><div><span className="eyebrow">{t('detail.projectLabel')}</span><h2>{t('detail.story')}</h2><p className="detail-description">{project.description}</p>{(isExternalDemo||github)&&<div className="detail-links">{isExternalDemo&&<a href={demo||undefined} target="_blank" rel="noopener noreferrer">{t('detail.live')} <ArrowUpRight size={19}/></a>}{github&&<a href={github} target="_blank" rel="noopener noreferrer">{t('detail.source')} <ArrowUpRight size={19}/></a>}</div>}</div><aside><div><small>{t('detail.category')}</small><strong>{project.category}</strong></div><div><small>{t('detail.role')}</small><strong>{project.role}</strong></div><div><small>{t('detail.client')}</small><strong>{project.client||t('detail.personal')}</strong></div><div><small>{t('detail.year')}</small><strong>{project.year}</strong></div><div><small>{t('detail.technology')}</small><TechnologyBadges project={project}/></div></aside></div><MediaGallery project={project}/><Link to="/work" className="detail-back-bottom">{t('detail.more')}</Link></article>;
}
