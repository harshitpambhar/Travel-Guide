-- Seed a few example travel packages
insert into public.travel_packages
  (name, destinations, start_date, end_date, days, available_slots, itinerary, price, images, popularity)
values
  (
    'Classic Japan: Tokyo, Kyoto & Osaka',
    array['Tokyo','Kyoto','Osaka'],
    '2025-10-05','2025-10-14',
    10, 14,
    '[
      {"day":1,"title":"Arrival in Tokyo","description":"Airport transfer, check-in, Shibuya Crossing","locationName":"Tokyo","lat":35.6762,"lng":139.6503},
      {"day":2,"title":"Asakusa & Skytree","description":"Senso-ji Temple, Nakamise shopping street"},
      {"day":3,"title":"Nikko Day Trip","description":"UNESCO shrines and nature"},
      {"day":4,"title":"Bullet Train to Kyoto","description":"Fushimi Inari, Gion district","locationName":"Kyoto","lat":35.0116,"lng":135.7681},
      {"day":5,"title":"Arashiyama & Kinkaku-ji","description":"Bamboo grove, Golden Pavilion"},
      {"day":6,"title":"Nara Excursion","description":"Todai-ji, Nara Deer Park"},
      {"day":7,"title":"Osaka Arrival","description":"Dotonbori food crawl","locationName":"Osaka","lat":34.6937,"lng":135.5023},
      {"day":8,"title":"Universal Studios Japan","description":"Theme park day"},
      {"day":9,"title":"Osaka Castle & Umeda Sky","description":"City highlights"},
      {"day":10,"title":"Departure","description":"Airport transfer"}
    ]'::jsonb,
    1899.00,
    array['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&h=800&fit=crop'],
    975
  ),
  (
    'Bali Bliss: Temples, Beaches & Ubud',
    array['Ubud','Uluwatu','Seminyak'],
    '2025-07-12','2025-07-18',
    7, 24,
    '[
      {"day":1,"title":"Arrive in Bali","description":"Transfer to Ubud","locationName":"Ubud","lat":-8.5069,"lng":115.2625},
      {"day":2,"title":"Ubud Culture","description":"Rice terraces, Tirta Empul"},
      {"day":3,"title":"Mount Batur Sunrise","description":"Early hike and hot springs"},
      {"day":4,"title":"Uluwatu Cliffs","description":"Temple and Kecak dance","locationName":"Uluwatu","lat":-8.8296,"lng":115.0840},
      {"day":5,"title":"Seminyak Beach Day","description":"Beach clubs and cafes","locationName":"Seminyak","lat":-8.6900,"lng":115.1686},
      {"day":6,"title":"Free Day","description":"Optional spa or surf lesson"},
      {"day":7,"title":"Departure","description":"Transfer to airport"}
    ]'::jsonb,
    1099.00,
    array['https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&h=800&fit=crop'],
    1240
  );


