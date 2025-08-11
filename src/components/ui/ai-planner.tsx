import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Compass, Plus, Camera, Star, Upload, Globe, Thermometer, Calendar, Info } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GeocodeResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface OverpassNode {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface NearbyPlace {
  id: string;
  name: string;
  category: string;
  lat: number;
  lon: number;
  distanceKm: number;
}

interface UserContributedPlace {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  googleMapsUrl: string;
  imageUrl: string;
  weatherCondition: string;
  userReview: string;
  rating: number;
  submittedBy: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  verifiedAt?: Date;
  verifiedBy?: string;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function geocodePlace(query: string): Promise<GeocodeResult | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("q", query);

  const resp = await fetch(url.toString(), {
    headers: {
      "Accept": "application/json",
      // Courtesy header per Nominatim policy
      "User-Agent": "wanderlux-demo/1.0 (nearby places finder)"
    },
  });
  if (!resp.ok) return null;
  const data: GeocodeResult[] = await resp.json();
  return data[0] ?? null;
}

async function fetchNearbyAttractions(lat: number, lon: number, radiusMeters: number): Promise<OverpassNode[]> {
  const filters = [
    "tourism=attraction",
    "tourism=museum",
    "tourism=artwork",
    "tourism=viewpoint",
    "tourism=theme_park",
    "tourism=zoo",
    "tourism=gallery",
    // Some common leisure categories that are popular to visit
    "leisure=park",
    "leisure=garden",
  ];

  const around = `around:${Math.max(100, Math.min(50000, Math.round(radiusMeters)))},${lat},${lon}`;
  const body = `[
    out:json][timeout:25];(
    ${filters
      .map(
        (f) => `node(${around})[${f}];way(${around})[${f}];relation(${around})[${f}];`
      )
      .join("\n")}
  );out center 30;`;

  const resp = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({ data: body }).toString(),
  });
  if (!resp.ok) return [];
  const data = await resp.json();
  return (data?.elements ?? []) as OverpassNode[];
}

function toNearbyPlaces(elements: OverpassNode[], originLat: number, originLon: number): NearbyPlace[] {
  const results: NearbyPlace[] = [];

  for (const el of elements) {
    const name = el.tags?.name;
    const category = el.tags?.tourism || el.tags?.leisure || "place";
    const coords = el.center || (el.lat && el.lon ? { lat: el.lat, lon: el.lon } : undefined);
    if (!name || !coords) continue;

    const distanceKm = haversineDistanceKm(originLat, originLon, coords.lat, coords.lon);
    results.push({
      id: `${el.type}-${el.id}`,
      name,
      category,
      lat: coords.lat,
      lon: coords.lon,
      distanceKm,
    });
  }

  // Deduplicate by name and sort by distance
  const uniqueByName = new Map<string, NearbyPlace[]>();
  for (const place of results) {
    const existing = uniqueByName.get(place.name);
    if (!existing || place.distanceKm < existing[0].distanceKm) {
      uniqueByName.set(place.name, [place]);
    }
  }

  return Array.from(uniqueByName.values()).map(places => places[0]).sort((a, b) => a.distanceKm - b.distanceKm);
}

function UserContributionForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    address: '',
    googleMapsUrl: '',
    imageUrl: '',
    weatherCondition: '',
    userReview: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    'attraction', 'museum', 'artwork', 'viewpoint', 'theme_park', 'zoo', 'gallery',
    'park', 'garden', 'restaurant', 'cafe', 'shopping', 'historic', 'cultural', 'natural'
  ];

  const weatherConditions = [
    'Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy', 'Foggy', 'Clear', 'Partly Cloudy'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call - in real app, this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create the contribution object
      const contribution: UserContributedPlace = {
        id: `user-${Date.now()}`,
        ...formData,
        submittedBy: 'Anonymous User', // In real app, get from auth
        submittedAt: new Date(),
        status: 'pending'
      };

      // Store in localStorage for demo (in real app, send to backend)
      const existing = JSON.parse(localStorage.getItem('userContributions') || '[]');
      existing.push(contribution);
      localStorage.setItem('userContributions', JSON.stringify(existing));

      setSubmitSuccess(true);
      setFormData({
        name: '', description: '', category: '', address: '', googleMapsUrl: '',
        imageUrl: '', weatherCondition: '', userReview: '', rating: 5
      });
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting contribution:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitSuccess) {
    return (
      <Card className="p-6 text-center">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-4">
          Your place contribution has been submitted successfully and is now under admin review.
        </p>
        <p className="text-sm text-muted-foreground">
          We'll notify you once it's verified and added to our database.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Add a New Place
        </h3>
        <p className="text-muted-foreground">
          Can't find the place you're looking for? Help other travelers by adding it to our database!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Place Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter the name of the place"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe what this place is about, what makes it special..."
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address/Location *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Street address, city, country"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="googleMapsUrl">Google Maps URL *</Label>
            <Input
              id="googleMapsUrl"
              value={formData.googleMapsUrl}
              onChange={(e) => handleInputChange('googleMapsUrl', e.target.value)}
              placeholder="https://maps.google.com/..."
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-muted-foreground">
              Provide a direct link to an image of the place
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weatherCondition">Typical Weather</Label>
            <Select value={formData.weatherCondition} onValueChange={(value) => handleInputChange('weatherCondition', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select weather condition" />
              </SelectTrigger>
              <SelectContent>
                {weatherConditions.map(weather => (
                  <SelectItem key={weather} value={weather}>{weather}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="userReview">Your Review *</Label>
          <Textarea
            id="userReview"
            value={formData.userReview}
            onChange={(e) => handleInputChange('userReview', e.target.value)}
            placeholder="Share your experience, tips, and recommendations..."
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Your Rating *</Label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleInputChange('rating', star)}
                className={`text-2xl transition-colors ${
                  star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {formData.rating}/5 stars
            </span>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Submission Process:</p>
              <ul className="space-y-1">
                <li>• Your contribution will be reviewed by our admin team</li>
                <li>• We'll verify the location and details you provided</li>
                <li>• Once approved, it will be added to our database</li>
                <li>• You'll be notified when your place is live</li>
              </ul>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full h-12 text-lg"
        >
          {isSubmitting ? (
            <>
              <Upload className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Submit for Review
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

function PlannerPanel() {
  const [query, setQuery] = useState("");
  const [radiusKm, setRadiusKm] = useState<number[]>([5]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originName, setOriginName] = useState<string | null>(null);
  const [originCoords, setOriginCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [places, setPlaces] = useState<NearbyPlace[]>([]);

  const disabled = useMemo(() => !query.trim() || loading, [query, loading]);

  async function handleSuggest() {
    try {
      setLoading(true);
      setError(null);
      setPlaces([]);

      const geo = await geocodePlace(query.trim());
      if (!geo) {
        setError("Place not found. Try a more specific name.");
        return;
      }
      const lat = parseFloat(geo.lat);
      const lon = parseFloat(geo.lon);
      setOriginName(geo.display_name);
      setOriginCoords({ lat, lon });

      const results = await fetchNearbyAttractions(lat, lon, radiusKm[0] * 1000);
      const normalized = toNearbyPlaces(results, lat, lon).slice(0, 20);
      setPlaces(normalized);
    } catch (e) {
      setError("Unable to fetch suggestions right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Enter a place, city or landmark (e.g., Eiffel Tower)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-11"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Search radius</span>
          <span className="font-medium text-primary">{radiusKm[0]} km</span>
        </div>
        <Slider value={radiusKm} min={1} max={30} step={1} onValueChange={setRadiusKm} />
        <div className="text-xs text-muted-foreground">
          {radiusKm[0] <= 5 ? "Small radius - perfect for city centers" : 
           radiusKm[0] <= 15 ? "Medium radius - great for exploring neighborhoods" : 
           "Large radius - ideal for regional discovery"}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleSuggest} disabled={disabled} className="gap-2">
          {loading ? "Finding nearby places..." : "Suggest nearby places"}
        </Button>
        {originCoords && (
          <a
            className="text-sm text-primary underline"
            href={`https://www.openstreetmap.org/?mlat=${originCoords.lat}&mlon=${originCoords.lon}#map=14/${originCoords.lat}/${originCoords.lon}`}
            target="_blank"
            rel="noreferrer"
          >
            View origin on map
          </a>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      {originName && (
        <div className="text-sm text-muted-foreground">Origin: {originName}</div>
      )}

      {places.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Found {places.length} places nearby</h3>
            <Badge variant="outline" className="text-xs">
              {originName && `Around ${originName.split(',')[0]}`}
            </Badge>
          </div>
          
          <div className="grid gap-3 max-h-[60vh] overflow-auto">
            {places.map((p, index) => (
              <Card key={p.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-mono">#{index + 1}</span>
                      <div className="font-medium text-lg">{p.name}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="capitalize">{p.category}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {p.distanceKm.toFixed(1)} km away
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <a
                      className="text-primary underline text-sm hover:text-primary/80 transition-colors"
                      href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=16/${p.lat}/${p.lon}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open map
                    </a>
                    <span className="text-xs text-muted-foreground">
                      {p.distanceKm <= 1 ? "Walking distance" : 
                       p.distanceKm <= 5 ? "Short trip" : 
                       p.distanceKm <= 15 ? "Medium trip" : "Longer journey"}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center text-sm text-muted-foreground pt-4 border-t">
            💡 Tip: Click "Open map" to get detailed directions and explore the area around each location
          </div>
        </div>
      )}
    </div>
  );
}

export function AIPlanner() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-12 px-6 gap-2">
          <Compass className="h-4 w-4" />
          Nearby Places
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nearby Places</DialogTitle>
          <DialogDescription>
            Add a place and get nearby suggestions to visit.
          </DialogDescription>
        </DialogHeader>
        <PlannerPanel />
      </DialogContent>
    </Dialog>
  );
}

export function AIPlannerInline() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Nearby Places Discovery
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Find amazing attractions, museums, parks, and points of interest around any location worldwide
        </p>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="text-blue-600 text-2xl mb-2">🌍</div>
            <h3 className="font-semibold text-blue-900 mb-1">Global Coverage</h3>
            <p className="text-sm text-blue-700">Search anywhere in the world - from major cities to remote landmarks</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="text-green-600 text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-green-900 mb-1">Smart Discovery</h3>
            <p className="text-sm text-green-700">Find museums, parks, viewpoints, and attractions within your chosen radius</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="text-purple-600 text-2xl mb-2">🗺️</div>
            <h3 className="font-semibold text-purple-900 mb-1">Interactive Maps</h3>
            <p className="text-sm text-purple-700">Open each location directly in OpenStreetMap for detailed navigation</p>
          </div>
        </div>

        {/* How to use section */}
        <div className="bg-gray-50 p-6 rounded-lg border mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            How to Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="font-medium">Enter a Location</h4>
                  <p className="text-sm text-muted-foreground">Type a city, landmark, or address (e.g., "Eiffel Tower", "Tokyo", "Times Square")</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="font-medium">Set Search Radius</h4>
                  <p className="text-sm text-muted-foreground">Adjust the slider to find places within 1-30 km of your location</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="font-medium">Discover Places</h4>
                  <p className="text-sm text-muted-foreground">Get a curated list of nearby attractions with categories and distances</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                <div>
                  <h4 className="font-medium">Explore Further</h4>
                  <p className="text-sm text-muted-foreground">Click "Open map" to view each location in detail on OpenStreetMap</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search examples */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-lg border border-primary/20 mb-8">
          <h3 className="text-lg font-semibold mb-3 text-primary">💡 Search Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Famous Landmarks</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Eiffel Tower, Paris</li>
                <li>• Big Ben, London</li>
                <li>• Sydney Opera House</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Cities & Districts</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Shibuya, Tokyo</li>
                <li>• Times Square, Manhattan</li>
                <li>• Montmartre, Paris</li>
                <li>• Old Town, Prague</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main functionality with tabs */}
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Compass className="h-4 w-4" />
            Search Places
          </TabsTrigger>
          <TabsTrigger value="contribute" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Place
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="space-y-6">
          <PlannerPanel />
          
          {/* Additional info */}
          <div className="mt-12 bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">ℹ️ About This Tool</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Data Sources</h4>
                <p>We use OpenStreetMap data through Nominatim for geocoding and Overpass API for finding nearby places. This ensures comprehensive, up-to-date information about attractions worldwide.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Categories Included</h4>
                <p>Museums, art galleries, theme parks, zoos, viewpoints, parks, gardens, and other tourist attractions. Each place shows its category and distance from your search location.</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="contribute" className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-green-600 text-2xl">🌟</div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">Help Build Our Database!</h3>
                <p className="text-green-800">
                  Found a hidden gem that's not in our database? Share it with fellow travelers! 
                  Your contribution will be reviewed by our team and added to help others discover amazing places.
                </p>
              </div>
            </div>
          </div>
          
          <UserContributionForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Admin Panel Component for reviewing user contributions
export function AdminReviewPanel() {
  const [contributions, setContributions] = useState<UserContributedPlace[]>([]);
  const [selectedContribution, setSelectedContribution] = useState<UserContributedPlace | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Load contributions from localStorage (in real app, this would be from your backend)
  useEffect(() => {
    const stored = localStorage.getItem('userContributions');
    if (stored) {
      setContributions(JSON.parse(stored));
    }
  }, []);

  const handleApprove = async (contribution: UserContributedPlace) => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updated = contributions.map(c => 
        c.id === contribution.id 
          ? { ...c, status: 'approved' as const, verifiedAt: new Date(), verifiedBy: 'Admin', adminNotes }
          : c
      );
      
      setContributions(updated);
      localStorage.setItem('userContributions', JSON.stringify(updated));
      setSelectedContribution(null);
      setAdminNotes('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (contribution: UserContributedPlace) => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updated = contributions.map(c => 
        c.id === contribution.id 
          ? { ...c, status: 'rejected' as const, adminNotes }
          : c
      );
      
      setContributions(updated);
      localStorage.setItem('userContributions', JSON.stringify(updated));
      setSelectedContribution(null);
      setAdminNotes('');
    } finally {
      setIsProcessing(false);
    }
  };

  const pendingContributions = contributions.filter(c => c.status === 'pending');
  const approvedContributions = contributions.filter(c => c.status === 'approved');
  const rejectedContributions = contributions.filter(c => c.status === 'rejected');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Review Panel</h1>
        <p className="text-muted-foreground">Review and manage user-contributed places</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Reviews */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-orange-600">Pending Review ({pendingContributions.length})</h2>
          {pendingContributions.map(contribution => (
            <Card key={contribution.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedContribution(contribution)}>
              <div className="space-y-2">
                <h3 className="font-medium">{contribution.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{contribution.description}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{contribution.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(contribution.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Approved Places */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-green-600">Approved ({approvedContributions.length})</h2>
          {approvedContributions.map(contribution => (
            <Card key={contribution.id} className="p-4 bg-green-50 border-green-200">
              <div className="space-y-2">
                <h3 className="font-medium">{contribution.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{contribution.description}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{contribution.category}</Badge>
                  <span className="text-xs text-green-600">
                    ✓ Approved {contribution.verifiedAt && new Date(contribution.verifiedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Rejected Places */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-red-600">Rejected ({rejectedContributions.length})</h2>
          {rejectedContributions.map(contribution => (
            <Card key={contribution.id} className="p-4 bg-red-50 border-red-200">
              <div className="space-y-2">
                <h3 className="font-medium">{contribution.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{contribution.description}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{contribution.category}</Badge>
                  <span className="text-xs text-red-600">✗ Rejected</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedContribution && (
        <Dialog open={!!selectedContribution} onOpenChange={() => setSelectedContribution(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review: {selectedContribution.name}</DialogTitle>
              <DialogDescription>
                Submitted by {selectedContribution.submittedBy} on {new Date(selectedContribution.submittedAt).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Place Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Category</Label>
                  <p className="text-sm text-muted-foreground">{selectedContribution.category}</p>
                </div>
                <div>
                  <Label className="font-medium">Address</Label>
                  <p className="text-sm text-muted-foreground">{selectedContribution.address}</p>
                </div>
                <div>
                  <Label className="font-medium">Weather Condition</Label>
                  <p className="text-sm text-muted-foreground">{selectedContribution.weatherCondition || 'Not specified'}</p>
                </div>
                <div>
                  <Label className="font-medium">Rating</Label>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={`text-lg ${i < selectedContribution.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">({selectedContribution.rating}/5)</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-medium">Description</Label>
                <p className="text-sm text-muted-foreground">{selectedContribution.description}</p>
              </div>

              <div>
                <Label className="font-medium">User Review</Label>
                <p className="text-sm text-muted-foreground">{selectedContribution.userReview}</p>
              </div>

              {selectedContribution.imageUrl && (
                <div>
                  <Label className="font-medium">Image</Label>
                  <img 
                    src={selectedContribution.imageUrl} 
                    alt={selectedContribution.name}
                    className="w-full max-w-md h-auto rounded-lg border"
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder.svg"; }}
                  />
                </div>
              )}

              <div>
                <Label className="font-medium">Google Maps</Label>
                <a 
                  href={selectedContribution.googleMapsUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-primary underline text-sm hover:text-primary/80"
                >
                  View on Google Maps
                </a>
              </div>

              {/* Admin Actions */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="adminNotes">Admin Notes</Label>
                  <Textarea
                    id="adminNotes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes about this contribution..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => handleApprove(selectedContribution)}
                    disabled={isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? 'Processing...' : '✓ Approve'}
                  </Button>
                  <Button 
                    onClick={() => handleReject(selectedContribution)}
                    disabled={isProcessing}
                    variant="destructive"
                    className="flex-1"
                  >
                    {isProcessing ? 'Processing...' : '✗ Reject'}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 