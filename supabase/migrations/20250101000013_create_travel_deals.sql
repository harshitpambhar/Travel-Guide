-- Create travel_deals table for Deals page
create table if not exists public.travel_deals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  image_url text,
  original_price numeric(12,2) not null,
  discounted_price numeric(12,2) not null,
  discount int generated always as ((case when original_price > 0 then round(((original_price - discounted_price) / original_price) * 100)::int else 0 end)) stored,
  valid_until date not null,
  category text,
  rating numeric(3,2),
  review_count int,
  features text[] not null default '{}',
  is_flash_sale boolean not null default false,
  is_exclusive boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists travel_deals_set_updated_at on public.travel_deals;
create trigger travel_deals_set_updated_at
before update on public.travel_deals
for each row execute function public.set_updated_at();

alter table public.travel_deals enable row level security;

drop policy if exists travel_deals_read_all on public.travel_deals;
create policy travel_deals_read_all
on public.travel_deals for select
to anon, authenticated
using (true);

drop policy if exists travel_deals_write_auth on public.travel_deals;
create policy travel_deals_write_auth
on public.travel_deals for all
to authenticated
using (true)
with check (true);


