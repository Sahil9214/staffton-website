import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import SectionPill from "../../../../components/SectionPill";
import { stripHtml } from "../../../../utility/seo-pages-api";
import { toCitySlug } from "../../../../utility/constants";

interface HeaderProps {
  city: string;
  role?: string;
  h1Title?: string;
  pill?: string;
  shortDescription?: string;
}

function roleLabel(role?: string) {
  if (!role) return null;
  return role
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const Header = ({
  city,
  role,
  h1Title,
  pill,
  shortDescription,
}: HeaderProps) => {
  const heading = stripHtml(h1Title);
  const rawDescription = shortDescription?.trim();
  const pillLabel = pill?.trim();
  const label = roleLabel(role);
  const citySlug = toCitySlug(city);

  if (!heading && !rawDescription && !pillLabel) {
    return null;
  }

  return (
    <section className="flex w-full flex-col items-center justify-center bg-gradient-to-r from-accent to-dark px-5 py-10 sm:px-10 sm:py-12 md:px-[120px] md:py-14">
      <div className="flex w-full max-w-[1200px] flex-col items-start gap-6">
        {/* Visual Breadcrumb Navigation (Hidden/Commented per design request - Schema BreadcrumbList remains active in JSON-LD) */}
        {/*
        <nav aria-label="Breadcrumb" className="w-full">
          <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-white/75">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 text-white/40" />
            </li>
            <li>
              <Link
                href="/nurse-doctor-jobs-india/"
                className="transition-colors hover:text-white"
              >
                Jobs
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 text-white/40" />
            </li>
            {label ? (
              <>
                <li>
                  <Link
                    href={`/jobs/in/${citySlug}/`}
                    className="transition-colors hover:text-white"
                  >
                    {city}
                  </Link>
                </li>
                <li>
                  <ChevronRight className="h-3 w-3 text-white/40" />
                </li>
                <li className="font-semibold text-white" aria-current="page">
                  {label}
                </li>
              </>
            ) : (
              <li className="font-semibold text-white" aria-current="page">
                {city}
              </li>
            )}
          </ol>
        </nav>
        */}

        {pillLabel ? (
          <SectionPill icon={ShieldCheck}>{pillLabel}</SectionPill>
        ) : null}

        {heading ? (
          <h1 className="w-full font-sans text-[32px] font-extrabold leading-10 tracking-[-1.5px] text-white sm:text-[42px] sm:leading-[50px] md:text-[54px] md:leading-[62px]">
            {heading}
          </h1>
        ) : null}

        {rawDescription ? (
          <div
            className="w-full font-sans text-base font-normal leading-7 text-white/80 [&_a]:text-teal-200 [&_a]:underline hover:[&_a]:text-white [&_a]:font-semibold [&_a]:cursor-pointer transition-colors [&_p]:mb-2 last:[&_p]:mb-0"
            dangerouslySetInnerHTML={{ __html: rawDescription }}
          />
        ) : null}
      </div>
    </section>
  );
};

export default Header;
