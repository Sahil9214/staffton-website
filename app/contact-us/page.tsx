import React from "react";
import HeroSection from "./components/HeroSection";
import ContactGridSection from "./components/ContactGridSection";
import ConnectOptionsSection from "./components/ConnectOptionsSection";
import FAQMiniSection, { contactFaqs } from "./components/FAQMiniSection";
import { pageMetadata } from "../utility/seo";
import { SITE_NAME, SITE_URL } from "../utility/site";

export const metadata = pageMetadata.contact;

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
      name: "Contact Us",
      item: `${SITE_URL}/contact-us/`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: contactFaqs.map((item) => ({
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
  url: `${SITE_URL}/contact-us/`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "126",
  },
};

const contactSchemas = [breadcrumbJsonLd, faqJsonLd, reviewJsonLd];

const ContactUsPage = () => {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      {contactSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <HeroSection />
      <ContactGridSection />
      <ConnectOptionsSection />
      <FAQMiniSection />
    </main>
  );
};

export default ContactUsPage;