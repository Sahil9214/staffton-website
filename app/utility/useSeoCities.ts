"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_SEO_CITIES,
  SEO_CITIES_API_URL,
  toCitySlug,
  type SeoCitiesApiResponse,
} from "./constants";

export interface CityNavItem {
  name: string;
  href: string;
  slug?: string;
}

const formatCityList = (list: { city: string; slug?: string }[]): CityNavItem[] =>
  list.map((item) => {
    let href = item.slug || `/jobs/in/${toCitySlug(item.city)}`;
    if (!href.startsWith("/")) {
      href = `/${href}`;
    }
    if (!href.endsWith("/")) {
      href = `${href}/`;
    }
    return {
      name: item.city,
      href,
      slug: item.slug || toCitySlug(item.city),
    };
  });

const DEFAULT_NAV_CITIES = formatCityList(DEFAULT_SEO_CITIES);

// Module-level singleton cache to prevent duplicate network calls
let cachedCitiesData: CityNavItem[] | null = null;
let cachedCitiesPromise: Promise<CityNavItem[]> | null = null;

export const fetchClientSeoCities = async (): Promise<CityNavItem[]> => {
  if (cachedCitiesData && cachedCitiesData.length > 0) {
    return cachedCitiesData;
  }

  if (cachedCitiesPromise) {
    return cachedCitiesPromise;
  }

  cachedCitiesPromise = (async () => {
    try {
      const response = await fetch(SEO_CITIES_API_URL);
      if (!response.ok) {
        cachedCitiesData = DEFAULT_NAV_CITIES;
        return DEFAULT_NAV_CITIES;
      }

      const result: SeoCitiesApiResponse = await response.json();
      if (result?.success && Array.isArray(result?.data) && result.data.length > 0) {
        const formatted = formatCityList(result.data);
        cachedCitiesData = formatted;
        return formatted;
      }
      cachedCitiesData = DEFAULT_NAV_CITIES;
      return DEFAULT_NAV_CITIES;
    } catch (error) {
      console.error("Failed to fetch SEO cities list:", error);
      cachedCitiesData = DEFAULT_NAV_CITIES;
      return DEFAULT_NAV_CITIES;
    } finally {
      cachedCitiesPromise = null;
    }
  })();

  return cachedCitiesPromise;
};

/**
 * Custom hook to get SEO cities list.
 * Deduplicates in-flight requests and caches response in-memory across all components.
 */
export const useSeoCities = (): CityNavItem[] => {
  const [cities, setCities] = useState<CityNavItem[]>(cachedCitiesData || []);

  useEffect(() => {
    if (cachedCitiesData && cachedCitiesData.length > 0) {
      setCities(cachedCitiesData);
      return;
    }

    let isMounted = true;
    fetchClientSeoCities().then((data) => {
      if (isMounted && data.length > 0) {
        setCities(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return cities;
};
