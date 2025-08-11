import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: SignInFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in signupUserData (regular users)
      const signupUserData = localStorage.getItem('signupUserData');
      let userData = null;
      
      if (signupUserData) {
        try {
          const parsedData = JSON.parse(signupUserData);
          if (parsedData.email === values.email && parsedData.password === values.password) {
            userData = parsedData;
          }
        } catch (error) {
          console.error('Error parsing signup data:', error);
        }
      }
      
      // Check if admin exists (pre-defined admin accounts + development accounts)
      const adminAccounts = [
        {
          id: "admin_001",
          name: "Admin User",
          email: "admin@globetrotter.com",
          password: "admin123",
          type: "admin",
          phone: "+1 (555) 123-4567"
        },
        {
          id: "admin_002", 
          name: "Super Admin",
          email: "superadmin@globetrotter.com",
          password: "super123",
          type: "admin",
          phone: "+1 (555) 987-6543"
        }
      ];
      
      // Check for development-created admin accounts
      const devAdminAccounts = JSON.parse(localStorage.getItem('adminAccounts') || '[]');
      const allAdminAccounts = [...adminAccounts, ...devAdminAccounts];
      
      const adminAccount = allAdminAccounts.find(
        admin => admin.email === values.email && admin.password === values.password
      );
      
      if (adminAccount) {
        userData = adminAccount;
      }
      
      if (!userData) {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password and try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Set authentication status and user data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        type: userData.type,
        phone: userData.phone
      }));
      
      toast({
        title: "Welcome back!",
        description: `Successfully signed in as ${userData.name}`,
      });
      
      // Redirect based on user type
      if (userData.type === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      
    } catch (error) {
      toast({
        title: "Error signing in",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <p className="text-muted-foreground">Welcome back to GlobeTrotter</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground mb-2">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
              <p className="text-xs text-muted-foreground">
                Admin accounts are pre-configured and cannot be created through signup
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
