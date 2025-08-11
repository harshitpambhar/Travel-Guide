import { useMemo, useState } from "react";
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
import { MapPin, Compass } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

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
      "User-Agent": "wanderlux-demo/1.0 (AI planner)"
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
  const uniqueByName = new Map<string, NearbyPlace>();
  for (const place of results) {
    const existing = uniqueByName.get(place.name);
    if (!existing || place.distanceKm < existing.distanceKm) {
      uniqueByName.set(place.name, place);
    }
  }

  return Array.from(uniqueByName.values()).sort((a, b) => a.distanceKm - b.distanceKm);
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
          <span>{radiusKm[0]} km</span>
        </div>
        <Slider value={radiusKm} min={1} max={30} step={1} onValueChange={setRadiusKm} />
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
        <div className="grid gap-3 max-h-[60vh] overflow-auto">
          {places.map((p) => (
            <Card key={p.id} className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Badge variant="secondary">{p.category}</Badge>
                  <span>{p.distanceKm.toFixed(1)} km away</span>
                </div>
              </div>
              <a
                className="text-primary underline text-sm"
                href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=16/${p.lat}/${p.lon}`}
                target="_blank"
                rel="noreferrer"
              >
                Open map
              </a>
            </Card>
          ))}
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
          AI Planner
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Planner</DialogTitle>
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
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">AI Planner</h1>
        <p className="text-muted-foreground">Add a place and get nearby suggestions to visit.</p>
      </div>
      <PlannerPanel />
    </div>
  );
} 