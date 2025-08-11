-- Ensure idempotency for seeding these deals
create unique index if not exists travel_deals_unique_title_location
  on public.travel_deals (title, location);

insert into public.travel_deals
  (title, description, location, image_url, original_price, discounted_price, valid_until, category, rating, review_count, features, is_flash_sale, is_exclusive)
values
  ('Swiss Alps Winter Retreat','7D6N luxury chalet with mountain view','Zermatt, Switzerland','https://images.unsplash.com/photo-1602331736760-b8f3e0df64f4',4500,3499,'2025-11-15','Luxury',4.8,5243,array['Ski Pass Included','Private Chef'],true,true),
  ('Tokyo Urban Adventure','5D4N city tour with luxury hotel stay','Tokyo, Japan','https://images.unsplash.com/photo-1505068279271-eddc7a2a73a0',2200,1699,'2025-09-30','City Escape',4.7,8142,array['Guided Tours','Free Airport Transfer'],false,true),
  ('Bali Beachfront Bliss','6D5N luxury beachfront villa','Bali, Indonesia','https://images.unsplash.com/photo-1507525428034-b723cf961d3e',3000,2399,'2025-10-25','Beach',4.9,9345,array['Private Pool','All Meals Included'],true,false),
  ('Santorini Romantic Getaway','4D3N cliffside suite with caldera view','Santorini, Greece','https://images.unsplash.com/photo-1505731132164-cca6021fcd81',2600,1999,'2025-09-15','Romantic',4.8,6721,array['Sunset Cruise','Breakfast Included'],false,true),
  ('Kenya Safari Expedition','8D7N luxury safari lodge experience','Maasai Mara, Kenya','https://images.unsplash.com/photo-1597872200969-18d9235c05a6',5000,3999,'2025-12-10','Adventure',4.9,4876,array['Daily Game Drives','All Meals Included'],true,false)
on conflict (title, location) do update set
  description = excluded.description,
  image_url = excluded.image_url,
  original_price = excluded.original_price,
  discounted_price = excluded.discounted_price,
  valid_until = excluded.valid_until,
  category = excluded.category,
  rating = excluded.rating,
  review_count = excluded.review_count,
  features = excluded.features,
  is_flash_sale = excluded.is_flash_sale,
  is_exclusive = excluded.is_exclusive,
  updated_at = now();


