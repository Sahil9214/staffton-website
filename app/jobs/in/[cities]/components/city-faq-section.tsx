import React from "react";
import FAQSection from "../../../../components/sections/FAQSection";
import type { SeoFaqItem } from "../../../../utility/seo-pages-api";

interface CityFaqSectionProps {
  city?: string;
  role?: string;
  pill?: string;
  heading?: string;
  items?: SeoFaqItem[] | null;
}

const CityFaqSection = ({ pill, heading, items }: CityFaqSectionProps) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  const faqItems = items
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((item) => ({
      question: item.question,
      answer: item.answer,
    }));

  return (
    <FAQSection
      badge={pill}
      heading={heading}
      items={faqItems}
      defaultIndex={null}
    />
  );
};

export default CityFaqSection;
