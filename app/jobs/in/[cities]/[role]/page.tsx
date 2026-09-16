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
  return ALL_ROLE_SLUGS.includes(role as RoleSlug);
}

function roleLabel(role: string) {
  return role
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

  if (!isValidRole(role)) {
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
    role,
  });

  if (seoPage) {
    return seoLandingPageMetadata(seoPage);
  }

  return fallbackCityJobsMetadata({
    cityName: matched.city,
    citySlug: cities,
    roleSlug: role,
    roleLabel: roleLabel(role),
  });
}

export default async function IndianCityRoleJobs({
  params,
}: {
  params: PageParams;
}) {
  const { cities, role } = await params;

  if (!isValidRole(role)) {
    notFound();
  }

  const seoCities = await getSeoCities();
  const matched = matchCitySlug(seoCities, cities);

  if (!matched) {
    notFound();
  }

  const seoPage = await fetchSeoPageByPath({
    country: "in",
    city: cities,
    role,
  });

  return <City city={matched.city} role={role} seoPage={seoPage} />;
}
