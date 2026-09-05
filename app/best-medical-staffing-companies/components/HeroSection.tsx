import React from "react";
import { BadgeCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import GetStartedFreeButton from "../../components/GetStartedFreeButton";
import SectionPill from "../../components/SectionPill";
import { hospitalHeroSection } from "../../utility/constants";
import { APP_AUTH_URLS } from "../../utility/app-auth-urls";

const HeroSection = () => {
  const { badge, heading, subtext, features } = hospitalHeroSection;

  return (
    <section className="relative w-full overflow-hidden bg-surface-section-alt pb-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(240,253,250,0)_0%,rgba(13,148,136,0.25)_100%)]"
      />

      <div className="relative flex w-full flex-col items-center pb-0 pt-10 sm:pt-12 md:pt-14">
        <div className="mx-auto flex w-full max-w-[1392px] flex-col items-center gap-6 px-4 sm:gap-8 sm:px-6 md:px-8 lg:px-10">
          <SectionPill variant="mint" icon={BadgeCheck}>
            {badge}
          </SectionPill>

          <div className="w-full max-w-[960px] min-w-0 text-center">
            <h1 className="text-[32px] font-bold tracking-[-1.5px] text-heading leading-[40px] sm:text-[44px] sm:leading-[52px] lg:text-[42px] lg:leading-[53px]">
              One of India&apos;s Best Medical Staffing
              <br className="hidden md:block" /> Companies For Hospitals.
            </h1>
          </div>

          <div className="w-full max-w-[960px]">
            <p className="text-center text-base font-normal leading-7 text-body sm:text-lg sm:leading-[28px] lg:text-[20px] lg:leading-[28px]">
              {subtext}
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-6 lg:gap-x-11">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex max-w-full items-start gap-3 sm:items-center bg-white py-2 px-4 rounded-full"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent sm:mt-0" />

                <p className="text-sm font-medium leading-6 text-title sm:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
          
          <GetStartedFreeButton href={APP_AUTH_URLS.hospitalSignup} />

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center leading-none">
              <Image
                src="/images/for_hospitals_members_image.svg"
                alt="Trusted Medical Staff"
                width={148}
                height={56}
                className="block h-auto w-auto max-w-full object-contain"
              />
            </div>

            <p className="text-center text-sm font-medium leading-5 text-title sm:text-left">
              Trusted by{" "}
              <span className="font-bold">500+ Top Hospitals</span><br/> worldwide.
            </p>
          </div>
        </div>

        <div className="w-full max-w-[1228px] px-4 sm:px-6 lg:px-8 xl:px-0">
          <Image
            src="/images/for_hospitals_hero_image.webp"
            alt="Preview of the Staffton hiring dashboard showing candidate pipelines and verified medical professional profiles"
            width={1228}
            height={700}
            sizes="(max-width: 1280px) 100vw, 1228px"
            priority
            fetchPriority="high"
            className="-mb-6 block h-auto w-full max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
