import { supabase } from '../src/lib/supabase';
import { HotelsByCountry } from '../src/data/hotels';

async function importHotels() {
  // Create tables if they don't exist
  const { error: countryError } = await supabase.rpc('setup_hotels_schema');
  
  if (countryError) {
    console.error('Error setting up schema:', countryError);
    return;
  }

  // Process each country
  for (const [countryName, cities] of Object.entries(HotelsByCountry)) {
    // Insert country
    const { data: country, error: countryError } = await supabase
      .from('countries')
      .upsert({ name: countryName }, { onConflict: 'name' })
      .select()
      .single();

    if (countryError) {
      console.error(`Error inserting country ${countryName}:`, countryError);
      continue;
    }

    // Process each city in the country
    for (const [cityName, hotels] of Object.entries(cities)) {
      // Insert city
      const { data: city, error: cityError } = await supabase
        .from('cities')
        .upsert(
          { 
            name: cityName, 
            country_id: country.id 
          },
          { onConflict: 'name,country_id' }
        )
        .select()
        .single();

      if (cityError) {
        console.error(`Error inserting city ${cityName}:`, cityError);
        continue;
      }

      // Process each hotel in the city
      for (const hotel of hotels) {
        const { error: hotelError } = await supabase
          .from('hotels')
          .upsert(
            {
              name: hotel.name,
              price: hotel.price,
              address: hotel.address,
              location: hotel.location,
              rating: parseFloat(hotel.rating.split('/')[0]), // Convert "4.5/5" to 4.5
              city_id: city.id,
              country_id: country.id
            },
            { onConflict: 'name,address' }
          );

        if (hotelError) {
          console.error(`Error inserting hotel ${hotel.name}:`, hotelError);
        }
      }
    }
  }

  console.log('Import completed!');
}

importHotels().catch(console.error);
