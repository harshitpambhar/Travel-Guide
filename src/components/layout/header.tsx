import { useState } from "react";
import { Menu, X, Heart, User, Globe, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Experiences", href: "/experiences" },
    { name: "Hotels", href: "/hotels" },
    { name: "Packages", href: "/packages", isNew: true },
    { name: "Flights", href: "/flights" },
    { name: "Nearby Places", href: "/ai-planner", isNew: true },
    { name: "Deals", href: "/deals" },
    { name: "VR Preview", href: "/vr-preview", isNew: true },
  ];

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50 h-24">
      <div className="container mx-auto px-4">
        {/* Top Row - Logo and Actions */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TravelGuide
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              EN
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Link to="/wishlist">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/wishlist")}>
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <Globe className="mr-2 h-4 w-4" />
                    Admin Panel
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" onClick={handleSignIn}>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="outline" onClick={() => navigate("/admin")} className="border-orange-200 text-orange-700 hover:bg-orange-50">
                  <Globe className="h-4 w-4 mr-2" />
                  Admin
                </Button>
                <Button className="bg-gradient-to-r from-primary to-accent">
                  Join Free
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Bottom Row - Navigation */}
        <div className="hidden lg:block border-t border-border/30">
          <nav className="flex items-center justify-center space-x-11 py-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  to={item.href}
                  className={`transition-colors font-medium flex items-center gap-1 ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                  {item.isNew && (
                    <Badge className="ml-1 text-xs px-1 py-0 h-4 bg-accent text-white">
                      New
                    </Badge>
                  )}
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.name} className="flex items-center">
                  <Link
                    to={item.href}
                    className={`transition-colors font-medium flex items-center gap-1 ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                    {item.isNew && (
                      <Badge className="ml-1 text-xs px-1 py-0 h-4 bg-accent text-white">
                        New
                      </Badge>
                    )}
                  </Link>
                </div>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-6">
              {isAuthenticated ? (
                <>
                  <Button variant="outline" className="justify-start" onClick={() => navigate("/profile")}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate("/wishlist")}>
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate("/admin")}>
                    <Globe className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="justify-start" onClick={handleSignIn}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button variant="outline" className="justify-start border-orange-200 text-orange-700 hover:bg-orange-50" onClick={() => navigate("/admin")}>
                    <Globe className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                  <Button className="bg-gradient-to-r from-primary to-accent justify-start">
                    Join Free
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}