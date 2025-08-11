import { useMemo, useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Filter, MapPin, Users, Calendar as CalendarIcon, Plane, DollarSign, Clock } from "lucide-react";
import type { TravelPackage } from "@/types/travel-package";
import { samplePackages } from "@/utils/samplePackages";
import { useNavigate } from "react-router-dom";

type SortKey = "popularity" | "price-asc" | "price-desc" | "duration";

export default function PackagesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState("All Destinations");
  const [duration, setDuration] = useState<[number, number]>([3, 15]);
  const [price, setPrice] = useState<[number, number]>([500, 3000]);
  const [sortBy, setSortBy] = useState<SortKey>("popularity");
  const [showFilters, setShowFilters] = useState(false);

  const destinations = useMemo(() => {
    const all = new Set<string>();
    samplePackages.forEach(p => p.destinations.forEach(d => all.add(d)));
    return ["All Destinations", ...Array.from(all).sort()];
  }, []);

  const filtered: TravelPackage[] = useMemo(() => {
    return samplePackages.filter(p => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.destinations.some(d => d.toLowerCase().includes(query.toLowerCase()));
      const matchesDestination = destination === "All Destinations" || p.destinations.includes(destination);
      const matchesDuration = p.days >= duration[0] && p.days <= duration[1];
      const matchesPrice = p.price >= price[0] && p.price <= price[1];
      return matchesQuery && matchesDestination && matchesDuration && matchesPrice;
    });
  }, [query, destination, duration, price]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "price-asc":
        return arr.sort((a, b) => a.price - b.price);
      case "price-desc":
        return arr.sort((a, b) => b.price - a.price);
      case "duration":
        return arr.sort((a, b) => a.days - b.days);
      case "popularity":
      default:
        return arr.sort((a, b) => b.popularity - a.popularity);
    }
  }, [filtered, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Travel Packages</h1>
            <p className="text-muted-foreground">Curated multi-day trips with detailed itineraries</p>
          </div>

          <div className="mb-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Search packages or destinations..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {showFilters && (
            <Card className="p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock className="h-4 w-4" /> Duration (days)</h3>
                  <Slider value={duration} onValueChange={(v) => setDuration(v as [number, number])} min={3} max={21} step={1} />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>{duration[0]} days</span>
                    <span>{duration[1]} days</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2"><DollarSign className="h-4 w-4" /> Price Range</h3>
                  <Slider value={price} onValueChange={(v) => setPrice(v as [number, number])} min={300} max={4000} step={50} />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${price[0]}</span>
                    <span>${price[1]}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="mb-6">
            <p className="text-muted-foreground">Showing {sorted.length} of {samplePackages.length} packages</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((pkg, index) => (
              <Card key={pkg.id} className="overflow-hidden group bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 0.06}s` }}>
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={pkg.images[0]} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">{pkg.name}</h3>
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white">{pkg.days} days</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {pkg.destinations.map((d) => (
                      <span key={d} className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="inline-flex items-center gap-1"><CalendarIcon className="h-4 w-4" />{pkg.startDate} → {pkg.endDate}</div>
                    <div className="inline-flex items-center gap-1"><Users className="h-4 w-4" />{pkg.availableSlots} slots</div>
                  </div>
                  <div className="flex items-end justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">${pkg.price}</span>
                      <span className="text-sm text-muted-foreground">per traveler</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => navigate(`/packages/${pkg.id}`)} className="gap-1"><Plane className="h-4 w-4" /> Details</Button>
                      <Button onClick={() => navigate(`/packages/${pkg.id}#book`)}>Book Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}


