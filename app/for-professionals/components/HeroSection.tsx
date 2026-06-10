import React from "react";
import Image from "next/image";
import { BadgeCheck, CheckCircle2 } from "lucide-react";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import { professionalHeroFeatures } from "../../utility/constants";

const HeroSection = () => {
  return (
    <section className="w-full bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-14 lg:gap-16 xl:gap-20 items-center">
          <Reveal immediate className="w-full max-w-[592px] min-w-0 flex flex-col gap-6 sm:gap-7">
            <Reveal immediate delay={0.05} className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-[#86F2E4]">
              <BadgeCheck className="w-4 h-4 shrink-0 text-[#006F66]" />

              <span className="font-inter text-[12px] leading-4 tracking-[0.6px] uppercase font-semibold text-[#006F66]">
                Trusted by 500+ Medical Centers
              </span>
            </Reveal>

            <h1 className="font-[800] text-[#0F172A] tracking-[0px] text-[42px] sm:text-[52px] lg:text-[60px] leading-[50px] sm:leading-[60px] lg:leading-[70px] flex flex-col gap-1 sm:gap-1.5 lg:gap-2">
              <span className="block">Get hired by </span>
              <span className="block">verified medical </span>
              <span className="block text-[#0D9488]">facilities faster</span>
            </h1>

            <p className="max-w-[576px] w-full text-[#424754] text-[16px] leading-7 font-normal">
              The elite recruitment ecosystem for healthcare. Skip the
              noise and connect directly with credentialed specialists
              ready for their next role.
            </p>

            <StaggerContainer className="flex flex-col gap-3 pt-1 sm:pt-2">
              {professionalHeroFeatures.map((item, index) => (
                <StaggerItem key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 min-w-[20px] shrink-0 text-[#00BBA7] mt-[2px]" />

                  <p className="text-[16px] leading-6 font-medium text-[#191C1E]">
                    {item}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Reveal>

          <Reveal immediate delay={0.15} className="w-full min-w-0 flex justify-center lg:justify-end">
            <div className="w-full max-w-[584px]">
              <Image
                src="/images/for_professionals_hero_image.svg"
                alt="Medical Professionals"
                width={584}
                height={500}
                priority
                className="w-full h-auto max-w-full object-cover rounded-[24px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
