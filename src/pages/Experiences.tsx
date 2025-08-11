import { useState } from "react";
import { Header } from "@/components/layout/header";
import { ExperienceCard } from "@/components/ui/experience-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  SlidersHorizontal,
  Grid3X3,
  List
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

// Mock data for experiences
const experiences = [
  {
    id: "1",
    title: "Universal Studios Singapore Adventure",
    location: "Sentosa Island, Singapore",
    image: "https://images.unsplash.com/photo-1613767969829-3b5dda3fd227?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 104219,
    price: 58.95,
    originalPrice: 64.59,
    category: "Theme Parks",
    features: ["Instant Confirmation", "Free Cancellation", "Skip the Line"],
    bookedCount: "3M+",
    isPopular: true,
    isExclusive: false
  },
  {
    id: "2",
    title: "WanderLux AI City Pass - Singapore",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 12369,
    price: 70.65,
    originalPrice: 79.39,
    category: "Attraction Passes",
    features: ["AI Recommendations", "Flexible Dates", "Mobile Ticket"],
    bookedCount: "500K+",
    isPopular: false,
    isExclusive: true
  },
  {
    id: "3",
    title: "VR Preview: Bali Temple Experience",
    location: "Ubud, Bali",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 8543,
    price: 15.00,
    category: "VR Experiences",
    features: ["Virtual Reality", "Cultural Insights", "Pre-Trip Planning"],
    bookedCount: "25K+",
    isPopular: false,
    isExclusive: true
  },
  {
    id: "4",
    title: "Tokyo Food Adventure with Local Guide",
    location: "Shibuya, Tokyo",
    image: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 6789,
    price: 85.00,
    originalPrice: 95.00,
    category: "Food Tours",
    features: ["Local Guide", "Hidden Gems", "Small Groups"],
    bookedCount: "150K+",
    isPopular: true,
    isExclusive: false
  },
  {
    id: "5",
    title: "Eco-Friendly Costa Rica Canopy Tour",
    location: "Monteverde, Costa Rica",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 3421,
    price: 45.00,
    category: "Eco Adventures",
    features: ["Carbon Neutral", "Wildlife Spotting", "Conservation Education"],
    bookedCount: "80K+",
    isPopular: false,
    isExclusive: false
  },
  {
    id: "6",
    title: "Santorini Sunset Sailing with Dinner",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1469796466635-681d485cbeb0?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 15234,
    price: 120.00,
    originalPrice: 140.00,
    category: "Cruises",
    features: ["Sunset Views", "Traditional Dinner", "Unlimited Drinks"],
    bookedCount: "200K+",
    isPopular: true,
    isExclusive: false
  },
  {
    id: "7",
    title: "Machu Picchu Guided Trek",
    location: "Cusco, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 8923,
    price: 299.00,
    originalPrice: 350.00,
    category: "Adventure",
    features: ["Expert Guide", "All-Inclusive", "Small Groups"],
    bookedCount: "50K+",
    isPopular: true,
    isExclusive: false
  },
  {
    id: "8",
    title: "Northern Lights Photography Tour",
    location: "Reykjavik, Iceland",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 5678,
    price: 180.00,
    category: "Photography",
    features: ["Professional Guide", "Equipment Provided", "Hot Chocolate"],
    bookedCount: "30K+",
    isPopular: false,
    isExclusive: false
  }
];

const categories = [
  "All Categories",
  "Theme Parks",
  "Attraction Passes",
  "VR Experiences",
  "Food Tours",
  "Eco Adventures",
  "Cruises",
  "Adventure",
  "Photography"
];

const locations = [
  "All Locations",
  "Singapore",
  "Bali",
  "Tokyo",
  "Costa Rica",
  "Greece",
  "Peru",
  "Iceland"
];

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");

  const filteredExperiences = experiences.filter(experience => {
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || experience.category === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" || experience.location.includes(selectedLocation);
    const matchesPrice = experience.price >= priceRange[0] && experience.price <= priceRange[1];
    const matchesRating = experience.rating >= ratingFilter;

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesRating;
  });

  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popularity":
      default:
        return parseInt(b.bookedCount.replace(/\D/g, "")) - parseInt(a.bookedCount.replace(/\D/g, ""));
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Discover Experiences
            </h1>
            <p className="text-muted-foreground">
              Explore {experiences.length}+ curated experiences around the world
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search experiences, destinations, or activities..."
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
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Minimum Rating</h3>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map(rating => (
                      <Button
                        key={rating}
                        variant={ratingFilter === rating ? "default" : "outline"}
                        size="sm"
                        onClick={() => setRatingFilter(rating)}
                        className="gap-1"
                      >
                        <Star className="h-3 w-3" />
                        {rating === 0 ? "Any" : rating}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="instant" />
                      <label htmlFor="instant" className="text-sm">Instant Confirmation</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cancellation" />
                      <label htmlFor="cancellation" className="text-sm">Free Cancellation</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exclusive" />
                      <label htmlFor="exclusive" className="text-sm">WanderLux Exclusive</label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {sortedExperiences.length} of {experiences.length} experiences
            </p>
          </div>

          {/* Experiences Grid */}
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {sortedExperiences.map((experience, index) => (
              <div 
                key={experience.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ExperienceCard {...experience} />
              </div>
            ))}
          </div>

          {sortedExperiences.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No experiences found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSelectedLocation("All Locations");
                setPriceRange([0, 500]);
                setRatingFilter(0);
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
