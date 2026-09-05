import "./globals.css";

import { plusJakartaSans, inter, manrope, syncopate, instrumentSans } from './fonts'
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import CookieConsent from "./components/layouts/CookieConsent";
import GoogleAnalytics from "./components/layouts/GoogleAnalytics";
import {
  GoogleTagManagerHead,
  GoogleTagManagerBody,
} from "./components/layouts/GoogleTagManager";
import {
  SITE_URL,
  SITE_NAME,
  ORGANIZATION_DESCRIPTION,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from "./utility/site";
import { rootMetadata } from "./utility/seo";

export const metadata = rootMetadata;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Staffton",
  legalName: "Staffton Medical Recruitment",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/header_logo.svg`,
  description: ORGANIZATION_DESCRIPTION,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  sameAs: [
    SOCIAL_LINKS.facebook,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.twitter,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: `${SITE_URL}/contact-us/`,
    email: CONTACT_EMAIL,
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${plusJakartaSans.variable}
        ${inter.variable}
        ${manrope.variable}
        ${syncopate.variable}
        ${instrumentSans.variable}
      `}
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <GoogleTagManagerHead />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleTagManagerBody />

        <Navbar />
        
        {children}

        <Footer />
        
        <CookieConsent />
        
        <GoogleAnalytics />
        
      </body>
    </html>
  );
}
