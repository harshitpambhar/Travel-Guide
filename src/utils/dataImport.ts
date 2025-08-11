import { HotelDirectory } from '@/data/hotels';
import { hotelService } from '@/services/hotelService';

export async function importHotelData(hotelsData: HotelDirectory) {
  try {
    console.log('Starting hotel data import...');
    
    // Process each country
    for (const [countryName, cities] of Object.entries(hotelsData)) {
      console.log(`Processing country: ${countryName}`);
      
      // Get or create country
      const { data: countries } = await supabase
        .from('countries')
        .select('id')
        .eq('name', countryName)
        .single();
      
      let countryId = countries?.id;
      
      if (!countryId) {
        const { data: newCountry, error } = await supabase
          .from('countries')
          .insert([{ name: countryName }])
          .select()
          .single();
          
        if (error) throw error;
        countryId = newCountry.id;
        console.log(`Created country: ${countryName}`);
      }

      // Process each city in the country
      for (const [cityName, hotels] of Object.entries(cities)) {
        console.log(`  Processing city: ${cityName}`);
        
        // Get or create city
        const { data: cities } = await supabase
          .from('cities')
          .select('id')
          .eq('name', cityName)
          .eq('country_id', countryId)
          .single();
        
        let cityId = cities?.id;
        
        if (!cityId) {
          const { data: newCity, error } = await supabase
            .from('cities')
            .insert([{ 
              name: cityName, 
              country_id: countryId 
            }])
            .select()
            .single();
            
          if (error) throw error;
          cityId = newCity.id;
          console.log(`  Created city: ${cityName}`);
        }

        // Process each hotel in the city
        for (const hotel of hotels) {
          // Check if hotel exists
          const { data: existingHotel } = await supabase
            .from('hotels')
            .select('id')
            .eq('name', hotel.name)
            .eq('address', hotel.address)
            .single();
          
          if (!existingHotel) {
            const { error } = await supabase
              .from('hotels')
              .insert([{
                name: hotel.name,
                price: hotel.price,
                address: hotel.address,
                location: hotel.location,
                rating: parseFloat(hotel.rating.split('/')[0]),
                city_id: cityId,
                country_id: countryId
              }]);
              
            if (error) {
              console.error(`Error importing hotel ${hotel.name}:`, error);
            } else {
              console.log(`    Imported hotel: ${hotel.name}`);
            }
          }
        }
      }
    }
    
    console.log('Hotel data import completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error during hotel data import:', error);
    return { success: false, error };
  }
}

// Example usage:
// import { HotelsByCountry } from '@/data/hotels';
// importHotelData(HotelsByCountry);
