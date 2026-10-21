/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_SITE_EMAIL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv; }
