import type { MetadataRoute } from "next";
import { HIRE_TALENT_PATH, absoluteUrl } from "./utility/site";
import {
  ALL_ROLE_SLUGS,
  getSeoCities,
  toCitySlug,
} from "./utility/constants";

export const dynamic = "force-static";

// Update these dates whenever the corresponding page content changes.
// Using hardcoded dates prevents every deploy from falsely marking all
// pages as "just modified", which misleads Google's crawl scheduler.
const DATES = {
  core: new Date("2026-08-24"),
  jobs: new Date("2026-08-24"),
  about: new Date("2026-08-11"),
  contact: new Date("2026-08-11"),
  legal: new Date("2026-06-01"),
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seoCities = await getSeoCities();
  const citySlugs = seoCities.map((item) =>
    item.slug
      ? item.slug
          .replace(/^\//, "")
          .replace(/^jobs\/in\//, "")
          .replace(/\/$/, "")
      : toCitySlug(item.city)
  );

  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: absoluteUrl(`/jobs/in/${slug}`),
    lastModified: DATES.jobs,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const rolePages: MetadataRoute.Sitemap = citySlugs.flatMap((citySlug) =>
    ALL_ROLE_SLUGS.map((role) => ({
      url: absoluteUrl(`/jobs/in/${citySlug}/${role}`),
      lastModified: DATES.jobs,
      changeFrequency: "weekly",
      priority: 0.8,
    }))
  );

  return [
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
    ...cityPages,
    ...rolePages,
    {
      url: absoluteUrl("/about-us"),
      lastModified: DATES.about,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact-us"),
      lastModified: DATES.contact,
      changeFrequency: "monthly",
      priority: 0.8,
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
  ];
}

