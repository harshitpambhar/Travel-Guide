import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Camera, Star, Calendar, Globe } from "lucide-react";

const locationRequestSchema = z.object({
  locationName: z.string().min(2, "Location name must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  visitDate: z.string().min(1, "Please select visit date"),
  rating: z.number().min(1).max(5),
  review: z.string().min(10, "Review must be at least 10 characters"),
  photos: z.array(z.string()).min(1, "Please add at least one photo"),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  }).optional()
});

type LocationRequestFormData = z.infer<typeof locationRequestSchema>;

const categories = [
  "Beach", "Mountain", "City", "Cultural", "Historical", "Nature", 
  "Adventure", "Relaxation", "Food", "Shopping", "Entertainment", "Other"
];

export function LocationRequestForm() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<LocationRequestFormData>({
    resolver: zodResolver(locationRequestSchema),
    defaultValues: {
      rating: 5,
      photos: []
    }
  });

  const addPhoto = () => {
    if (photoUrl.trim() && !photos.includes(photoUrl.trim())) {
      const newPhotos = [...photos, photoUrl.trim()];
      setPhotos(newPhotos);
      form.setValue("photos", newPhotos);
      setPhotoUrl("");
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    form.setValue("photos", newPhotos);
  };

  const onSubmit = async (data: LocationRequestFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send the data to your backend
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store in localStorage for demo purposes
      const requestData = {
        id: Date.now().toString(),
        user: {
          name: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).name : 'Anonymous',
          email: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).email : 'anonymous@example.com',
          id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : 'anonymous'
        },
        location: {
          name: data.locationName,
          city: data.city,
          country: data.country,
          coordinates: data.coordinates,
          category: data.category,
          description: data.description,
          photos: data.photos,
          visitDate: data.visitDate,
          rating: data.rating,
          review: data.review
        },
        status: 'pending',
        submittedAt: new Date().toISOString()
      };

      // Store in localStorage (in real app, this would go to database)
      const existingRequests = JSON.parse(localStorage.getItem('locationRequests') || '[]');
      existingRequests.push(requestData);
      localStorage.setItem('locationRequests', JSON.stringify(existingRequests));

      try {
        const channel = new BroadcastChannel('locationRequests');
        channel.postMessage({ type: 'new', request: requestData });
        channel.close();
      } catch {}

      toast({
        title: "Location request submitted!",
        description: "Thank you for your submission. Our team will review it shortly.",
      });

      // Reset form
      form.reset();
      setPhotos([]);
      
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Submit New Location Request
        </CardTitle>
        <p className="text-muted-foreground">
          Help other travelers discover amazing places by submitting a location you've visited that's not yet on our website.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Location Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="locationName">Location Name *</Label>
              <Input
                id="locationName"
                placeholder="e.g., Hidden Beach Cove"
                {...form.register("locationName")}
                aria-invalid={!!form.formState.errors.locationName}
              />
              {form.formState.errors.locationName && (
                <p className="text-destructive text-sm">{form.formState.errors.locationName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={(value) => form.setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-destructive text-sm">{form.formState.errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="e.g., Bali"
                {...form.register("city")}
                aria-invalid={!!form.formState.errors.city}
              />
              {form.formState.errors.city && (
                <p className="text-destructive text-sm">{form.formState.errors.city.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                placeholder="e.g., Indonesia"
                {...form.register("country")}
                aria-invalid={!!form.formState.errors.country}
              />
              {form.formState.errors.country && (
                <p className="text-destructive text-sm">{form.formState.errors.country.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the location, what makes it special, activities available, etc."
              rows={4}
              {...form.register("description")}
              aria-invalid={!!form.formState.errors.description}
            />
            {form.formState.errors.description && (
              <p className="text-destructive text-sm">{form.formState.errors.description.message}</p>
            )}
          </div>

          {/* Visit Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visitDate">Visit Date *</Label>
              <Input
                id="visitDate"
                type="date"
                {...form.register("visitDate")}
                aria-invalid={!!form.formState.errors.visitDate}
              />
              {form.formState.errors.visitDate && (
                <p className="text-destructive text-sm">{form.formState.errors.visitDate.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rating">Your Rating *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  {...form.register("rating", { valueAsNumber: true })}
                  aria-invalid={!!form.formState.errors.rating}
                />
                <span className="text-sm text-muted-foreground">/ 5</span>
              </div>
              {form.formState.errors.rating && (
                <p className="text-destructive text-sm">{form.formState.errors.rating.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Coordinates (Optional)</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Latitude"
                  type="number"
                  step="any"
                  onChange={(e) => {
                    const lat = parseFloat(e.target.value);
                    if (!isNaN(lat)) {
                      form.setValue("coordinates", { 
                        lat, 
                        lng: form.getValues("coordinates")?.lng || 0 
                      });
                    }
                  }}
                />
                <Input
                  placeholder="Longitude"
                  type="number"
                  step="any"
                  onChange={(e) => {
                    const lng = parseFloat(e.target.value);
                    if (!isNaN(lng)) {
                      form.setValue("coordinates", { 
                        lat: form.getValues("coordinates")?.lat || 0, 
                        lng 
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="space-y-3">
            <Label>Photos *</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <Button type="button" onClick={addPhoto} variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
            </div>
            {form.formState.errors.photos && (
              <p className="text-destructive text-sm">{form.formState.errors.photos.message}</p>
            )}
            
            {photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                      onClick={() => removePhoto(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review */}
          <div className="space-y-2">
            <Label htmlFor="review">Your Review *</Label>
            <Textarea
              id="review"
              placeholder="Share your experience, tips, and recommendations for other travelers"
              rows={4}
              {...form.register("review")}
              aria-invalid={!!form.formState.errors.review}
            />
            {form.formState.errors.review && (
              <p className="text-destructive text-sm">{form.formState.errors.review.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="min-w-[150px]"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
