import React from "react";
import Image from "next/image";
import { Shield } from "lucide-react";
import Reveal from "../../components/motion/Reveal";
import GetStartedFreeButton from "../../components/GetStartedFreeButton";
import SectionPill from "../../components/SectionPill";
import { whyStafftonSection } from "../../utility/constants";

const WhyStafftonSection = () => {
  const { badge, heading, feature, ctaLabel, image } = whyStafftonSection;

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex w-full min-w-0 flex-col gap-6 sm:gap-8">
            <SectionPill icon={Shield}>{badge}</SectionPill>

            <h2 className="text-[28px] font-extrabold leading-9 tracking-[-1px] text-heading text-balance sm:text-[34px] sm:leading-[42px] lg:text-[42px] lg:leading-[52px]">
              {heading}
            </h2>

            <div className="flex w-full flex-col gap-2">
              <h3 className="text-base font-bold leading-6 text-heading sm:text-[20px] sm:leading-[25px]">
                {feature.title}
              </h3>
              <p className="font-inter text-sm font-normal leading-6 text-neutral">
                {feature.description}
              </p>
            </div>

            <div className="pt-2">
              <GetStartedFreeButton href="/contact-us/">
                {ctaLabel}
              </GetStartedFreeButton>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex w-full min-w-0 justify-center lg:justify-end"
          >
            <div className="relative h-[520px] w-full max-w-[568px] overflow-hidden rounded-xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-xl"
                sizes="568px"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WhyStafftonSection;
