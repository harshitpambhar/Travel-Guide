import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, CalendarDays, Users, DollarSign, Clock } from "lucide-react";
import { packageService } from "@/services/packageService";
import type { TravelPackage } from "@/types/travel-package";
import { useToast } from "@/components/ui/use-toast";


type BookingForm = {
  name: string;
  email: string;
  phone: string;
  travelers: number;
  preferredDate: string;
  notes?: string;
};


export default function PackageDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await packageService.getById(id);
        if (!mounted) return;
        setPkg(data);
        setError(null);
      } catch (e: any) {
        setError(e.message || 'Failed to load package');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const form = useForm<BookingForm>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      travelers: 2,
      preferredDate: pkg?.startDate ?? "",
      notes: "",
    },
  });


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-10">
          <div className="container mx-auto px-4">
            <p>Loading package…</p>
          </div>
        </main>
      </div>
    );
  }


  if (!pkg) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-10">
          <div className="container mx-auto px-4">

            <p>Package not found.</p>

            <p>{error || 'Package not found.'}</p>

          </div>
        </main>
      </div>
    );
  }

  const onSubmit = (values: BookingForm) => {
    if (values.travelers > pkg.availableSlots) {
      toast({ title: "Not enough slots", description: `Only ${pkg.availableSlots} slots available.` });
      return;
    }
    // Here you would POST to backend. For now, simulate success.
    toast({ title: "Booking request sent", description: `We have received your request for ${values.travelers} traveler(s).` });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
              <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{pkg.name}</h1>
            <div className="flex flex-wrap gap-2 text-muted-foreground">
              {pkg.destinations.map((d) => (
                <span key={d} className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{d}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <Carousel>
                      <CarouselContent>
                        {pkg.images.map((src, i) => (
                          <CarouselItem key={i}>
                            <div className="aspect-[16/9] bg-muted overflow-hidden">
                              <img src={src} alt={`${pkg.name} ${i + 1}`} className="w-full h-full object-cover" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder.svg"; }} />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-4">
                  <h2 className="text-xl font-semibold">Itinerary</h2>
                  <ol className="space-y-3">
                    {pkg.itinerary.map((item) => (
                      <li key={item.day} className="border rounded-md p-3 bg-white">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">Day {item.day}: {item.title}</div>
                          {item.locationName && (
                            <Badge variant="secondary" className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{item.locationName}</Badge>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        )}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {pkg.startDate} → {pkg.endDate}</div>
                    <div className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {pkg.days} days</div>
                    <div className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {pkg.availableSlots} slots</div>
                    <div className="inline-flex items-center gap-1"><DollarSign className="h-4 w-4" /> ${pkg.price} per traveler</div>
                  </div>
                </CardContent>
              </Card>

              <Card id="book">
                <CardContent className="p-4 space-y-4">
                  <h2 className="text-xl font-semibold">Book this package</h2>
                  <Form {...form}>
                    <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField control={form.control} name="name" rules={{ required: "Name is required" }} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" rules={{ required: "Email is required" }} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" rules={{ required: "Phone is required" }} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 555 123 4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="travelers" rules={{ required: true, min: 1 }} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Travelers</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} max={pkg.availableSlots} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="preferredDate" rules={{ required: true }} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date</FormLabel>
                          <FormControl>
                            <Input type="date" min={pkg.startDate} max={pkg.endDate} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="notes" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes (optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Any special requests?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" className="w-full">Confirm Availability</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


