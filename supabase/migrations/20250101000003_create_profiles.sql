-- Profiles table linking to auth.users
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  username text unique,
  home_currency text default 'USD',
  travel_preferences jsonb default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Updated at trigger
drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;

-- Read own profile, admins can expand later. For now, all can read to simplify public profile viewing
drop policy if exists "profiles_read_all" on public.profiles;
create policy "profiles_read_all"
on public.profiles for select
to anon, authenticated
using (true);

-- Insert/update/delete only by the owner
drop policy if exists "profiles_write_own" on public.profiles;
create policy "profiles_write_own"
on public.profiles for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);


