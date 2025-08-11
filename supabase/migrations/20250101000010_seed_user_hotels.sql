-- Seed additional hotels provided by user

-- Ensure image_url exists
alter table if exists public.hotels add column if not exists image_url text;

-- Countries
insert into public.countries (name) values
('Japan'),
('France'),
('United Arab Emirates'),
('United Kingdom'),
('India'),
('Italy'),
('Australia'),
('China'),
('South Africa'),
('Thailand')
on conflict (name) do nothing;

-- Cities
insert into public.cities (name, country_id)
select 'Tokyo', id from public.countries where name='Japan'
on conflict (name, country_id) do nothing;

insert into public.cities (name, country_id)
select 'Paris', id from public.countries where name='France'
on conflict (name, country_id) do nothing;

insert into public.cities (name, country_id)
select 'Dubai', id from public.countries where name='United Arab Emirates'
on conflict (name, country_id) do nothing;

insert into public.cities (name, country_id)
select 'London', id from public.countries where name='United Kingdom'
on conflict (name, country_id) do nothing;

insert into public.cities (name, country_id)
select 'Mumbai', id from public.countries where name='India'
on conflict (name, country_id) do nothing;

insert into public.cities (name, country_id)
select 'Venice', id from public.countries where name='Italy'
on conflict (name, country_id) do nothing;

insert into public.cities (name, country_id)
select 'Sydney', id from public.countries where name='Australia'
on conflict (name, country_id) do nothing;

insert into public.cities (name, country_id)
select 'Shanghai', id from public.countries where name='China'
on conflict (name, country_id) do nothing;

insert into public.cities (name, country_id)
select 'Cape Town', id from public.countries where name='South Africa'
on conflict (name, country_id) do nothing;

insert into public.cities (name, country_id)
select 'Bangkok', id from public.countries where name='Thailand'
on conflict (name, country_id) do nothing;

-- Hotels
insert into public.hotels (name, price, address, location, rating, city_id, country_id, image_url)
select 'Park Hyatt Tokyo', '480', '3-7-1-2 Nishi Shinjuku, Shinjuku-Ku', 'Shinjuku, Tokyo', 4.7,
       (select id from public.cities where name='Tokyo' and country_id=(select id from public.countries where name='Japan')),
       (select id from public.countries where name='Japan'),
       'https://upload.wikimedia.org/wikipedia/commons/a/af/Park_Hyatt_Tokyo.jpg'
on conflict (name, address) do update set
  price = excluded.price,
  location = excluded.location,
  rating = excluded.rating,
  city_id = excluded.city_id,
  country_id = excluded.country_id,
  image_url = excluded.image_url,
  updated_at = now();

insert into public.hotels (name, price, address, location, rating, city_id, country_id, image_url)
select 'Hotel Le Meurice', '600', '228 Rue de Rivoli', '1st arrondissement, Paris', 4.8,
       (select id from public.cities where name='Paris' and country_id=(select id from public.countries where name='France')),
       (select id from public.countries where name='France'),
       'https://upload.wikimedia.org/wikipedia/commons/3/39/Le_Meurice_Paris.jpg'
on conflict (name, address) do update set
  price = excluded.price,
  location = excluded.location,
  rating = excluded.rating,
  city_id = excluded.city_id,
  country_id = excluded.country_id,
  image_url = excluded.image_url,
  updated_at = now();

insert into public.hotels (name, price, address, location, rating, city_id, country_id, image_url)
select 'Burj Al Arab', '1200', 'Jumeirah St', 'Jumeirah, Dubai', 4.9,
       (select id from public.cities where name='Dubai' and country_id=(select id from public.countries where name='United Arab Emirates')),
       (select id from public.countries where name='United Arab Emirates'),
       'https://upload.wikimedia.org/wikipedia/commons/9/97/Burj_Al_Arab_Hotel.jpg'
on conflict (name, address) do update set
  price = excluded.price,
  location = excluded.location,
  rating = excluded.rating,
  city_id = excluded.city_id,
  country_id = excluded.country_id,
  image_url = excluded.image_url,
  updated_at = now();

insert into public.hotels (name, price, address, location, rating, city_id, country_id, image_url)
select 'The Ritz London', '750', '150 Piccadilly', 'Westminster, London', 4.8,
       (select id from public.cities where name='London' and country_id=(select id from public.countries where name='United Kingdom')),
       (select id from public.countries where name='United Kingdom'),
       'https://upload.wikimedia.org/wikipedia/commons/5/59/The_Ritz_Hotel_London.jpg'
