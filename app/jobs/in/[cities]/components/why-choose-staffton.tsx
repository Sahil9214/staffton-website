import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Hospital,
  MessageCircle,
  Zap,
  FileCheck,
  BadgeCheck,
  MessageSquare,
  FileUp,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import {
  normalizeInternalHref,
  type SeoPageAdvantage,
} from "../../../../utility/seo-pages-api";

interface WhyChooseStafftonProps {
  city?: string;
  role?: string;
  advantage?: SeoPageAdvantage | null;
}

const ICON_MAP: Record<string, LucideIcon> = {
  "badge-check": BadgeCheck,
  badgecheck: BadgeCheck,
  hospital: Hospital,
  message: MessageCircle,
  "message-circle": MessageCircle,
  "message-square": MessageSquare,
  zap: Zap,
  "file-check": FileCheck,
  filecheck: FileCheck,
  "file-up": FileUp,
  fileup: FileUp,
};

const DEFAULT_ICONS: LucideIcon[] = [Hospital, MessageCircle, Zap, FileCheck];

function resolveIcon(iconName: string | undefined, index: number): LucideIcon {
  if (!iconName) return DEFAULT_ICONS[index % DEFAULT_ICONS.length];
  const key = iconName.trim().toLowerCase();
  return ICON_MAP[key] || DEFAULT_ICONS[index % DEFAULT_ICONS.length];
}

const WhyChooseStaffton = ({ advantage }: WhyChooseStafftonProps) => {
  if (!advantage) return null;

  const cards = Array.isArray(advantage.cards) ? advantage.cards : [];
  const pill = advantage.pill?.trim();
  const heading = advantage.heading?.trim();
  const description = advantage.description?.trim();
  const ctaLabel = advantage.ctaLabel?.trim();
  const ctaHref = normalizeInternalHref(advantage.ctaUrl);

  if (!pill && !heading && !description && cards.length === 0 && !ctaLabel) {
    return null;
  }

  return (
    <section className="flex w-full flex-col items-center bg-white px-5 py-14 sm:px-10 sm:py-18 md:px-[120px] md:py-24">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-10 sm:gap-12 md:gap-14">
        {(pill || heading || description) && (
          <div className="flex w-full flex-col items-center text-center">
            {pill ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F0FDFA] px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" strokeWidth={2} />
                <span className="font-sans text-[13px] font-bold uppercase tracking-[0.8px] text-[#0D9488]">
                  {pill}
                </span>
              </div>
            ) : null}

            {heading ? (
              <h2 className="mt-4 w-full font-sans text-[28px] font-extrabold leading-tight tracking-[-1px] text-[#0F172A] sm:text-[32px] sm:leading-[40px] md:text-[36px] md:leading-[44px]">
                {heading}
              </h2>
            ) : null}

            {description ? (
              <div
                className="mt-4 max-w-[760px] font-sans text-sm font-normal leading-relaxed text-[#737373] sm:text-base sm:leading-[26px] [&_a]:text-[#0D9488] [&_a]:no-underline hover:[&_a]:text-[#0F766E] [&_a]:font-semibold transition-colors"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : null}
          </div>
        )}

        {cards.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {cards.map((card, index) => {
              const Icon = resolveIcon(card.icon, index);
              return (
                <div
                  key={card.id || `${card.title}-${index}`}
                  className="flex flex-col items-start gap-5 rounded-2xl border border-[#E5E5E5] bg-[#F5F5F5] p-6 transition-all duration-200 hover:border-[#0D9488]/30 sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDFA]">
                    <Icon className="h-6 w-6 text-[#0D9488]" strokeWidth={2} />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    {card.title ? (
                      <h3 className="font-sans text-[18px] font-bold leading-[23px] text-[#0F172A]">
                        {card.title}
                      </h3>
                    ) : null}
                    {card.description ? (
                      <div
                        className="font-sans text-sm font-normal leading-[22px] text-[#737373] [&_a]:text-[#0D9488] [&_a]:no-underline hover:[&_a]:text-[#0F766E] [&_a]:font-semibold transition-colors"
                        dangerouslySetInnerHTML={{ __html: card.description }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {ctaLabel && ctaHref ? (
          <Link
            href={ctaHref}
            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0D9488] px-8 py-3.5 shadow-[0px_4px_12px_rgba(13,148,136,0.2)] transition-colors hover:bg-[#0b7d73]"
          >
            <span className="font-inter text-[15px] font-semibold leading-[18px] text-white">
              {ctaLabel}
            </span>
            <ArrowRight className="h-4 w-4 text-white" strokeWidth={2} />
          </Link>
        ) : null}
      </div>
    </section>
  );
};

export default WhyChooseStaffton;
