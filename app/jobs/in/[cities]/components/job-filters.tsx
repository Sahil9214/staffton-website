"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type FilterOption = {
  id: string;
  label: string;
  count?: number;
};

const ALL_ROLES_ID = "all";
const ALL_SALARIES_ID = "all";

export const SALARY_OPTIONS: FilterOption[] = [
  { id: ALL_SALARIES_ID, label: "All Salaries" },
  { id: "0-3", label: "0-3 Lakhs", count: 17 },
  { id: "3-6", label: "3-6 Lakhs", count: 25 },
  { id: "6-10", label: "6-10 Lakhs", count: 10 },
  { id: "10-15", label: "10-15 Lakhs", count: 3 },
  { id: "15-25", label: "15-25 Lakhs", count: 2 },
  { id: "25-50", label: "25-50 Lakhs", count: 1 },
  { id: "50-plus", label: "50+ Lakhs", count: 1 },
];

export const ROLE_OPTIONS: FilterOption[] = [
  { id: ALL_ROLES_ID, label: "All Roles" },
  { id: "doctor", label: "Doctor" },
  { id: "nurse", label: "Nurse" },
  { id: "allied", label: "Allied" },
  { id: "technician", label: "Technician" },
  { id: "non-allied", label: "Non-Allied" },
  { id: "non-technician", label: "Non-Technician" },
];

const PREVIEW_COUNT = 4;
const EXPERIENCE_MAX = 10;

function toggleValue(list: string[], id: string) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

export interface JobFiltersProps {
  citySlug?: string;
  experience?: number;
  onExperienceChange?: (val: number) => void;
  salaries?: string[];
  onSalariesChange?: (salaries: string[]) => void;
  roles?: string[];
  onRolesChange?: (roles: string[]) => void;
  onClearAll?: () => void;
}

const JobFilters = ({
  citySlug,
  experience = 0,
  onExperienceChange,
  salaries = [],
  onSalariesChange,
  roles = [ALL_ROLES_ID],
  onRolesChange,
  onClearAll,
}: JobFiltersProps) => {
  const [openSections, setOpenSections] = useState({
    experience: true,
    salary: true,
    role: true,
  });
  const [showMore, setShowMore] = useState({
    salary: false,
  });

  const selectedSalary = salaries.length > 0 && salaries[0] !== ALL_SALARIES_ID ? salaries[0] : ALL_SALARIES_ID;
  const selectedRole = roles.length > 0 && roles[0] !== ALL_ROLES_ID ? roles[0] : ALL_ROLES_ID;

  const appliedCount =
    (experience > 0 ? 1 : 0) +
    (selectedSalary !== ALL_SALARIES_ID ? 1 : 0) +
    (selectedRole !== ALL_ROLES_ID ? 1 : 0);

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectRole = (id: string) => {
    if (!onRolesChange) return;
    onRolesChange([id]);
  };

  const handleSelectSalary = (id: string) => {
    if (!onSalariesChange) return;
    onSalariesChange(id === ALL_SALARIES_ID ? [] : [id]);
  };

  return (
    <aside
      className="w-full shrink-0 self-start overflow-hidden rounded-2xl border border-border-gray bg-white md:w-[280px] md:sticky md:top-24"
      aria-label="Job filters"
    >
      <div className="flex items-center justify-between px-7 pb-4 pt-7">
        <h2 className="font-sans text-base font-bold leading-[18px] text-heading">
          All Filters
        </h2>
        <div className="flex items-center gap-2">
          <p className="font-sans text-[13px] font-medium leading-[18px] text-accent">
            Applied ({appliedCount})
          </p>
          {appliedCount > 0 && onClearAll ? (
            <button
              type="button"
              onClick={onClearAll}
              className="cursor-pointer font-sans text-xs text-muted-light hover:text-heading hover:underline"
            >
              Reset
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col px-7">
        <FilterSection
          title="Experience"
          open={openSections.experience}
          onToggle={() => toggleSection("experience")}
        >
          <ExperienceSlider
            value={experience}
            onChange={(val) => onExperienceChange?.(val)}
          />
        </FilterSection>

        <FilterSection
          title="Salary"
          open={openSections.salary}
          onToggle={() => toggleSection("salary")}
        >
          <RadioGroup
            name="salary"
            options={SALARY_OPTIONS}
            selected={selectedSalary}
            expanded={showMore.salary}
            onSelect={handleSelectSalary}
            onToggleMore={() =>
              setShowMore((prev) => ({ ...prev, salary: !prev.salary }))
            }
          />
        </FilterSection>

        <FilterSection
          title="Role category"
          open={openSections.role}
          onToggle={() => toggleSection("role")}
        >
          <RadioGroup
            name="role"
            options={ROLE_OPTIONS}
            selected={selectedRole}
            expanded
            onSelect={handleSelectRole}
            getHref={
              citySlug
                ? (id) =>
                    id === ALL_ROLES_ID
                      ? `/jobs/in/${citySlug}/`
                      : `/jobs/in/${citySlug}/${id}/`
                : undefined
            }
          />
        </FilterSection>
      </div>
    </aside>
  );
};

function FilterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col border-t border-border-gray py-5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between text-left"
      >
        <span className="font-sans text-base font-bold leading-5 text-heading">
          {title}
        </span>
        <ChevronRight
          className={`size-[18px] shrink-0 text-muted-light transition-transform duration-200 ${
            open ? "rotate-90" : ""
          }`}
          aria-hidden
        />
      </button>
      {open ? children : null}
    </div>
  );
}

function ExperienceSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const percent = (value / EXPERIENCE_MAX) * 100;

  return (
    <div className="flex w-full flex-col pt-8 pb-1">
      <div className="relative h-[30px] w-full">
        <div className="absolute inset-x-[15px] top-1/2 h-1 -translate-y-1/2 rounded-lg bg-border-gray">
          <div
            className="h-full rounded-lg bg-heading"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div
          className="pointer-events-none absolute top-0 flex size-[30px] items-center justify-center rounded-full bg-heading"
          style={{ left: `calc(${percent / 100} * (100% - 30px))` }}
        >
          <span className="font-sans text-xs font-bold leading-[18px] text-white">
            {value >= EXPERIENCE_MAX ? "10+" : value}
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={EXPERIENCE_MAX}
          step={1}
          value={value}
          aria-label="Years of experience"
          aria-valuemin={0}
          aria-valuemax={EXPERIENCE_MAX}
          aria-valuenow={value}
          aria-valuetext={value >= EXPERIENCE_MAX ? "10+ years" : `${value} years`}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
        />
      </div>

      <div className="mt-1 flex w-full items-center justify-between">
        <span className="font-sans text-sm font-medium leading-[18px] text-muted-light">
          0 Yrs
        </span>
        <span className="font-sans text-sm font-medium leading-[18px] text-muted-light">
          10+ Yrs
        </span>
      </div>
    </div>
  );
}

function RadioGroup({
  name,
  options,
  selected,
  expanded,
  onSelect,
  onToggleMore,
  getHref,
}: {
  name: string;
  options: FilterOption[];
  selected: string;
  expanded: boolean;
  onSelect: (id: string) => void;
  onToggleMore?: () => void;
  getHref?: (id: string) => string | undefined;
}) {
  const visible = expanded ? options : options.slice(0, PREVIEW_COUNT);
  const hasMore = Boolean(onToggleMore) && options.length > PREVIEW_COUNT;

  return (
    <div className="flex w-full flex-col pt-3" role="radiogroup" aria-label={name}>
      {visible.map((option, index) => {
        const isSelected = selected === option.id;
        const href = getHref ? getHref(option.id) : undefined;
        const spacingClass = index === 0 ? "" : "pt-3";

        const content = (
          <>
            <span
              className={`mt-px flex size-4 shrink-0 items-center justify-center rounded-full border shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors ${
                isSelected
                  ? "border-heading bg-heading"
                  : "border-border-gray bg-white"
              }`}
            >
              {isSelected ? (
                <span className="size-1.5 rounded-full bg-white" />
              ) : null}
            </span>
            <span className="flex min-w-0 flex-1 items-start pl-3">
              <span
                className={`min-w-0 flex-1 font-sans text-sm leading-[18px] ${
                  isSelected ? "font-bold text-accent" : "font-medium text-heading"
                }`}
              >
                {option.label}
              </span>
              {option.count != null ? (
                <span className="shrink-0 pl-[5px] font-sans text-sm font-medium leading-[18px] text-muted-light">
                  ({option.count})
                </span>
              ) : null}
            </span>
          </>
        );

        if (href) {
          return (
            <Link
              key={option.id}
              href={href}
              className={`flex w-full cursor-pointer items-start ${spacingClass}`}
              aria-checked={isSelected}
              role="radio"
            >
              {content}
            </Link>
          );
        }

        return (
          <label
            key={option.id}
            className={`flex w-full cursor-pointer items-start ${spacingClass}`}
          >
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={isSelected}
              onChange={() => onSelect(option.id)}
              className="sr-only"
            />
            {content}
          </label>
        );
      })}

      {hasMore ? (
        <button
          type="button"
          onClick={onToggleMore}
          className="cursor-pointer pt-4 pl-[30px] text-left font-sans text-sm font-bold leading-[18px] text-accent hover:underline"
        >
          {expanded ? "View Less" : "View More"}
        </button>
      ) : null}
    </div>
  );
}

export default JobFilters;

