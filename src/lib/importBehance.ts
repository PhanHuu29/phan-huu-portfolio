import {demoProjects} from '../data/demo';
import {supabase} from './supabase';

/** Adds only missing slugs. Changes to existing projects are never overwritten. */
export async function importStarterProjects(): Promise<number> {
  if (!supabase) throw new Error('Cần cấu hình Supabase trước khi nhập dữ liệu mẫu.');
  const { data, error } = await supabase.from('projects').select('slug');
  if (error) throw new Error(error.message);
  const existing = new Set((data || []).map(item => item.slug));
  const missing = demoProjects.filter(p => !existing.has(p.slug)).map(({id: _id, ...project}) => {
    void _id;
    return project;
  });
  if (missing.length === 0) return 0;
  const {error: insertError} = await supabase.from('projects').insert(missing);
  if (insertError) throw new Error(insertError.message);
  return missing.length;
}

/**
 * Explicit, conservative migration for projects imported by older portfolio editions.
 * Updates software chips ONLY if a design project still has generic category tags.
 * Removes old Behance demo links from known starter design slugs. Never edits media.
 */
export async function syncStarterDesignTools():Promise<number>{
  if(!supabase)throw new Error('Cần cấu hình Supabase trước khi đồng bộ.');
  const design=demoProjects.filter(p=>p.kind==='design');
  const known=new Map(design.map(p=>[p.slug,p]));
  const {data,error}=await supabase.from('projects').select('id,slug,kind,technologies,demo_url');
  if(error)throw new Error(error.message);
  let changed=0;
  const generic=['brand identity','packaging','mockup','layout','coffee packaging','skincare','coffee branding','visualization','product visualization','graphic design','coffee cup','yogurt packaging'];
  for(const current of data||[]){
    const template=known.get(current.slug);
    if(!template||current.kind!=='design')continue;
    const updates:{technologies?:string[];demo_url?:null}={};
    const tags=Array.isArray(current.technologies)?current.technologies.map((v:string)=>v.trim().toLowerCase()):[];
    if(!tags.length||tags.every((tag:string)=>generic.includes(tag)))updates.technologies=template.technologies;
    if(typeof current.demo_url==='string'&&current.demo_url.includes('behance.net/'))updates.demo_url=null;
    if(!Object.keys(updates).length)continue;
    const response=await supabase.from('projects').update(updates).eq('id',current.id).select('id').single();
    if(response.error)throw new Error(`Không thể đồng bộ ${current.slug}: ${response.error.message}`);
    changed++;
  }
  return changed;
}
