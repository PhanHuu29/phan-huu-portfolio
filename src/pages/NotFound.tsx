import {Link} from 'react-router-dom';
import {useI18n} from '../i18n';
export default function NotFound(){const {t}=useI18n();return <div className="container inner-page not-found"><span className="eyebrow">{t('notFound.eyebrow')}</span><h1>{t('notFound.title')} <em>{t('notFound.accent')}</em></h1><Link className="inline-flex min-h-11 items-center rounded-xl border border-electric/40 bg-electric/10 px-5 py-3 text-ice transition-colors hover:bg-electric/20 focus-visible:outline-2 focus-visible:outline-electric" to="/">{t('notFound.home')}</Link></div>}
