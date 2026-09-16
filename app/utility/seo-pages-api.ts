import type { Metadata } from "next";
import {
  API_BASE_URL,
  API_ENDPOINTS,
  SEO_PAGES_SITEMAP_API_URL,
} from "./constants";
import { absoluteUrl, SITE_NAME } from "./site";

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
  meta: SeoPageMeta;
  hero: SeoPageHero;
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
  try {
    const url = buildSeoPageByPathUrl(params);
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
      },
      next: { revalidate: 3600 },
      ...init,
    });

    if (!res.ok) {
      console.warn(
        `Failed to fetch SEO page by path (${params.city}/${params.role || "all"}): ${res.status} ${res.statusText}`
      );
      return null;
    }

    const payload: SeoLandingPageResponse = await res.json();
    return payload?.success && payload.data ? payload.data : null;
  } catch (error) {
    console.error(
      `Error fetching SEO page by path (${params.city}/${params.role || "all"}):`,
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
  const meta = data.meta;
  const title = meta.metaTitle?.trim() || data.hero?.h1 || SITE_NAME;
  const description =
    meta.metaDescription?.trim() ||
    stripHtml(data.hero?.shortDescription) ||
    SITE_NAME;
  const ogTitle = meta.ogTitle?.trim() || title;
  const ogDescription = meta.ogDescription?.trim() || description;
  const path = resolveCanonicalPath(data);
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

/** Collect non-empty JSON-LD objects from CMS schemas. */
export function seoLandingPageJsonLd(
  schemas?: SeoPageSchemas | null
): Record<string, unknown>[] {
  if (!schemas) return [];

  return [
    schemas.faqSchema,
    schemas.reviewSchema,
    schemas.breadcrumbSchema,
    schemas.organizationSchema,
  ].filter(
    (schema): schema is Record<string, unknown> =>
      Boolean(schema) && typeof schema === "object"
  );
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
    },
    twitter: {
      card: "summary_large_image",
      site: "@stafftonhealth",
      title,
      description,
    },
  };
}

