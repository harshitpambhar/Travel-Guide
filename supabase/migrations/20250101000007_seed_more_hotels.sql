-- Seed additional hotels for existing cities to increase listings

-- Ensure countries and cities exist (no-ops if already present)
insert into public.countries (name) values ('Singapore') on conflict (name) do nothing;
insert into public.countries (name) values ('United States') on conflict (name) do nothing;

insert into public.cities (name, country_id)
select 'Singapore', c.id from public.countries c where c.name = 'Singapore'
on conflict (name, country_id) do nothing;

insert into public.cities (name, country_id)
select 'New York', c.id from public.countries c where c.name = 'United States'
on conflict (name, country_id) do nothing;

-- Singapore: more hotels
insert into public.hotels (name, price, address, location, rating, city_id, country_id)
select 'Shangri-La Singapore', '420', '22 Orange Grove Rd', 'Orchard, Singapore', 4.8,
       (select id from public.cities where name='Singapore' and country_id=(select id from public.countries where name='Singapore')),
       (select id from public.countries where name='Singapore')
on conflict (name, address) do nothing;

insert into public.hotels (name, price, address, location, rating, city_id, country_id)
select 'The St. Regis Singapore', '500', '29 Tanglin Rd', 'Orchard, Singapore', 4.7,
       (select id from public.cities where name='Singapore' and country_id=(select id from public.countries where name='Singapore')),
       (select id from public.countries where name='Singapore')
on conflict (name, address) do nothing;

insert into public.hotels (name, price, address, location, rating, city_id, country_id)
select 'Mandarin Oriental, Singapore', '460', '5 Raffles Ave', 'Marina Bay, Singapore', 4.6,
       (select id from public.cities where name='Singapore' and country_id=(select id from public.countries where name='Singapore')),
       (select id from public.countries where name='Singapore')
on conflict (name, address) do nothing;

-- New York: more hotels
insert into public.hotels (name, price, address, location, rating, city_id, country_id)
select 'Four Seasons Hotel New York Downtown', '620', '27 Barclay St', 'Manhattan, New York', 4.7,
       (select id from public.cities where name='New York' and country_id=(select id from public.countries where name='United States')),
       (select id from public.countries where name='United States')
on conflict (name, address) do nothing;

insert into public.hotels (name, price, address, location, rating, city_id, country_id)
select 'The Langham, New York, Fifth Avenue', '540', '400 5th Ave', 'Manhattan, New York', 4.6,
       (select id from public.cities where name='New York' and country_id=(select id from public.countries where name='United States')),
       (select id from public.countries where name='United States')
on conflict (name, address) do nothing;

insert into public.hotels (name, price, address, location, rating, city_id, country_id)
select 'Conrad New York Midtown', '480', '151 W 54th St', 'Manhattan, New York', 4.5,
       (select id from public.cities where name='New York' and country_id=(select id from public.countries where name='United States')),
       (select id from public.countries where name='United States')
on conflict (name, address) do nothing;


