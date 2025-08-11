# Supabase Integration Setup Guide

This guide will help you set up Supabase for the GlobeTrotter application and import the hotel data.

## Prerequisites

1. Node.js (v14 or later)
2. npm or yarn
3. Supabase account (https://supabase.com/)

## Setup Instructions

### 1. Create a new Supabase project

1. Go to [Supabase](https://supabase.com/) and sign up/log in
2. Click "New Project"
3. Fill in your project details and create the project
4. Wait for the database to be provisioned

### 2. Set up environment variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these values in your Supabase project settings under Project Settings > API.

### 3. Install dependencies

Run the following command to install the required dependencies:

```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

### 4. Set up the database schema

1. Go to the SQL Editor in your Supabase dashboard
2. Create a new query
3. Copy the contents of `supabase/migrations/20240101000000_setup_hotels_schema.sql`
4. Run the query to create the necessary tables and functions

### 5. Import the hotel data

1. Create a new file `src/data/hotels.ts` and add your hotel data there
2. Create a new file `scripts/importData.ts` with the following content:

```typescript
import { HotelsByCountry } from '../src/data/hotels';
import { importHotelData } from '../src/utils/dataImport';

async function main() {
  console.log('Starting data import...');
  const result = await importHotelData(HotelsByCountry);
  
  if (result.success) {
    console.log('Data import completed successfully!');
    process.exit(0);
  } else {
    console.error('Data import failed:', result.error);
    process.exit(1);
  }
}

main().catch(console.error);
```

3. Run the import script:

```bash
ts-node --compiler-options '{"module":"commonjs"}' scripts/importData.ts
```

### 6. Verify the data

You can verify that the data was imported correctly by:

1. Going to the Table Editor in your Supabase dashboard
2. Checking the `countries`, `cities`, and `hotels` tables

## Using the Hotel Service

You can now use the `hotelService` to fetch and manage hotel data in your application. Here are some examples:

```typescript
import { hotelService } from '@/services/hotelService';

// Get all countries
const countries = await hotelService.getCountries();

// Get cities in a country
const cities = await hotelService.getCitiesByCountry('country-id');

// Get hotels with filters
const hotels = await hotelService.getHotels({
  country: 'country-id',
  city: 'city-id',
  minRating: 4,
  searchQuery: 'luxury'
});

// Get a single hotel
const hotel = await hotelService.getHotelById('hotel-id');

// Search hotels
const searchResults = await hotelService.searchHotels('beach');

// Get featured hotels
const featuredHotels = await hotelService.getFeaturedHotels(6);
```

## Security

- Row Level Security (RLS) is enabled on all tables
- By default, all users can read data
- Only authenticated users with the 'admin' role can modify data

## Next Steps

1. Set up authentication using Supabase Auth
2. Create admin interfaces for managing hotels
3. Implement search and filtering in your frontend
4. Add pagination for large result sets
