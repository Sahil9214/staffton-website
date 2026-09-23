import type { Metadata } from "next";
import {
  API_BASE_URL,
  API_ENDPOINTS,
  SEO_PAGES_SITEMAP_API_URL,
  toCitySlug,
} from "./constants";
import { absoluteUrl, SITE_NAME, SITE_URL } from "./site";

export type SeoSitemapPageType = "city" | "city_role" | string;

export interface SeoSitemapPageEntry {
  url: string;
  updatedAt?: string;
  type?: SeoSitemapPageType;
}

export interface SeoPagesSitemapResponse {
  success: boolean;
  message?: string;
  data: SeoSitemapPageEntry[];
  timestamp?: string;
}

/**
 * Fetch CMS-published SEO landing URLs for the XML sitemap.
 * Returns [] on failure so sitemap generation still succeeds.
 */
export async function fetchSeoPagesSitemap(
  init?: RequestInit
): Promise<SeoSitemapPageEntry[]> {
  try {
    const res = await fetch(SEO_PAGES_SITEMAP_API_URL, {
      headers: { accept: "application/json" },
      next: { revalidate: 3600 },
      ...init,
    });

    if (!res.ok) {
      console.warn(
        `Failed to fetch SEO pages sitemap: ${res.status} ${res.statusText}`
      );
      return [];
    }

    const payload: SeoPagesSitemapResponse = await res.json();
    if (!payload?.success || !Array.isArray(payload.data)) return [];

    return payload.data.filter(
      (entry): entry is SeoSitemapPageEntry =>
        Boolean(entry?.url) && typeof entry.url === "string"
    );
  } catch (error) {
    console.error("Error fetching SEO pages sitemap:", error);
    return [];
  }
}

