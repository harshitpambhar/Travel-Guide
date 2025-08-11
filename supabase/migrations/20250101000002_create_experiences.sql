-- Experiences table
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  experience_id text not null unique,
  name text not null,
  description text,
  location text not null,
  price numeric(12,2) not null,
  currency text not null default 'USD',
  type text not null,
  rating numeric(3,2),
  city_id uuid references public.cities(id) on delete set null,
  country_id uuid references public.countries(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Updated at trigger
drop trigger if exists experiences_set_updated_at on public.experiences;
create trigger experiences_set_updated_at
before update on public.experiences
for each row execute function public.set_updated_at();

-- RLS
alter table public.experiences enable row level security;

drop policy if exists "experiences_read_all" on public.experiences;
create policy "experiences_read_all"
on public.experiences for select
to anon, authenticated
using (true);

drop policy if exists "experiences_write_auth" on public.experiences;
create policy "experiences_write_auth"
on public.experiences for all
to authenticated
using (true)
with check (true);


