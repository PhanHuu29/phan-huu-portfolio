import {supabase, configured} from './supabase';
import {demoProjects} from '../data/demo';
import type {Project, ProjectInput} from './types';
const fields = '*';
export async function getProjects(includeDrafts = false): Promise<Project[]> {
  if (!configured || !supabase) return includeDrafts ? [] : demoProjects;
  let query = supabase.from('projects').select(fields).order('sort_order',{ascending:true}).order('created_at',{ascending:false});
  if (!includeDrafts) query = query.eq('status','published');
  const {data,error} = await query;
  if(error) throw new Error(error.message);
  return (data || []) as Project[];
}
export async function getProject(slug: string): Promise<Project | null> {
  if (!configured || !supabase) return demoProjects.find(p=>p.slug===slug) || null;
  const {data,error} = await supabase.from('projects').select(fields).eq('slug',slug).eq('status','published').maybeSingle();
  if(error) throw new Error(error.message);
  return data as Project | null;
}
export async function getProjectForEdit(id: string): Promise<Project> {
  if(!supabase) throw new Error('Supabase chưa được cấu hình.');
  const {data,error} = await supabase.from('projects').select(fields).eq('id',id).single();
  if(error) throw new Error(error.message);
  return data as Project;
}
export async function saveProject(input: ProjectInput,id?: string): Promise<void> {
  if(!supabase) throw new Error('Supabase chưa được cấu hình.');
  const result = id ? await supabase.from('projects').update(input).eq('id',id).select('id').single() : await supabase.from('projects').insert(input).select('id').single();
  if(result.error) throw new Error(result.error.message);
}
export async function deleteProject(id: string): Promise<void> {
  if(!supabase) throw new Error('Supabase chưa được cấu hình.');
  const {data,error} = await supabase.from('projects').delete().eq('id',id).select('id').single();
  if(error) throw new Error(error.message);
  if(!data) throw new Error('Không thể xác nhận thao tác xóa.');
}
export async function uploadMedia(file:File):Promise<string> {
  if(!supabase) throw new Error('Supabase chưa được cấu hình.');
  if(!file.type.startsWith('image/') && !file.type.startsWith('video/')) throw new Error('Chỉ chấp nhận ảnh hoặc video.');
  if(file.size > 50*1024*1024) throw new Error('Tập tin tối đa 50 MB (tùy giới hạn Storage).');
  const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g,'') || 'bin';
  const path = `projects/${crypto.randomUUID()}.${ext}`;
  const {error} = await supabase.storage.from('project-media').upload(path,file,{contentType:file.type,upsert:false});
  if(error) throw new Error(error.message);
  const {data} = supabase.storage.from('project-media').getPublicUrl(path);
  return data.publicUrl;
}
