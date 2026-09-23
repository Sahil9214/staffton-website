"use client";

import React, { Suspense, useState, useEffect } from "react";

import Header from "./components/header";
import JobsBoard from "./components/jobs-board";
import WhyChooseStaffton from "./components/why-choose-staffton";
import CityEcosystemSection from "./components/city-ecosystem-section";
import CityFaqSection from "./components/city-faq-section";
import {
  normalizeSeoLandingPageData,
  seoLandingPageJsonLd,
  type SeoLandingPageData,
  type SeoPageAdvantage,
  type SeoPageEcosystem,
  type SeoPageFaq,
} from "../../../utility/seo-pages-api";
import { toCitySlug } from "../../../utility/constants";

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

function getFallbackAdvantage(
  displayCity: string,
  label: string | null
): SeoPageAdvantage {
  const roleName = label ? label.toLowerCase() : "healthcare";
  return {
    pill: "Why Staffton",
    heading: `Why Healthcare Professionals & Hospitals in ${displayCity} Choose Staffton`,
    description: `Staffton accelerates medical hiring across ${displayCity}, connecting top hospitals, diagnostic chains, and medical institutions with verified ${roleName} professionals.`,
    ctaLabel: `Apply in ${displayCity}`,
    ctaUrl: `/jobs/in/${toCitySlug(displayCity)}/`,
    cards: [
      {
        id: "adv-1",
        icon: "hospital",
        title: "Direct Hospital Connection",
        description: `Connect directly with verified hiring teams and department heads at leading medical centers across ${displayCity}.`,
      },
      {
        id: "adv-2",
        icon: "badge-check",
        title: "Verified Medical Credentials",
        description: `All doctors, nurses, and technicians undergo preliminary verification of registration, degrees, and clinical experience.`,
      },
      {
        id: "adv-3",
        icon: "zap",
        title: "Fast-Track Placement",
        description: `Cut weeks of waiting with streamlined interview rounds, digital offer letters, and transparent hiring timelines.`,
      },
      {
        id: "adv-4",
        icon: "file-check",
        title: "Clear Shift & Salary Insights",
        description: `Access verified salary brackets, rotation patterns, and facility benefits upfront before submitting your application.`,
      },
    ],
  };
}

function getFallbackEcosystem(
  displayCity: string,
  label: string | null
): SeoPageEcosystem {
  return {
    pill: `${displayCity} Clinical Reach`,
    heading: `Thriving Medical & Clinical Ecosystem in ${displayCity}`,
    description: `${displayCity} continues to expand its clinical network with premier multi-speciality centers, specialized ICUs, emergency departments, and research institutions.\nWhether you are seeking permanent clinical positions, rotational night shifts, or supervisory roles, Staffton provides real-time access to the most active medical openings across ${displayCity}.`,
    ctaLabel: `Explore ${displayCity} Openings`,
    ctaUrl: `/jobs/in/${toCitySlug(displayCity)}/`,
  };
}

function getFallbackFaqs(
  displayCity: string,
  label: string | null
): SeoPageFaq {
  const roleText = label ? label : "Healthcare";
  const roleLower = label ? label.toLowerCase() : "clinical";
  return {
    pill: "Frequently Asked Questions",
    heading: `Questions About ${roleText} Jobs in ${displayCity}`,
    items: [
      {
        id: "faq-1",
        question: `How do I apply for ${roleText.toLowerCase()} jobs in ${displayCity} on Staffton?`,
        answer: `You can browse verified openings on Staffton, filter by role category, experience, and salary range, and submit your application with your updated resume and credentials directly through the platform.`,
      },
      {
        id: "faq-2",
        question: `Are all hospital vacancies in ${displayCity} on Staffton verified?`,
        answer: `Yes, every job posted on Staffton is directly submitted by or coordinated with recognized hospitals, medical institutes, and diagnostic centers across ${displayCity}.`,
      },
      {
        id: "faq-3",
        question: `What qualifications are required for ${roleLower} roles in ${displayCity}?`,
        answer: `Requirements depend on the department and hospital. Registered medical practitioners, staff nurses, and lab technicians generally require relevant state council registration (MCI/NMC, INC, or state paramedical councils) and required degrees or diplomas.`,
      },
      {
        id: "faq-4",
        question: `Is there any fee charged from job seekers on Staffton?`,
        answer: `No. Staffton is completely free for healthcare professionals and job seekers. You will never be asked to pay any registration or placement fees.`,
      },
    ],
  };
}

