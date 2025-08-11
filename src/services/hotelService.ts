import { supabase } from '@/lib/supabase';
import { Hotel, HotelWithRelations, HotelFilters, City, Country } from '@/types/hotel';

export const hotelService = {
  // Get all countries with their cities and hotels
  async getCountries(): Promise<Country[]> {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get cities by country
  async getCitiesByCountry(countryId: string): Promise<City[]> {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .eq('country_id', countryId)
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get hotels with optional filters
  async getHotels(filters?: HotelFilters): Promise<HotelWithRelations[]> {
    let query = supabase
      .from('hotels')
      .select(`
        *,
        city:city_id (id, name, country:country_id (id, name))
      `);

    if (filters) {
      if (filters.country) {
        query = query.eq('country_id', filters.country);
      }
      if (filters.city) {
        query = query.eq('city_id', filters.city);
      }
      if (filters.minRating) {
        query = query.gte('rating', filters.minRating);
      }
      if (filters.searchQuery) {
        query = query.ilike('name', `%${filters.searchQuery}%`);
      }
    }

    const { data, error } = await query.order('name', { ascending: true });

    if (error) throw error;
    return (data as unknown as HotelWithRelations[]) || [];
  },

  // Get hotel by ID
  async getHotelById(id: string): Promise<HotelWithRelations | null> {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        city:city_id (id, name, country:country_id (id, name))
      `)
      .eq('id', id)
      .single();

    if (error) return null;
    return data as unknown as HotelWithRelations;
  },

  // Create a new hotel
  async createHotel(hotelData: Partial<Hotel>): Promise<Hotel> {
    const { data, error } = await supabase
      .from('hotels')
      .insert([hotelData])
      .select()
      .single();

    if (error) throw error;
    return data as Hotel;
  },

  // Update a hotel
  async updateHotel(id: string, updates: Partial<Hotel>): Promise<Hotel> {
    const { data, error } = await supabase
      .from('hotels')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Hotel;
  },

  // Delete a hotel
  async deleteHotel(id: string): Promise<void> {
    const { error } = await supabase
      .from('hotels')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Search hotels by name or location
  async searchHotels(query: string): Promise<HotelWithRelations[]> {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        city:city_id (id, name, country:country_id (id, name))
      `)
      .or(`name.ilike.%${query}%,location.ilike.%${query}%`);

    if (error) throw error;
    return (data as unknown as HotelWithRelations[]) || [];
  },

  // Get featured hotels (highest rated)
  async getFeaturedHotels(limit = 6): Promise<HotelWithRelations[]> {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        city:city_id (id, name, country:country_id (id, name))
      `)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data as unknown as HotelWithRelations[]) || [];
  },
};
