-- Vivienne Shork — one paste for a new project
-- SQL Editor → Run. Creates letters, RLS, then reloads the PostgREST schema cache.

create table if not exists public.letters (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text unique not null,
  body text not null default '',
  published boolean not null default false,
  sort_order int not null,
  written_at date null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists letters_set_updated_at on public.letters;
create trigger letters_set_updated_at
  before update on public.letters
  for each row
  execute function public.set_updated_at();

alter table public.letters enable row level security;

revoke all on table public.letters from anon, authenticated, public;
grant select on table public.letters to anon;
grant select, insert, update, delete on table public.letters to authenticated;

drop policy if exists letters_anon_select_published on public.letters;
create policy letters_anon_select_published
  on public.letters
  for select
  to anon
  using (published = true);

drop policy if exists letters_authenticated_select on public.letters;
create policy letters_authenticated_select
  on public.letters
  for select
  to authenticated
  using (true);

drop policy if exists letters_authenticated_insert on public.letters;
create policy letters_authenticated_insert
  on public.letters
  for insert
  to authenticated
  with check (true);

drop policy if exists letters_authenticated_update on public.letters;
create policy letters_authenticated_update
  on public.letters
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists letters_authenticated_delete on public.letters;
create policy letters_authenticated_delete
  on public.letters
  for delete
  to authenticated
  using (true);

notify pgrst, 'reload schema';
