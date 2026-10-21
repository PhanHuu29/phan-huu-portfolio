import {useEffect,useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {checkAdmin} from '../lib/auth';
import {configured,supabase} from '../lib/supabase';
export default function AdminGuard(){const [state,setState]=useState<'checking'|'allowed'|'denied'>('checking');const [error,setError]=useState('');const loc=useLocation();
 useEffect(()=>{let active=true;const check=()=>{checkAdmin().then(yes=>{if(active)setState(yes?'allowed':'denied')}).catch((e:Error)=>{if(active){setError(e.message);setState('denied')}})};check();const {data:subscription}=supabase?.auth.onAuthStateChange(()=>{setTimeout(check,0)})||{data:null};return()=>{active=false;subscription?.subscription?.unsubscribe()}},[]);
 if(!configured)return <div className="admin-center"><h2>Supabase chưa kết nối</h2><p>Đọc file README.md và thiết lập VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.</p></div>;
 if(state==='checking')return <div className="admin-center">Đang kiểm tra quyền quản trị...</div>;
 if(state==='denied')return error?<div className="admin-center"><h2>Không xác minh được quyền</h2><p>{error}</p><a href="/admin/login">Đăng nhập lại</a></div>:<Navigate to="/admin/login" state={{from:loc.pathname}} replace/>;
 return <Outlet/>;
}
