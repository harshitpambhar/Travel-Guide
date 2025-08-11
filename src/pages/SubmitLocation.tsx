import { Header } from "@/components/layout/header";
import { LocationRequestForm } from "@/components/user/LocationRequestForm";

export default function SubmitLocationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Submit New Location
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discovered an amazing place that's not on our website? Share it with fellow travelers!
            </p>
          </div>
          
          <LocationRequestForm />
        </div>
      </main>
    </div>
  );
}
