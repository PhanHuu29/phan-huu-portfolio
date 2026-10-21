import {useI18n} from '../i18n';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {useRef, type PointerEvent} from 'react';
import Artwork from './Artwork';
import TechnologyBadges from './TechnologyBadges';
import type {Project} from '../lib/types';

/** Perspective follows the pointer, while technology buttons remain independent of navigation. */
export default function ProjectCard({project,index=0}:{project:Project,index?:number}){
 const {t}=useI18n();
 const ref=useRef<HTMLElement>(null);
 const frame=useRef(0);
 const onPointerMove=(e:PointerEvent<HTMLElement>)=>{
   if(e.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   const card=ref.current;if(!card)return;
   const b=card.getBoundingClientRect();
   const px=Math.max(0,Math.min(1,(e.clientX-b.left)/b.width));
   const py=Math.max(0,Math.min(1,(e.clientY-b.top)/b.height));
   if(frame.current)cancelAnimationFrame(frame.current);
   frame.current=requestAnimationFrame(()=>{
     card.style.setProperty('--tilt-x',`${((.5-py)*6).toFixed(2)}deg`);
     card.style.setProperty('--tilt-y',`${((px-.5)*7).toFixed(2)}deg`);
     card.style.setProperty('--pointer-x',`${(px*100).toFixed(2)}%`);
     card.style.setProperty('--pointer-y',`${(py*100).toFixed(2)}%`);
   });
 };
 const reset=()=>{if(frame.current)cancelAnimationFrame(frame.current);const card=ref.current;if(!card)return;card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');card.style.removeProperty('--pointer-x');card.style.removeProperty('--pointer-y')};
 return <article ref={ref} className="project-card led-card tilt-card group relative min-w-0" data-project-index={index+1} onPointerMove={onPointerMove} onPointerLeave={reset}>
  <Link to={`/work/${project.slug}`} className="project-card-link block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric" aria-label={`${t('card.open')} ${project.title}`}>
   <div className="project-image-wrap led-frame"><Artwork project={project}/><span className="project-arrow"><ArrowUpRight size={24}/></span><div className="card-glow-spot" aria-hidden="true"/></div>
   <div className="project-caption"><div><h3>{project.title}</h3><p>{project.category} <span>·</span> {project.year}</p></div><span className="project-kind">{project.kind==='development'?t('card.development'):t('card.design')}</span></div>
  </Link>
  <TechnologyBadges project={project} compact/>
 </article>;
}
