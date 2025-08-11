import { useState, useEffect } from "react";
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
  const [user, setUser] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Check localStorage on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setIsLoading(false);
  }, []);

  const navItems = [
    { name: "Experiences", href: "/experiences" },
    { name: "Hotels", href: "/hotels" },
    { name: "Packages", href: "/packages", isNew: true },
    { name: "Flights", href: "/flights" },
    { name: "Nearby Places", href: "/ai-planner", isNew: true },
    { name: "Deals", href: "/deals" },
    { name: "VR Preview", href: "/vr-preview", isNew: true },
    { name: "Submit Location", href: "/submit-location", isNew: true },
  ];

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate("/signin");
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
              <span className="text-white font-bold text-xl">TG</span>
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
            
            {isAuthenticated && !isLoading && user.name ? (
              <>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
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
                    <div className="px-2 py-1.5 text-sm text-muted-foreground border-b border-border/50 mb-2">
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-xs">{user.email}</div>
                      {user.type && (
                        <div className="text-xs text-primary capitalize">{user.type}</div>
                      )}
                    </div>
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
              </>
            ) : !isLoading && (
              <>
                <Link to="/signin">
                  <Button variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-primary to-accent">
                    Sign Up
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                      <Globe className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate("/admin")}>Dashboard</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/admin/users")}>Users</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/admin/hotels")}>Hotels</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/admin/experiences")}>Experiences</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/admin/packages")}>Packages</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/admin/flights")}>Flights</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/admin/bookings")}>Bookings</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/admin/reviews")}>Reviews</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/admin/analytics")}>Analytics</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/admin/profile")}>Profile/Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
          <div className="lg:hidden py-4 border-t border-border/50 bg-white shadow-xl">
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
              {isAuthenticated && !isLoading && user.name ? (
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
                    Logout
                  </Button>
                </>
              ) : !isLoading && (
                <>
                  <Link to="/signin" className="w-full">
                    <Button variant="outline" className="justify-start w-full">
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-full">
                    <Button className="bg-gradient-to-r from-primary to-accent justify-start w-full">
                      Sign Up
                    </Button>
                  </Link>
                  <Button variant="outline" className="justify-start border-orange-200 text-orange-700 hover:bg-orange-50" onClick={() => navigate("/admin")}>
                    <Globe className="h-4 w-4 mr-2" />
                    Admin
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