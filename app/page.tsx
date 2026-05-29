import HeroSection from "./home/components/HeroSection";
import StatsSection from "./components/sections/StatsSection";
import HowItWorksSection from "./home/components/HowItWorksSection";
import FAQSection from "./components/sections/FAQSection";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FAQSection />
    </main>
  );
}
