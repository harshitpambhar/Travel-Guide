import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plane, 
  Building2, 
  Camera, 
  Utensils, 
  Car, 
  Waves,
  Mountain,
  Ticket,
  Smartphone,
  Users,
  Sparkles,
  TreePalm
} from "lucide-react";

const categories = [
  { 
    icon: Building2, 
    name: "Hotels & Stays", 
    description: "Luxury resorts to cozy hostels",
    color: "from-blue-500 to-cyan-500",
    count: "50K+"
  },
  { 
    icon: Ticket, 
    name: "Attractions", 
    description: "Theme parks, museums & landmarks",
    color: "from-purple-500 to-pink-500",
    count: "25K+"
  },
  { 
    icon: Camera, 
    name: "Tours & Activities", 
    description: "Guided tours and unique experiences",
    color: "from-green-500 to-emerald-500",
    count: "100K+"
  },
  { 
    icon: Utensils, 
    name: "Food & Dining", 
    description: "Culinary tours and restaurant deals",
    color: "from-orange-500 to-red-500",
    count: "30K+"
  },
  { 
    icon: Car, 
    name: "Transportation", 
    description: "Car rentals, transfers & transit",
    color: "from-indigo-500 to-blue-500",
    count: "15K+"
  },
  { 
    icon: Waves, 
    name: "Water Sports", 
    description: "Diving, surfing & boat tours",
    color: "from-cyan-500 to-blue-600",
    count: "8K+"
  },
  { 
    icon: Mountain, 
    name: "Adventure", 
    description: "Hiking, climbing & extreme sports",
    color: "from-green-600 to-teal-500",
    count: "12K+"
  },
  { 
    icon: Smartphone, 
    name: "Digital Services", 
    description: "WiFi, SIM cards & tech rentals",
    color: "from-gray-600 to-slate-500",
    count: "5K+"
  },
  { 
    icon: Users, 
    name: "Group Experiences", 
    description: "Team building & group activities",
    color: "from-violet-500 to-purple-500",
    count: "3K+"
  },
  { 
    icon: Sparkles, 
    name: "VR Previews", 
    description: "Virtual reality experience previews",
    color: "from-pink-500 to-rose-500",
    count: "New!"
  },
  { 
    icon: TreePalm, 
    name: "Eco Adventures", 
    description: "Sustainable & green travel options",
    color: "from-green-500 to-lime-500",
    count: "7K+"
  },
  { 
    icon: Plane, 
    name: "Flight Deals", 
    description: "Best flight offers & packages",
    color: "from-sky-500 to-blue-500",
    count: "∞"
  }
];

export function CategoriesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary/30 to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Explore by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From luxury stays to adrenaline-pumping adventures, discover experiences tailored to every passion
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.name}
                className="group cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-3 border-0 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">
                      {category.count}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="mt-4 w-full h-1 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${category.color} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}