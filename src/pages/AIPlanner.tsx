import { Header } from "@/components/layout/header";
import { AIPlannerInline } from "@/components/ui/ai-planner";

const AIPlannerPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 container mx-auto px-4">
        <AIPlannerInline />
      </main>
    </div>
  );
};

export default AIPlannerPage; 