on conflict (name, address) do update set
  price = excluded.price,
  location = excluded.location,
  rating = excluded.rating,
  city_id = excluded.city_id,
  country_id = excluded.country_id,
  image_url = excluded.image_url,
  updated_at = now();

insert into public.hotels (name, price, address, location, rating, city_id, country_id, image_url)
select 'The Taj Mahal Palace', '400', 'Apollo Bandar, Colaba', 'Colaba, Mumbai', 4.8,
       (select id from public.cities where name='Mumbai' and country_id=(select id from public.countries where name='India')),
       (select id from public.countries where name='India'),
       'https://upload.wikimedia.org/wikipedia/commons/1/12/Taj_Mahal_Palace_Mumbai.jpg'
on conflict (name, address) do update set
  price = excluded.price,
  location = excluded.location,
  rating = excluded.rating,
  city_id = excluded.city_id,
  country_id = excluded.country_id,
  image_url = excluded.image_url,
  updated_at = now();

insert into public.hotels (name, price, address, location, rating, city_id, country_id, image_url)
select 'Hotel Danieli', '620', 'Riva degli Schiavoni, 4196', 'Castello, Venice', 4.7,
       (select id from public.cities where name='Venice' and country_id=(select id from public.countries where name='Italy')),
       (select id from public.countries where name='Italy'),
       'https://upload.wikimedia.org/wikipedia/commons/7/7b/Hotel_Danieli_Venice.jpg'
on conflict (name, address) do update set
  price = excluded.price,
  location = excluded.location,
  rating = excluded.rating,
  city_id = excluded.city_id,
  country_id = excluded.country_id,
  image_url = excluded.image_url,
  updated_at = now();

insert into public.hotels (name, price, address, location, rating, city_id, country_id, image_url)
select 'Park Hyatt Sydney', '700', '7 Hickson Rd', 'The Rocks, Sydney', 4.8,
       (select id from public.cities where name='Sydney' and country_id=(select id from public.countries where name='Australia')),
       (select id from public.countries where name='Australia'),
       'https://upload.wikimedia.org/wikipedia/commons/1/15/Park_Hyatt_Sydney.jpg'
on conflict (name, address) do update set
  price = excluded.price,
  location = excluded.location,
  rating = excluded.rating,
  city_id = excluded.city_id,
  country_id = excluded.country_id,
  image_url = excluded.image_url,
  updated_at = now();

insert into public.hotels (name, price, address, location, rating, city_id, country_id, image_url)
select 'The Peninsula Shanghai', '580', '32 Zhongshan East 1st Rd', 'Huangpu, Shanghai', 4.8,
       (select id from public.cities where name='Shanghai' and country_id=(select id from public.countries where name='China')),
       (select id from public.countries where name='China'),
       'https://upload.wikimedia.org/wikipedia/commons/8/88/Peninsula_Shanghai.jpg'
on conflict (name, address) do update set
  price = excluded.price,
  location = excluded.location,
  rating = excluded.rating,
  city_id = excluded.city_id,
  country_id = excluded.country_id,
  image_url = excluded.image_url,
  updated_at = now();

insert into public.hotels (name, price, address, location, rating, city_id, country_id, image_url)
select 'One&Only Cape Town', '500', 'Dock Road, V&A Waterfront', 'Waterfront, Cape Town', 4.7,
       (select id from public.cities where name='Cape Town' and country_id=(select id from public.countries where name='South Africa')),
       (select id from public.countries where name='South Africa'),
       'https://upload.wikimedia.org/wikipedia/commons/3/34/One_and_Only_Cape_Town.jpg'
on conflict (name, address) do update set
  price = excluded.price,
  location = excluded.location,
  rating = excluded.rating,
  city_id = excluded.city_id,
  country_id = excluded.country_id,
  image_url = excluded.image_url,
  updated_at = now();

insert into public.hotels (name, price, address, location, rating, city_id, country_id, image_url)
select 'Mandarin Oriental Bangkok', '430', '48 Oriental Ave', 'Bang Rak, Bangkok', 4.9,
       (select id from public.cities where name='Bangkok' and country_id=(select id from public.countries where name='Thailand')),
       (select id from public.countries where name='Thailand'),
       'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mandarin_Oriental_Bangkok.jpg'
on conflict (name, address) do update set
  price = excluded.price,
  location = excluded.location,
  rating = excluded.rating,
  city_id = excluded.city_id,
  country_id = excluded.country_id,
  image_url = excluded.image_url,
  updated_at = now();


