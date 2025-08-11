-- Seed minimal countries, cities, and hotels data

-- Countries
insert into public.countries (name)
values ('Singapore')
on conflict (name) do nothing;

insert into public.countries (name)
values ('United States')
on conflict (name) do nothing;

-- Cities
insert into public.cities (name, country_id)
select 'Singapore', c.id from public.countries c where c.name = 'Singapore'
on conflict (name, country_id) do nothing;

insert into public.cities (name, country_id)
select 'New York', c.id from public.countries c where c.name = 'United States'
on conflict (name, country_id) do nothing;

-- Hotels (Singapore)
insert into public.hotels (name, price, address, location, rating, city_id, country_id)
select
  'Marina Bay Sands', '450', '10 Bayfront Ave', 'Marina Bay, Singapore', 4.8,
  (select id from public.cities where name='Singapore' and country_id=(select id from public.countries where name='Singapore')),
  (select id from public.countries where name='Singapore')
on conflict (name, address) do nothing;

insert into public.hotels (name, price, address, location, rating, city_id, country_id)
select
  'Raffles Hotel Singapore', '850', '1 Beach Rd', 'Beach Road, Singapore', 4.9,
  (select id from public.cities where name='Singapore' and country_id=(select id from public.countries where name='Singapore')),
  (select id from public.countries where name='Singapore')
on conflict (name, address) do nothing;

insert into public.hotels (name, price, address, location, rating, city_id, country_id)
select
  'The Fullerton Hotel', '380', '1 Fullerton Square', 'Fullerton Road, Singapore', 4.7,
  (select id from public.cities where name='Singapore' and country_id=(select id from public.countries where name='Singapore')),
  (select id from public.countries where name='Singapore')
on conflict (name, address) do nothing;

-- Hotels (New York, USA)
insert into public.hotels (name, price, address, location, rating, city_id, country_id)
select
  'The Plaza', '520', '768 5th Ave', 'Manhattan, New York', 4.6,
  (select id from public.cities where name='New York' and country_id=(select id from public.countries where name='United States')),
  (select id from public.countries where name='United States')
on conflict (name, address) do nothing;

insert into public.hotels (name, price, address, location, rating, city_id, country_id)
select
  'The Ritz-Carlton New York, Central Park', '650', '50 Central Park S', 'Manhattan, New York', 4.8,
  (select id from public.cities where name='New York' and country_id=(select id from public.countries where name='United States')),
  (select id from public.countries where name='United States')
on conflict (name, address) do nothing;


