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
  Eye,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Headphones,
  Globe
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

// Mock VR experiences data
const vrExperiences = [
  {
    id: "1",
    title: "Bali Temple Virtual Tour",
    description: "Explore ancient temples and sacred sites of Bali in immersive 360° VR",
    location: "Ubud, Bali",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&h=400&fit=crop",
    duration: "15 min",
    price: 15.00,
    originalPrice: 20.00,
    category: "Cultural",
    rating: 4.9,
    reviewCount: 8543,
    features: ["360° Views", "Audio Guide", "Interactive Elements", "Mobile Compatible"],
    isPopular: true,
    isExclusive: true,
    vrType: "360° Tour",
    supportedDevices: ["VR Headset", "Mobile", "Desktop"]
  },
  {
    id: "2",
    title: "Tokyo Street Food VR Experience",
    description: "Walk through bustling Tokyo streets and experience authentic street food culture",
    location: "Shibuya, Tokyo",
    image: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=600&h=400&fit=crop",
    duration: "20 min",
    price: 12.00,
    originalPrice: 18.00,
    category: "Food & Culture",
    rating: 4.8,
    reviewCount: 6789,
    features: ["Interactive Food Stalls", "Local Guide", "Recipe Sharing", "Cultural Insights"],
    isPopular: true,
    isExclusive: false,
    vrType: "Interactive VR",
    supportedDevices: ["VR Headset", "Mobile"]
  },
  {
    id: "3",
    title: "Santorini Sunset VR Cruise",
    description: "Sail through the Aegean Sea and witness the magical Santorini sunset",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1469796466635-681d485cbeb0?w=600&h=400&fit=crop",
    duration: "25 min",
    price: 18.00,
    originalPrice: 25.00,
    category: "Nature & Scenery",
    rating: 4.9,
    reviewCount: 15234,
    features: ["Sunset Views", "Ocean Sounds", "Wind Effects", "Photography Mode"],
    isPopular: false,
    isExclusive: true,
    vrType: "Immersive VR",
    supportedDevices: ["VR Headset", "Desktop"]
  },
  {
    id: "4",
    title: "Machu Picchu Ancient Ruins VR",
    description: "Explore the mysterious Inca citadel and learn about its fascinating history",
    location: "Cusco, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop",
    duration: "30 min",
    price: 22.00,
    originalPrice: 30.00,
    category: "Historical",
    rating: 4.7,
    reviewCount: 8923,
    features: ["Historical Narration", "Archaeological Details", "Time Travel Mode", "Educational Content"],
    isPopular: true,
    isExclusive: false,
    vrType: "Educational VR",
    supportedDevices: ["VR Headset", "Mobile", "Desktop"]
  },
  {
    id: "5",
    title: "Northern Lights VR Experience",
    description: "Witness the spectacular aurora borealis in the Arctic wilderness",
    location: "Reykjavik, Iceland",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop",
    duration: "18 min",
    price: 16.00,
    originalPrice: 22.00,
    category: "Nature & Scenery",
    rating: 4.8,
    reviewCount: 5678,
    features: ["Aurora Simulation", "Arctic Sounds", "Night Sky Views", "Time-lapse Mode"],
    isPopular: false,
    isExclusive: true,
    vrType: "Immersive VR",
    supportedDevices: ["VR Headset", "Desktop"]
  },
  {
    id: "6",
    title: "Singapore Marina Bay VR Walk",
    description: "Stroll through Singapore's iconic Marina Bay area and skyline",
    location: "Marina Bay, Singapore",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    duration: "12 min",
    price: 10.00,
    originalPrice: 15.00,
    category: "City Tours",
    rating: 4.6,
    reviewCount: 4321,
    features: ["City Views", "Architecture Details", "Night Mode", "Local Commentary"],
    isPopular: true,
    isExclusive: false,
    vrType: "360° Tour",
    supportedDevices: ["VR Headset", "Mobile", "Desktop"]
  }
];

const categories = [
  "All Categories",
  "Cultural",
  "Food & Culture",
  "Nature & Scenery",
  "Historical",
  "City Tours",
  "Adventure",
  "Educational"
];

const vrTypes = [
  "All Types",
  "360° Tour",
  "Interactive VR",
  "Immersive VR",
  "Educational VR"
];

