import {useI18n} from '../i18n';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {Box,Brush,Code2,Coffee,Globe2,Layers,Monitor,Package,Palette,PenTool,Shapes,Sparkles} from 'lucide-react';
import type {Project} from '../lib/types';
import TechnologyLogo from './TechnologyLogo';

const logos:Record<string,{label:string,color:string}>={
 react:{label:'React',color:'#61dafb'},'react.js':{label:'React',color:'#61dafb'},
 typescript:{label:'TypeScript',color:'#3178c6'},javascript:{label:'JavaScript',color:'#f7df1e'},
 'node.js':{label:'Node.js',color:'#79b15a'},nodejs:{label:'Node.js',color:'#79b15a'},
 html:{label:'HTML5',color:'#e44d26'},css:{label:'CSS3',color:'#1572b6'},
 tailwind:{label:'Tailwind CSS',color:'#38bdf8'},'tailwind css':{label:'Tailwind CSS',color:'#38bdf8'},
 figma:{label:'Figma',color:'#a259ff'},illustrator:{label:'Adobe Illustrator',color:'#ff9a00'},
 'adobe illustrator':{label:'Adobe Illustrator',color:'#ff9a00'},photoshop:{label:'Adobe Photoshop',color:'#31a8ff'},
 'adobe photoshop':{label:'Adobe Photoshop',color:'#31a8ff'},lightroom:{label:'Adobe Lightroom',color:'#31c5f4'},
 'adobe lightroom':{label:'Adobe Lightroom',color:'#31c5f4'},indesign:{label:'Adobe InDesign',color:'#ff5fa2'},
 'adobe indesign':{label:'Adobe InDesign',color:'#ff5fa2'},'after effects':{label:'After Effects',color:'#9999ff'},
 'premiere pro':{label:'Premiere Pro',color:'#9999ff'},vercel:{label:'Vercel',color:'#ffffff'},
 supabase:{label:'Supabase',color:'#3ecf8e'},vite:{label:'Vite',color:'#a98aff'},
 pnpm:{label:'pnpm',color:'#f9ad00'},'next.js':{label:'Next.js',color:'#ffffff'},wordpress:{label:'WordPress',color:'#21759b'}
};
function normalized(tag:string){return tag.trim().toLowerCase().replace(/\s+/g,' ')}
function SkillIcon({tag}:{tag:string}){const t=normalized(tag);const props={size:15,strokeWidth:1.8};if(t.includes('packag')||t.includes('bag')||t.includes('pouch')||t.includes('cup'))return <Package {...props}/>;if(t.includes('brand'))return <Shapes {...props}/>;if(t.includes('mockup')||t.includes('visualization'))return <Layers {...props}/>;if(t.includes('coffee'))return <Coffee {...props}/>;if(t.includes('layout'))return <Monitor {...props}/>;if(t.includes('skincare'))return <Sparkles {...props}/>;if(t.includes('graphic'))return <Brush {...props}/>;if(t.includes('website')||t.includes('web'))return <Globe2 {...props}/>;if(t.includes('develop'))return <Code2 {...props}/>;if(t.includes('design'))return <Palette {...props}/>;if(t.includes('product'))return <Box {...props}/>;return <PenTool {...props}/>}

function AnimatedChip({tag}:{tag:string}){
 const [lit,setLit]=useState(false);
 const timer=useRef<number|undefined>(undefined);
 const info=logos[normalized(tag)];
 useEffect(()=>()=>{window.clearTimeout(timer.current)},[]);
 const pulse=()=>{
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   setLit(false);
   window.clearTimeout(timer.current);
   requestAnimationFrame(()=>setLit(true));
   timer.current=window.setTimeout(()=>setLit(false),680);
 };
 return <button className={`technology-chip ${info?'real-tech':'skill-tech'} ${lit?'chip-pulse':''}`} type="button" aria-label={`Hiệu ứng logo ${tag}`} title={info?.label||tag} style={{'--chip-glow':info?.color||'#9bb9ff'} as CSSProperties} onClick={pulse}>
  {info?<TechnologyLogo name={tag}/>:<SkillIcon tag={tag}/>}<span>{tag}</span><span className="chip-ripple" aria-hidden="true"/>
 </button>;
}

export default function TechnologyBadges({project,compact=false}:{project:Project;compact?:boolean}){
 const {t}=useI18n();
 const tags=project.technologies||[];
 const hasVercel=tags.some(t=>normalized(t)==='vercel');
 const hostedOnVercel=project.kind==='development'&&project.demo_url?.includes('vercel.app')&&!hasVercel;
 return <div className={`technology-chips ${compact?'technology-chips-compact':''}`} aria-label={t('detail.technology')}>
  {tags.map((tag,i)=><AnimatedChip key={`${tag}-${i}`} tag={tag}/>)}
  {hostedOnVercel&&<AnimatedChip tag="Vercel"/>}
  {tags.length===0&&!hostedOnVercel&&<span className="technology-chip skill-tech"><Globe2 size={14}/><span>{t('tech.notUpdated')}</span></span>}
 </div>;
}
