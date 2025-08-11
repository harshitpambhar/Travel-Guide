import { supabase } from '@/lib/supabase';

export type Experience = {
  id: string
  experience_id: string
  name: string
  description?: string
  location: string
  price: number
  currency: string
  type: string
  rating?: number
  city_id?: string | null
  country_id?: string | null
}

export type ExperienceFilters = {
  locationContains?: string
  type?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
}

export const experienceService = {
  async list(filters?: ExperienceFilters): Promise<Experience[]> {
    let query = supabase.from('experiences').select('*');
    if (filters) {
      const { locationContains, type, minPrice, maxPrice, minRating } = filters;
      if (locationContains) query = query.ilike('location', `%${locationContains}%`);
      if (type) query = query.eq('type', type);
      if (typeof minPrice === 'number') query = query.gte('price', minPrice);
      if (typeof maxPrice === 'number') query = query.lte('price', maxPrice);
      if (typeof minRating === 'number') query = query.gte('rating', minRating);
    }
    const { data, error } = await query.order('name', { ascending: true });
    if (error) throw error;
    return (data as unknown as Experience[]) || [];
  },

  async getById(id: string): Promise<Experience | null> {
    const { data, error } = await supabase.from('experiences').select('*').eq('id', id).single();
    if (error) return null;
    return data as unknown as Experience;
  },

  async create(experience: Omit<Experience, 'id'>): Promise<Experience> {
    const { data, error } = await supabase.from('experiences').insert([experience]).select().single();
    if (error) throw error;
    return data as Experience;
  },

  async update(id: string, updates: Partial<Experience>): Promise<Experience> {
    const { data, error } = await supabase.from('experiences').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data as Experience;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) throw error;
  },
};