const devices = [
  "All Devices",
  "VR Headset",
  "Mobile",
  "Desktop"
];

export default function VRPreviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedVRType, setSelectedVRType] = useState("All Types");
  const [selectedDevice, setSelectedDevice] = useState("All Devices");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const filteredExperiences = vrExperiences.filter(experience => {
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || experience.category === selectedCategory;
    const matchesVRType = selectedVRType === "All Types" || experience.vrType === selectedVRType;
    const matchesDevice = selectedDevice === "All Devices" || experience.supportedDevices.includes(selectedDevice);
    const matchesPrice = experience.price >= priceRange[0] && experience.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesVRType && matchesDevice && matchesPrice;
  });

  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "duration":
        return parseInt(a.duration.replace(/\D/g, "")) - parseInt(b.duration.replace(/\D/g, ""));
      case "rating":
        return b.rating - a.rating;
      case "popularity":
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const handlePlayExperience = (id: string) => {
    setSelectedExperience(id);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-8 w-8 text-blue-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                VR Preview Experiences
              </h1>
            </div>
            <p className="text-muted-foreground">
              Immerse yourself in virtual reality tours and experiences before you travel
            </p>
          </div>

          {/* VR Experience Player */}
          {selectedExperience && (
            <Card className="p-6 mb-6 bg-black text-white">
              <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">VR Experience Loading...</h3>
                    <p className="text-gray-300">Put on your VR headset or use your device</p>
                  </div>
                </div>
                
                {/* VR Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedExperience(null)}
                      className="text-white border-white hover:bg-white/20"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search VR experiences, destinations, or activities..."
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
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
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
              
              <Select value={selectedVRType} onValueChange={setSelectedVRType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {vrTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {devices.map(device => (
                    <SelectItem key={device} value={device}>{device}</SelectItem>
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
                    max={50}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Device Compatibility</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vr-headset" />
                      <label htmlFor="vr-headset" className="text-sm flex items-center gap-1">
                        <Headphones className="h-3 w-3" />
                        VR Headset
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile" />
                      <label htmlFor="mobile" className="text-sm flex items-center gap-1">
                        <Smartphone className="h-3 w-3" />
                        Mobile Device
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="desktop" />
                      <label htmlFor="desktop" className="text-sm flex items-center gap-1">
                        <Monitor className="h-3 w-3" />
                        Desktop Computer
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {sortedExperiences.length} of {vrExperiences.length} VR experiences
            </p>
          </div>

          {/* VR Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedExperiences.map((experience, index) => (
              <Card 
                key={experience.id}
                className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className="bg-blue-500 text-white font-semibold">
                      {experience.vrType}
                    </Badge>
                    {experience.isExclusive && (
                      <Badge className="bg-gradient-to-r from-accent to-primary text-white font-semibold">
                        WanderLux Exclusive
                      </Badge>
                    )}
                    {experience.isPopular && (
                      <Badge variant="secondary" className="bg-red-500 text-white">
                        🔥 Popular
                      </Badge>
                    )}
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      onClick={() => handlePlayExperience(experience.id)}
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      <Play className="h-6 w-6 mr-2" />
                      Try VR Experience
                    </Button>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white rounded-full px-3 py-1 text-sm">
                    {experience.duration}
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      {experience.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{experience.rating}</span>
                      <span className="text-muted-foreground">({experience.reviewCount.toLocaleString()})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {experience.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {experience.description}
                  </p>
                  
                  <p className="text-muted-foreground text-sm mb-3 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {experience.location}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {experience.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-secondary/60">
                        {feature}
                      </Badge>
                    ))}
                    {experience.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-secondary/60">
                        +{experience.features.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {experience.supportedDevices.map((device, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {device === "VR Headset" && <Headphones className="h-3 w-3 mr-1" />}
                        {device === "Mobile" && <Smartphone className="h-3 w-3 mr-1" />}
                        {device === "Desktop" && <Monitor className="h-3 w-3 mr-1" />}
                        {device}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">
                          ${experience.price}
                        </span>
                        {experience.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${experience.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">per experience</span>
                    </div>
                    
                    <Button 
                      onClick={() => handlePlayExperience(experience.id)}
                      className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview VR
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedExperiences.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No VR experiences found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSelectedVRType("All Types");
                setSelectedDevice("All Devices");
                setPriceRange([0, 50]);
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
