import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COUNTRIES } from "./countries";

// Example: Static state mapping (expand as needed)
const STATES: Record<string, string[]> = {
  US: [
    "California", "Texas", "New York", "Florida", "Illinois",
    "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"
  ],
  IN: [
    "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "West Bengal",
    "Uttar Pradesh", "Gujarat", "Rajasthan", "Madhya Pradesh", "Bihar"
  ],
  // ...other countries as before
  FR: ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Nouvelle-Aquitaine"],
  CA: ["Ontario", "Quebec", "British Columbia", "Alberta"],
  AU: ["New South Wales", "Victoria", "Queensland", "Western Australia"],
  CN: ["Beijing", "Shanghai", "Guangdong", "Sichuan"],
  GB: ["England", "Scotland", "Wales", "Northern Ireland"],
  DE: ["Bavaria", "Berlin", "Hamburg", "Hesse"],
  JP: ["Tokyo", "Osaka", "Kyoto", "Hokkaido"],
};

// Example: Mock hotel data
const HOTELS: Record<string, { name: string; address: string; rating: number }[]> = {
  // US States
  ...Object.fromEntries(
    [
      "California", "Texas", "New York", "Florida", "Illinois",
      "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"
    ].map(state => [
      `US-${state}`,
      Array.from({ length: 10 }, (_, i) => ({
        name: `Hotel ${state} ${i + 1}`,
        address: `${state} City ${i + 1}`,
        rating: 4 + (i % 2) * 0.3
      }))
    ])
  ),
  // IN States
  ...Object.fromEntries(
    [
      "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "West Bengal",
      "Uttar Pradesh", "Gujarat", "Rajasthan", "Madhya Pradesh", "Bihar"
    ].map(state => [
      `IN-${state}`,
      Array.from({ length: 10 }, (_, i) => ({
        name: `Hotel ${state} ${i + 1}`,
        address: `${state} City ${i + 1}`,
        rating: 4 + (i % 2) * 0.2
      }))
    ])
  ),
  // Example for France
  "FR-Île-de-France": Array.from({ length: 10 }, (_, i) => ({
    name: `Hotel Île-de-France ${i + 1}`,
    address: `Paris Area ${i + 1}`,
    rating: 4.5 + (i % 2) * 0.2
  })),
  // Add more as needed
};

export function HotelFinder() {
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState(COUNTRIES);

  useEffect(() => {
    setFilteredCountries(
      COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  // If country has states, show states, else show a single "All" option
  const states = country ? (STATES[country] || ["All"]) : [];
  // If "All" is selected, show all hotels for all states in the country
  let hotels: { name: string; address: string; rating: number }[] = [];
  if (country && state) {
    if (state === "All") {
      hotels = Object.keys(HOTELS)
        .filter(key => key.startsWith(`${country}-`))
        .flatMap(key => HOTELS[key]);
    } else {
      hotels = HOTELS[`${country}-${state}`] || [];
    }
  }

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Find Hotels</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search country"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCountry("");
              setState("");
            }}
          />
          <Select value={country} onValueChange={val => { setCountry(val); setState(""); }}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {filteredCountries.map(c => (
                <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={state} onValueChange={setState} disabled={!country}>
            <SelectTrigger>
              <SelectValue placeholder={country ? "Select state/region" : "Select country first"} />
            </SelectTrigger>
            <SelectContent>
              {states.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {country && state && hotels.length > 0 && (
        <div className="grid gap-3 mt-4">
          {hotels.map((h, i) => (
            <Card key={i} className="p-4">
              <div className="font-medium">{h.name}</div>
              <div className="text-sm text-muted-foreground">{h.address}</div>
              <div className="text-sm">Rating: {h.rating}</div>
            </Card>
          ))}
        </div>
      )}
      {country && state && hotels.length === 0 && (
        <div className="text-muted-foreground mt-4">No hotels found for this region.</div>
      )}
    </div>
  );
}
