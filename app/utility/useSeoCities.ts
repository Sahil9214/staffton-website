"use client";

import { useEffect, useState } from "react";
import {
  SEO_CITIES_API_URL,
  ensureTrailingSlash,
  normalizeSeoCitiesResponse,
  type SeoCitiesApiResponse,
  type SeoCityItem,
  type SeoCityRole,
} from "./constants";

export interface CityNavRole {
  label: string;
  slug: string;
  href: string;
}

export interface CityNavItem {
  name: string;
  href: string;
  slug: string;
  hasActiveCityPage: boolean;
  roles: CityNavRole[];
}

const toNavRoles = (roles: SeoCityRole[] = []): CityNavRole[] =>
  roles.map((role) => ({
    label: role.label,
    slug: role.slug,
    href: ensureTrailingSlash(role.url),
  }));

const formatCityList = (list: SeoCityItem[]): CityNavItem[] =>
  list.map((item) => {
    const slug = item.slug
      ? item.slug.replace(/^\/?jobs\/in\//, "").replace(/^\/+|\/+$/g, "")
      : item.city.toLowerCase().replace(/\s+/g, "-");
    const href = ensureTrailingSlash(item.url || `/jobs/in/${slug}/`);

    return {
      name: item.city,
      href,
      slug,
      hasActiveCityPage: item.hasActiveCityPage ?? false,
      roles: toNavRoles(item.roles),
    };
  });

// Module-level singleton cache to prevent duplicate network calls
let cachedCitiesData: CityNavItem[] | null = null;
let cachedCitiesPromise: Promise<CityNavItem[]> | null = null;

export const fetchClientSeoCities = async (): Promise<CityNavItem[]> => {
  if (cachedCitiesData) {
    return cachedCitiesData;
  }

  if (cachedCitiesPromise) {
    return cachedCitiesPromise;
  }

  cachedCitiesPromise = (async () => {
    try {
      const response = await fetch(SEO_CITIES_API_URL);
      if (!response.ok) {
        cachedCitiesData = [];
        return [];
      }

      const result: SeoCitiesApiResponse = await response.json();
      if (result?.success) {
        const normalized = normalizeSeoCitiesResponse(result);
        const formatted = formatCityList(normalized);
        cachedCitiesData = formatted;
        return formatted;
      }

      cachedCitiesData = [];
      return [];
    } catch (error) {
      console.error("Failed to fetch SEO cities list:", error);
      cachedCitiesData = [];
      return [];
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
    if (cachedCitiesData) {
      setCities(cachedCitiesData);
      return;
    }

    let isMounted = true;
    fetchClientSeoCities().then((data) => {
      if (isMounted) {
        setCities(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return cities;
};
