import React, { Suspense } from "react";

import Header from "./components/header";
import JobsBoard from "./components/jobs-board";
import WhyChooseStaffton from "./components/why-choose-staffton";
import CityEcosystemSection from "./components/city-ecosystem-section";
import CityFaqSection from "./components/city-faq-section";
import {
  seoLandingPageJsonLd,
  type SeoLandingPageData,
} from "../../../utility/seo-pages-api";

interface CityProps {
  city: string;
  role?: string;
  seoPage?: SeoLandingPageData | null;
}

function roleLabel(role?: string) {
  if (!role) return null;
  return role
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const City = ({ city, role, seoPage }: CityProps) => {
  const label = roleLabel(role);
  const hero = seoPage?.hero;
  const displayCity = seoPage?.city || city;

  const h1Title =
    hero?.h1 ||
    (label ? `${label} Jobs in ${displayCity}` : `Healthcare Jobs in ${displayCity}`);

  const shortDescription =
    hero?.shortDescription ||
    (label
      ? `Explore verified ${label.toLowerCase()} openings in ${displayCity} on Staffton Health.`
      : `Explore verified healthcare openings in ${displayCity} on Staffton Health.`);

  const pill = hero?.pill || "Verified Healthcare Roles";
  const jsonLd = seoLandingPageJsonLd(seoPage?.schemas);

  return (
    <div className="flex w-full flex-col">
      {jsonLd.map((schema, index) => (
        <script
          key={`seo-jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      <Header
        city={displayCity}
        role={role}
        h1Title={h1Title}
        pill={pill}
        shortDescription={shortDescription}
      />

      <Suspense fallback={null}>
        <JobsBoard city={displayCity} role={role} isRolePage={Boolean(role)} />
      </Suspense>

      <WhyChooseStaffton
        city={displayCity}
        role={role}
        advantage={seoPage?.advantage}
      />

      <CityEcosystemSection
        city={displayCity}
        role={role}
        ecosystem={seoPage?.ecosystem}
      />

      <CityFaqSection
        city={displayCity}
        role={role}
        pill={seoPage?.faq?.pill}
        heading={seoPage?.faq?.heading}
        items={seoPage?.faq?.items}
      />
    </div>
  );
};

export default City;
