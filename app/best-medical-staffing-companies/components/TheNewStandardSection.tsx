import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import Reveal from "../../components/motion/Reveal";
import GetStartedFreeButton from "../../components/GetStartedFreeButton";
import SectionPill from "../../components/SectionPill";
import { hospitalPrecisionSection } from "../../utility/constants";
import { APP_AUTH_URLS } from "../../utility/app-auth-urls";

const TheNewStandardSection = () => {
  const { badge, heading, subtext } = hospitalPrecisionSection;

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <Reveal className="flex w-full min-w-0 max-w-[576px] flex-col gap-6">
            <SectionPill icon={Sparkles}>{badge}</SectionPill>

            <h2 className="w-full max-w-[568px] font-sans text-[28px] font-bold leading-9 text-heading text-balance sm:text-[36px] sm:leading-[46px] lg:text-[42px] lg:leading-[53px]">
              {heading}
            </h2>

            <p className="max-w-[560px] text-base font-normal leading-7 text-body sm:text-lg sm:leading-8 lg:text-[20px] lg:leading-[32px]">
              {subtext}
            </p>

            <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6 sm:pt-4">
              <Image
                src="/images/for_hospitals_members_image.webp"
                alt="Trusted Hospitals"
                width={120}
                height={48}
                className="h-12 w-30 shrink-0 object-contain"
              />

              <p className="text-sm font-medium leading-5 text-body">
                Trusted by{" "}
                <span className="font-bold text-title">
                  500+ Top Hospitals
                </span>{" "}
                worldwide.
              </p>
            </div>

            <GetStartedFreeButton href={APP_AUTH_URLS.hospitalSignup} />
          </Reveal>

          <Reveal delay={0.1} className="flex w-full min-w-0 justify-center lg:justify-end">
            <div className="w-full max-w-[576px] h-[470px] overflow-hidden rounded-xl">
              <Image
                src="/images/hire_talent_3.webp"
                alt="Precision Dashboard"
                width={576}
                height={470}
                className="block h-auto w-full max-w-full object-cover rounded-lg"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TheNewStandardSection;