export interface SeoPageMeta {
  metaTitle: string;
  metaDescription: string;
  focusKeyword?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface SeoPageHero {
  pill?: string;
  h1: string;
  shortDescription?: string;
}

export interface SeoAdvantageCard {
  id: string;
  icon?: string;
  title: string;
  description: string;
}

export interface SeoPageAdvantage {
  pill?: string;
  heading: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  cards?: SeoAdvantageCard[];
}

export interface SeoPageEcosystem {
  pill?: string;
  heading: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  image?: string | null;
}

export interface SeoFaqItem {
  id: string;
  question: string;
  answer: string;
  sortOrder?: number;
}

export interface SeoPageFaq {
  pill?: string;
  heading?: string;
  items?: SeoFaqItem[];
}

export interface SeoPageSchemas {
  faqSchema?: Record<string, unknown>;
  reviewSchema?: Record<string, unknown>;
  breadcrumbSchema?: Record<string, unknown>;
  organizationSchema?: Record<string, unknown>;
}

export interface SeoLandingPageData {
  id: string;
  country: string;
  countrySlug: string;
  city: string;
  citySlug: string;
  role?: string;
  roleSlug?: string;
  url?: string;
  canonicalUrl?: string;
  slug?: string;
  status?: string;
  // Flat fields returned by backend API
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  metaKeywords?: string;
  heroPill?: string;
  h1?: string;
  shortDescription?: string;
  advantagePill?: string;
  advantageHeading?: string;
  advantageDescription?: string;
  advantageCtaLabel?: string;
  advantageCtaUrl?: string;
  advantageCards?: SeoAdvantageCard[];
  ecosystemPill?: string;
  ecosystemHeading?: string;
  ecosystemDescription?: string;
  ecosystemCtaLabel?: string;
  ecosystemCtaUrl?: string;
  ecosystemImage?: string | { url?: string } | null;
  faqPill?: string;
  faqHeading?: string;
  faqs?: SeoFaqItem[];
  breadcrumbSchema?: string | Record<string, unknown>;
  organizationSchema?: string | Record<string, unknown>;
  faqSchema?: string | Record<string, unknown>;
  reviewSchema?: string | Record<string, unknown>;
  // Nested groups
  meta?: SeoPageMeta;
  hero?: SeoPageHero;
  advantage?: SeoPageAdvantage;
  ecosystem?: SeoPageEcosystem;
  faq?: SeoPageFaq;
  schemas?: SeoPageSchemas;
  updatedAt?: string;
}

export interface SeoLandingPageResponse {
  success: boolean;
  message?: string;
  data: SeoLandingPageData;
  timestamp?: string;
}

export interface FetchSeoPageByPathParams {
  country?: string;
  city: string;
  role?: string;
}

/** Strip simple HTML tags from CMS fields for plain-text UI. */
export function stripHtml(value?: string | null): string {
  if (!value) return "";
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

/** Normalize internal CTA paths to trailing-slash form used by the site. */
export function normalizeInternalHref(href?: string | null): string | undefined {
  if (!href || !href.trim()) return undefined;
  const trimmed = href.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  if (withLeading.includes("?") || withLeading.includes("#")) return withLeading;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

/** Parses schema from string (handling embedded <script> tags or raw JSON) or object. */
export function parseSchemaJson(raw: unknown): Record<string, unknown> | null {
  if (!raw) return null;
  if (typeof raw === "object") {
    if (Array.isArray(raw)) return raw as unknown as Record<string, unknown>;
    return Object.keys(raw).length > 0 ? (raw as Record<string, unknown>) : null;
  }
  if (typeof raw === "string") {
    let clean = raw.trim();
    if (!clean) return null;
    const scriptMatch = /<script\b[^>]*>([\s\S]*?)<\/script>/gi.exec(clean);
    if (scriptMatch && scriptMatch[1]) {
      clean = scriptMatch[1].trim();
    } else {
      clean = clean.replace(/<\/?script\b[^>]*>/gi, "").trim();
    }
    if (!clean) return null;
    try {
      const parsed = JSON.parse(clean);
      return typeof parsed === "object" && parsed !== null ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

/** Unifies flat database columns and nested CMS groups into a standardized structure. */
export function normalizeSeoLandingPageData(
  raw: SeoLandingPageData | null | undefined
): SeoLandingPageData | null {
  if (!raw || typeof raw !== "object") return null;

  const rawAny = raw as unknown as Record<string, unknown>;

  const hero: SeoPageHero = {
    pill: (raw.hero?.pill || raw.heroPill || "").trim() || undefined,
    h1: (raw.hero?.h1 || raw.h1 || "").trim(),
    shortDescription: (raw.hero?.shortDescription || raw.shortDescription || "").trim() || undefined,
  };

  const rawCards = raw.advantage?.cards || raw.advantageCards;
  const advantageCards: SeoAdvantageCard[] = Array.isArray(rawCards) ? rawCards : [];

  const advantage: SeoPageAdvantage = {
    pill: (raw.advantage?.pill || raw.advantagePill || "").trim() || undefined,
    heading: (raw.advantage?.heading || raw.advantageHeading || "").trim(),
    description: (raw.advantage?.description || raw.advantageDescription || "").trim() || undefined,
    ctaLabel: (raw.advantage?.ctaLabel || raw.advantageCtaLabel || "").trim() || undefined,
    ctaUrl: (raw.advantage?.ctaUrl || raw.advantageCtaUrl || "").trim() || undefined,
    cards: advantageCards,
  };

  let ecosystemImage: string | null = null;
  const rawEcosystemImg = raw.ecosystem?.image ?? raw.ecosystemImage;
  if (typeof rawEcosystemImg === "string") {
    ecosystemImage = rawEcosystemImg.trim() || null;
  } else if (rawEcosystemImg && typeof rawEcosystemImg === "object") {
    const obj = rawEcosystemImg as { url?: string; src?: string };
    ecosystemImage = (obj.url || obj.src || "").trim() || null;
  }

  const ecosystem: SeoPageEcosystem = {
    pill: (raw.ecosystem?.pill || raw.ecosystemPill || "").trim() || undefined,
    heading: (raw.ecosystem?.heading || raw.ecosystemHeading || "").trim(),
    description: (raw.ecosystem?.description || raw.ecosystemDescription || "").trim() || undefined,
    ctaLabel: (raw.ecosystem?.ctaLabel || raw.ecosystemCtaLabel || "").trim() || undefined,
    ctaUrl: (raw.ecosystem?.ctaUrl || raw.ecosystemCtaUrl || "").trim() || undefined,
    image: ecosystemImage,
  };

  const rawFaqs = raw.faq?.items || raw.faqs;
  const faqItems: SeoFaqItem[] = Array.isArray(rawFaqs) ? rawFaqs : [];

  const faq: SeoPageFaq = {
    pill: (raw.faq?.pill || raw.faqPill || "").trim() || undefined,
    heading: (raw.faq?.heading || raw.faqHeading || "").trim() || undefined,
    items: faqItems,
  };

  const meta: SeoPageMeta = {
    metaTitle: (raw.meta?.metaTitle || raw.metaTitle || hero.h1 || "").trim(),
    metaDescription: (raw.meta?.metaDescription || raw.metaDescription || stripHtml(hero.shortDescription) || "").trim(),
    focusKeyword: (raw.meta?.focusKeyword || raw.focusKeyword || "").trim() || undefined,
    metaKeywords: (raw.meta?.metaKeywords || raw.metaKeywords || "").trim() || undefined,
    canonicalUrl: (raw.meta?.canonicalUrl || raw.canonicalUrl || "").trim() || undefined,
    ogTitle: (raw.meta?.ogTitle || (rawAny.ogTitle as string) || raw.meta?.metaTitle || raw.metaTitle || "").trim() || undefined,
    ogDescription: (raw.meta?.ogDescription || (rawAny.ogDescription as string) || raw.meta?.metaDescription || raw.metaDescription || "").trim() || undefined,
    ogImage: (raw.meta?.ogImage || (rawAny.ogImage as string) || "").trim() || undefined,
  };

  const schemas: SeoPageSchemas = {
    breadcrumbSchema: (parseSchemaJson(raw.schemas?.breadcrumbSchema) || parseSchemaJson(raw.breadcrumbSchema) || undefined) as Record<string, unknown> | undefined,
    organizationSchema: (parseSchemaJson(raw.schemas?.organizationSchema) || parseSchemaJson(raw.organizationSchema) || undefined) as Record<string, unknown> | undefined,
    faqSchema: (parseSchemaJson(raw.schemas?.faqSchema) || parseSchemaJson(raw.faqSchema) || undefined) as Record<string, unknown> | undefined,
    reviewSchema: (parseSchemaJson(raw.schemas?.reviewSchema) || parseSchemaJson(raw.reviewSchema) || undefined) as Record<string, unknown> | undefined,
  };

  return {
    ...raw,
    hero,
    advantage,
    ecosystem,
    faq,
    meta,
    schemas,
  };
}

export function buildSeoPageByPathUrl(params: FetchSeoPageByPathParams): string {
  const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.PUBLIC.SEO_PAGES_BY_PATH}`);
  url.searchParams.set("country", (params.country || "in").trim().toLowerCase());
  url.searchParams.set("city", params.city.trim().toLowerCase());
  if (params.role && params.role.trim()) {
    url.searchParams.set("role", params.role.trim().toLowerCase());
  }
  return url.toString();
}

/**
 * Resolves SEO landing page content by country / city / role path.
 */
export async function fetchSeoPageByPath(
  params: FetchSeoPageByPathParams,
  init?: RequestInit
): Promise<SeoLandingPageData | null> {
  const url = buildSeoPageByPathUrl(params);
  const isDev = process.env.NODE_ENV !== "production";

  console.log(`🌐 [SEO API REQUEST] Fetching SEO page data from backend:`);
  console.log(`   ➡️ URL: ${url}`);
  console.log(`   ➡️ Params: city="${params.city}", role="${params.role || "none"}", country="${params.country || "in"}"`);

  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
      },
      // In development mode, do not cache for 1 hour so live CMS changes reflect immediately
      next: isDev ? { revalidate: 0 } : { revalidate: 3600 },
      ...init,
    });

    console.log(`📡 [SEO API RESPONSE] Status: ${res.status} ${res.statusText} for URL: ${url}`);

    if (!res.ok) {
      console.warn(
        `⚠️ [SEO API WARNING] Failed to fetch SEO page by path (${params.city}/${params.role || "all"}): ${res.status} ${res.statusText}`
      );
      return null;
    }

    const payload: SeoLandingPageResponse = await res.json();
    console.log(`📦 [SEO API PAYLOAD] Backend response:`, {
      success: payload?.success,
      message: payload?.message,
      hasData: Boolean(payload?.data),
      id: payload?.data?.id,
      city: payload?.data?.city,
      role: payload?.data?.role,
      metaTitle: payload?.data?.metaTitle || payload?.data?.meta?.metaTitle,
      hasAdvantage: Boolean(payload?.data?.advantage || payload?.data?.advantageHeading),
      hasEcosystem: Boolean(payload?.data?.ecosystem || payload?.data?.ecosystemHeading),
      hasFaqs: Boolean(payload?.data?.faq?.items?.length || payload?.data?.faqs?.length),
    });

    return payload?.success && payload.data ? normalizeSeoLandingPageData(payload.data) : null;
  } catch (error) {
    console.error(
      `❌ [SEO API ERROR] Network error fetching SEO page by path (${params.city}/${params.role || "all"}):`,
      error
    );
    return null;
  }
}

function resolveCanonicalPath(data: SeoLandingPageData): string {
  const fromCanonical = data.meta?.canonicalUrl || data.canonicalUrl;
  if (fromCanonical) {
    try {
      const parsed = new URL(fromCanonical);
      return parsed.pathname.endsWith("/")
        ? parsed.pathname
        : `${parsed.pathname}/`;
    } catch {
      // fall through to slug/url builders
    }
  }

  if (data.url) {
    return data.url.endsWith("/") ? data.url : `${data.url}/`;
  }

  const citySlug = data.citySlug || data.city;
  const roleSlug = data.roleSlug;
  return roleSlug
    ? `/jobs/in/${citySlug}/${roleSlug}/`
    : `/jobs/in/${citySlug}/`;
}

/** Build Next.js Metadata from CMS SEO landing page meta. */
export function seoLandingPageMetadata(
  data: SeoLandingPageData
): Metadata {
  const normalized = normalizeSeoLandingPageData(data) || data;
  const meta: Partial<SeoPageMeta> = normalized.meta || {};
  const title = meta.metaTitle?.trim() || normalized.hero?.h1 || SITE_NAME;
  const description =
    meta.metaDescription?.trim() ||
    stripHtml(normalized.hero?.shortDescription) ||
    SITE_NAME;
  const ogTitle = meta.ogTitle?.trim() || title;
  const ogDescription = meta.ogDescription?.trim() || description;
  const path = resolveCanonicalPath(normalized);
  const canonical = absoluteUrl(path);
  const ogImageUrl = meta.ogImage?.trim();

  const ogImages = ogImageUrl
    ? [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ]
    : undefined;

  return {
    title: { absolute: title },
    description,
    ...(meta.metaKeywords?.trim()
      ? { keywords: meta.metaKeywords.split(/,\s*/).filter(Boolean) }
      : {}),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: "@stafftonhealth",
      title: ogTitle,
      description: ogDescription,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}

/** Build schema.org BreadcrumbList for City & Role pages. */
export function buildBreadcrumbJsonLd(params: {
  city: string;
  citySlug?: string;
  role?: string;
  roleSlug?: string;
  roleLabel?: string;
}): Record<string, unknown> {
  const { city, citySlug, role, roleSlug, roleLabel } = params;
  const cSlug = (citySlug || toCitySlug(city)).replace(/^\/+|\/+$/g, "");
  const rSlug = (roleSlug || (role ? role.toLowerCase() : "")).replace(/^\/+|\/+$/g, "");
  const rLabel =
    roleLabel ||
    (rSlug
      ? rSlug
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ")
      : undefined);

  const itemListElement: Record<string, unknown>[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Jobs",
      item: `${SITE_URL}/nurse-doctor-jobs-india/`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: `${city} Jobs`,
      item: `${SITE_URL}/jobs/in/${cSlug}/`,
    },
  ];

  if (rSlug && rLabel) {
    itemListElement.push({
      "@type": "ListItem",
      position: 4,
      name: `${rLabel} Jobs in ${city}`,
      item: `${SITE_URL}/jobs/in/${cSlug}/${rSlug}/`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

/** Build schema.org CollectionPage for healthcare job listing pages. */
export function buildCollectionPageJsonLd(params: {
  title: string;
  description: string;
  url: string;
}): Record<string, unknown> {
  const { title, description, url } = params;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: title,
    description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  };
}

/** Build schema.org FAQPage from FAQ questions and answers. */
export function buildFaqJsonLd(items: SeoFaqItem[]): Record<string, unknown> | null {
  if (!Array.isArray(items) || items.length === 0) return null;
  const validItems = items
    .filter((item) => item && item.question?.trim() && item.answer?.trim())
    .map((item) => ({
      "@type": "Question",
      name: stripHtml(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.answer),
      },
    }));

  if (validItems.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validItems,
  };
}

export interface SeoLandingPageJsonLdContext {
  city?: string;
  citySlug?: string;
  role?: string;
  roleSlug?: string;
  roleLabel?: string;
  h1Title?: string;
  description?: string;
  canonicalUrl?: string;
  faqItems?: SeoFaqItem[];
}

/**
 * Collect JSON-LD objects from CMS schemas or auto-generate complete structured data
 * (BreadcrumbList, CollectionPage, FAQPage) when custom overrides are omitted.
 */
export function seoLandingPageJsonLd(
  source?: SeoLandingPageData | SeoPageSchemas | null,
  context?: SeoLandingPageJsonLdContext
): Record<string, unknown>[] {
  const sourceAny = (source || {}) as Record<string, unknown>;
  const schemasObj = (sourceAny.schemas && typeof sourceAny.schemas === "object"
    ? sourceAny.schemas
    : sourceAny) as Record<string, unknown>;

  const results: Record<string, unknown>[] = [];
  const existingTypes = new Set<string>();

  const addSchema = (schema: Record<string, unknown> | null | undefined) => {
    if (!schema) return;
    const type = typeof schema["@type"] === "string" ? schema["@type"] : "";
    results.push(schema);
    if (type) existingTypes.add(type);
  };

  // 1. Parse custom schemas provided by CMS
  const customFaq = parseSchemaJson(schemasObj.faqSchema ?? sourceAny.faqSchema);
  const customReview = parseSchemaJson(schemasObj.reviewSchema ?? sourceAny.reviewSchema);
  const customBreadcrumb = parseSchemaJson(schemasObj.breadcrumbSchema ?? sourceAny.breadcrumbSchema);
  const customOrg = parseSchemaJson(schemasObj.organizationSchema ?? sourceAny.organizationSchema);

  if (customFaq) addSchema(customFaq);
  if (customReview) addSchema(customReview);
  if (customBreadcrumb) addSchema(customBreadcrumb);
  if (customOrg) addSchema(customOrg);

  // 2. Auto-Enhance: BreadcrumbList (if not provided by CMS)
  if (!existingTypes.has("BreadcrumbList")) {
    const city = context?.city || (sourceAny.city as string);
    const citySlug =
      context?.citySlug ||
      (sourceAny.citySlug as string) ||
      (city ? toCitySlug(city) : "");
    const role = context?.role || (sourceAny.role as string);
    const roleSlug =
      context?.roleSlug ||
      (sourceAny.roleSlug as string) ||
      (role ? role.toLowerCase() : "");
    const roleLabel = context?.roleLabel;

    if (city) {
      addSchema(
        buildBreadcrumbJsonLd({
          city,
          citySlug,
          role,
          roleSlug,
          roleLabel,
        })
      );
    }
  }

  // 3. Auto-Enhance: CollectionPage (if not provided)
  if (!existingTypes.has("CollectionPage") && !existingTypes.has("WebPage")) {
    const city = context?.city || (sourceAny.city as string) || "";
    const role = context?.role || (sourceAny.role as string) || "";
    const roleLabel = context?.roleLabel;
    const defaultTitle = roleLabel
      ? `${roleLabel} Jobs in ${city} | Staffton Health`
      : `Healthcare Jobs in ${city} | Staffton Health`;
    const defaultDesc = roleLabel
      ? `Explore verified ${roleLabel.toLowerCase()} job openings in ${city} with competitive salaries and direct hospital placement on Staffton.`
      : `Explore verified healthcare jobs in ${city} with competitive salaries and direct hospital placement on Staffton.`;

    const title = context?.h1Title || (sourceAny.h1 as string) || defaultTitle;
    const description =
      context?.description || (sourceAny.shortDescription as string) || defaultDesc;
    const resolvedPath = source
      ? resolveCanonicalPath(source as SeoLandingPageData)
      : role
      ? `/jobs/in/${toCitySlug(city)}/${role.toLowerCase()}/`
      : `/jobs/in/${toCitySlug(city)}/`;

    const fullUrl = context?.canonicalUrl || absoluteUrl(resolvedPath);

    addSchema(
      buildCollectionPageJsonLd({
        title,
        description,
        url: fullUrl,
      })
    );
  }

  // 4. Auto-Enhance: FAQPage (if not in CMS, but FAQ items exist)
  if (!existingTypes.has("FAQPage")) {
    const candidateFaqs =
      context?.faqItems ||
      (sourceAny.faq && Array.isArray((sourceAny.faq as SeoPageFaq).items)
        ? (sourceAny.faq as SeoPageFaq).items
        : Array.isArray(sourceAny.faqs)
        ? (sourceAny.faqs as SeoFaqItem[])
        : []);

    if (candidateFaqs && candidateFaqs.length > 0) {
      addSchema(buildFaqJsonLd(candidateFaqs));
    }
  }

  return results;
}

/** Fallback metadata when CMS page content is unavailable. */
export function fallbackCityJobsMetadata(params: {
  cityName: string;
  citySlug: string;
  roleSlug?: string;
  roleLabel?: string;
}): Metadata {
  const { cityName, citySlug, roleSlug, roleLabel } = params;
  const title = roleLabel
    ? `${roleLabel} Jobs in ${cityName} | Staffton Health`
    : `Healthcare Jobs in ${cityName} | Staffton Health`;
  const description = roleLabel
    ? `Find verified ${roleLabel.toLowerCase()} jobs in ${cityName} with Staffton Health.`
    : `Find verified healthcare jobs in ${cityName} with Staffton Health.`;
  const path = roleSlug
    ? `/jobs/in/${citySlug}/${roleSlug}/`
    : `/jobs/in/${citySlug}/`;
  const canonical = absoluteUrl(path);

  const defaultOgImage = {
    url: `${SITE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: title,
    type: "image/png",
  };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      title,
      description,
      url: canonical,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      site: "@stafftonhealth",
      title,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

