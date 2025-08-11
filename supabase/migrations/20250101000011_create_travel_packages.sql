-- Create travel_packages table
create table if not exists public.travel_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  destinations text[] not null default '{}',
  start_date date not null,
  end_date date not null,
  days int not null,
  available_slots int not null default 0,
  itinerary jsonb not null default '[]', -- array of { day, title, description?, locationName?, lat?, lng? }
  price numeric(12,2) not null,
  images text[] not null default '{}',
  popularity int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Updated at trigger reuse
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists travel_packages_set_updated_at on public.travel_packages;
create trigger travel_packages_set_updated_at
before update on public.travel_packages
for each row execute function public.set_updated_at();

-- RLS and policies
alter table public.travel_packages enable row level security;

drop policy if exists travel_packages_read_all on public.travel_packages;
create policy travel_packages_read_all
on public.travel_packages for select
to anon, authenticated
using (true);

drop policy if exists travel_packages_write_auth on public.travel_packages;
create policy travel_packages_write_auth
on public.travel_packages for all
to authenticated
using (true)
with check (true);


