export interface Hotel {
  id?: string;
  name: string;
  price: string;
  address: string;
  location: string;
  rating: number;
  city_id?: string;
  country_id?: string;
<<<<<<< HEAD
=======
  image_url?: string;
>>>>>>> df4bac4 (third commit)
  city_name?: string;
  country_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface City {
  id: string;
  name: string;
  country_id: string;
  country_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Country {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface HotelWithRelations extends Hotel {
  city: {
    id: string;
    name: string;
    country: {
      id: string;
      name: string;
    };
  };
}

export interface HotelFilters {
  country?: string;
  city?: string;
  minRating?: number;
  searchQuery?: string;
}
