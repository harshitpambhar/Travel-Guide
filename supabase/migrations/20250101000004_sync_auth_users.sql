-- Sync auth.users to public.users without storing passwords
-- Never store plaintext passwords. Supabase Auth manages credentials securely.

-- Ensure RLS is enabled and reasonable policies exist on public.users
alter table if exists public.users enable row level security;

drop policy if exists users_read_all on public.users;
create policy users_read_all
on public.users for select
to anon, authenticated
using (true);

drop policy if exists users_write_own on public.users;
create policy users_write_own
on public.users for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Function: insert/update public.users when a new auth user is created
create or replace function public.handle_auth_user_created()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do update set
    email = excluded.email,
    updated_at = now();

  -- Optionally ensure there is a profiles row as well (no-op if it exists)
  insert into public.profiles (user_id, profile_id)
  values (new.id, 'profile_' || floor(extract(epoch from now())*1000)::text)
  on conflict (user_id) do nothing;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_auth_user_created();

-- Function: keep email in sync if it changes on auth.users
create or replace function public.handle_auth_user_email_updated()
returns trigger as $$
begin
  update public.users
  set email = new.email,
      updated_at = now()
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_email_updated on auth.users;
create trigger on_auth_user_email_updated
after update of email on auth.users
for each row execute function public.handle_auth_user_email_updated();


