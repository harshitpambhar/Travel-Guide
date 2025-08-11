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
  Star, 
  Calendar,
  Clock,
  Percent,
  Flame,
  Sparkles,
  ArrowRight
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

// Mock deals data
const deals = [
  {
    id: "1",
    title: "Singapore Staycation Package",
    description: "3D2N at Marina Bay Sands with breakfast and city tour",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    originalPrice: 1200,
    discountedPrice: 799,
    discount: 33,
    validUntil: "2024-02-15",
    category: "Hotels",
    rating: 4.8,
    reviewCount: 15420,
    features: ["Free Breakfast", "City Tour", "Spa Credit", "Late Checkout"],
    isFlashSale: true,
    isExclusive: true,
    remainingTime: "2 days left"
  },
  {
    id: "2",
    title: "Bali Adventure Bundle",
    description: "5D4N adventure package with temple visits and water sports",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&h=400&fit=crop",
    originalPrice: 850,
    discountedPrice: 599,
    discount: 29,
    validUntil: "2024-03-01",
    category: "Adventure",
    rating: 4.7,
    reviewCount: 8923,
    features: ["Temple Tours", "Water Sports", "Local Guide", "Airport Transfer"],
    isFlashSale: false,
    isExclusive: false,
    remainingTime: "15 days left"
  },
  {
    id: "3",
    title: "Tokyo Food & Culture Experience",
    description: "4D3N culinary journey through Tokyo's best restaurants",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=600&h=400&fit=crop",
    originalPrice: 1100,
    discountedPrice: 749,
    discount: 32,
    validUntil: "2024-02-28",
    category: "Food Tours",
    rating: 4.9,
    reviewCount: 6789,
    features: ["Michelin Restaurants", "Cooking Class", "Market Tour", "Sake Tasting"],
    isFlashSale: true,
    isExclusive: true,
    remainingTime: "8 days left"
  },
  {
    id: "4",
    title: "European River Cruise",
    description: "7D6N luxury cruise along the Rhine River",
    location: "Europe",
    image: "https://images.unsplash.com/photo-1469796466635-681d485cbeb0?w=600&h=400&fit=crop",
    originalPrice: 2500,
    discountedPrice: 1899,
    discount: 24,
    validUntil: "2024-04-15",
    category: "Cruises",
    rating: 4.8,
    reviewCount: 15234,
    features: ["All-Inclusive", "Guided Tours", "Fine Dining", "Entertainment"],
    isFlashSale: false,
    isExclusive: false,
    remainingTime: "45 days left"
  },
  {
    id: "5",
    title: "New Zealand Adventure",
    description: "10D9N epic journey through Middle Earth",
    location: "New Zealand",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop",
    originalPrice: 3200,
    discountedPrice: 2399,
    discount: 25,
    validUntil: "2024-05-01",
    category: "Adventure",
    rating: 4.9,
    reviewCount: 8923,
    features: ["LOTR Locations", "Hiking Tours", "Helicopter Ride", "Wine Tasting"],
    isFlashSale: false,
    isExclusive: true,
    remainingTime: "60 days left"
  },
  {
    id: "6",
    title: "Maldives Paradise Escape",
    description: "6D5N overwater villa with all-inclusive package",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    originalPrice: 3800,
    discountedPrice: 2899,
    discount: 24,
    validUntil: "2024-03-15",
    category: "Luxury",
    rating: 4.9,
    reviewCount: 7654,
    features: ["Overwater Villa", "All-Inclusive", "Spa Treatments", "Water Sports"],
    isFlashSale: true,
    isExclusive: true,
    remainingTime: "20 days left"
  }
];

const categories = [
  "All Categories",
  "Hotels",
  "Adventure",
  "Food Tours",
  "Cruises",
  "Luxury",
  "Culture",
  "Nature"
];

const locations = [
  "All Locations",
  "Singapore",
  "Bali",
  "Tokyo",
  "Europe",
  "New Zealand",
  "Maldives",
  "Thailand"
];

export default function DealsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("discount");
  const [showFlashSales, setShowFlashSales] = useState(false);

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || deal.category === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" || deal.location.includes(selectedLocation);
    const matchesPrice = deal.discountedPrice >= priceRange[0] && deal.discountedPrice <= priceRange[1];
    const matchesFlashSale = !showFlashSales || deal.isFlashSale;

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesFlashSale;
  });

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case "discount":
        return b.discount - a.discount;
      case "price":
        return a.discountedPrice - b.discountedPrice;
      case "rating":
        return b.rating - a.rating;
      case "validity":
        return new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime();
      default:
        return b.discount - a.discount;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-8 w-8 text-red-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Exclusive Deals & Offers
              </h1>
            </div>
            <p className="text-muted-foreground">
              Limited-time offers and exclusive packages to make your travel dreams come true
            </p>
          </div>

          {/* Flash Sale Banner */}
          <Card className="p-6 mb-6 bg-gradient-to-r from-red-500 to-orange-500 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="h-6 w-6" />
                <div>
                  <h3 className="text-xl font-bold">Flash Sale Alert!</h3>
                  <p className="text-red-100">Up to 50% off on selected packages</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">24:15:32</div>
                <div className="text-sm text-red-100">Time Remaining</div>
              </div>
            </div>
          </Card>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search deals, destinations, or activities..."
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
                    <SelectItem value="discount">Highest Discount</SelectItem>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="validity">Expiring Soon</SelectItem>
                  </SelectContent>
                </Select>
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
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="flash-sale"
                  checked={showFlashSales}
                  onCheckedChange={setShowFlashSales}
                />
                <label htmlFor="flash-sale" className="text-sm font-medium flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  Flash Sales Only
                </label>
              </div>
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
                    max={4000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Discount Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[10, 20, 30, 40, 50].map(discount => (
                      <Button
                        key={discount}
                        variant="outline"
                        size="sm"
                        className="gap-1"
                      >
                        <Percent className="h-3 w-3" />
                        {discount}%+
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {sortedDeals.length} of {deals.length} deals
            </p>
          </div>

          {/* Deals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDeals.map((deal, index) => (
              <Card 
                key={deal.id}
                className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className="bg-red-500 text-white font-bold text-lg px-3 py-1">
                      -{deal.discount}%
                    </Badge>
                    {deal.isFlashSale && (
                      <Badge className="bg-orange-500 text-white font-semibold flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        Flash Sale
                      </Badge>
                    )}
                    {deal.isExclusive && (
                      <Badge className="bg-gradient-to-r from-accent to-primary text-white font-semibold">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Exclusive
                      </Badge>
                    )}
                  </div>

                  {/* Time Remaining */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white rounded-full px-3 py-1 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {deal.remainingTime}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      {deal.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{deal.rating}</span>
                      <span className="text-muted-foreground">({deal.reviewCount.toLocaleString()})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {deal.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {deal.description}
                  </p>
                  
                  <p className="text-muted-foreground text-sm mb-3 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {deal.location}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {deal.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-secondary/60">
                        {feature}
                      </Badge>
                    ))}
                    {deal.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-secondary/60">
                        +{deal.features.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">
                          ${deal.discountedPrice}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          ${deal.originalPrice}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">per person</span>
                    </div>
                    
                    <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedDeals.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No deals found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSelectedLocation("All Locations");
                setPriceRange([0, 4000]);
                setShowFlashSales(false);
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
