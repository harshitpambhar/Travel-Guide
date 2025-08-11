import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  Grid3X3,
  List,
  X
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Mock search results data
const searchResults = [
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
    title: "Singapore City Tour with Local Guide",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 12369,
    price: 45.00,
    originalPrice: 55.00,
    category: "City Tours",
    features: ["Local Guide", "Small Groups", "Hotel Pickup"],
    bookedCount: "500K+",
    isPopular: false,
    isExclusive: true
  },
  {
    id: "3",
    title: "Marina Bay Sands Hotel Stay",
    location: "Marina Bay, Singapore",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 15420,
    price: 450,
    originalPrice: 520,
    category: "Hotels",
    features: ["Luxury Stay", "Infinity Pool", "City Views"],
    bookedCount: "1M+",
    isPopular: true,
    isExclusive: false
  }
];

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");

  const query = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";
  const date = searchParams.get("date") || "";
  const guests = searchParams.get("guests") || "";

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const filteredResults = searchResults.filter(result => {
    const matchesSearch = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || result.category === selectedCategory;
    const matchesPrice = result.price >= priceRange[0] && result.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popularity":
        return parseInt(b.bookedCount.replace(/\D/g, "")) - parseInt(a.bookedCount.replace(/\D/g, ""));
      case "relevance":
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Search Summary */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Search Results
            </h1>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {query && <Badge variant="outline">"{query}"</Badge>}
              {location && <Badge variant="outline">{location}</Badge>}
              {date && <Badge variant="outline">{date}</Badge>}
              {guests && <Badge variant="outline">{guests} guests</Badge>}
            </div>
            <p className="text-muted-foreground mt-2">
              Found {sortedResults.length} results
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Refine your search..."
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
                    <SelectItem value="relevance">Most Relevant</SelectItem>
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
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  <SelectItem value="Theme Parks">Theme Parks</SelectItem>
                  <SelectItem value="City Tours">City Tours</SelectItem>
                  <SelectItem value="Hotels">Hotels</SelectItem>
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
              </div>
            </Card>
          )}

          {/* Results */}
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {sortedResults.map((result, index) => (
              <div 
                key={result.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ExperienceCard {...result} />
              </div>
            ))}
          </div>

          {sortedResults.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setPriceRange([0, 500]);
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
