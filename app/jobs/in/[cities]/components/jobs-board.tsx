"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchCityJobs, roleSlugToApiRole, type ApiPagination } from "../../../../utility/jobs-api";
import { toCitySlug } from "../../../../utility/constants";
import JobFilters from "./job-filters";
import JobListings from "./job-listings";
import type { JobCardData } from "./job-card";

interface JobsBoardProps {
  city: string;
  role?: string;
  isRolePage?: boolean;
  initialJobs?: JobCardData[];
  initialPagination?: ApiPagination;
}

const DEFAULT_PAGINATION: ApiPagination = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
};

function mapRoleParam(roles: string[]): string[] {
  return roles
    .filter((r) => r !== "all")
    .map((r) => {
      const lower = r.toLowerCase();
      if (lower === "nurse") return "Nurse";
      if (lower === "doctor") return "Doctor";
      if (lower === "allied") return "Allied";
      if (lower === "technician") return "Technician";
      if (lower === "non-allied" || lower === "non-technician") return "Non-Allied";
      return r;
    });
}

function mapSalaryParam(salaries: string[]): string[] {
  const result: string[] = [];
  for (const s of salaries) {
    if (s === "0-3") {
      result.push("1_2l", "2_5l");
    } else if (s === "3-6") {
      result.push("2_5l", "5_10l");
    } else if (s === "6-10") {
      result.push("5_10l");
    } else if (["10-15", "15-25", "25-50", "50-plus", "gt_10l"].includes(s)) {
      result.push("gt_10l");
    } else {
      result.push(s);
    }
  }
  return Array.from(new Set(result));
}

