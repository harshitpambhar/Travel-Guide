-- Flights table
create table if not exists public.flights (
  id uuid primary key default gen_random_uuid(),
  flight_id text not null unique,
  airline text not null,
  departure_airport text not null,
  arrival_airport text not null,
  departure_time timestamptz not null,
  arrival_time timestamptz,
  price numeric(12,2) not null,
  currency text not null default 'USD',
  duration_minutes int,
  baggage_policy text,
  departure_city_id uuid references public.cities(id) on delete set null,
  arrival_city_id uuid references public.cities(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Updated at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists flights_set_updated_at on public.flights;
create trigger flights_set_updated_at
before update on public.flights
for each row execute function public.set_updated_at();

-- Enable RLS and policies
alter table public.flights enable row level security;

-- Read: allow everyone (including anon) to read flights
drop policy if exists "flights_read_all" on public.flights;
create policy "flights_read_all"
on public.flights for select
to anon, authenticated
using (true);

-- Write: restrict to authenticated users (you can tighten this to service role if needed)
drop policy if exists "flights_write_auth" on public.flights;
create policy "flights_write_auth"
on public.flights for all
to authenticated
using (true)
with check (true);


