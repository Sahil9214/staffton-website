import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import SectionPill from "../../components/SectionPill";
import { nurseDoctorJobsFeaturesSection } from "../../utility/constants";

const FeaturesSection = () => {
  const { badge, heading, subtitle, features } = nurseDoctorJobsFeaturesSection;

  return (
    <section className="w-full overflow-hidden bg-surface-page">
      <div className="section-container flex flex-col gap-12 md:gap-14 lg:gap-16">
        <Reveal className="mx-auto flex w-full max-w-[880px] flex-col items-center gap-4 text-center">
          <SectionPill icon={Sparkles}>{badge}</SectionPill>

          <h2 className="text-[28px] font-bold leading-9 tracking-[-1px] text-heading sm:text-[34px] sm:leading-[42px] lg:text-[42px] lg:leading-[53px] [text-wrap:balance]">
            {heading}
          </h2>

          <p className="mx-auto max-w-[880px] font-inter text-sm font-normal leading-6 text-neutral sm:text-base sm:leading-[26px]">
            {subtitle}
          </p>
        </Reveal>

        <StaggerContainer className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem
              key={feature.title}
              className="flex min-h-[220px] flex-col gap-4 rounded-[24px] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.06)] sm:min-h-[276px] sm:p-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-accent-teal-darker/10">
                <Image
                  src={feature.icon}
                  alt=""
                  width={25}
                  height={25}
                  className="h-[25px] w-[25px] object-contain"
                />
              </div>

              <h3 className="font-manrope text-lg font-bold leading-7 text-title sm:text-[20px]">
                {feature.title}
              </h3>

              <p className="font-inter text-sm font-normal leading-[26px] text-body sm:text-base">
                {feature.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FeaturesSection;