const City = ({ city, role, seoPage }: CityProps) => {
  const [clientSeoPage, setClientSeoPage] = useState<SeoLandingPageData | null>(
    seoPage || null
  );

  // Client-Side Rendering (CSR): Live fetch from dev-api
  useEffect(() => {
    let isMounted = true;
    const targetCity = (city || "mumbai").toLowerCase().trim();
    const query = new URLSearchParams({
      country: "in",
      city: targetCity,
    });
    if (role && role.trim()) {
      query.set("role", role.toLowerCase().trim());
    }

    const apiUrl = `https://dev-api.stafftonhealth.com/api/v1/public/seo/pages/by-path?${query.toString()}`;
    console.log(`🌐 [CLIENT CSR] Fetching live SEO page data: ${apiUrl}`);

    fetch(apiUrl, {
      headers: { accept: "application/json" },
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((payload) => {
        if (isMounted && payload?.success && payload?.data) {
          console.log(`✅ [CLIENT CSR] Successfully loaded data for ${targetCity}:`, payload.data);
          const normalizedData =
            normalizeSeoLandingPageData(payload.data) || payload.data;
          setClientSeoPage(normalizedData);
        }
      })
      .catch((err) => {
        console.error("❌ [CLIENT CSR] Failed to fetch SEO page data:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [city, role]);

  const activePage = clientSeoPage || seoPage;
  const normalized = normalizeSeoLandingPageData(activePage) || activePage;
  const label = roleLabel(role);
  const hero = normalized?.hero;
  const displayCity = normalized?.city || city;

  const h1Title =
    hero?.h1 ||
    normalized?.h1 ||
    (label ? `${label} Jobs in ${displayCity}` : `Healthcare Jobs in ${displayCity}`);

  const shortDescription =
    hero?.shortDescription ||
    normalized?.shortDescription ||
    (label
      ? `Explore verified ${label.toLowerCase()} openings in ${displayCity} on Staffton Health.`
      : `Explore verified healthcare openings in ${displayCity} on Staffton Health.`);

  const pill = hero?.pill || normalized?.heroPill || "Verified Healthcare Roles";

  const fallbackAdvantage = getFallbackAdvantage(displayCity, label);
  const fallbackEcosystem = getFallbackEcosystem(displayCity, label);
  const fallbackFaq = getFallbackFaqs(displayCity, label);

  const activeAdvantage =
    normalized?.advantage &&
    (normalized.advantage.heading ||
      (normalized.advantage.cards && normalized.advantage.cards.length > 0))
      ? normalized.advantage
      : fallbackAdvantage;

  const activeEcosystem =
    normalized?.ecosystem &&
    (normalized.ecosystem.heading || normalized.ecosystem.description)
      ? normalized.ecosystem
      : fallbackEcosystem;

  const activeFaq =
    normalized?.faq &&
    normalized.faq.items &&
    normalized.faq.items.length > 0
      ? normalized.faq
      : fallbackFaq;

  const jsonLd = seoLandingPageJsonLd(normalized || activePage, {
    city: displayCity,
    citySlug: toCitySlug(displayCity),
    role,
    roleSlug: role ? role.toLowerCase() : undefined,
    roleLabel: label || undefined,
    h1Title,
    description: shortDescription,
    faqItems: activeFaq.items,
  });

  // Client log to verify data and hyperlink in browser console
  console.log("==================== [CLIENT CSR: CITY PAGE DATA] ====================");
  console.log(`🏙️ City: "${displayCity}" | Role: "${role || "all"}" | Label: "${label || "None"}"`);
  console.log("📥 Active SEO Page Data:", normalized);
  console.log("🔗 Ecosystem Description (with hyperlinks):", activeEcosystem?.description);
  console.log("✨ Active Advantage Heading:", activeAdvantage?.heading);
  console.log("🌿 Active Ecosystem Heading:", activeEcosystem?.heading);
  console.log("❓ Active FAQ Items Count:", activeFaq?.items?.length || 0);
  console.log("📐 Generated JSON-LD Schemas:", jsonLd.length);
  console.log("======================================================================");

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
        advantage={activeAdvantage}
      />

      <CityEcosystemSection
        city={displayCity}
        role={role}
        ecosystem={activeEcosystem}
      />

      <CityFaqSection
        city={displayCity}
        role={role}
        pill={activeFaq.pill}
        heading={activeFaq.heading}
        items={activeFaq.items}
      />
    </div>
  );
};

export default City;