import {supabase} from './supabase';
export async function checkAdmin(): Promise<boolean> {
  if(!supabase) return false;
  const {data: {user},error: userError} = await supabase.auth.getUser();
  if(userError || !user) return false;
  const {data,error} = await supabase.rpc('is_admin');
  if(error) throw new Error(error.message);
  return data === true;
}
