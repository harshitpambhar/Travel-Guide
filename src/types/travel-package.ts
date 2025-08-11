export type ItineraryItem = {
  day: number
  title: string
  description?: string
  locationName?: string
  lat?: number
  lng?: number
}

export type TravelPackage = {
  id: string
  name: string
  destinations: string[]
  startDate: string // ISO date string
  endDate: string // ISO date string
  days: number
  availableSlots: number
  itinerary: ItineraryItem[]
  price: number // total price per traveler
  images: string[]
  popularity: number // used for sorting
}


