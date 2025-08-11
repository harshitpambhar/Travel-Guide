import { useState } from "react";
import { Menu, X, Heart, User, Globe, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Experiences", href: "#" },
    { name: "Hotels", href: "#" },
    { name: "Flights", href: "#" },
    { name: "AI Planner", href: "#", isNew: true },
    { name: "Deals", href: "#" },
    { name: "VR Preview", href: "#", isNew: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
               TravelLook
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <a
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1"
                >
                  {item.name}
                  {item.isNew && (
                    <Badge className="ml-1 text-xs px-1 py-0 h-4 bg-accent text-white">
                      New
                    </Badge>
                  )}
                </a>
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              EN
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent">
              Join Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.name} className="flex items-center">
                  <a
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1"
                  >
                    {item.name}
                    {item.isNew && (
                      <Badge className="ml-1 text-xs px-1 py-0 h-4 bg-accent text-white">
                        New
                      </Badge>
                    )}
                  </a>
                </div>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-6">
              <Button variant="outline" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-primary to-accent justify-start">
                Join Free
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}