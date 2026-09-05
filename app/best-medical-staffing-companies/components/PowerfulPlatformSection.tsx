import React from "react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import SectionPill from "../../components/SectionPill";
import {
  hospitalPlatformFeatures,
  hospitalPlatformSection,
} from "../../utility/constants";

const PowerfulPlatformSection = () => {
  const { badge, heading, subtext } = hospitalPlatformSection;

  return (
    <section className="w-full overflow-hidden bg-surface-section">
      <div className="section-container">
        <div className="w-full rounded-[24px] bg-dark px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <Reveal className="mx-auto flex  flex-col items-center gap-4 text-center">
            <SectionPill>{badge}</SectionPill>

            <h2 className="text-[28px] font-extrabold leading-[36px] text-white text-balance sm:text-[34px] sm:leading-[40px] lg:text-[36px]">
              {heading}
            </h2>

            <p className="max-w-[760px] text-base font-normal leading-7 text-slate sm:text-lg">
              {subtext}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-center gap-8 sm:mt-12 lg:mt-14 lg:grid-cols-12">
            <Reveal delay={0.1} className="min-w-0 lg:col-span-8">
              <div className="w-full overflow-hidden rounded-[24px] bg-dark-card shadow-[0px_20px_80px_rgba(0,0,0,0.45)]">
                <Image
                  src="/images/powerful_platform_dashboard_image.webp"
                  alt="Platform Dashboard"
                  width={750}
                  height={500}
                  className="block h-auto w-full max-w-full object-cover opacity-90"
                />
              </div>
            </Reveal>

            <StaggerContainer className="flex w-full min-w-0 flex-col gap-5 sm:gap-6 lg:col-span-4">
              {hospitalPlatformFeatures.map((feature, index) => (
                <StaggerItem
                  key={index}
                  className="flex w-full flex-col gap-3 rounded-[24px] border border-dark-border/50 bg-dark-surface/50 p-5 backdrop-blur-sm sm:p-6"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={22}
                      height={16}
                      className="h-4 w-[22px] shrink-0 object-contain"
                    />

                    <h3 className="text-base font-semibold leading-6 text-white">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-sm font-normal leading-5 text-slate">
                    {feature.description}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowerfulPlatformSection;
