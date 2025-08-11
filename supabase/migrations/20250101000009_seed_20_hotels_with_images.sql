-- Ensure base data exists
insert into public.countries (name) values ('Singapore') on conflict (name) do nothing;
insert into public.countries (name) values ('United States') on conflict (name) do nothing;
insert into public.countries (name) values ('Japan') on conflict (name) do nothing;
insert into public.countries (name) values ('France') on conflict (name) do nothing;

insert into public.cities (name, country_id)
select 'Singapore', id from public.countries where name='Singapore'
on conflict (name, country_id) do nothing;
insert into public.cities (name, country_id)
select 'New York', id from public.countries where name='United States'
on conflict (name, country_id) do nothing;
insert into public.cities (name, country_id)
select 'Tokyo', id from public.countries where name='Japan'
on conflict (name, country_id) do nothing;
insert into public.cities (name, country_id)
select 'Paris', id from public.countries where name='France'
on conflict (name, country_id) do nothing;

-- Helper selects
with ids as (
  select
    (select id from public.countries where name='Singapore') as sg_country,
    (select id from public.cities where name='Singapore' and country_id=(select id from public.countries where name='Singapore')) as sg_city,
    (select id from public.countries where name='United States') as us_country,
    (select id from public.cities where name='New York' and country_id=(select id from public.countries where name='United States')) as nyc_city,
    (select id from public.countries where name='Japan') as jp_country,
    (select id from public.cities where name='Tokyo' and country_id=(select id from public.countries where name='Japan')) as tokyo_city,
    (select id from public.countries where name='France') as fr_country,
    (select id from public.cities where name='Paris' and country_id=(select id from public.countries where name='France')) as paris_city
)
-- Insert hotels across 4 cities, ensuring up to 20 unique entries
insert into public.hotels (name, price, address, location, rating, city_id, country_id, image_url)
select name, price, address, location, rating, city_id, country_id, image_url from (
  values
  -- Singapore (5)
  ('Marina Bay Sands', '450', '10 Bayfront Ave', 'Marina Bay, Singapore', 4.8,
    (select sg_city from ids), (select sg_country from ids), 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&auto=format&fit=crop'),
  ('Raffles Hotel Singapore', '850', '1 Beach Rd', 'Beach Road, Singapore', 4.9,
    (select sg_city from ids), (select sg_country from ids), 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80&auto=format&fit=crop'),
  ('The Fullerton Hotel', '380', '1 Fullerton Square', 'Fullerton Road, Singapore', 4.7,
    (select sg_city from ids), (select sg_country from ids), 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80&auto=format&fit=crop'),
  ('Shangri-La Singapore', '420', '22 Orange Grove Rd', 'Orchard, Singapore', 4.8,
    (select sg_city from ids), (select sg_country from ids), 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&q=80&auto=format&fit=crop'),
  ('The St. Regis Singapore', '500', '29 Tanglin Rd', 'Orchard, Singapore', 4.7,
    (select sg_city from ids), (select sg_country from ids), 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80&auto=format&fit=crop'),

  -- New York (5)
  ('The Plaza', '520', '768 5th Ave', 'Manhattan, New York', 4.6,
    (select nyc_city from ids), (select us_country from ids), 'https://images.unsplash.com/photo-1551776235-dde6d4829808?w=900&q=80&auto=format&fit=crop'),
  ('The Ritz-Carlton New York, Central Park', '650', '50 Central Park S', 'Manhattan, New York', 4.8,
    (select nyc_city from ids), (select us_country from ids), 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=80&auto=format&fit=crop'),
  ('Four Seasons Hotel New York Downtown', '620', '27 Barclay St', 'Manhattan, New York', 4.7,
    (select nyc_city from ids), (select us_country from ids), 'https://images.unsplash.com/photo-1541976076758-347942db1970?w=900&q=80&auto=format&fit=crop'),
  ('The Langham, New York, Fifth Avenue', '540', '400 5th Ave', 'Manhattan, New York', 4.6,
    (select nyc_city from ids), (select us_country from ids), 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&auto=format&fit=crop'),
  ('Conrad New York Midtown', '480', '151 W 54th St', 'Manhattan, New York', 4.5,
    (select nyc_city from ids), (select us_country from ids), 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=80&auto=format&fit=crop'),

  -- Tokyo (5)
  ('Park Hyatt Tokyo', '600', '3-7-1-2 Nishi Shinjuku', 'Shinjuku, Tokyo', 4.8,
    (select tokyo_city from ids), (select jp_country from ids), 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=900&q=80&auto=format&fit=crop'),
  ('The Ritz-Carlton, Tokyo', '680', 'Tokyo Midtown 9-7-1 Akasaka', 'Akasaka, Tokyo', 4.9,
    (select tokyo_city from ids), (select jp_country from ids), 'https://images.unsplash.com/photo-1551776235-dde6d4829808?w=900&q=80&auto=format&fit=crop'),
  ('Mandarin Oriental, Tokyo', '640', '2-1-1 Nihonbashi Muromachi', 'Nihonbashi, Tokyo', 4.7,
    (select tokyo_city from ids), (select jp_country from ids), 'https://images.unsplash.com/photo-1512914890250-89c3f0b2c6f3?w=900&q=80&auto=format&fit=crop'),
  ('Shangri-La Hotel, Tokyo', '620', '1-8-3 Marunouchi', 'Marunouchi, Tokyo', 4.7,
    (select tokyo_city from ids), (select jp_country from ids), 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&q=80&auto=format&fit=crop'),
  ('The Prince Park Tower Tokyo', '380', '4-8-1 Shibakoen', 'Minato, Tokyo', 4.5,
    (select tokyo_city from ids), (select jp_country from ids), 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80&auto=format&fit=crop'),

  -- Paris (5)
  ('Ritz Paris', '700', '15 Place Vendôme', '1st arrondissement, Paris', 4.9,
    (select paris_city from ids), (select fr_country from ids), 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=80&auto=format&fit=crop'),
  ('Le Meurice', '680', '228 Rue de Rivoli', '1st arrondissement, Paris', 4.8,
    (select paris_city from ids), (select fr_country from ids), 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80&auto=format&fit=crop'),
  ('Hotel Plaza Athénée', '650', '25 Avenue Montaigne', '8th arrondissement, Paris', 4.7,
    (select paris_city from ids), (select fr_country from ids), 'https://images.unsplash.com/photo-1541976076758-347942db1970?w=900&q=80&auto=format&fit=crop'),
  ('Shangri-La Hotel, Paris', '630', '10 Avenue d''Iéna', '16th arrondissement, Paris', 4.7,
    (select paris_city from ids), (select fr_country from ids), 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=80&auto=format&fit=crop'),
  ('Mandarin Oriental, Paris', '620', '251 Rue Saint-Honoré', '1st arrondissement, Paris', 4.6,
    (select paris_city from ids), (select fr_country from ids), 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&auto=format&fit=crop')
) as t(name, price, address, location, rating, city_id, country_id, image_url)
on conflict (name, address) do update set
  price = excluded.price,
  location = excluded.location,
  rating = excluded.rating,
  city_id = excluded.city_id,
  country_id = excluded.country_id,
  image_url = excluded.image_url,
  updated_at = now();


