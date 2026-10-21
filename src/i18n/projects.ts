import type {Project} from '../lib/types';
import type {Locale} from './index';

/** Project media/slug/tech remain language-neutral; editorial strings can be translated per locale. */
export function localizedProject(project:Project, language:Locale):Project {
  const translations=project.translations?.[language];
  if(!translations && language!=='vi')return project;
  return {
    ...project,
    title:translations?.title?.trim() || project.title,
    subtitle:translations?.subtitle?.trim() || project.subtitle,
    description:translations?.description?.trim() || project.description,
    category:translations?.category?.trim() || project.category,
    role:translations?.role?.trim() || project.role,
    client:translations?.client?.trim() || (language==='vi'&&project.client==='Personal portfolio'?'Dự án cá nhân':project.client),
  };
}
