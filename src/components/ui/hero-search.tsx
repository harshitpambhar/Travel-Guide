import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AIPlanner } from "@/components/ui/ai-planner";
import { useNavigate } from "react-router-dom";

export function HeroSearch() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    query: "",
    location: "",
    checkIn: "",
    guests: "2"
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchData.query) params.set("q", searchData.query);
    if (searchData.location) params.set("location", searchData.location);
    if (searchData.checkIn) params.set("date", searchData.checkIn);
    if (searchData.guests) params.set("guests", searchData.guests);
    
    navigate(`/search?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-white/95 backdrop-blur-sm shadow-lg border-0">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search destinations, experiences, or activities"
            value={searchData.query}
            onChange={(e) => setSearchData(prev => ({ ...prev, query: e.target.value }))}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 text-lg border-0 bg-secondary/50 focus:bg-white transition-colors"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-2">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Location"
              value={searchData.location}
              onChange={(e) => setSearchData(prev => ({ ...prev, location: e.target.value }))}
              onKeyPress={handleKeyPress}
              className="pl-10 h-12 w-full sm:w-40 border-0 bg-secondary/50 focus:bg-white transition-colors"
            />
          </div>
          
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="date"
              value={searchData.checkIn}
              onChange={(e) => setSearchData(prev => ({ ...prev, checkIn: e.target.value }))}
              onKeyPress={handleKeyPress}
              className="pl-10 h-12 w-full sm:w-36 border-0 bg-secondary/50 focus:bg-white transition-colors"
            />
          </div>
          
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <select
              value={searchData.guests}
              onChange={(e) => setSearchData(prev => ({ ...prev, guests: e.target.value }))}
              className="pl-10 h-12 w-full sm:w-32 border-0 bg-secondary/50 focus:bg-white transition-colors rounded-md"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            size="lg" 
            onClick={handleSearch}
            className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 font-semibold"
          >
            Search
          </Button>
          <AIPlanner />
        </div>
      </div>
    </Card>
  );
}