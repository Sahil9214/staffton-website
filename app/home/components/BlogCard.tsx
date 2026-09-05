import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type BlogPost = {
  id: string;
  badge: string;
  date: string;
  time: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
};

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const BlogCardSkeleton = () => {
  return (
    <div
      className="h-full rounded-xl border border-slate-100 bg-white p-1.5"
      aria-hidden
    >
      <div className="aspect-[329/215] w-full animate-pulse rounded-lg bg-surface-hover" />
      <div className="flex flex-col gap-4 p-4">
        <div className="h-4 w-40 animate-pulse rounded bg-surface-hover" />
        <div className="h-5 w-full animate-pulse rounded bg-surface-hover" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-surface-hover" />
        <div className="h-12 w-full animate-pulse rounded bg-surface-hover" />
        <div className="h-4 w-28 animate-pulse rounded bg-surface-hover" />
      </div>
    </div>
  );
};

const BlogCard = ({
  badge,
  date,
  time,
  title,
  description,
  imageSrc,
  imageAlt,
  link,
}: BlogPost) => {
  const category = badge?.trim() || "Insights";
  const isExternal = link.startsWith("http://") || link.startsWith("https://");

  return (
    <Link
      href={link || "#"}
      className="block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={`Read article: ${title}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <article className="flex h-full flex-col rounded-xl border border-slate-100 bg-white  transition-shadow duration-200 hover:shadow-[0px_0px_10px_0px_#0000000D]">
        <div className="relative overflow-hidden bg-surface-hover">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              width={329}
              height={215}
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="flex aspect-[329/215] w-full items-center justify-center bg-badge-soft">
              <span className="font-inter text-sm font-medium text-accent">
                Staffton Health
              </span>
            </div>
          )}
          {category ? (
            <p className="absolute top-4 left-4 z-20 max-w-[70%] truncate rounded-lg bg-white px-2 py-0.5 text-xs font-semibold text-heading">
              {category}
            </p>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col justify-start gap-4 p-4 text-start">
          <p className="flex items-center gap-2 text-sm text-neutral">
            {date ? <span>{formatDate(date)}</span> : null}
            {date && time ? (
              <span
                className="h-1 w-1 rounded-full bg-neutral"
                aria-hidden="true"
              />
            ) : null}
            {time ? <span>{time}</span> : null}
          </p>
          <h3 className="line-clamp-2 text-base font-semibold text-heading">
            {title}
          </h3>
          {description ? (
            <p className="line-clamp-3 text-sm text-neutral">{description}</p>
          ) : null}
          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            Read Article
            <ArrowRight className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          </span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
