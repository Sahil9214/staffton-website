import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import City from "../city";
import { matchCitySlug } from "../match-city";
import {
  ALL_ROLE_SLUGS,
  getSeoCities,
  type RoleSlug,
} from "../../../../utility/constants";
import {
  fallbackCityJobsMetadata,
  fetchSeoPageByPath,
  seoLandingPageMetadata,
} from "../../../../utility/seo-pages-api";

type PageParams = Promise<{ cities: string; role: string }>;

function isValidRole(role: string): role is RoleSlug {
  const lower = role.toLowerCase().trim();
  return ALL_ROLE_SLUGS.includes(lower as RoleSlug);
}

function roleLabel(role: string) {
  return role
    .toLowerCase()
    .trim()
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { cities, role } = await params;
  const cleanRole = (role || "").toLowerCase().trim();

  if (!isValidRole(cleanRole)) {
    return {};
  }

  const seoCities = await getSeoCities();
  const matched = matchCitySlug(seoCities, cities);

  if (!matched) {
    return {};
  }

  const seoPage = await fetchSeoPageByPath({
    country: "in",
    city: cities,
    role: cleanRole,
  });

  if (!seoPage) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false },
    };
  }

  return seoLandingPageMetadata(seoPage);
}

export default async function IndianCityRoleJobs({
  params,
}: {
  params: PageParams;
}) {
  const { cities, role } = await params;
  const cleanRole = (role || "").toLowerCase().trim();

  console.log(`🚀 [IndianCityRoleJobs SSR] Visiting city="${cities}", role="${cleanRole}"`);

  if (!isValidRole(cleanRole)) {
    console.warn(`⚠️ [IndianCityRoleJobs] Invalid role slug: "${cleanRole}". Allowed:`, ALL_ROLE_SLUGS);
    notFound();
  }

  const seoCities = await getSeoCities();
  const matched = matchCitySlug(seoCities, cities);

  if (!matched) {
    console.warn(`⚠️ [IndianCityRoleJobs] City not matched for slug: "${cities}"`);
    notFound();
  }

  const seoPage = await fetchSeoPageByPath({
    country: "in",
    city: cities,
    role: cleanRole,
  });

  // If no page data from API (page not published in CMS or API failed), render 404 page
  if (!seoPage) {
    console.warn(`⚠️ [IndianCityRoleJobs] No data from SEO API for ${cities}/${cleanRole} -> Showing 404 page`);
    notFound();
  }

  return <City city={matched.city} role={cleanRole} seoPage={seoPage} />;
}
