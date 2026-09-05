"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, ChevronDown, ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react";
import { useSeoCities } from "../../../../utility/useSeoCities";
import type { ApiPagination } from "../../../../utility/jobs-api";
import JobCard, { type JobCardData } from "./job-card";

export interface JobListingsProps {
  city: string;
  citySlug: string;
  role?: string;
  jobs: JobCardData[];
  pagination: ApiPagination;
  loading: boolean;
  isError?: boolean;
  onRetry?: () => void;
  query: string;
  onQueryChange: (q: string) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const JobListings = ({
  city,
  citySlug,
  role,
  jobs,
  pagination,
  loading,
  isError = false,
  onRetry,
  query,
  onQueryChange,
  onPageChange,
  onClearFilters,
  hasActiveFilters,
}: JobListingsProps) => {
  const searchId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [cityOpen, setCityOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);
  const citiesList = useSeoCities();

  // Sync external query prop with local input
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Debounced search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== query) {
        onQueryChange(localQuery);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [localQuery, onQueryChange, query]);

  useEffect(() => {
    if (!cityOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setCityOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCityOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cityOpen]);

  const { page, totalPages, total, limit } = pagination;
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const buildPageHref = (targetPage: number) => {
    const cleanSlug = citySlug.replace(/^\/jobs\/in\//, "").replace(/\/$/, "");
    const base = role ? `/jobs/in/${cleanSlug}/${role}/` : `/jobs/in/${cleanSlug}/`;
    const params = new URLSearchParams();
    if (targetPage > 1) params.set("page", String(targetPage));
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  };

  return (
    <div className="flex min-w-0 w-full flex-1 flex-col gap-5">
      {/* Top Search & City Selector Bar */}
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <label htmlFor={searchId} className="sr-only">
            Search jobs in {city}
          </label>
          <div className="box-border flex h-11 min-w-[220px] max-w-[320px] flex-1 items-center gap-2 rounded-[10px] border border-border-gray bg-white p-3 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] focus-within:border-accent">
            <Search
              className="size-4 shrink-0 text-neutral"
              strokeWidth={2}
              aria-hidden
            />
            <input
              id={searchId}
              type="text"
              value={localQuery}
              onChange={(event) => setLocalQuery(event.target.value)}
              placeholder={`Search role, hospital in ${city}`}
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent font-inter text-sm font-normal leading-[17px] text-heading outline-none placeholder:text-neutral"
            />
            {localQuery ? (
              <button
                type="button"
                onClick={() => {
                  setLocalQuery("");
                  onQueryChange("");
                }}
                aria-label="Clear search query"
                className="text-neutral hover:text-heading"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>

          {loading ? (
            <div className="flex items-center gap-1.5 text-xs text-muted-light">
              <Loader2 className="size-3.5 animate-spin text-accent" />
              <span>Updating results...</span>
            </div>
          ) : total > 0 ? (
            <p className="font-sans text-xs font-medium text-muted-light">
              Showing {startItem}-{endItem} of {total} jobs
            </p>
          ) : null}
        </div>

        {/* City Dropdown Selector */}
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            type="button"
            aria-expanded={cityOpen}
            aria-haspopup="listbox"
            aria-label="Select city"
            onClick={() => setCityOpen((open) => !open)}
            className="box-border flex h-11 w-[160px] cursor-pointer flex-row items-center justify-between rounded-[10px] border border-border-gray bg-white p-3 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]"
          >
            <span className="truncate text-left font-inter text-sm font-normal leading-[17px] text-heading">
              {city}
            </span>
            <ChevronDown
              className={`size-4 shrink-0 text-neutral transition-transform duration-200 ${
                cityOpen ? "rotate-180" : ""
              }`}
              strokeWidth={2}
              aria-hidden
            />
          </button>

          {cityOpen ? (
            <ul
              role="listbox"
              aria-label="Cities"
              className="absolute top-[calc(100%+8px)] right-0 z-30 max-h-80 w-[170px] overflow-y-auto rounded-[10px] border border-border-gray bg-white p-1 shadow-[0px_12px_32px_-4px_rgba(15,23,42,0.08)]"
            >
              {citiesList.map((item) => {
                const selected = item.name.toLowerCase() === city.toLowerCase();
                const itemCleanSlug = item.slug
                  ? item.slug.replace(/^\/jobs\/in\//, "").replace(/\/$/, "")
                  : item.name.toLowerCase().replace(/\s+/g, "-");
                const itemHref = role
                  ? `/jobs/in/${itemCleanSlug}/${role}/`
                  : item.href;

                return (
                  <li key={item.name} role="option" aria-selected={selected}>
                    <Link
                      href={itemHref}
                      onClick={() => setCityOpen(false)}
                      className={`flex items-center rounded-md px-2.5 py-2 font-inter text-sm leading-[17px] transition-colors ${
                        selected
                          ? "bg-badge-soft font-medium text-heading"
                          : "font-normal text-neutral hover:bg-surface-gray hover:text-heading"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>

      {/* Content Area */}
      {loading && jobs.length === 0 ? (
        <div className="flex w-full flex-col gap-5">
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
        </div>
      ) : !loading && isError && jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border-gray bg-white px-6 py-14 text-center shadow-[0px_4px_12px_rgba(0,0,0,0.02)]">
          <div className="flex size-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertCircle className="size-6" />
          </div>
          <h3 className="mt-4 font-sans text-lg font-bold text-heading">
            Unable to load jobs right now
          </h3>
          <p className="mt-2 max-w-md font-sans text-sm leading-6 text-neutral">
            We encountered an issue connecting to our jobs server for {city}. Please check your internet connection or try again.
          </p>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-white shadow transition-opacity hover:opacity-90"
            >
              Retry
            </button>
          ) : null}
        </div>
      ) : jobs.length > 0 ? (
        <>
          <h2 className="sr-only">Available Healthcare Job Openings in {city}</h2>
          <ul className="flex w-full flex-col gap-5">
            {jobs.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>

          {/* Crawlable & Interactive Pagination */}
          {totalPages > 1 ? (
            <nav
              className="mt-4 flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border border-border-gray bg-white px-5 py-3.5 shadow-[0px_1px_2px_rgba(0,0,0,0.02)]"
              aria-label="Job listings pagination"
            >
              <div className="font-sans text-xs font-medium text-neutral">
                Page {page} of {totalPages} ({total} total openings)
              </div>

              <div className="flex items-center gap-1.5">
                {/* Previous Button */}
                {page > 1 ? (
                  <Link
                    href={buildPageHref(page - 1)}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(page - 1);
                    }}
                    aria-label="Go to previous page"
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-border-gray px-3 font-sans text-xs font-semibold text-heading transition-colors hover:bg-surface-gray"
                  >
                    <ChevronLeft className="size-4" />
                    <span>Prev</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-label="Previous page (disabled)"
                    className="inline-flex h-9 cursor-not-allowed items-center gap-1 rounded-lg border border-border-gray/50 px-3 font-sans text-xs font-semibold text-muted-light opacity-50"
                  >
                    <ChevronLeft className="size-4" />
                    <span>Prev</span>
                  </button>
                )}

                {/* Page Number Badges */}
                <div className="flex items-center gap-1">
                  {generatePageNumbers(page, totalPages).map((p, index) => {
                    if (typeof p === "string") {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-1.5 font-sans text-xs font-bold text-muted-light"
                        >
                          ...
                        </span>
                      );
                    }

                    const isCurrent = p === page;
                    return (
                      <Link
                        key={`page-${p}`}
                        href={buildPageHref(p)}
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(p);
                        }}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`flex size-9 items-center justify-center rounded-lg font-sans text-xs font-bold transition-colors ${
                          isCurrent
                            ? "bg-heading text-white shadow-sm"
                            : "border border-border-gray text-heading hover:bg-surface-gray"
                        }`}
                      >
                        {p}
                      </Link>
                    );
                  })}
                </div>

                {/* Next Button */}
                {page < totalPages ? (
                  <Link
                    href={buildPageHref(page + 1)}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(page + 1);
                    }}
                    aria-label="Go to next page"
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-border-gray px-3 font-sans text-xs font-semibold text-heading transition-colors hover:bg-surface-gray"
                  >
                    <span>Next</span>
                    <ChevronRight className="size-4" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-label="Next page (disabled)"
                    className="inline-flex h-9 cursor-not-allowed items-center gap-1 rounded-lg border border-border-gray/50 px-3 font-sans text-xs font-semibold text-muted-light opacity-50"
                  >
                    <span>Next</span>
                    <ChevronRight className="size-4" />
                  </button>
                )}
              </div>
            </nav>
          ) : null}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border-gray bg-white px-6 py-14 text-center shadow-[0px_4px_12px_rgba(0,0,0,0.02)]">
          <div className="flex size-12 items-center justify-center rounded-full bg-badge-soft text-accent">
            <Search className="size-6" />
          </div>
          <h3 className="mt-4 font-sans text-lg font-bold text-heading">
            No job openings match your criteria
          </h3>
          <p className="mt-2 max-w-md font-sans text-sm leading-6 text-neutral">
            {query.trim()
              ? `We couldn't find openings matching "${query.trim()}" with current filters in ${city}.`
              : `No verified openings match your selected filters in ${city} right now.`}
          </p>
          {hasActiveFilters || query.trim() ? (
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-sans text-sm font-semibold text-white shadow transition-opacity hover:opacity-90"
            >
              Clear All Filters
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

function JobCardSkeleton() {
  return (
    <div className="box-border flex w-full animate-pulse flex-col items-start gap-5 rounded-2xl border border-border-gray bg-white p-6">
      <div className="flex w-full flex-col gap-2">
        <div className="h-5 w-2/5 rounded bg-surface-gray" />
        <div className="h-4 w-1/4 rounded bg-surface-gray" />
        <div className="h-3 w-1/3 rounded bg-surface-gray" />
      </div>
      <div className="flex w-full flex-col gap-2 border-y border-border-gray py-3">
        <div className="h-3 w-1/2 rounded bg-surface-gray" />
        <div className="h-3 w-1/3 rounded bg-surface-gray" />
        <div className="h-3 w-2/5 rounded bg-surface-gray" />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="h-3 w-20 rounded bg-surface-gray" />
        <div className="h-4 w-24 rounded bg-surface-gray" />
      </div>
    </div>
  );
}

function generatePageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1];

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);
  return pages;
}

export default JobListings;
