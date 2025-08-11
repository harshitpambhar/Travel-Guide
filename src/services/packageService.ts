import { supabase } from '@/lib/supabase';
import type { TravelPackage } from '@/types/travel-package';

export const packageService = {
  async getAll(): Promise<TravelPackage[]> {
    const { data, error } = await supabase
      .from('travel_packages')
      .select('*')
      .order('popularity', { ascending: false });
    if (error) throw error;
    return (data || []).map(mapRowToPackage);
  },

  async search(params?: { destination?: string; q?: string; minDays?: number; maxDays?: number; minPrice?: number; maxPrice?: number; }): Promise<TravelPackage[]> {
    let query = supabase.from('travel_packages').select('*');
    if (params?.destination && params.destination !== 'All Destinations') {
      query = query.contains('destinations', [params.destination]);
    }
    if (params?.q) {
      query = query.or(`name.ilike.%${params.q}%,destinations.cs.{${params.q}}`);
    }
    if (params?.minDays) query = query.gte('days', params.minDays);
    if (params?.maxDays) query = query.lte('days', params.maxDays);
    if (params?.minPrice) query = query.gte('price', params.minPrice);
    if (params?.maxPrice) query = query.lte('price', params.maxPrice);
    const { data, error } = await query.order('popularity', { ascending: false });
    if (error) throw error;
    return (data || []).map(mapRowToPackage);
  },

  async getById(id: string): Promise<TravelPackage | null> {
    const { data, error } = await supabase
      .from('travel_packages')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return null;
    return data ? mapRowToPackage(data) : null;
  },
};

function mapRowToPackage(row: any): TravelPackage {
  return {
    id: row.id,
    name: row.name,
    destinations: row.destinations || [],
    startDate: row.start_date,
    endDate: row.end_date,
    days: row.days,
    availableSlots: row.available_slots,
    itinerary: (row.itinerary || []) as any,
    price: Number(row.price),
    images: row.images || [],
    popularity: row.popularity || 0,
  };
}


