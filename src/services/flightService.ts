import { supabase } from '@/lib/supabase';

export type Flight = {
  id: string
  flight_id: string
  airline: string
  departure_airport: string
  arrival_airport: string
  departure_time: string
  arrival_time?: string
  price: number
  currency: string
  duration_minutes?: number
  baggage_policy?: string
  departure_city_id?: string | null
  arrival_city_id?: string | null
}

export type FlightFilters = {
  departure_city_id?: string
  arrival_city_id?: string
  minPrice?: number
  maxPrice?: number
  airline?: string
  date?: string // ISO date filter on departure_time
}

export const flightService = {
  async list(filters?: FlightFilters): Promise<Flight[]> {
    let query = supabase.from('flights').select('*');

    if (filters) {
      const { departure_city_id, arrival_city_id, minPrice, maxPrice, airline, date } = filters;
      if (departure_city_id) query = query.eq('departure_city_id', departure_city_id);
      if (arrival_city_id) query = query.eq('arrival_city_id', arrival_city_id);
      if (airline) query = query.ilike('airline', `%${airline}%`);
      if (typeof minPrice === 'number') query = query.gte('price', minPrice);
      if (typeof maxPrice === 'number') query = query.lte('price', maxPrice);
      if (date) query = query.gte('departure_time', `${date}T00:00:00Z`).lte('departure_time', `${date}T23:59:59Z`);
    }

    const { data, error } = await query.order('departure_time', { ascending: true });
    if (error) throw error;
    return (data as unknown as Flight[]) || [];
  },

  async getById(id: string): Promise<Flight | null> {
    const { data, error } = await supabase.from('flights').select('*').eq('id', id).single();
    if (error) return null;
    return data as unknown as Flight;
  },

  async create(flight: Omit<Flight, 'id'>): Promise<Flight> {
    const { data, error } = await supabase.from('flights').insert([flight]).select().single();
    if (error) throw error;
    return data as Flight;
  },

  async update(id: string, updates: Partial<Flight>): Promise<Flight> {
    const { data, error } = await supabase.from('flights').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data as Flight;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from('flights').delete().eq('id', id);
    if (error) throw error;
  },
};