const JobsBoard = ({
  city,
  role,
  isRolePage = false,
  initialJobs,
  initialPagination,
}: JobsBoardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const boardRef = useRef<HTMLElement>(null);

  const citySlug = toCitySlug(city);
  const activeRole = role ? role.toLowerCase() : undefined;

  // Initialize state from URL search params
  const initialPage = Math.max(1, Number(searchParams?.get("page")) || 1);
  const initialQuery = searchParams?.get("q") || "";
  const initialSalaries = searchParams?.get("salary")
    ? (searchParams.get("salary") || "").split(",").filter(Boolean)
    : [];
  const initialRoles = activeRole
    ? [activeRole]
    : searchParams?.get("role_category")
    ? (searchParams.get("role_category") || "").split(",").filter(Boolean)
    : ["all"];
  const initialExp = Number(searchParams?.get("experience_max")) || 0;

  const [page, setPage] = useState<number>(initialPage);
  const [query, setQuery] = useState<string>(initialQuery);
  const [salaries, setSalaries] = useState<string[]>(initialSalaries);
  const [roles, setRoles] = useState<string[]>(initialRoles);
  const [experience, setExperience] = useState<number>(initialExp);

  const [jobs, setJobs] = useState<JobCardData[]>(
    initialJobs && initialJobs.length > 0 ? initialJobs : []
  );
  const [pagination, setPagination] = useState<ApiPagination>(
    initialPagination ?? {
      ...DEFAULT_PAGINATION,
      page: initialPage,
    }
  );
  const [loading, setLoading] = useState<boolean>(!initialJobs);
  const [isError, setIsError] = useState<boolean>(false);
  const isFirstMountRef = useRef<boolean>(true);

  // Update canonical tag dynamically in document head on client side for self-canonical SEO
  useEffect(() => {
    if (typeof window === "undefined") return;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const baseCanonical = activeRole
      ? `https://stafftonhealth.com/jobs/in/${citySlug}/${activeRole}/`
      : `https://stafftonhealth.com/jobs/in/${citySlug}/`;

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", baseCanonical);
  }, [activeRole, citySlug]);

  // Sync state to URL search parameters without full page reload
  const syncUrlParams = useCallback(
    (nextState: {
      page: number;
      q: string;
      salaries: string[];
      roles: string[];
      experience: number;
    }) => {
      const params = new URLSearchParams();

      if (nextState.page > 1) {
        params.set("page", String(nextState.page));
      }
      if (nextState.q.trim()) {
        params.set("q", nextState.q.trim());
      }
      if (nextState.salaries.length > 0) {
        params.set("salary", nextState.salaries.join(","));
      }
      if (!isRolePage) {
        const activeRolesList = nextState.roles.filter((r) => r !== "all");
        if (activeRolesList.length > 0) {
          params.set("role_category", activeRolesList.join(","));
        }
      }
      if (nextState.experience > 0) {
        params.set("experience_max", String(nextState.experience));
      }

      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", nextUrl);
      }
    },
    [isRolePage, pathname]
  );

  // Fetch / load jobs from backend API
  const loadJobs = useCallback(async () => {
    setLoading(true);
    setIsError(false);

    const apiRole = activeRole ? roleSlugToApiRole(activeRole) : undefined;
    const mappedRoles = !apiRole ? mapRoleParam(roles) : undefined;
    const mappedSalaries = mapSalaryParam(salaries);

    try {
      const res = await fetchCityJobs({
        citySlug,
        role: apiRole,
        page,
        limit: 10,
        q: query.trim() || undefined,
        salary: mappedSalaries.length > 0 ? mappedSalaries : undefined,
        role_category: mappedRoles && mappedRoles.length > 0 ? mappedRoles : undefined,
        experience_max: experience > 0 ? experience : undefined,
        sort_by: "latest",
      });

      if (res?.success && res.data) {
        setJobs(res.data.jobs || []);
        if (res.data.pagination) {
          setPagination(res.data.pagination);
        }
      } else {
        setIsError(true);
        setJobs([]);
        setPagination({
          ...DEFAULT_PAGINATION,
          page,
        });
      }
    } catch (err) {
      console.error("Error loading city jobs from backend:", err);
      setIsError(true);
      setJobs([]);
      setPagination({
        ...DEFAULT_PAGINATION,
        page,
      });
    } finally {
      setLoading(false);
    }
  }, [activeRole, citySlug, experience, page, query, roles, salaries]);

  useEffect(() => {
    if (isFirstMountRef.current && initialJobs && initialJobs.length > 0) {
      isFirstMountRef.current = false;
      return;
    }
    isFirstMountRef.current = false;
    loadJobs();
  }, [loadJobs, initialJobs]);

  // Handlers for interactive actions
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    syncUrlParams({
      page: newPage,
      q: query,
      salaries,
      roles,
      experience,
    });

    if (boardRef.current) {
      const topOffset = boardRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
    }
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    syncUrlParams({
      page: 1,
      q: newQuery,
      salaries,
      roles,
      experience,
    });
  };

  const handleSalariesChange = (newSalaries: string[]) => {
    setSalaries(newSalaries);
    setPage(1);
    syncUrlParams({
      page: 1,
      q: query,
      salaries: newSalaries,
      roles,
      experience,
    });
  };

  // Navigates to dynamic role page when user selects a role, or navigates back to city page when "all" is selected
  const handleRolesChange = (newRoles: string[]) => {
    const selectedRole = newRoles.find((r) => r !== "all");

    if (selectedRole) {
      const targetUrl = `/jobs/in/${citySlug}/${selectedRole}/`;
      if (pathname !== targetUrl) {
        router.push(targetUrl);
        return;
      }
    } else {
      const targetUrl = `/jobs/in/${citySlug}/`;
      if (pathname !== targetUrl) {
        router.push(targetUrl);
        return;
      }
    }

    setRoles(newRoles);
    setPage(1);
    syncUrlParams({
      page: 1,
      q: query,
      salaries,
      roles: newRoles,
      experience,
    });
  };

  const handleExperienceChange = (newExp: number) => {
    setExperience(newExp);
    setPage(1);
    syncUrlParams({
      page: 1,
      q: query,
      salaries,
      roles,
      experience: newExp,
    });
  };

  const handleClearAll = () => {
    setQuery("");
    setSalaries([]);
    if (!isRolePage) {
      setRoles(["all"]);
    }
    setExperience(0);
    setPage(1);
    syncUrlParams({
      page: 1,
      q: "",
      salaries: [],
      roles: isRolePage && activeRole ? [activeRole] : ["all"],
      experience: 0,
    });
  };

  const hasActiveFilters =
    salaries.length > 0 ||
    (!isRolePage && roles.some((r) => r !== "all")) ||
    experience > 0;

  return (
    <section
      ref={boardRef}
      id="jobs-board"
      className="flex w-full flex-col items-center bg-surface-page px-5 py-8 sm:px-10 sm:py-10 md:px-[120px] md:py-12"
    >
      <div className="flex w-full max-w-[1200px] flex-col items-start gap-6 md:flex-row">
        <JobFilters
          citySlug={citySlug}
          experience={experience}
          onExperienceChange={handleExperienceChange}
          salaries={salaries}
          onSalariesChange={handleSalariesChange}
          roles={roles}
          onRolesChange={handleRolesChange}
          onClearAll={handleClearAll}
        />
        <JobListings
          city={city}
          citySlug={citySlug}
          role={activeRole}
          jobs={jobs}
          pagination={pagination}
          loading={loading}
          isError={isError}
          onRetry={loadJobs}
          query={query}
          onQueryChange={handleQueryChange}
          onPageChange={handlePageChange}
          onClearFilters={handleClearAll}
          hasActiveFilters={hasActiveFilters}
        />
      </div>
    </section>
  );
};

export default JobsBoard;

