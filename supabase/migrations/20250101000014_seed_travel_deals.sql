-- Seed initial travel deals
insert into public.travel_deals
  (title, description, location, image_url, original_price, discounted_price, valid_until, category, rating, review_count, features, is_flash_sale, is_exclusive)
values
  ('Singapore Staycation Package','3D2N at Marina Bay Sands with breakfast and city tour','Singapore','https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&h=600&fit=crop',1200,799,'2025-12-15','Hotels',4.8,15420,array['Free Breakfast','City Tour','Spa Credit','Late Checkout'],true,true),
  ('Bali Adventure Bundle','5D4N adventure package with temple visits and water sports','Bali, Indonesia','https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900&h=600&fit=crop',850,599,'2025-12-20','Adventure',4.7,8923,array['Temple Tours','Water Sports','Local Guide','Airport Transfer'],false,false),
  ('Tokyo Food & Culture Experience','4D3N culinary journey through Tokyo''s best restaurants','Tokyo, Japan','https://images.unsplash.com/photo-1554797589-7241bb691973?w=900&h=600&fit=crop',1100,749,'2025-12-28','Food Tours',4.9,6789,array['Michelin Restaurants','Cooking Class','Market Tour','Sake Tasting'],true,true);


