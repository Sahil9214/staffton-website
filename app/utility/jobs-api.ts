import { API_BASE_URL, API_ENDPOINTS } from "./constants";

export interface JobTypeItem {
  id: string;
  name: string;
}

export interface ShiftTypeItem {
  id: string;
  name: string;
}

export interface ProfessionItem {
  id: string;
  name: string;
}

export interface SpecialisationItem {
  id: string;
  name: string;
}

export interface QualificationItem {
  id: string;
  name: string;
}

export interface ApiJobItem {
  id: string;
  title: string;
  orgName: string;
  city: string;
  state: string;
  experienceText?: string;
  experienceMinYrs?: number;
  experienceMaxYrs?: number;
  salaryText?: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType?: JobTypeItem[];
  shiftType?: ShiftTypeItem[];
  profession?: ProfessionItem[];
  specialisation?: SpecialisationItem[];
  requiredQualification?: QualificationItem[];
  publishedAt?: string;
}

export interface ApiFilterSalaryRange {
  key: string;
  label: string;
  count: number;
}

export interface ApiFilterRoleCategory {
  name: string;
  count: number;
}

export interface ApiFilterEducation {
  key?: string;
  label?: string;
  name?: string;
  count?: number;
}

export interface ApiFilters {
  experience: {
    min: number;
    max: number;
  };
  salaryRanges: ApiFilterSalaryRange[];
  roleCategories: ApiFilterRoleCategory[];
  education: ApiFilterEducation[];
}

export interface ApiPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiSeoData {
  city: string;
  aliases?: string[];
  cityAliases?: string[];
  service?: string;
  serviceKeywords?: string[];
  slug: string;
  h1Title: string;
  metaTitle: string;
  metaDescription: string;
  seoKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
}

export interface CityJobsApiResponse {
  success: boolean;
  message?: string;
  data: {
    seo: ApiSeoData;
    jobs: ApiJobItem[];
    filters: ApiFilters;
    pagination: ApiPagination;
  };
  timestamp?: string;
}

export interface FetchCityJobsParams {
  citySlug: string;
  role?: string;
  page?: number;
  limit?: number;
  q?: string;
  salary?: string | string[];
  role_category?: string | string[];
  experience_min?: number;
  experience_max?: number;
  education?: string | string[];
  sort_by?: string;
}

/**
 * Maps a URL role slug (e.g. 'doctor', 'non-allied') to the role name expected by the API (e.g. 'Doctor', 'Non-Allied').
 */
export function roleSlugToApiRole(roleSlug?: string): string {
  if (!roleSlug) return "";
  const s = roleSlug.toLowerCase().trim();
  if (s === "doctor") return "Doctor";
  if (s === "nurse") return "Nurse";
  if (s === "allied") return "Allied";
  if (s === "technician") return "Technician";
  if (s === "non-allied" || s === "non-technician") return "Non-Allied";
  return roleSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");
}

/**
 * Maps an API role name (e.g. 'Doctor', 'Non-Allied') to a URL slug (e.g. 'doctor', 'non-allied').
 */
export function apiRoleToRoleSlug(apiRole?: string): string {
  if (!apiRole) return "";
  const s = apiRole.toLowerCase().trim();
  if (s === "doctor") return "doctor";
  if (s === "nurse") return "nurse";
  if (s === "allied") return "allied";
  if (s === "technician") return "technician";
  if (s === "non-allied" || s === "non-technician") return "non-allied";
  return s.replace(/\s+/g, "-");
}

/**
 * Builds the URL and query parameters for fetching city jobs.
 */
