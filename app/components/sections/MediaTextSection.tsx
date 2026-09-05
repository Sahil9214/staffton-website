import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";
import Reveal from "../motion/Reveal";
import SectionPill from "../SectionPill";

export interface MediaTextSectionProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  heading: React.ReactNode;
  subheading?: string;
  paragraphs?: string[];
  description?: string;
  children?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  image: {
    src: string;
    alt: string;
  };
  reversed?: boolean;
  background?: string;
  className?: string;
}

const MediaTextSection = ({
  badge,
  badgeIcon,
  heading,
  subheading,
  paragraphs,
  description,
  children,
  ctaLabel = "Contact Us Today",
  ctaHref = "/contact-us/",
  image,
  reversed = false,
  background = "bg-surface-page",
  className = "",
}: MediaTextSectionProps) => {
  return (
    <section className={`w-full overflow-hidden ${background} ${className}`.trim()}>
      <div className="section-container">
        <div
          className={`grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 ${
            reversed ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text Content Column */}
          <Reveal
            className={`flex w-full min-w-0 flex-col gap-6 sm:gap-8 ${
              reversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {badge && (
              <SectionPill icon={badgeIcon} variant="soft">
                {badge}
              </SectionPill>
            )}

            <h2 className="text-[28px] font-extrabold leading-tight tracking-[-1px] text-heading text-balance sm:text-[34px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px]">
              {heading}
            </h2>

            {subheading && (
              <h3 className="text-base font-bold leading-6 text-heading sm:text-[20px] sm:leading-[25px]">
                {subheading}
              </h3>
            )}

            {paragraphs && paragraphs.length > 0 ? (
              <div className="flex flex-col gap-4 font-sans text-sm font-normal leading-[24px] text-neutral sm:text-base sm:leading-[26px]">
                {paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            ) : description ? (
              <p className="font-sans text-sm font-normal leading-[24px] text-neutral sm:text-base sm:leading-[26px]">
                {description}
              </p>
            ) : null}

            {children}

            {ctaLabel && ctaHref && (
              <div className="pt-2">
                <Link
                  href={ctaHref}
                  className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0D9488] px-8 py-3.5 shadow-[0px_4px_12px_rgba(13,148,136,0.2)] transition-colors hover:bg-[#0b7d73]"
                >
                  <span className="font-inter text-[15px] font-semibold leading-[18px] text-white">
                    {ctaLabel}
                  </span>
                  <ArrowRight className="h-4 w-4 text-white" strokeWidth={2} />
                </Link>
              </div>
            )}
          </Reveal>

          {/* Media/Image Column */}
          <Reveal
            delay={0.1}
            className={`flex w-full min-w-0 justify-center ${
              reversed ? "lg:order-1 lg:justify-start" : "lg:order-2 lg:justify-end"
            }`}
          >
            <div className="relative h-[340px] w-full max-w-[580px] overflow-hidden rounded-2xl sm:h-[420px] sm:rounded-3xl lg:h-[480px] shadow-sm">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-2xl sm:rounded-3xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default MediaTextSection;
