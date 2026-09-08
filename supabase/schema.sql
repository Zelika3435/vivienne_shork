-- Vivienne Shork — letters table
-- Run this first in the Supabase SQL editor, then rls.sql.
-- One prompt = one letter. No feelings table, no joins.

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

-- Lock the table until policies in rls.sql are applied.
-- With RLS on and no policies, anon/authenticated see nothing.
alter table public.letters enable row level security;
