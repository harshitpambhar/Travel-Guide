import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  MapPin, 
  Plane, 
  Calendar,
  Users,
  Clock,
  ArrowRight,
  Star,
  Wifi,
  Coffee,
  Briefcase
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

// Mock flight data
const flights = [
  {
    id: "1",
    airline: "Singapore Airlines",
    flightNumber: "SQ123",
    departure: {
      airport: "SIN",
      city: "Singapore",
      time: "08:00",
      date: "2024-01-15"
    },
    arrival: {
      airport: "NRT",
      city: "Tokyo",
      time: "16:30",
      date: "2024-01-15"
    },
    duration: "8h 30m",
    price: 850,
    originalPrice: 950,
    stops: 0,
    amenities: ["Wifi", "Meal", "Entertainment", "Power Outlet"],
    rating: 4.8,
    reviewCount: 12450,
    isPopular: true,
    isExclusive: false
  },
  {
    id: "2",
    airline: "Emirates",
    flightNumber: "EK432",
    departure: {
      airport: "SIN",
      city: "Singapore",
      time: "10:15",
      date: "2024-01-15"
    },
    arrival: {
      airport: "DXB",
      city: "Dubai",
      time: "14:45",
      date: "2024-01-15"
    },
    duration: "7h 30m",
    price: 720,
    originalPrice: 820,
    stops: 0,
    amenities: ["Wifi", "Meal", "Entertainment", "Power Outlet", "Lounge Access"],
    rating: 4.7,
    reviewCount: 8923,
    isPopular: false,
    isExclusive: true
  },
  {
    id: "3",
    airline: "Qatar Airways",
    flightNumber: "QR876",
    departure: {
      airport: "SIN",
      city: "Singapore",
      time: "14:30",
      date: "2024-01-15"
    },
    arrival: {
      airport: "DOH",
      city: "Doha",
      time: "18:45",
      date: "2024-01-15"
    },
    duration: "8h 15m",
    price: 680,
    originalPrice: 780,
    stops: 0,
    amenities: ["Wifi", "Meal", "Entertainment"],
    rating: 4.6,
    reviewCount: 6543,
    isPopular: true,
    isExclusive: false
  },
  {
    id: "4",
    airline: "Cathay Pacific",
    flightNumber: "CX715",
    departure: {
      airport: "SIN",
      city: "Singapore",
      time: "16:45",
      date: "2024-01-15"
    },
    arrival: {
      airport: "HKG",
      city: "Hong Kong",
      time: "20:30",
      date: "2024-01-15"
    },
    duration: "3h 45m",
    price: 420,
    originalPrice: 480,
    stops: 0,
    amenities: ["Wifi", "Meal", "Entertainment"],
    rating: 4.5,
    reviewCount: 5432,
    isPopular: false,
    isExclusive: false
  },
  {
    id: "5",
    airline: "Thai Airways",
    flightNumber: "TG408",
    departure: {
      airport: "SIN",
      city: "Singapore",
      time: "09:20",
      date: "2024-01-15"
    },
    arrival: {
      airport: "BKK",
      city: "Bangkok",
      time: "11:45",
      date: "2024-01-15"
    },
    duration: "2h 25m",
    price: 280,
    originalPrice: 320,
    stops: 0,
    amenities: ["Meal", "Entertainment"],
    rating: 4.4,
    reviewCount: 4321,
    isPopular: true,
    isExclusive: false
  },
  {
    id: "6",
    airline: "Malaysia Airlines",
    flightNumber: "MH603",
    departure: {
      airport: "SIN",
      city: "Singapore",
      time: "12:00",
      date: "2024-01-15"
    },
    arrival: {
      airport: "KUL",
      city: "Kuala Lumpur",
      time: "13:15",
      date: "2024-01-15"
    },
    duration: "1h 15m",
    price: 180,
    originalPrice: 220,
    stops: 0,
    amenities: ["Meal"],
    rating: 4.3,
    reviewCount: 3210,
    isPopular: false,
    isExclusive: false
  }
];

const airlines = [
  "All Airlines",
  "Singapore Airlines",
  "Emirates",
  "Qatar Airways",
  "Cathay Pacific",
  "Thai Airways",
  "Malaysia Airlines"
];

const amenities = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "meal", label: "Meal Included", icon: Coffee },
  { id: "entertainment", label: "Entertainment", icon: Coffee },
  { id: "baggage", label: "Free Baggage", icon: Briefcase },
];

