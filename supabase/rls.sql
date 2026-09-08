-- Vivienne Shork — row level security
-- Run after schema.sql.
-- Anon: published rows only. Authenticated: full CRUD. No anon writes.

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
