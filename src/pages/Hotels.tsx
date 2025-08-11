<<<<<<< HEAD
import { useState } from "react";
=======
import { useEffect, useMemo, useState } from "react";
>>>>>>> df4bac4 (third commit)
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { HotelFinder } from "@/components/ui/hotel-finder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Calendar,
  Users,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell
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
<<<<<<< HEAD

// Mock hotel data
export const hotels = [
  {
    id: "1",
    name: "Marina Bay Sands",
    location: "Marina Bay, Singapore",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 15420,
    price: 450,
    originalPrice: 520,
    amenities: ["Wifi", "Pool", "Gym", "Restaurant", "Spa"],
    stars: 5,
    isPopular: true,
    isExclusive: false
  },
  {
    id: "2",
    name: "Raffles Hotel Singapore",
    location: "Beach Road, Singapore",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 8923,
    price: 850,
    originalPrice: 950,
    amenities: ["Wifi", "Pool", "Gym", "Restaurant", "Spa", "Butler"],
    stars: 5,
    isPopular: false,
    isExclusive: true
  },
  {
    id: "3",
    name: "Parkroyal Collection Marina Bay",
    location: "Marina Bay, Singapore",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 6789,
    price: 320,
    originalPrice: 380,
    amenities: ["Wifi", "Pool", "Gym", "Restaurant"],
    stars: 4,
    isPopular: true,
    isExclusive: false
  },
  {
    id: "4",
    name: "The Fullerton Hotel",
    location: "Fullerton Road, Singapore",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 5432,
    price: 380,
    originalPrice: 420,
    amenities: ["Wifi", "Pool", "Restaurant", "Bar"],
    stars: 5,
    isPopular: false,
    isExclusive: false
  },
  {
    id: "5",
    name: "Shangri-La Hotel Singapore",
    location: "Orange Grove Road, Singapore",
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 7654,
    price: 420,
    originalPrice: 480,
    amenities: ["Wifi", "Pool", "Gym", "Restaurant", "Spa", "Tennis"],
    stars: 5,
    isPopular: true,
    isExclusive: false
  },
  {
    id: "6",
    name: "The Ritz-Carlton Millenia Singapore",
    location: "Marina Bay, Singapore",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 4321,
    price: 580,
    originalPrice: 650,
    amenities: ["Wifi", "Pool", "Gym", "Restaurant", "Spa", "Concierge"],
    stars: 5,
    isPopular: false,
    isExclusive: true
  }
];
=======
import { hotelService } from "@/services/hotelService";
import type { HotelWithRelations } from "@/types/hotel";

// Data from Supabase
type UIHotel = {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  amenities: string[];
  stars: number;
  isPopular: boolean;
  isExclusive: boolean;
};
>>>>>>> df4bac4 (third commit)

const amenities = [
  { id: "Wifi", label: "Wifi", icon: Wifi },
  { id: "Pool", label: "Pool", icon: Waves },
  { id: "Gym", label: "Gym", icon: Dumbbell },
  { id: "Restaurant", label: "Restaurant", icon: Utensils },
  { id: "Parking", label: "Parking", icon: Car },
  { id: "Spa", label: "Spa", icon: Waves },
  { id: "Butler", label: "Butler", icon: Users },
  { id: "Tennis", label: "Tennis", icon: Users },
  { id: "Concierge", label: "Concierge", icon: Users },
  { id: "Bar", label: "Bar", icon: Users },
];

const starRatings = [1, 2, 3, 4, 5];

export default function HotelsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hotels, setHotels] = useState<UIHotel[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await hotelService.getHotels();
        if (!mounted) return;
        // Map to UI model; database lacks images/amenities/stars, so fill with defaults
        const mapped: UIHotel[] = (data || []).map((h) => ({
          id: h.id || crypto.randomUUID(),
          name: h.name,
          location: h.location || (h.city ? `${h.city.name}, ${h.city.country?.name ?? ''}` : ''),
          image: h.image_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
          rating: h.rating ?? 4.5,
          reviewCount: 1000,
          price: Number(h.price ?? 0),
          originalPrice: undefined,
          amenities: ["Wifi", "Pool"],
          stars: Math.max(3, Math.min(5, Math.round((h.rating ?? 4.5)))),
          isPopular: (h.rating ?? 0) >= 4.7,
          isExclusive: (h.rating ?? 0) >= 4.85,
        }));
        setHotels(mapped);
        setError(null);
      } catch (e: any) {
        setError(e.message || 'Failed to load hotels');
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
>>>>>>> df4bac4 (third commit)

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStars = selectedStars.length === 0 || selectedStars.includes(hotel.stars);
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    const matchesAmenities = selectedAmenities.length === 0 || 
                           selectedAmenities.every(amenity => hotel.amenities.includes(amenity));

    return matchesSearch && matchesStars && matchesPrice && matchesAmenities;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popularity":
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const toggleStar = (star: number) => {
    setSelectedStars(prev => 
      prev.includes(star) 
        ? prev.filter(s => s !== star)
        : [...prev, star]
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
              Find Your Perfect Stay
            </h1>
            <p className="text-muted-foreground">
              Discover {hotels.length}+ hotels and accommodations worldwide
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search hotels, destinations, or landmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
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
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <h3 className="font-semibold mb-3">Star Rating</h3>
                  <div className="flex gap-2">
                    {starRatings.map(star => (
                      <Button
                        key={star}
                        variant={selectedStars.includes(star) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleStar(star)}
                        className="gap-1"
                      >
                        <Star className="h-3 w-3" />
                        {star}
                      </Button>
                    ))}
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
<<<<<<< HEAD
              Showing {sortedHotels.length} of {hotels.length} hotels
=======
              {loading ? 'Loading hotels…' : error ? `Error: ${error}` : `Showing ${sortedHotels.length} of ${hotels.length} hotels`}
>>>>>>> df4bac4 (third commit)
            </p>
          </div>

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedHotels.map((hotel, index) => (
              <Card 
                key={hotel.id}
                className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
<<<<<<< HEAD
=======
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.src !== '/placeholder.svg') {
                          target.src = '/placeholder.svg';
                        }
                      }}
>>>>>>> df4bac4 (third commit)
                    />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {hotel.isExclusive && (
                      <Badge className="bg-gradient-to-r from-accent to-primary text-white font-semibold">
                        WanderLux Exclusive
                      </Badge>
                    )}
                    {hotel.isPopular && (
                      <Badge variant="secondary" className="bg-red-500 text-white">
                        🔥 Popular
                      </Badge>
                    )}
                    {hotel.originalPrice && (
                      <Badge className="bg-green-500 text-white font-bold">
                        {Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Star Rating */}
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1">
                    <div className="flex items-center gap-1">
                      {[...Array(hotel.stars)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{hotel.rating}</span>
                      <span className="text-muted-foreground">({hotel.reviewCount.toLocaleString()})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {hotel.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-3 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {hotel.location}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {hotel.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-secondary/60">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">
                          ${hotel.price}
                        </span>
                        {hotel.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${hotel.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">per night</span>
                    </div>
                    
                    <Button
                      onClick={() => navigate(`/booking/${hotel.id}`)}
                      className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedHotels.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedStars([]);
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