export function buildCityJobsApiUrl(params: FetchCityJobsParams): string {
  const {
    citySlug,
    role,
    page = 1,
    limit = 10,
    q,
    salary,
    role_category,
    experience_min,
    experience_max,
    education,
    sort_by = "latest",
  } = params;

  const cleanSlug = citySlug
    .replace(/^\/?jobs\/in\//, "")
    .replace(/^\/+|\/+$/g, "");
  const url = new URL(
    `${API_BASE_URL}${API_ENDPOINTS.PUBLIC.SEO_CITY_JOBS}/${encodeURIComponent(cleanSlug)}`
  );

  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  if (sort_by) {
    url.searchParams.set("sort_by", sort_by);
  }

  if (role && role.trim() && role.toLowerCase() !== "all") {
    url.searchParams.set("role", role.trim());
  }

  if (q && q.trim()) {
    url.searchParams.set("q", q.trim());
  }

  if (salary) {
    const salStr = Array.isArray(salary) ? salary.filter(Boolean).join(",") : salary;
    if (salStr.trim()) {
      url.searchParams.set("salary", salStr.trim());
    }
  }

  if (role_category && (!role || role === "all")) {
    const roleStr = Array.isArray(role_category)
      ? role_category.filter(Boolean).join(",")
      : role_category;
    if (roleStr.trim() && roleStr !== "all") {
      url.searchParams.set("role_category", roleStr.trim());
    }
  }

  if (experience_min != null && !Number.isNaN(experience_min)) {
    url.searchParams.set("experience_min", String(experience_min));
  }

  if (experience_max != null && !Number.isNaN(experience_max)) {
    url.searchParams.set("experience_max", String(experience_max));
  }

  if (education) {
    const eduStr = Array.isArray(education)
      ? education.filter(Boolean).join(",")
      : education;
    if (eduStr.trim()) {
      url.searchParams.set("education", eduStr.trim());
    }
  }

  return url.toString();
}

/**
 * Fetches SEO jobs for a specific city from the backend API.
 */
export async function fetchCityJobs(
  params: FetchCityJobsParams,
  init?: RequestInit
): Promise<CityJobsApiResponse | null> {
  try {
    const url = buildCityJobsApiUrl(params);
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
      },
      next: { revalidate: 3600 },
      ...init,
    });

    if (!res.ok) {
      console.warn(`Failed to fetch jobs for city (${params.citySlug}): ${res.status} ${res.statusText}`);
      return null;
    }

    const data: CityJobsApiResponse = await res.json();
    return data?.success ? data : null;
  } catch (error) {
    console.error(`Error fetching jobs for city (${params.citySlug}):`, error);
    return null;
  }
}

/**
 * Formats a raw number into a compact Indian currency format (e.g. ₹25k, ₹1.5L, ₹1.2Cr).
 */
export function formatAmountCompact(val: number): string {
  if (!val || isNaN(val) || val <= 0) return "₹0";

  if (val >= 10000000) {
    // Crores
    const cr = val / 10000000;
    const formatted = cr % 1 === 0 ? String(cr) : parseFloat(cr.toFixed(2));
    return `₹${formatted}Cr`;
  }

  if (val >= 100000) {
    // Lakhs
    const lk = val / 100000;
    const formatted = lk % 1 === 0 ? String(lk) : parseFloat(lk.toFixed(2));
    return `₹${formatted}L`;
  }

  if (val >= 1000) {
    // Thousands (k)
    const k = val / 1000;
    const formatted = k % 1 === 0 ? String(k) : parseFloat(k.toFixed(1));
    return `₹${formatted}k`;
  }

  return `₹${Math.round(val)}`;
}

/**
 * Standardizes and formats salary into k, L, and Cr on a monthly (/ month) basis.
 * Handles messy API strings, min/max ranges, and fallbacks.
 */
export function formatMonthlySalary(
  salaryText?: string | null,
  min?: number | null,
  max?: number | null
): string {
  if (!salaryText && !min && !max) return "Best in Industry";
  if (salaryText && !/[\d]/.test(salaryText)) return salaryText;

  if (salaryText) {
    const rawMatches = salaryText.match(/[\d,]+/g);
    if (rawMatches && rawMatches.length > 0) {
      const numbers = rawMatches
        .map((m) => parseFloat(m.replace(/,/g, "")))
        .filter((n) => !isNaN(n) && n > 0);

      if (numbers.length === 1) {
        return `${formatAmountCompact(numbers[0])} / month`;
      }
      if (numbers.length >= 2) {
        return `${formatAmountCompact(numbers[0])} - ${formatAmountCompact(numbers[1])} / month`;
      }
    }
  }

  if (min != null && max != null && min > 0 && max > 0) {
    return `${formatAmountCompact(min)} - ${formatAmountCompact(max)} / month`;
  }
  if (min != null && min > 0) {
    return `${formatAmountCompact(min)} / month`;
  }
  if (max != null && max > 0) {
    return `${formatAmountCompact(max)} / month`;
  }

  return salaryText || "Best in Industry";
}