export default function FlightsPage() {
  const [fromLocation, setFromLocation] = useState("Singapore");
  const [toLocation, setToLocation] = useState("Tokyo");
  const [departureDate, setDepartureDate] = useState("2024-01-15");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [selectedAirline, setSelectedAirline] = useState("All Airlines");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const filteredFlights = flights.filter(flight => {
    const matchesFrom = flight.departure.city.toLowerCase().includes(fromLocation.toLowerCase());
    const matchesTo = flight.arrival.city.toLowerCase().includes(toLocation.toLowerCase());
    const matchesAirline = selectedAirline === "All Airlines" || flight.airline === selectedAirline;
    const matchesPrice = flight.price >= priceRange[0] && flight.price <= priceRange[1];
    const matchesAmenities = selectedAmenities.length === 0 || 
                           selectedAmenities.every(amenity => flight.amenities.includes(amenity));

    return matchesFrom && matchesTo && matchesAirline && matchesPrice && matchesAmenities;
  });

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "duration":
        return parseInt(a.duration.replace(/\D/g, "")) - parseInt(b.duration.replace(/\D/g, ""));
      case "rating":
        return b.rating - a.rating;
      case "departure":
        return a.departure.time.localeCompare(b.departure.time);
      default:
        return a.price - b.price;
    }
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
              <main className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Find Your Flight
            </h1>
            <p className="text-muted-foreground">
              Search and compare flights from {flights.length}+ airlines worldwide
            </p>
          </div>

          {/* Flight Search */}
          <Card className="p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="From"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="To"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Select value={passengers.toString()} onValueChange={(value) => setPassengers(parseInt(value))}>
                  <SelectTrigger className="pl-10 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="round-trip"
                  checked={isRoundTrip}
                  onCheckedChange={setIsRoundTrip}
                />
                <label htmlFor="round-trip" className="text-sm font-medium">
                  Round Trip
                </label>
              </div>
              
              {isRoundTrip && (
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="date"
                    placeholder="Return Date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="pl-10 h-12 w-48"
                  />
                </div>
              )}
              
              <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300">
                <Search className="h-4 w-4 mr-2" />
                Search Flights
              </Button>
            </div>
          </Card>

          {/* Filters and Sort */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="departure">Departure Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={selectedAirline} onValueChange={setSelectedAirline}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {airlines.map(airline => (
                    <SelectItem key={airline} value={airline}>{airline}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {amenities.map(amenity => (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={amenity.id}
                          checked={selectedAmenities.includes(amenity.label)}
                          onCheckedChange={() => toggleAmenity(amenity.label)}
                        />
                        <label htmlFor={amenity.id} className="text-sm flex items-center gap-1">
                          <amenity.icon className="h-3 w-3" />
                          {amenity.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {sortedFlights.length} of {flights.length} flights
            </p>
          </div>

          {/* Flights List */}
          <div className="space-y-4">
            {sortedFlights.map((flight, index) => (
              <Card 
                key={flight.id}
                className="group overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                    {/* Flight Info */}
                    <div className="flex-1 flex items-center gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{flight.rating}</span>
                          <span className="text-muted-foreground">({flight.reviewCount.toLocaleString()})</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{flight.airline}</div>
                        <div className="text-xs text-muted-foreground">{flight.flightNumber}</div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">{flight.departure.time}</div>
                          <div className="text-sm text-muted-foreground">{flight.departure.airport}</div>
                          <div className="text-xs text-muted-foreground">{flight.departure.city}</div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="text-sm text-muted-foreground">{flight.duration}</div>
                          <div className="flex items-center gap-1">
                            <div className="w-16 h-0.5 bg-gray-300"></div>
                            <Plane className="h-4 w-4 text-primary" />
                            <div className="w-16 h-0.5 bg-gray-300"></div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-bold">{flight.arrival.time}</div>
                          <div className="text-sm text-muted-foreground">{flight.arrival.airport}</div>
                          <div className="text-xs text-muted-foreground">{flight.arrival.city}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1">
                      {flight.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-secondary/60">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Price and Action */}
                    <div className="text-right">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-bold text-primary">
                          ${flight.price}
                        </span>
                        {flight.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${flight.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">per passenger</div>
                      
                      <div className="flex gap-2">
                        {flight.isExclusive && (
                          <Badge className="bg-gradient-to-r from-accent to-primary text-white font-semibold text-xs">
                            WanderLux Exclusive
                          </Badge>
                        )}
                        {flight.isPopular && (
                          <Badge variant="secondary" className="bg-red-500 text-white text-xs">
                            🔥 Popular
                          </Badge>
                        )}
                      </div>
                      
                      <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 mt-2">
                        Select Flight
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedFlights.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No flights found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => {
                setFromLocation("Singapore");
                setToLocation("Tokyo");
                setSelectedAirline("All Airlines");
                setPriceRange([0, 1000]);
                setSelectedAmenities([]);
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
