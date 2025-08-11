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
<<<<<<< HEAD
=======
import { supabase } from "@/lib/supabase";
import bcrypt from 'bcryptjs';
import { profileService } from "@/services/profileService";
>>>>>>> df4bac4 (third commit)

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type UserFormData = z.infer<typeof userSchema>;

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (values: UserFormData) => {
    setIsSubmitting(true);
    
    try {
<<<<<<< HEAD
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data in localStorage (in a real app, this would go to a database)
      const userData = {
        id: Date.now().toString(),
        name: values.name,
        email: values.email,
        phone: values.phone,
        type: "user", // Only regular users can sign up
        password: values.password, // In real app, this would be hashed
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('signupUserData', JSON.stringify(userData));
      
      toast({
        title: "Account created successfully!",
        description: "Please sign in with your new account.",
      });
      
      // Redirect to sign in page
      navigate('/signin');
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Please try again later.",
=======
      // Sign up the user with Supabase auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            phone: values.phone,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Create an initial profile row linked to the auth user
      const authedUser = signUpData.user;
      if (authedUser?.id) {
        try {
          // Hash the password before storing in the users table (never store plaintext)
          const passwordHash = await bcrypt.hash(values.password, 10);
          await supabase.from('users').upsert({
            id: authedUser.id,
            email: values.email,
            password_hash: passwordHash,
          });

          await profileService.upsertOwn({
            profile_id: `profile_${Date.now()}`,
            username: values.name,
            home_currency: 'USD',
            travel_preferences: { phone: values.phone },
          } as any);
        } catch (e) {
          // Non-fatal: profile creation might fail if email confirmation is required
          console.warn('Profile creation warning:', e);
        }
      }

      // If email confirmations are disabled, Supabase returns a session and the user is signed in
      if (signUpData.session && signUpData.user) {
        const user = signUpData.user;
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          name: (user.user_metadata as any)?.name || user.email?.split('@')[0] || 'User',
          email: user.email,
          type: 'user',
          phone: (user.user_metadata as any)?.phone,
        }));
        toast({
          title: "Welcome!",
          description: "Your account is ready and you are signed in.",
        });
        navigate('/');
      } else {
        toast({
          title: "Account created!",
          description: "Check your email to confirm your account before signing in.",
        });
        navigate('/signin');
      }
    } catch (error) {
      toast({
        title: "Error creating account",
        description: (error as any)?.message || "Please try again later.",
>>>>>>> df4bac4 (third commit)
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
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <p className="text-muted-foreground">Join GlobeTrotter and start your journey</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-enter">
              <div className="flex items-center justify-between mb-6">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    {...form.register("phone")}
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("password")}
                    placeholder="Create a password"
                    className="mt-1"
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...form.register("confirmPassword")}
                    placeholder="Confirm your password"
                    className="mt-1"
                  />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
