import { supabase } from '@/lib/supabase';

export type TravelDeal = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  image_url?: string;
  original_price: number;
  discounted_price: number;
  discount: number;
  valid_until: string;
  category?: string;
  rating?: number;
  review_count?: number;
  features: string[];
  is_flash_sale: boolean;
  is_exclusive: boolean;
};

export const dealService = {
  async getAll(): Promise<TravelDeal[]> {
    const { data, error } = await supabase
      .from('travel_deals')
      .select('*')
      .order('discount', { ascending: false });
    if (error) throw error;
    return (data || []).map(mapRow);
  },

  async search(params?: { category?: string; location?: string; q?: string; minPrice?: number; maxPrice?: number; flashOnly?: boolean; }): Promise<TravelDeal[]> {
    let query = supabase.from('travel_deals').select('*');
    if (params?.category && params.category !== 'All Categories') query = query.eq('category', params.category);
    if (params?.location && params.location !== 'All Locations') query = query.ilike('location', `%${params.location}%`);
    if (params?.q) query = query.or(`title.ilike.%${params.q}%,description.ilike.%${params.q}%`);
    if (params?.minPrice) query = query.gte('discounted_price', params.minPrice);
    if (params?.maxPrice) query = query.lte('discounted_price', params.maxPrice);
    if (params?.flashOnly) query = query.eq('is_flash_sale', true);
    const { data, error } = await query.order('discount', { ascending: false });
    if (error) throw error;
    return (data || []).map(mapRow);
  },
};

function mapRow(row: any): TravelDeal {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    location: row.location ?? undefined,
    image_url: row.image_url ?? undefined,
    original_price: Number(row.original_price),
    discounted_price: Number(row.discounted_price),
    discount: Number(row.discount),
    valid_until: row.valid_until,
    category: row.category ?? undefined,
    rating: row.rating ? Number(row.rating) : undefined,
    review_count: row.review_count ? Number(row.review_count) : undefined,
    features: row.features || [],
    is_flash_sale: !!row.is_flash_sale,
    is_exclusive: !!row.is_exclusive,
  };
}


