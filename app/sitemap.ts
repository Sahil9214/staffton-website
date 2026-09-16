import type { MetadataRoute } from "next";
import { HIRE_TALENT_PATH, absoluteUrl } from "./utility/site";
import {
  ALL_ROLE_SLUGS,
  getAllBlogSitemapPosts,
  getSeoCities,
  toCitySlug,
} from "./utility/constants";
import { fetchSeoPagesSitemap } from "./utility/seo-pages-api";

export const dynamic = "force-static";

// Update these dates whenever the corresponding page content changes.
// Using hardcoded dates prevents every deploy from falsely marking all
// pages as "just modified", which misleads Google's crawl scheduler.
const DATES = {
  core: new Date("2026-08-24"),
  jobs: new Date("2026-08-24"),
  about: new Date("2026-08-11"),
  contact: new Date("2026-08-11"),
  thankYou: new Date("2026-09-16"),
  legal: new Date("2026-06-01"),
} as const;

function parseDate(value?: string | null, fallback: Date = DATES.jobs): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

function normalizeSitemapUrl(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      if (!parsed.pathname.endsWith("/")) {
        parsed.pathname = `${parsed.pathname}/`;
      }
      return parsed.toString();
    } catch {
      return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
    }
  }

  return absoluteUrl(trimmed.startsWith("/") ? trimmed : `/${trimmed}`);
}

function buildFallbackJobPages(
  seoCities: Awaited<ReturnType<typeof getSeoCities>>
): MetadataRoute.Sitemap {
  const cityPages: MetadataRoute.Sitemap = seoCities
    .filter((item) => item.hasActiveCityPage !== false)
    .map((item) => {
      const slug = item.slug
        ? item.slug
            .replace(/^\//, "")
            .replace(/^jobs\/in\//, "")
            .replace(/\/$/, "")
        : toCitySlug(item.city);
      return {
        url: absoluteUrl(`/jobs/in/${slug}`),
        lastModified: DATES.jobs,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      };
    });

  const rolePages: MetadataRoute.Sitemap = seoCities.flatMap((item) => {
    const citySlug = item.slug
      ? item.slug
          .replace(/^\//, "")
          .replace(/^jobs\/in\//, "")
          .replace(/\/$/, "")
      : toCitySlug(item.city);

    const roles =
      item.roles && item.roles.length > 0
        ? item.roles.map((role) => role.slug)
        : item.hasActiveCityPage !== false
          ? ALL_ROLE_SLUGS
          : [];

    return roles.map((role) => ({
      url: absoluteUrl(`/jobs/in/${citySlug}/${role}`),
      lastModified: DATES.jobs,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  });

  return [...cityPages, ...rolePages];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [seoCities, seoSitemapEntries, blogPosts] = await Promise.all([
    getSeoCities(),
    fetchSeoPagesSitemap(),
    getAllBlogSitemapPosts(),
  ]);

  const cmsJobPages: MetadataRoute.Sitemap = seoSitemapEntries.map((entry) => ({
    url: normalizeSitemapUrl(entry.url),
    lastModified: parseDate(entry.updatedAt),
    changeFrequency: "weekly" as const,
    priority: entry.type === "city" ? 0.85 : 0.8,
  }));

  // Prefer CMS sitemap API so newly published SEO paths keep getting indexed.
  // Fall back to cities API when the sitemap endpoint is empty/unreachable.
  const jobPages =
    cmsJobPages.length > 0 ? cmsJobPages : buildFallbackJobPages(seoCities);

  const blogPages: MetadataRoute.Sitemap = blogPosts
    .map((post) => {
      if (!post.link) return null;
      return {
        url: normalizeSitemapUrl(post.link),
        lastModified: parseDate(post.modified || post.date, DATES.core),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  // Dedupe by normalized URL (CMS + blog overlaps shouldn't appear twice).
  const seen = new Set<string>();
  const dedupe = (entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap =>
    entries.filter((entry) => {
      const key = entry.url.replace(/\/$/, "");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return dedupe([
    {
      url: absoluteUrl("/"),
      lastModified: DATES.core,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl(HIRE_TALENT_PATH),
      lastModified: DATES.core,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/nurse-doctor-jobs-india"),
      lastModified: DATES.core,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...jobPages,
    {
      url: absoluteUrl("/about-us"),
      lastModified: DATES.about,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: DATES.core,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPages,
    {
      url: absoluteUrl("/contact-us"),
      lastModified: DATES.contact,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact/thank-you"),
      lastModified: DATES.thankYou,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified: DATES.legal,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms-of-service"),
      lastModified: DATES.legal,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/cookie-policy"),
      lastModified: DATES.legal,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]);
}
