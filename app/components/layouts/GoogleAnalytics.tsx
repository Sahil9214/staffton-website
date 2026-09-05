"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-HHD13QQTT7";
const CONSENT_KEY = "staffton-cookie-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function readAnalyticsConsent(): boolean {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return false;
    return !!JSON.parse(stored).analytics;
  } catch {
    return false;
  }
}

function trackPageView(path?: string) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path ?? window.location.pathname,
    page_title: document.title,
  });
}

// Must run before gtag.js loads — sets consent from localStorage synchronously
const consentInitScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  var hasConsent = false;
  try {
    var stored = localStorage.getItem('${CONSENT_KEY}');
    if (stored) hasConsent = !!JSON.parse(stored).analytics;
  } catch(e) {}
  gtag('consent', 'default', {
    analytics_storage: hasConsent ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
`;

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const isInitialPathname = useRef(true);

  useEffect(() => {
    const handleConsentUpdate = (event: Event) => {
      const preferences = (event as CustomEvent).detail;
      if (!preferences || typeof preferences.analytics === "undefined") return;

      window.gtag("consent", "update", {
        analytics_storage: preferences.analytics ? "granted" : "denied",
      });

      if (preferences.analytics) {
        trackPageView();
      }
    };

    window.addEventListener("cookie-consent-updated", handleConsentUpdate);
    return () =>
      window.removeEventListener("cookie-consent-updated", handleConsentUpdate);
  }, []);

  useEffect(() => {
    if (!readAnalyticsConsent()) return;

    if (isInitialPathname.current) {
      isInitialPathname.current = false;
      return;
    }

    trackPageView(pathname);
  }, [pathname]);

  const handleGtagLoad = () => {
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
    });

    if (readAnalyticsConsent()) {
      trackPageView();
    }
  };

  return (
    <>
      <Script id="ga-consent-init" strategy="beforeInteractive">
        {consentInitScript}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={handleGtagLoad}
      />
    </>
  );
}
