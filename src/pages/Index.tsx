import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AgentsDirectory from "@/components/AgentsDirectory";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AgentsDirectory />
    </div>
  );
};

export default Index;
