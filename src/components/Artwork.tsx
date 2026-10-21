import type {Project} from '../lib/types';
import {useI18n} from '../i18n';
import {isVideo, safeUrl} from '../lib/utils';
export default function Artwork({project,detail=false}:{project:Project,detail?:boolean}) {
  const {t}=useI18n();
  const cover = safeUrl(project.cover_url);
  if(cover) return <div className={`artwork artwork-image ${detail?'artwork-detail':''}`} style={{backgroundColor:project.accent}}>{isVideo(cover)?<video src={cover} controls={detail} muted={!detail} loop autoPlay={!detail} playsInline/>:<><span className="cover-image-fallback">{project.title}<small>{project.kind==='development'?t('gallery.viewLive'):t('art.preview')}</small></span><img src={cover} alt={project.title} loading="lazy" onError={e=>{e.currentTarget.style.display="none"}}/></>}</div>;
  if(project.slug==='coffee-bags-mockups') return <div className={`artwork artwork-unavailable ${detail?'artwork-detail':''}`} style={{backgroundColor:project.accent}}><div><span>PORTFOLIO VISUAL / 06</span><strong>COFFEE<br/>BAGS.</strong><small>{t('gallery.empty')}</small></div></div>;
  const demoIndex = Number(project.id.replace('demo-',''));
  const index = Number.isInteger(demoIndex) && project.id.startsWith('demo-') ? Math.max(0,demoIndex-1) : Array.from(project.slug).reduce((sum,ch)=>sum+ch.charCodeAt(0),0)%6;
  return <div className={`artwork art-${index%6} ${detail?'artwork-detail':''}`} style={{'--art-accent':project.accent} as React.CSSProperties}>
    <div className="art-grain"/>
    {index%6===0 && <div className="art-web"><div className="art-web-header"><span>ATLAS®</span><span>NEW COLLECTION — 26</span><span>☰</span></div><div className="art-web-display"><div><small>OBJECTS OF DESIRE</small><strong>EVERYDAY,<br/> REIMAGINED.</strong><span>EXPLORE THE COLLECTION ↗</span></div><div className="art-web-orb"/></div><div className="art-web-footer">INDIVIDUAL. TIMELESS. BEAUTIFUL.</div></div>}
    {index%6===1 && <div className="art-forma"><div className="forma-top">F/° <small>CREATIVE STUDIO</small></div><div className="forma-center">form<span>a</span><i>®</i></div><div className="forma-bottom"><span>IDENTITY SYSTEM / 001</span><span>GOOD FORM. GREAT IDEAS.</span></div></div>}
    {index%6===2 && <div className="art-orbit"><div className="orbit-header"><b>◉ orbit.</b><small>Analytics overview ↗</small></div><div className="orbit-headline">Your business,<br/><span>at a glance.</span></div><div className="orbit-panels"><div><small>REVENUE</small><b>$128,450</b><em>↗ 24.8%</em><div className="orbit-line"/></div><div><small>ENGAGEMENT</small><b>82.9%</b><em>↗ 12.3%</em><div className="orbit-bars"><i/><i/><i/><i/><i/><i/><i/><i/></div></div></div></div>}
    {index%6===3 && <div className="art-noir"><div className="noir-top">NOIR / ISSUE NO.04 <span>INDEPENDENT MAGAZINE</span></div><div className="noir-circle"/><div className="noir-headline">THE ART<br/>OF <i>LESS.</i></div><div className="noir-bottom">THE NEW CREATIVE PERSPECTIVE <span>© 2026</span></div></div>}
    {index%6===4 && <div className="art-learn"><div className="learn-top">✳ learnwise <span>learn. grow. repeat.</span></div><div className="learn-panel"><span className="learn-tag">YOUR LEARNING SPACE</span><h3>Small steps.<br/>Big ideas.</h3><p>Your journey begins here.</p><div className="learn-button">Explore courses ↗</div></div><span className="learn-star">✳</span></div>}
    {index%6===5 && <div className="art-motion"><div className="motion-top">MOTION STUDIES // VOL.01 <span>PLAY / PAUSE ◉</span></div><div className="motion-rings"><div/><div/><div/></div><div className="motion-text">MAKE<br/><em>IT MOVE.</em></div><div className="motion-bottom">A CELEBRATION OF MOVEMENT</div></div>}
  </div>;
}
