import type { ReactNode } from 'react';

/** Brand-aware vector marks for technologies that are explicitly named in the CMS. */
export default function TechnologyLogo({name}:{name:string}){
 const n=name.trim().toLowerCase();
 const svg=(children:ReactNode)=> <svg className="tech-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false">{children}</svg>;
 if(n==='react'||n==='react.js')return svg(<><g fill="none" stroke="#61dafb" strokeWidth="1.35"><ellipse cx="12" cy="12" rx="10.3" ry="4"/><ellipse cx="12" cy="12" rx="10.3" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.3" ry="4" transform="rotate(120 12 12)"/></g><circle cx="12" cy="12" r="1.8" fill="#61dafb"/></>);
 if(n==='figma')return svg(<><rect x="4" y="2" width="8" height="7" rx="3.5" fill="#f24e1e"/><rect x="12" y="2" width="8" height="7" rx="3.5" fill="#ff7262"/><rect x="4" y="9" width="8" height="7" rx="3.5" fill="#a259ff"/><circle cx="16" cy="12.5" r="3.5" fill="#1abcfe"/><rect x="4" y="16" width="8" height="7" rx="3.5" fill="#0acf83"/></>);
 if(n==='vercel')return svg(<path d="M12 2.7 23 21H1z" fill="#fff"/>);
 if(n==='supabase')return svg(<path fill="#3ecf8e" d="M14.5 2.2a1 1 0 0 1 1.7.8v8h5a1 1 0 0 1 .75 1.66L9.7 22.3a1 1 0 0 1-1.65-.79v-9.1H3a1 1 0 0 1-.74-1.66z"/>);
 if(n==='typescript')return svg(<><rect width="22" height="22" x="1" y="1" rx="2" fill="#3178c6"/><text x="3.5" y="18" fontSize="12" fontWeight="900" fontFamily="sans-serif" fill="#fff">TS</text></>);
 if(n==='javascript')return svg(<><rect x="1" y="1" width="22" height="22" rx="2" fill="#f7df1e"/><text x="3.5" y="18" fontSize="12" fontWeight="900" fontFamily="sans-serif" fill="#1b1b1b">JS</text></>);
 if(n==='photoshop'||n==='adobe photoshop')return svg(<><rect x="1" y="1" width="22" height="22" rx="3" fill="#061e36" stroke="#31a8ff"/><text x="4" y="17" fontSize="11.8" fontWeight="750" fontFamily="sans-serif" fill="#31a8ff">Ps</text></>);
 if(n==='illustrator'||n==='adobe illustrator')return svg(<><rect x="1" y="1" width="22" height="22" rx="3" fill="#341e0c" stroke="#ff9a00"/><text x="4" y="17" fontSize="11.8" fontWeight="750" fontFamily="sans-serif" fill="#ff9a00">Ai</text></>);
 if(n==='lightroom'||n==='adobe lightroom')return svg(<><rect x="1" y="1" width="22" height="22" rx="3" fill="#031721" stroke="#31c5f4"/><text x="4" y="17" fontSize="11.2" fontWeight="750" fontFamily="sans-serif" fill="#31c5f4">Lr</text></>);
 if(n==='indesign'||n==='adobe indesign')return svg(<><rect x="1" y="1" width="22" height="22" rx="3" fill="#39051e" stroke="#ff5fa2"/><text x="4" y="17" fontSize="11.2" fontWeight="750" fontFamily="sans-serif" fill="#ff5fa2">Id</text></>);
 if(n==='after effects')return svg(<><rect x="1" y="1" width="22" height="22" rx="3" fill="#10105b" stroke="#9999ff"/><text x="4" y="17" fontSize="11.8" fontWeight="750" fontFamily="sans-serif" fill="#9999ff">Ae</text></>);
 if(n==='premiere pro')return svg(<><rect x="1" y="1" width="22" height="22" rx="3" fill="#10105b" stroke="#9999ff"/><text x="4" y="17" fontSize="11.8" fontWeight="750" fontFamily="sans-serif" fill="#9999ff">Pr</text></>);
 if(n==='tailwind'||n==='tailwind css')return svg(<path d="M3 11c2-6 6-6 9-3 2 2 3 2 6-1 0 5-2 7-6 7-4 0-5-5-9-3Zm3 6c2-6 6-6 9-3 2 2 3 2 6-1 0 5-2 7-6 7-4 0-5-5-9-3Z" fill="#38bdf8"/>);
 if(n==='node.js'||n==='nodejs')return svg(<><path d="m12 1 10 5.7v10.6L12 23 2 17.3V6.7Z" fill="none" stroke="#78b75b" strokeWidth="2.5"/><text x="7" y="16" fontSize="11" fill="#78b75b" fontWeight="700">N</text></>);
 if(n==='html')return svg(<><path d="m3 2 2 19 7 2 7-2 2-19Z" fill="#e44d26"/><text x="8" y="17" fontSize="13" fill="#fff" fontWeight="900">5</text></>);
 if(n==='css')return svg(<><path d="m3 2 2 19 7 2 7-2 2-19Z" fill="#1572b6"/><text x="8" y="17" fontSize="13" fill="#fff" fontWeight="900">3</text></>);
 if(n==='pnpm')return svg(<><rect x="2" y="2" width="6" height="6" fill="#f9ad00"/><rect x="9" y="2" width="6" height="6" fill="#f9ad00"/><rect x="16" y="2" width="6" height="6" fill="#f9ad00"/><rect x="2" y="9" width="6" height="6" fill="#f9ad00"/><rect x="9" y="9" width="6" height="6" fill="#f9ad00"/><rect x="16" y="9" width="6" height="6" fill="#f9ad00"/><rect x="2" y="16" width="6" height="6" fill="#f9ad00"/><rect x="9" y="16" width="6" height="6" fill="#f9ad00"/><rect x="16" y="16" width="6" height="6" fill="#f9ad00"/></>);
 if(n==='vite')return svg(<path d="m2 4 10 18L22 4l-7 1-3 9-3-9Z" fill="#a78bfa"/>);
 if(n==='next.js')return svg(<><circle cx="12" cy="12" r="11" fill="#fff"/><text x="6" y="17" fontSize="14" fontWeight="800" fill="#111">N</text></>);
 if(n==='wordpress')return svg(<><circle cx="12" cy="12" r="10" stroke="#21759b" fill="#fff" strokeWidth="2"/><text x="4.6" y="17" fontSize="14" fontFamily="serif" fontWeight="800" fill="#21759b">W</text></>);
 return svg(<circle cx="12" cy="12" r="7" stroke="#91b9ff" fill="none" strokeWidth="2"/>);
}
