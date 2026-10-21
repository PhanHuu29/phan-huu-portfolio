import {Link} from 'react-router-dom';
import {ArrowUpRight,FolderOpen,Eye,PenLine,Plus} from 'lucide-react';
import {useProjects} from '../lib/useProjects';

export default function AdminDashboard(){
 const {projects,loading,error}=useProjects(true);
 const count=(s:string)=>projects.filter(p=>p.status===s).length;
 const tiles=[
  {label:'TOTAL PROJECTS',value:loading?'—':projects.length,caption:'All projects',icon:FolderOpen},
  {label:'PUBLISHED',value:loading?'—':count('published'),caption:'Visible to visitors',icon:Eye},
  {label:'DRAFTS',value:loading?'—':count('draft'),caption:'Only you can see',icon:PenLine},
 ];
 return <>
  <div className="admin-page-heading"><div><span className="admin-eyebrow">DASHBOARD / OVERVIEW</span><h1>Welcome back <span>✳</span></h1><p>Manage your portfolio, your way.</p></div><Link className="admin-primary" to="/admin/projects/new"><Plus size={18}/> ADD NEW PROJECT</Link></div>
  {error&&<p role="alert" className="alert error-message">{error}</p>}
  <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
   {tiles.map(({label,value,caption,icon:Icon})=><div key={label} className="flex min-h-36 flex-col rounded-xl border border-outline bg-navy px-6 py-6 shadow-[0_12px_32px_rgba(0,0,0,.12)] transition-colors hover:border-electric/50">
    <span className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-mist"><Icon size={20} aria-hidden="true"/> {label}</span>
    <strong className="mt-3 font-display text-5xl leading-none font-bold tracking-tight text-white">{value}</strong>
    <small className="mt-2 text-xs text-mist">{caption}</small>
   </div>)}
  </div>
  <div className="admin-card"><div className="admin-card-head"><h2>Recent projects</h2><Link to="/admin/projects">VIEW ALL <ArrowUpRight size={16}/></Link></div>{loading?<p>Loading...</p>:projects.length?projects.slice(0,5).map(p=><div className="admin-list-row" key={p.id}><div className="mini-art" style={{background:p.accent}}/><div><strong>{p.title}</strong><small>{p.category}</small></div><span className={`status-chip ${p.status}`}>{p.status}</span><Link to={`/admin/projects/${p.id}/edit`}>EDIT <ArrowUpRight size={14}/></Link></div>):<div className="empty-work">You haven't added any projects yet.</div>}</div>
 </>;
}
