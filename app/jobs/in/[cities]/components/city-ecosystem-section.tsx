"use client";

import React from "react";
import { Info } from "lucide-react";
import MediaTextSection from "../../../../components/sections/MediaTextSection";
import {
  normalizeInternalHref,
  stripHtml,
  type SeoPageEcosystem,
} from "../../../../utility/seo-pages-api";

interface CityEcosystemSectionProps {
  city: string;
  role?: string;
  ecosystem?: SeoPageEcosystem | null;
}

const FALLBACK_ECOSYSTEM_IMAGE = "/images/city_clinical_ecosystem.jpg";

function extractParagraphs(content?: string | null): string[] | undefined {
  if (!content || !content.trim()) return undefined;
  const trimmed = content.trim();

  // If HTML contains <p> tags, extract each paragraph's inner HTML
  if (/<p[\s>]/i.test(trimmed)) {
    const matches = trimmed.match(/<p\b[^>]*>([\s\S]*?)<\/p>/gi);
    if (matches && matches.length > 0) {
      const paras = matches
        .map((p) => p.replace(/<\/?p\b[^>]*>/gi, "").trim())
        .filter((inner) => inner.replace(/<[^>]+>/g, "").trim().length > 0);
      if (paras.length > 0) return paras;
    }
  }

  // If HTML contains <br>, split by <br>
  if (/<br\s*\/?>/i.test(trimmed)) {
    const paras = trimmed
      .split(/<br\s*\/?>/gi)
      .map((p) => p.trim())
      .filter((inner) => inner.replace(/<[^>]+>/g, "").trim().length > 0);
    if (paras.length > 0) return paras;
  }

  // Otherwise split by newlines
  const paras = trimmed
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  return paras.length > 0 ? paras : undefined;
}

const CityEcosystemSection = ({
  city,
  ecosystem,
}: CityEcosystemSectionProps) => {
  if (!ecosystem) return null;

  const heading = stripHtml(ecosystem.heading);
  const rawDescription = ecosystem.description?.trim();
  const pill = ecosystem.pill?.trim();
  const ctaLabel = ecosystem.ctaLabel?.trim();
  const ctaHref = normalizeInternalHref(ecosystem.ctaUrl);

  if (!heading && !rawDescription && !pill && !ctaLabel) {
    return null;
  }

  // Resolve backend image (string or object with url/src). Fallback to previous dummy image if absent/empty.
  let imageSrc = FALLBACK_ECOSYSTEM_IMAGE;
  const rawImage = ecosystem.image;
  if (typeof rawImage === "string" && rawImage.trim()) {
    imageSrc = rawImage.trim();
  } else if (
    rawImage &&
    typeof rawImage === "object" &&
    ("url" in rawImage || "src" in rawImage)
  ) {
    const obj = rawImage as { url?: string; src?: string };
    const resolvedUrl = (obj.url || obj.src || "").trim();
    if (resolvedUrl) {
      imageSrc = resolvedUrl;
    }
  }

  const paragraphs = extractParagraphs(rawDescription);

  return (
    <MediaTextSection
      badge={pill}
      badgeIcon={Info}
      heading={heading || undefined}
      paragraphs={paragraphs}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      image={{
        src: imageSrc,
        alt: heading || `About healthcare jobs in ${city}`,
        fallbackSrc: FALLBACK_ECOSYSTEM_IMAGE,
      }}
      background="bg-surface-page"
    />
  );
};

export default CityEcosystemSection;
