import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import City from "./city";
import { matchCitySlug } from "./match-city";
import { getSeoCities } from "../../../utility/constants";
import {
  fallbackCityJobsMetadata,
  fetchSeoPageByPath,
  seoLandingPageMetadata,
} from "../../../utility/seo-pages-api";

type PageParams = Promise<{ cities: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { cities } = await params;
  const seoCities = await getSeoCities();
  const matched = matchCitySlug(seoCities, cities);

  if (!matched) {
    return {};
  }

  const seoPage = await fetchSeoPageByPath({
    country: "in",
    city: cities,
  });

  if (seoPage) {
    return seoLandingPageMetadata(seoPage);
  }

  return fallbackCityJobsMetadata({
    cityName: matched.city,
    citySlug: cities,
  });
}

export default async function IndianCities({
  params,
}: {
  params: PageParams;
}) {
  const { cities } = await params;
  const seoCities = await getSeoCities();
  const matched = matchCitySlug(seoCities, cities);

  if (!matched) {
    notFound();
  }

  const seoPage = await fetchSeoPageByPath({
    country: "in",
    city: cities,
  });

  return <City city={matched.city} seoPage={seoPage} />;
}
