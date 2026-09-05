import React from "react";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import {
  homeHowItWorksSection,
  hospitalOnboardingSteps,
  professionalOnboardingSteps,
} from "../../utility/constants";
import GetStartedFreeButton from "@/app/components/GetStartedFreeButton";

const StepCard = ({
  badge,
  badgeBgClass,
  badgeTextColorClass,
  badgeWidth,
  circleBgClass,
  steps,
}: {
  badge: string;
  badgeBgClass: string;
  badgeTextColorClass: string;
  badgeWidth: string;
  circleBgClass: string;
  steps: { title: string; description: string }[];
}) => {
  return (
    <div className="w-full flex flex-col gap-6 lg:h-[576px]">
      <div
        className={`h-9 rounded-[8px] flex items-center justify-center shrink-0 ${badgeBgClass}`}
        style={{ width: badgeWidth }}
      >
        <span
          className={`font-inter font-bold text-sm leading-[20px] tracking-[0.5px] ${badgeTextColorClass}`}
        >
          {badge}
        </span>
      </div>

      <StaggerContainer className="flex flex-col gap-6 flex-1">
        {steps.map((item, index) => (
          <StaggerItem key={index} className="flex items-start gap-6 w-full h-auto lg:h-[84px] shrink-0">
            {/* Step Number Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${circleBgClass}`}
            >
              <span className="font-inter font-bold text-base leading-[24px] text-white text-center">
                {index + 1}
              </span>
            </div>

            {/* Step Content */}
            <div className="flex flex-col gap-2 min-w-0 flex-1 h-auto lg:h-[84px]">
              <h4 className="font-manrope font-bold text-lg leading-[28px] text-title">
                {item.title}
              </h4>
              <p className="font-inter font-normal text-base leading-[24px] text-body">
                {item.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

const HowItWorksSection = () => {
  return (
    <section className="w-full bg-[#f5f5f5]">
      <div className="section-container">
        <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
          <Reveal className="flex flex-col items-center gap-3">
            <p className="text-center font-inter text-sm font-bold uppercase leading-5 tracking-[1px] text-muted">
              {homeHowItWorksSection.badge}
            </p>
            <h2 className="max-w-[90%] text-center text-[28px] font-extrabold leading-9 text-title sm:max-w-[760px] sm:text-[34px] sm:leading-[42px] lg:text-[36px] lg:leading-10">
              {homeHowItWorksSection.heading}
            </h2>
          </Reveal>

          <div className="w-full max-w-[1200px] bg-surface-page rounded-[17px] relative mx-auto p-6 md:p-8 lg:px-[24px] lg:pt-[24px] lg:pb-[64px]">
            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[64px] relative z-10">
              <Reveal className="w-full">
                <StepCard
                  badge="FOR HOSPITALS"
                  badgeBgClass="bg-badge-hospital-bg"
                  badgeTextColorClass="text-badge-hospital-text"
                  badgeWidth="142.09px"
                  circleBgClass="bg-accent"
                  steps={hospitalOnboardingSteps}
                />
              </Reveal>

              <Reveal delay={0.1} className="w-full">
                <StepCard
                  badge="FOR PROFESSIONALS"
                  badgeBgClass="bg-badge-professional-bg"
                  badgeTextColorClass="text-badge-professional-text"
                  badgeWidth="179.97px"
                  circleBgClass="bg-accent-teal-darker"
                  steps={professionalOnboardingSteps}
                />
              </Reveal>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block absolute w-[1px] left-1/2 -translate-x-1/2 top-0 bottom-0 bg-border-input/30 z-0" />
          </div>

          <div className="flex justify-center">
            <GetStartedFreeButton href="/contact-us/">Get Started Contact Us</GetStartedFreeButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
