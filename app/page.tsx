import HeroSection from "./home/components/HeroSection";
import StatsSection from "./components/sections/StatsSection";
import WhyStafftonSection from "./home/components/WhyStafftonSection";
import SeoHowItWorksSection from "./home/components/SeoHowItWorksSection";
import HowItWorksSection from "./home/components/HowItWorksSection";
import BlogSection from "./home/components/BlogSection";
import FAQSection from "./components/sections/FAQSection";
import SeoSpecialtiesSection from "./home/components/SeoSpecialtiesSection";
import {
  getAllBlogs,
  homeBlogSection,
  homeFaqSection,
  stripWordpressHtml,
} from "./utility/constants";
import { pageMetadata } from "./utility/seo";
import { SITE_NAME, SITE_URL } from "./utility/site";

export const metadata = pageMetadata.home;

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
  ],
};

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "126",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqSection.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const homeJsonLd = [breadcrumbJsonLd, reviewJsonLd, faqJsonLd];

export default async function Home() {
  const data = await getAllBlogs(3);

  return (
    <main className="w-full overflow-x-hidden">
      {homeJsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <HeroSection />
      <StatsSection />
      <WhyStafftonSection />
      <SeoHowItWorksSection />
      <SeoSpecialtiesSection />
      <HowItWorksSection />
      <BlogSection
        badge={homeBlogSection.badge}
        title={homeBlogSection.heading}
        description={homeBlogSection.description}
        ctaLabel={homeBlogSection.ctaLabel}
        ctaHref={homeBlogSection.ctaHref}
        blogPosts={data?.map((post) => ({
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
        heading={homeFaqSection.heading}
        items={homeFaqSection.items}
        badge={homeFaqSection.badge}
      />
    </main>
  );
}
