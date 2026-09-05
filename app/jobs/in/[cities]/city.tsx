import React, { Suspense } from "react";
import Header from "./components/header";
import JobsBoard from "./components/jobs-board";
import WhyChooseStaffton from "./components/why-choose-staffton";
import CityEcosystemSection from "./components/city-ecosystem-section";
import CityFaqSection, { getCityFaqList } from "./components/city-faq-section";
import { toCitySlug } from "../../../utility/constants";
import { SITE_NAME, SITE_URL } from "../../../utility/site";
import { roleSlugToApiRole, type ApiJobItem, type ApiPagination, type ApiSeoData } from "../../../utility/jobs-api";

interface CityProps {
  city: string;
  role?: string;
  initialSeo?: ApiSeoData;
  initialJobs?: ApiJobItem[];
  initialPagination?: ApiPagination;
}

const City = ({ city, role, initialSeo, initialJobs, initialPagination }: CityProps) => {
  const citySlug = toCitySlug(city);
  const roleLabel = role ? roleSlugToApiRole(role) : undefined;
  const pageUrl = role
    ? `${SITE_URL}/jobs/in/${citySlug}/${role}/`
    : `${SITE_URL}/jobs/in/${citySlug}/`;
  const cityBaseUrl = `${SITE_URL}/jobs/in/${citySlug}/`;
  const faqItems = getCityFaqList(city, role);

  const breadcrumbElements = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Jobs in India",
      item: `${SITE_URL}/nurse-doctor-jobs-india/`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: `Jobs in ${city}`,
      item: cityBaseUrl,
    },
  ];

  if (role && roleLabel) {
    breadcrumbElements.push({
      "@type": "ListItem",
      position: 4,
      name: `${roleLabel} Jobs in ${city}`,
      item: pageUrl,
    });
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbElements,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
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
    url: pageUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "126",
    },
  };

  const citySchemas = [breadcrumbJsonLd, faqJsonLd, reviewJsonLd];

  return (
    <div className="flex w-full flex-col">
      {citySchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <Header city={city} role={role} h1Title={initialSeo?.h1Title} />
      <Suspense
        fallback={
          <section className="flex w-full flex-col items-center bg-surface-page px-5 py-8 sm:px-10 sm:py-10 md:px-[120px] md:py-12">
            <div className="flex w-full max-w-[1200px] flex-col items-start gap-6 md:flex-row">
              <div className="h-96 w-full rounded-2xl border border-border-gray bg-white md:w-[280px]" />
              <div className="h-96 flex-1 rounded-2xl border border-border-gray bg-white" />
            </div>
          </section>
        }
      >
        <JobsBoard
          city={city}
          role={role}
          isRolePage={Boolean(role)}
          initialJobs={initialJobs}
          initialPagination={initialPagination}
        />
      </Suspense>
      <WhyChooseStaffton city={city} role={role} />
      <CityEcosystemSection city={city} role={role} />
      <CityFaqSection city={city} role={role} />
    </div>
  );
};

export default City;

