import { useState } from "react";
import { Header } from "@/components/layout/header";
import { ExperienceCard } from "@/components/ui/experience-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Trash2, 
  Share2,
  Filter,
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

// Mock wishlist data
const wishlistItems = [
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
    isExclusive: false,
    addedDate: "2024-01-10"
  },
  {
    id: "2",
    title: "Bali Temple Virtual Tour",
    location: "Ubud, Bali",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 8543,
    price: 15.00,
    originalPrice: 20.00,
    category: "VR Experiences",
    features: ["360° Views", "Audio Guide", "Interactive Elements"],
    bookedCount: "25K+",
    isPopular: false,
    isExclusive: true,
    addedDate: "2024-01-08"
  },
  {
    id: "3",
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
    isExclusive: false,
    addedDate: "2024-01-05"
  }
];

export default function WishlistPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("date-added");
  const [wishlist, setWishlist] = useState(wishlistItems);

  const categories = [
    "All Categories",
    "Theme Parks",
    "VR Experiences",
    "Food Tours",
    "Adventure",
    "Culture"
  ];

  const filteredWishlist = wishlist.filter(item => {
    return selectedCategory === "All Categories" || item.category === selectedCategory;
  });

  const sortedWishlist = [...filteredWishlist].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popularity":
        return parseInt(b.bookedCount.replace(/\D/g, "")) - parseInt(a.bookedCount.replace(/\D/g, ""));
      case "date-added":
      default:
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    }
  });

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const shareWishlist = () => {
    // Handle sharing wishlist
    console.log("Sharing wishlist");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  My Wishlist
                </h1>
                <p className="text-muted-foreground">
                  {wishlist.length} saved experiences
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={shareWishlist} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex gap-2">
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
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-added">Date Added</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="popularity">Most Popular</SelectItem>
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
          </div>

          {/* Wishlist Items */}
          {sortedWishlist.length > 0 ? (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {sortedWishlist.map((item, index) => (
                <Card 
                  key={item.id}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {item.isExclusive && (
                        <Badge className="bg-gradient-to-r from-accent to-primary text-white font-semibold">
                          WanderLux Exclusive
                        </Badge>
                      )}
                      {item.isPopular && (
                        <Badge variant="secondary" className="bg-red-500 text-white">
                          🔥 Popular
                        </Badge>
                      )}
                      {item.originalPrice && (
                        <Badge className="bg-green-500 text-white font-bold">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-primary border-primary/30">
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm">
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        <span className="font-semibold">{item.rating}</span>
                        <span className="text-muted-foreground">({item.reviewCount.toLocaleString()})</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-3 flex items-center gap-1">
                      <span>{item.location}</span>
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-secondary/60">
                          {feature}
                        </Badge>
                      ))}
                      {item.features.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-secondary/60">
                          +{item.features.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-primary">
                            ${item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through">
                              ${item.originalPrice}
                            </span>
                          )}
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
          ) : (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-4">
                Start exploring experiences and add them to your wishlist
              </p>
              <Button>Explore Experiences</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

