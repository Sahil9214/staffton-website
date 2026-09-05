import React from "react";
import HeroSection from "../home/components/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import {
  nurseDoctorJobsFaqSection,
  nurseDoctorJobsHeroSection,
} from "../utility/constants";
import FAQSection from "../components/sections/FAQSection";
import FeaturesSection from "./components/FeaturesSection";
import PlatformPreviewSection from "./components/PlatformPreviewSection";
import TrustSecuritySection from "./components/TrustSecuritySection";
import FinalCTASection from "./components/FinalCTASection";
import { pageMetadata } from "../utility/seo";
import { SITE_NAME, SITE_URL } from "../utility/site";

export const metadata = pageMetadata.forProfessionals;

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
      name: "For Professionals",
      item: `${SITE_URL}/nurse-doctor-jobs-india/`,
    },
  ],
};

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: `${SITE_URL}/nurse-doctor-jobs-india/`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "126",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: nurseDoctorJobsFaqSection.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const pageJsonLd = [breadcrumbJsonLd, reviewJsonLd, faqJsonLd];

const NurseDoctorJobInIndia = () => {
  const { badge, heading, subtext, features, imageSrc, imageAlt } =
    nurseDoctorJobsHeroSection;

  return (
    <>
      {pageJsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <HeroSection
        badge={badge}
        heading={heading}
        subtext={subtext}
        features={features}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      />
      <StatsSection />
      <FeaturesSection />
      <PlatformPreviewSection />
      <TrustSecuritySection />
      <FinalCTASection />
      <FAQSection
        badge={nurseDoctorJobsFaqSection.badge}
        heading={nurseDoctorJobsFaqSection.heading}
        items={nurseDoctorJobsFaqSection.items}
      />
    </>
  );
};

export default NurseDoctorJobInIndia;
