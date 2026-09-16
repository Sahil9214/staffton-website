import type { Metadata } from "next";
import ThankYouContent from "./components/ThankYouContent";
import { absoluteUrl, SITE_NAME, SITE_URL } from "../../utility/site";

const PAGE_PATH = "/contact/thank-you";
const PAGE_TITLE = "Thanks for Reaching Out";
const PAGE_DESCRIPTION =
  "Your message is with the Staffton Health team. We review every query personally and will reply soon. For urgent matters, email info@stafftonhealth.com.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
  },
  // Transactional confirmation — keep out of organic index
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: absoluteUrl(PAGE_PATH),
  },
  twitter: {
    card: "summary_large_image",
    site: "@stafftonhealth",
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
  },
};

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
    {
      "@type": "ListItem",
      position: 3,
      name: "Thank You",
      item: absoluteUrl(PAGE_PATH),
    },
  ],
};

const ContactThankYouPage = () => {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ThankYouContent />
    </main>
  );
};

export default ContactThankYouPage;
