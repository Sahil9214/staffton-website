import HeroSection from "./components/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import TheNewStandardSection from "./components/TheNewStandardSection";
import MedicalSovereigntySection from "./components/MedicalSovereigntySection";
import EliteControlPhilosophySection from "./components/EliteControlPhilosophySection";
import FeatureGridSection from "../components/sections/FeatureGridSection";
import PowerfulPlatformSection from "./components/PowerfulPlatformSection";
import FAQSection from "../components/sections/FAQSection";
import { hospitalFaqSection, hospitalFeaturesGrid } from "../utility/constants";
import { SITE_NAME, SITE_URL } from "../utility/site";

export default function HospitalsLanding({
  breadcrumbName,
  breadcrumbPath,
}: {
  breadcrumbName: string;
  breadcrumbPath: string;
}) {
  const path = breadcrumbPath.endsWith("/")
    ? breadcrumbPath
    : `${breadcrumbPath}/`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbName,
        item: `${SITE_URL}${path}`,
      },
    ],
  };

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: `${SITE_URL}${path}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "126",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hospitalFaqSection.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const jsonLd = [breadcrumbJsonLd, reviewJsonLd, faqJsonLd];

  return (
    <main className="w-full overflow-x-hidden">
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <HeroSection />
      <StatsSection />
      <TheNewStandardSection />
      <MedicalSovereigntySection />
      <EliteControlPhilosophySection />
      <FeatureGridSection sectionData={hospitalFeaturesGrid} />
      <PowerfulPlatformSection />
      <FAQSection
        heading={hospitalFaqSection.heading}
        items={hospitalFaqSection.items}
        badge={hospitalFaqSection.badge}
      />
    </main>
  );
}
