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

const CityEcosystemSection = ({
  city,
  ecosystem,
}: CityEcosystemSectionProps) => {
  if (!ecosystem) return null;

  const heading = stripHtml(ecosystem.heading);
  const description = stripHtml(ecosystem.description);
  const pill = ecosystem.pill?.trim();
  const ctaLabel = ecosystem.ctaLabel?.trim();
  const ctaHref = normalizeInternalHref(ecosystem.ctaUrl);

  if (!heading && !description && !pill && !ctaLabel) {
    return null;
  }

  // Only local dummy kept: image slot when API image is missing.
  const imageSrc =  FALLBACK_ECOSYSTEM_IMAGE || ecosystem.image;

  return (
    <MediaTextSection
      badge={pill}
      badgeIcon={Info}
      heading={heading || undefined}
      paragraphs={description ? [description] : undefined}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      image={{
        src: imageSrc,
        alt: heading || city,
      }}
      background="bg-surface-page"
    />
  );
};

export default CityEcosystemSection;
