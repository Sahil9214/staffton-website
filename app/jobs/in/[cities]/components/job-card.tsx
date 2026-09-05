import React from "react";
import Link from "next/link";
import { Link2, MapPin } from "lucide-react";
import { getJobApplicationUrl } from "../../../../utility/site";
import { type ApiJobItem, formatMonthlySalary } from "../../../../utility/jobs-api";
import type { JobListing } from "../jobs-data";

export type JobCardData = ApiJobItem | JobListing;

function formatRelativeTime(dateStr?: string): string {
  if (!dateStr) return "Recently posted";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "Recently posted";
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays <= 0) {
    if (diffHours <= 1) return "Posted just now";
    return `Posted ${diffHours} hrs ago`;
  }
  if (diffDays === 1) return "Posted 1 day ago";
  if (diffDays < 7) return `Posted ${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Posted ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }
  const months = Math.floor(diffDays / 30);
  return `Posted ${months} ${months === 1 ? "month" : "months"} ago`;
}

const JobCard = ({ job }: { job: JobCardData }) => {
  const isApiItem = "orgName" in job;

  const title = job.title;
  const hospital = isApiItem ? job.orgName : job.hospital;
  const location = isApiItem
    ? [job.city, job.state].filter(Boolean).join(", ")
    : job.location;

  const experience = isApiItem
    ? job.experienceText ||
      (job.experienceMinYrs != null || job.experienceMaxYrs != null
        ? `${job.experienceMinYrs ?? 0} - ${job.experienceMaxYrs ?? "+"} yrs`
        : "0-5 yrs")
    : job.experience;

  const type = isApiItem
    ? job.jobType?.map((t) => t.name).join(", ") ||
      job.shiftType?.map((s) => s.name).join(", ") ||
      "Full-time"
    : job.type;

  const salary = isApiItem
    ? formatMonthlySalary(job.salaryText, job.salaryMin, job.salaryMax)
    : formatMonthlySalary(job.salary);

  const skills = isApiItem
    ? [
        ...(job.specialisation?.map((s) => s.name) ?? []),
        ...(job.profession?.map((p) => p.name) ?? []),
        ...(job.jobType?.map((t) => t.name) ?? []),
      ].filter((v, i, a) => a.indexOf(v) === i)
    : job.skills;

  const postedAgo = isApiItem
    ? formatRelativeTime(job.publishedAt)
    : job.postedAgo;

  return (
    <article className="box-border flex w-full flex-col items-start gap-5 rounded-2xl border border-border-gray bg-white p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.02)] transition-shadow duration-200 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex w-full flex-col items-start gap-1.5">
        <h3 className="w-full font-sans text-lg font-bold leading-[23px] text-heading">
          {title}
        </h3>
        <p className="w-full font-sans text-sm font-medium leading-[18px] text-accent">
          {hospital}
        </p>
        <div className="flex w-full items-center gap-1 font-sans text-[13px] font-normal leading-4 text-neutral">
          <MapPin className="size-3.5 shrink-0 text-neutral" strokeWidth={2} aria-hidden />
          <span>{location}</span>
        </div>
      </div>

      <div className="box-border flex w-full flex-col items-start gap-2 border-y border-border-gray py-3">
        <DetailRow label="Experience:" value={experience} />
        <DetailRow label="Type:" value={type} />
        <DetailRow label="Salary:" value={salary} emphasize />
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        {skills && skills.length > 0 ? (
          <div className="flex w-full flex-wrap content-start items-start gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-[6px] bg-surface-gray px-2.5 py-1 font-sans text-[11px] font-semibold leading-[14px] text-neutral"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex w-full items-center justify-between gap-3">
          <p className="font-sans text-xs font-medium leading-[15px] text-muted-light">
            {postedAgo}
          </p>
          <Link
            href={getJobApplicationUrl(job.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 font-sans text-sm font-medium leading-5 text-accent hover:underline"
          >
            <Link2 className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
            Apply Direct
          </Link>
        </div>
      </div>
    </article>
  );
};

function DetailRow({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-2">
      <span className="w-20 shrink-0 font-sans text-[13px] font-semibold leading-4 text-neutral">
        {label}
      </span>
      <span
        className={`min-w-0 flex-1 font-sans text-[13px] leading-4 text-heading ${
          emphasize ? "font-bold" : "font-normal"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default JobCard;

