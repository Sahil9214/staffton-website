import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import SectionPill from "../../components/SectionPill";
import { seoHowItWorksSection } from "../../utility/constants";

const SeoHowItWorksSection = () => {
  const { badge, heading, subtitle, steps, image } = seoHowItWorksSection;

  return (
    <section className="w-full bg-surface-gray overflow-hidden">
      <div className="section-container flex flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-14">
        <Reveal className="mx-auto flex w-full max-w-[760px] flex-col items-center gap-4 text-center lg:max-w-none">
          <SectionPill icon={Sparkles}>{badge}</SectionPill>

          <h2 className="text-[28px] font-extrabold leading-[36px] tracking-[-1px] text-heading sm:text-[34px] sm:leading-[42px] lg:text-[42px] lg:leading-[52px] [text-wrap:balance]">
            {heading}
          </h2>

          <p className="mx-auto max-w-[760px] font-inter text-sm font-normal leading-6 text-neutral sm:text-base sm:leading-[26px]">
            {subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-6 md:gap-8 lg:grid-cols-2 lg:gap-8">
          <Reveal className="flex w-full min-w-0">
            <div className="relative aspect-[600/480] w-full overflow-hidden rounded-[24px] shadow-soft">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex w-full min-w-0">
            <div className="flex w-full flex-col gap-5 rounded-[24px] bg-white p-5 sm:p-6">
              <StaggerContainer className="flex w-full flex-col gap-5">
                {steps.map((step, index) => (
                  <StaggerItem
                    key={step.title}
                    className="flex w-full items-start gap-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-badge-mint">
                      <span className="font-inter text-sm font-bold leading-[17px] text-accent">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <h3 className="text-base font-bold leading-[23px] text-heading sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="font-inter text-sm font-normal leading-[22px] text-neutral">
                        {step.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default SeoHowItWorksSection;
