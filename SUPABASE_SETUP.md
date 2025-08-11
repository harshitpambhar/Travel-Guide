# Supabase Integration Setup Guide

This guide will help you set up Supabase for the GlobeTrotter application and import the hotel data. It now includes flights, experiences, and user profiles.

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
5. Apply the new migrations for flights, experiences, and profiles in order:
   - `supabase/migrations/20250101000001_create_flights.sql`
   - `supabase/migrations/20250101000002_create_experiences.sql`
   - `supabase/migrations/20250101000003_create_profiles.sql`

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

---

## New Schemas Overview

### Flights (`public.flights`)

Purpose: Store flight options for search/booking.

- id (uuid, PK)
- flight_id (text, unique)
- airline (text)
- departure_airport (text)
- arrival_airport (text)
- departure_time (timestamptz)
- arrival_time (timestamptz, nullable)
- price (numeric(12,2)), currency (text)
- duration_minutes (int, nullable)
- baggage_policy (text, nullable)
- departure_city_id (uuid, FK → cities.id)
- arrival_city_id (uuid, FK → cities.id)
- created_at, updated_at

RLS:
- Select: anon + authenticated
- Insert/Update/Delete: authenticated (tighten in prod as needed)

### Experiences (`public.experiences`)

Purpose: Curated activities/attractions.

- id (uuid, PK)
- experience_id (text, unique)
- name, description, location, type
- price (numeric(12,2)), currency (text)
- rating (numeric, nullable)
- city_id (uuid, FK → cities.id)
- country_id (uuid, FK → countries.id)
- created_at, updated_at

RLS:
- Select: anon + authenticated
- Insert/Update/Delete: authenticated

### Profiles (`public.profiles`)

Purpose: User profile linked to Supabase Auth.

- id (uuid, PK)
- profile_id (text, unique)
- user_id (uuid, FK → auth.users.id, cascade)
- username (text, unique)
- home_currency (text)
- travel_preferences (jsonb)
- created_at, updated_at

RLS:
- Select: anon + authenticated (public viewing). Restrict further in prod if desired.
- Insert/Update/Delete: owner only (`auth.uid() = user_id`)

Foreign keys & Relationships:
- Flights and experiences optionally link to existing `cities`/`countries`.
- Profiles link to `auth.users`.

---

## Initial Data Import (Optional)

You can seed flights/experiences similarly to hotels using service functions.

```ts
import { flightService } from '@/services/flightService';
import { experienceService } from '@/services/experienceService';

await flightService.create({
  flight_id: 'SQ-22',
  airline: 'Singapore Airlines',
  departure_airport: 'SIN',
  arrival_airport: 'JFK',
  departure_time: '2025-09-01T00:55:00Z',
  arrival_time: '2025-09-01T12:30:00Z',
  price: 999.00,
  currency: 'USD'
});

await experienceService.create({
  experience_id: 'XP-TOKYO-FOOD',
  name: 'Tokyo Night Food Tour',
  location: 'Tokyo, Japan',
  type: 'Food Tour',
  price: 85,
  currency: 'USD'
});
```

---

## Using the New Service Modules

```ts
import { flightService } from '@/services/flightService';
import { experienceService } from '@/services/experienceService';
import { profileService } from '@/services/profileService';

const flights = await flightService.list({ departure_city_id: 'uuid-a', arrival_city_id: 'uuid-b' });
const experiences = await experienceService.list({ locationContains: 'Kyoto', minRating: 4.5 });
const me = await profileService.getOwn();
```

## Security

- RLS is enabled on all tables.
- By default, flights/experiences readable by everyone; writes limited to authenticated users.
- Profiles are owner-writable; readable by everyone (adjust in production as needed).

## Next Steps

1. Set up authentication using Supabase Auth
2. Create admin interfaces for managing hotels
3. Implement search and filtering in your frontend
4. Add pagination for large result sets
