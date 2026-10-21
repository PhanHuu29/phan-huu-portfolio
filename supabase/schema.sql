-- CREATIVE PORTFOLIO | Supabase SQL Editor | Run once on a new project.
-- IMPORTANT: Only grant administrator privileges to user IDs you explicitly trust.
create extension if not exists pgcrypto;

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(trim(title)) > 0),
  subtitle text not null default '',
  description text not null default '',
  category text not null default 'Other',
  kind text not null default 'development' check (kind in ('development', 'design')),
  year integer not null default extract(year from now())::integer check (year between 1990 and 2100),
  client text not null default '',
  role text not null default '',
  technologies text[] not null default '{}'::text[],
  translations jsonb not null default '{}'::jsonb check (jsonb_typeof(translations) = 'object'),
  cover_url text,
  media_urls text[] not null default '{}'::text[],
  demo_url text,
  github_url text,
  accent text not null default '#89b5ff' check (accent ~ '^#[0-9a-fA-F]{6}$'),
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_portfolio_projects_listing on public.projects (status, sort_order, created_at desc);

create or replace function public.portfolio_is_admin()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists(select 1 from public.portfolio_admins where user_id = (select auth.uid()));
$$;
revoke all on function public.portfolio_is_admin() from public;
grant execute on function public.portfolio_is_admin() to authenticated;

-- Backward-compatible RPC name used by the React code.
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select public.portfolio_is_admin();
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create or replace function public.portfolio_touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
drop trigger if exists trg_portfolio_updated_at on public.projects;
create trigger trg_portfolio_updated_at before update on public.projects
for each row execute function public.portfolio_touch_updated_at();

alter table public.portfolio_admins enable row level security;
alter table public.projects enable row level security;
-- No client insert/update/delete policy on portfolio_admins: admin grants are SQL-only.
drop policy if exists "Self can read admin membership" on public.portfolio_admins;
create policy "Self can read admin membership" on public.portfolio_admins for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Visitors can read published projects" on public.projects;
create policy "Visitors can read published projects" on public.projects for select to anon, authenticated
using (status = 'published');
drop policy if exists "Admins can read all projects" on public.projects;
create policy "Admins can read all projects" on public.projects for select to authenticated
using ((select public.is_admin()));
drop policy if exists "Only admins can add projects" on public.projects;
create policy "Only admins can add projects" on public.projects for insert to authenticated
with check ((select public.is_admin()));
drop policy if exists "Only admins can edit projects" on public.projects;
create policy "Only admins can edit projects" on public.projects for update to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "Only admins can delete projects" on public.projects;
create policy "Only admins can delete projects" on public.projects for delete to authenticated
using ((select public.is_admin()));

-- Explicit API grants. RLS still decides which individual rows can be read or changed.
grant usage on schema public to anon, authenticated;
grant select on public.projects to anon;
grant select, insert, update, delete on public.projects to authenticated;
grant select on public.portfolio_admins to authenticated;

-- Supabase Storage: public display, authenticated admin-only upload/edit/delete.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('project-media','project-media',true,52428800, array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml','image/avif','video/mp4','video/webm'])
on conflict (id) do update set public = true, file_size_limit=excluded.file_size_limit, allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "Portfolio admins can upload media" on storage.objects;
create policy "Portfolio admins can upload media" on storage.objects for insert to authenticated
with check (bucket_id = 'project-media' and name like 'projects/%' and (select public.is_admin()));
drop policy if exists "Portfolio admins can modify media" on storage.objects;
create policy "Portfolio admins can modify media" on storage.objects for update to authenticated
using (bucket_id = 'project-media' and (select public.is_admin()))
with check (bucket_id = 'project-media' and (select public.is_admin()));
drop policy if exists "Portfolio admins can delete media" on storage.objects;
create policy "Portfolio admins can delete media" on storage.objects for delete to authenticated
using (bucket_id = 'project-media' and (select public.is_admin()));

-- AFTER creating a user manually in Supabase > Authentication > Users:
-- insert into public.portfolio_admins (user_id)
-- values ('YOUR-USER-UUID-HERE');
-- Never expose the service_role key in VITE_* variables or commit it to git.
