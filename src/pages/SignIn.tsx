import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const SignIn = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    toast({
      title: "Signed in successfully",
      description: "Welcome back!",
    });
    // Replace with real authentication logic
    console.log("Signed in:", values);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 sm:p-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-6">
          <header className="text-center space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </header>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                {...form.register("email")} 
                aria-invalid={!!form.formState.errors.email} 
              />
              {form.formState.errors.email && (
                <p className="text-destructive text-sm">{String(form.formState.errors.email.message)}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                {...form.register("password")} 
                aria-invalid={!!form.formState.errors.password} 
              />
              {form.formState.errors.password && (
                <p className="text-destructive text-sm">{String(form.formState.errors.password.message)}</p>
              )}
            </div>

            <Button type="submit" className="w-full">Sign In</Button>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignIn;
