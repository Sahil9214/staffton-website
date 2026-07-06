"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-HHD13QQTT7";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    // 1. Initialize dataLayer and gtag helper
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

    // 2. Check existing consent in localStorage
    const storedConsent = localStorage.getItem("staffton-cookie-consent");
    let hasAnalyticsConsent = false;
    if (storedConsent) {
      try {
        const parsed = JSON.parse(storedConsent);
        hasAnalyticsConsent = !!parsed.analytics;
      } catch (e) {
        console.error("Error parsing cookie consent:", e);
      }
    }

    // 3. Set default consent state
    window.gtag("consent", "default", {
      analytics_storage: hasAnalyticsConsent ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    // 4. Listen for the custom event from CookieConsent component
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const preferences = customEvent.detail;
      if (preferences && typeof preferences.analytics !== "undefined") {
        window.gtag("consent", "update", {
          analytics_storage: preferences.analytics ? "granted" : "denied",
        });
      }
    };

    window.addEventListener("cookie-consent-updated", handleConsentUpdate);

    return () => {
      window.removeEventListener("cookie-consent-updated", handleConsentUpdate);
    };
  }, []);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
