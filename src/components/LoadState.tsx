import {useI18n} from '../i18n';
export default function LoadState({error,loading}:{error?:string|null,loading?:boolean}) {const {t}=useI18n();if(loading)return <div className="container pad-block message">{t('loading.projects')}</div>; if(error)return <div className="container pad-block message error-message">{t('loading.error')} {error}</div>;return null;}
