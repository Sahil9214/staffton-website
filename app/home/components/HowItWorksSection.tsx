import React from "react";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import { hospitalOnboardingSteps, professionalOnboardingSteps } from "../../utility/constants";

const StepCard = ({
  badge,
  badgeBg,
  badgeText,
  circleBg,
  steps,
  borderRight = false,
}: any) => {
  return (
    <div
      className={`
        w-full min-w-0 flex flex-col gap-8 md:gap-10
        ${borderRight ? "lg:border-r lg:border-[#E5E7EB] lg:pr-8 xl:pr-10" : "lg:pl-8 xl:pl-10"}
      `}
    >
      <div
        className="w-fit px-4 py-2 rounded-[8px]"
        style={{ backgroundColor: badgeBg }}
      >
        <span
          className="text-[14px] leading-5 font-bold uppercase"
          style={{ color: badgeText }}
        >
          {badge}
        </span>
      </div>

      <StaggerContainer className="flex flex-col gap-7 md:gap-8">
        {steps.map((item: any, index: number) => (
          <StaggerItem key={index} className="flex items-start gap-4 sm:gap-6">
            <div
              className="w-10 h-10 min-w-[40px] shrink-0 rounded-full flex items-center justify-center"
              style={{ backgroundColor: circleBg }}
            >
              <span className="text-white text-[16px] leading-6 font-bold">
                {index + 1}
              </span>
            </div>

            <div className="flex flex-col gap-1 min-w-0">
              <h3 className="text-[18px] sm:text-[19px] lg:text-[20px] font-semibold leading-7 text-[#191C1E]">
                {item.title}
              </h3>

              <p className="text-[15px] leading-6 text-[#5F6368] font-normal">
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
    <section className="w-full bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16 md:py-20 lg:py-24">
        <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
          <Reveal className="flex justify-center">
            <h2 className="text-center text-[#191C1E] font-extrabold leading-[36px] sm:leading-[38px] lg:leading-[40px] text-[30px] sm:text-[34px] lg:text-[36px] max-w-[90%] sm:max-w-none">
              Simple. Transparent. Efficient.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-14 lg:gap-16">
            <Reveal>
              <StepCard
                badge="FOR HOSPITALS"
                badgeBg="#D9E2FF"
                badgeText="#001944"
                circleBg="#0D9488"
                steps={hospitalOnboardingSteps}
                borderRight={true}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <StepCard
                badge="FOR PROFESSIONALS"
                badgeBg="#89F5E7"
                badgeText="#00201D"
                circleBg="#006A61"
                steps={professionalOnboardingSteps}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

// hello
