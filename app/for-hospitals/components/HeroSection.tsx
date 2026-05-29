import React from "react";
import { BadgeCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";

const features = [
  "Automated Credential Verification",
  "Real-time Messaging",
  "Direct hospital-to-candidate messaging",
];

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F9FAFB] pb-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(240,253,250,0)_0%,rgba(13,148,136,0.25)_100%)]"
      />

      <div className="relative flex w-full flex-col items-center pb-0 pt-10 sm:pt-12 md:pt-14">
        <Reveal immediate className="mx-auto flex w-full max-w-[1392px] flex-col items-center gap-6 px-4 sm:gap-8 sm:px-6 md:px-8 lg:px-10">
          <Reveal immediate delay={0.05} className="inline-flex items-center gap-2 rounded-full bg-[#CCFBF1] px-3 py-1">
            <BadgeCheck className="h-[13px] w-[13px] shrink-0 text-[#0D9488]" />

            <span className="font-inter text-[12px] font-semibold uppercase leading-4 tracking-[0.6px] text-[#0D9488]">
              Trusted by 500+ Medical Centers
            </span>
          </Reveal>

          <div className="w-full max-w-[820px] min-w-0 text-center">
            <h1 className="text-[36px] font-extrabold tracking-[-1.5px] text-[#191C1E] leading-[44px] sm:text-[52px] sm:leading-[60px] lg:text-[60px] lg:leading-[70px]">
              Hire Verified Medical
              <br />
              Professionals{" "}
              <span className="text-[#0D9488]">Faster.</span>
            </h1>
          </div>

          <div className="w-full max-w-[760px] min-w-0">
            <p className="text-center text-[16px] font-normal leading-7 text-[#424754] sm:text-[18px] sm:leading-[28px] lg:text-[20px]">
              The elite recruitment ecosystem for healthcare. Skip the noise
              and connect directly with credentialed specialists ready for
              their next role.
            </p>
          </div>

          <StaggerContainer className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-6 lg:gap-x-[42px]">
            {features.map((item, index) => (
              <StaggerItem key={index} className="flex max-w-full items-start gap-3 sm:items-center">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0D9488] sm:mt-0" />

                <p className="text-[15px] font-medium leading-6 text-[#191C1E] sm:text-[16px]">
                  {item}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal immediate delay={0.2} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center leading-none">
              <Image
                src="/images/for_hospitals_members_image.svg"
                alt="Trusted Medical Staff"
                width={148}
                height={56}
                className="block h-auto w-auto max-w-full object-contain"
              />
            </div>

            <p className="text-center text-[14px] font-medium leading-5 text-[#191C1E] sm:text-left">
              Trusted by{" "}
              <span className="font-bold">500+ Top Hospitals</span> worldwide.
            </p>
          </Reveal>
        </Reveal>

        <Reveal immediate delay={0.25} className="mt-[18px] w-full max-w-[1228px] px-4 leading-[0] sm:px-6 lg:px-8 xl:px-0">
          <img
            src="/images/for_hospitals_hero_image.svg"
            alt="Dashboard Preview"
            className="block h-auto w-full max-w-full -mb-[24px]"
          />
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
