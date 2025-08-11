import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import signupIllustration from "@/assets/signup-illustration.jpg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const userSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    phone: z.string().min(7, "Enter a valid phone number"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const adminSchema = z
  .object({
    adminName: z.string().min(2, "Admin name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    secretKey: z.string().min(6, "Secret key must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type Mode = "user" | "admin";

const SignUp = () => {
  const [mode, setMode] = useState<Mode>("user");
  const { toast } = useToast();

  const schema = useMemo(() => (mode === "user" ? userSchema : adminSchema), [mode]);

  const form = useForm<any>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (values: any) => {
    toast({
      title: "Account created",
      description: `Signed up as ${mode === "user" ? "User" : "Admin"}.`,
    });
    // Replace with real submission logic
    console.log("Submitted:", values);
  };

  return (
    <main className="min-h-screen grid md:grid-cols-2">
      <aside className="relative hidden md:block">
        <img
          src={signupIllustration}
          alt="Modern illustration depicting secure account sign-up"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </aside>

      <section className="flex items-center justify-center p-6 sm:p-10">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-6">
            <div className="flex justify-center gap-2">
              <Button
                variant="userToggle"
                size="sm"
                data-active={mode === "user"}
                onClick={() => setMode("user")}
                aria-pressed={mode === "user"}
              >
                User
              </Button>
              <Button
                variant="adminToggle"
                size="sm"
                data-active={mode === "admin"}
                onClick={() => setMode("admin")}
                aria-pressed={mode === "admin"}
              >
                Admin
              </Button>
            </div>

            <header className="text-center space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
              <CardDescription>
                {mode === "user" ? "Sign up as a User" : "Sign up as an Admin"}
              </CardDescription>
            </header>
          </CardHeader>

          <CardContent>
            <form key={mode} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-enter">
              {mode === "user" ? (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Jane Doe" {...form.register("name")} aria-invalid={!!form.formState.errors.name} />
                    {form.formState.errors.name && (
                      <p className="text-destructive text-sm">{String(form.formState.errors.name.message)}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" {...form.register("email")} aria-invalid={!!form.formState.errors.email} />
                    {form.formState.errors.email && (
                      <p className="text-destructive text-sm">{String(form.formState.errors.email.message)}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" {...form.register("password")} aria-invalid={!!form.formState.errors.password} />
                    {form.formState.errors.password && (
                      <p className="text-destructive text-sm">{String(form.formState.errors.password.message)}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" {...form.register("confirmPassword")} aria-invalid={!!form.formState.errors.confirmPassword} />
                    {form.formState.errors.confirmPassword && (
                      <p className="text-destructive text-sm">{String(form.formState.errors.confirmPassword.message)}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" {...form.register("phone")} aria-invalid={!!form.formState.errors.phone} />
                    {form.formState.errors.phone && (
                      <p className="text-destructive text-sm">{String(form.formState.errors.phone.message)}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="adminName">Admin Name</Label>
                    <Input id="adminName" placeholder="Alex Admin" {...form.register("adminName")} aria-invalid={!!form.formState.errors.adminName} />
                    {form.formState.errors.adminName && (
                      <p className="text-destructive text-sm">{String((form.formState.errors as any).adminName?.message)}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="adminEmail">Email</Label>
                    <Input id="adminEmail" type="email" placeholder="admin@example.com" {...form.register("email")} aria-invalid={!!form.formState.errors.email} />
                    {form.formState.errors.email && (
                      <p className="text-destructive text-sm">{String(form.formState.errors.email.message)}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="adminPassword">Password</Label>
                    <Input id="adminPassword" type="password" placeholder="••••••••" {...form.register("password")} aria-invalid={!!form.formState.errors.password} />
                    {form.formState.errors.password && (
                      <p className="text-destructive text-sm">{String(form.formState.errors.password.message)}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="adminConfirmPassword">Confirm Password</Label>
                    <Input id="adminConfirmPassword" type="password" placeholder="••••••••" {...form.register("confirmPassword")} aria-invalid={!!form.formState.errors.confirmPassword} />
                    {form.formState.errors.confirmPassword && (
                      <p className="text-destructive text-sm">{String(form.formState.errors.confirmPassword.message)}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="secretKey">Secret Admin Key</Label>
                    <Input id="secretKey" type="password" placeholder="Enter your secret key" {...form.register("secretKey")} aria-invalid={!!(form.formState.errors as any).secretKey} />
                    {(form.formState.errors as any).secretKey && (
                      <p className="text-destructive text-sm">{String((form.formState.errors as any).secretKey?.message)}</p>
                    )}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">Create account</Button>
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default SignUp;
