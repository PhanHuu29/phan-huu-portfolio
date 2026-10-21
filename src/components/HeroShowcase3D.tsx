import {useEffect,useRef,type PointerEvent} from 'react';
import {useI18n} from '../i18n';

/** A layered CSS 3D scene built around the supplied logo.
 * Parallax is progressive enhancement for fine pointers only.
 * There is no WebGL dependency or extra network request.
 */
export default function HeroShowcase3D(){
  const {t}=useI18n();
  const stage=useRef<HTMLDivElement>(null);
  const frame=useRef<number|undefined>(undefined);
  useEffect(()=>()=>{if(frame.current!==undefined)cancelAnimationFrame(frame.current)},[]);
  const move=(event:PointerEvent<HTMLDivElement>)=>{
    if(event.pointerType==='touch'||!window.matchMedia('(hover: hover) and (pointer: fine)').matches||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const element=stage.current;
    if(!element)return;
    const box=element.getBoundingClientRect();
    const dx=(event.clientX-box.left)/box.width-.5;
    const dy=(event.clientY-box.top)/box.height-.5;
    if(frame.current!==undefined)cancelAnimationFrame(frame.current);
    frame.current=requestAnimationFrame(()=>{
      element.style.setProperty('--scene-rx',`${(-dy*12).toFixed(2)}deg`);
      element.style.setProperty('--scene-ry',`${(dx*16).toFixed(2)}deg`);
      element.style.setProperty('--scene-x',`${(dx*16).toFixed(1)}px`);
      element.style.setProperty('--scene-y',`${(dy*10).toFixed(1)}px`);
      frame.current=undefined;
    });
  };
  const reset=()=>{
    if(frame.current!==undefined)cancelAnimationFrame(frame.current);
    const element=stage.current;
    if(element){element.style.removeProperty('--scene-rx');element.style.removeProperty('--scene-ry');element.style.removeProperty('--scene-x');element.style.removeProperty('--scene-y')}
  };
  return <div ref={stage} className="showcase-art immersive-3d-stage" onPointerMove={move} onPointerLeave={reset} aria-label={t('showcase.3dLabel')}>
    <div className="scene-background-grid" aria-hidden="true"/>
    <div className="scene-ambient scene-ambient-blue" aria-hidden="true"/>
    <div className="scene-ambient scene-ambient-purple" aria-hidden="true"/>
    <div className="scene-surface" aria-hidden="true">
      <div className="scene-rotator">
        <div className="scene-depth-frame scene-depth-frame-outer"/>
        <div className="scene-depth-frame scene-depth-frame-inner"/>
        <div className="scene-disc scene-disc-back"/>
        <div className="scene-orbit scene-orbit-one"/>
        <div className="scene-orbit scene-orbit-two"/>
        <div className="scene-orbit scene-orbit-three"/>
        <div className="scene-core-glow"/>
        <div className="scene-logo-plane"><img className="scene-logo-img" src="/images/phan-huu-logo.png" alt=""/></div>
        <div className="scene-glint glint-one"/>
        <div className="scene-glint glint-two"/>
        <div className="scene-glint glint-three"/>
      </div>
    </div>
    <span className="scene-hud scene-hud-top">PH / DIGITAL CRAFT <span>↗</span></span>
    <span className="scene-hud scene-hud-bottom"><span className="scene-hud-dot"/> {t('showcase.online3d')} <span>001 / 026</span></span>
    <span className="scene-side-label" aria-hidden="true">CREATIVE DIMENSION / PH—01</span>
  </div>;
}
