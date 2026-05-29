import HeroSection from "./components/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import TheNewStandardSection from "./components/TheNewStandardSection";
import MedicalSovereigntySection from "./components/MedicalSovereigntySection";
import EliteControlPhilosophySection from "./components/EliteControlPhilosophySection";
import FeatureGridSection from "../components/sections/FeatureGridSection";
import PowerfulPlatformSection from "./components/PowerfulPlatformSection";
import FAQSection from "../components/sections/FAQSection";
import { forHospitalsFeatureGridSection } from "../utility/data";

export default function ForHospitalsPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <TheNewStandardSection />
      <MedicalSovereigntySection />
      <EliteControlPhilosophySection />
      <FeatureGridSection sectionData={forHospitalsFeatureGridSection} />
      <PowerfulPlatformSection />
      <FAQSection />
    </main>
  );
}
