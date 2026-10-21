import {useEffect,useState} from 'react';
import {getProjects} from './projects';
import type {Project} from './types';
export function useProjects(includeDrafts=false){const [projects,setProjects]=useState<Project[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');const [refreshKey,setRefreshKey]=useState(0);
 useEffect(()=>{let alive=true;setLoading(true);setError('');getProjects(includeDrafts).then(p=>{if(alive)setProjects(p)}).catch((e:Error)=>{if(alive)setError(e.message)}).finally(()=>{if(alive)setLoading(false)});return ()=>{alive=false}},[includeDrafts,refreshKey]);
 return {projects,loading,error,refresh:()=>setRefreshKey(k=>k+1)};
}
