import React from "react";
import HeroSection from "./components/HeroSection";
import MissionVisionSection from "./components/MissionVisionSection";
import AboutStatsSection from "./components/AboutStatsSection";
import AboutStorySection from "./components/AboutStorySection";
import AboutValuesSection from "./components/AboutValuesSection";
import AboutCTASection from "./components/AboutCTASection";
import FAQSection from "../components/sections/FAQSection";
import { aboutUsFaqSection } from "../utility/constants";
import { pageMetadata } from "../utility/seo";
import { SITE_NAME, SITE_URL } from "../utility/site";

export const metadata = pageMetadata.about;

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
      name: "About Us",
      item: `${SITE_URL}/about-us/`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aboutUsFaqSection.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: `${SITE_URL}/about-us/`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "126",
  },
};

const aboutSchemas = [breadcrumbJsonLd, faqJsonLd, reviewJsonLd];

const AboutUsPage = () => {
  return (
    <main className="w-full overflow-x-hidden">
      {aboutSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <HeroSection />
      <MissionVisionSection />
      <AboutStatsSection />
      <AboutStorySection />
      <AboutValuesSection />
      {/* <AboutLeadershipSection /> */}
      <FAQSection
        badge={aboutUsFaqSection.badge}
        heading={aboutUsFaqSection.heading}
        items={aboutUsFaqSection.items}
        defaultIndex={null}
      />
      <AboutCTASection />
    </main>
  );
};

export default AboutUsPage;