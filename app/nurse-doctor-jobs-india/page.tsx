import React from "react";
import HeroSection from "../home/components/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import BlogSection from "../home/components/BlogSection";
import {
  getAllBlogs,
  homeBlogSection,
  nurseDoctorJobsFaqSection,
  nurseDoctorJobsHeroSection,
  stripWordpressHtml,
} from "../utility/constants";
import FAQSection from "../components/sections/FAQSection";
import FeaturesSection from "./components/FeaturesSection";
import PlatformPreviewSection from "./components/PlatformPreviewSection";
import TrustSecuritySection from "./components/TrustSecuritySection";
import FinalCTASection from "./components/FinalCTASection";
import { pageMetadata } from "../utility/seo";
import { APP_AUTH_URLS } from "../utility/app-auth-urls";
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

const NurseDoctorJobInIndia = async () => {
  const blogData = await getAllBlogs(3);
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
        ctaHref={APP_AUTH_URLS.professionalRegister}
      />
      <StatsSection />
      <FeaturesSection />
      <PlatformPreviewSection />
      <TrustSecuritySection />
      <FinalCTASection />
      <BlogSection
        badge={homeBlogSection.badge}
        title={homeBlogSection.heading}
        description={homeBlogSection.description}
        ctaLabel={homeBlogSection.ctaLabel}
        ctaHref={homeBlogSection.ctaHref}
        blogPosts={(blogData ?? []).map((post) => ({
          badge: stripWordpressHtml(
            post?._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Insights"
          ),
          time: "5 MINS READ",
          imageAlt: stripWordpressHtml(post?.title?.rendered ?? ""),
          link: post?.link ?? "",
          id: String(post.id),
          title: stripWordpressHtml(post?.title?.rendered ?? ""),
          description: stripWordpressHtml(post.excerpt?.rendered ?? "", 120),
          date: post.date ?? "",
          imageSrc: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
        }))}
      />
      <FAQSection
        badge={nurseDoctorJobsFaqSection.badge}
        heading={nurseDoctorJobsFaqSection.heading}
        items={nurseDoctorJobsFaqSection.items}
      />
    </>
  );
};

export default NurseDoctorJobInIndia;
