import React from "react";
import Image from "next/image";
import { BadgeCheck, CheckCircle2 } from "lucide-react";
import GetStartedFreeButton from "../../components/GetStartedFreeButton";
import SectionPill from "../../components/SectionPill";
import { homeHeroSection } from "../../utility/constants";
import { APP_AUTH_URLS } from "../../utility/app-auth-urls";

type HeroSectionProps = {
  badge?: string;
  heading?: string;
  subtext?: string;
  features?: readonly string[];
  imageSrc?: string;
  imageAlt?: string;
};

const DEFAULT_IMAGE = {
  src: "/images/home_hero_section.webp",
  alt: "Illustration of doctors and nurses connecting with hospital hiring teams on the Staffton platform",
};

const HeroSection = ({
  badge = homeHeroSection.badge,
  heading = homeHeroSection.heading,
  subtext = homeHeroSection.subtext,
  features = homeHeroSection.features,
  imageSrc = DEFAULT_IMAGE.src,
  imageAlt = DEFAULT_IMAGE.alt,
}: HeroSectionProps) => {
  return (
    <section className="w-full overflow-hidden bg-surface-page">
      <div className="section-container">
        <div className="flex flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:gap-14">
          <div className="flex w-full min-w-0 max-w-[576px] shrink-0 flex-col items-start gap-6">
            <SectionPill variant="teal" icon={BadgeCheck}>
              {badge}
            </SectionPill>

            <h1 className="w-full max-w-[545px] font-sans text-[32px] leading-10 font-bold text-heading sm:text-[36px] sm:leading-[46px] lg:text-[42px] lg:leading-[53px]">
              {heading}
            </h1>

            <p className="w-full max-w-[576px] font-inter text-base leading-7 font-normal text-body">
              {subtext}
            </p>

            <div className="flex w-full flex-col items-start gap-3">
              {features.map((item) => (
                <div key={item} className="flex w-full items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />

                  <p className="font-inter text-base leading-6 font-medium text-title">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <GetStartedFreeButton href={APP_AUTH_URLS.homeSignup} />
          </div>

          <div className="flex w-full min-w-0 flex-1 items-center justify-center lg:justify-end">
            <div className="w-full max-w-[576px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={576}
                height={584}
                sizes="(max-width: 1024px) 100vw, 576px"
                fetchPriority="high"
                priority
                className="h-auto w-full max-w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
