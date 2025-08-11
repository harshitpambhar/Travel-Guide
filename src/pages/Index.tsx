import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { CategoriesSection } from "@/components/sections/categories-section";
import { FeaturedExperiences } from "@/components/sections/featured-experiences";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <HeroSection />
        <CategoriesSection />
        <FeaturedExperiences />
      </main>
    </div>
  );
};

export default Index;
