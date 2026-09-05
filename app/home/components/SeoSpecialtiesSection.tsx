import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Ambulance,
  Baby,
  Camera,
  CircleX,
  Dna,
  HeartCrack,
  ShieldCheck,
  TestTubes,
} from "lucide-react";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import SectionPill from "../../components/SectionPill";
import GetStartedFreeButton from "../../components/GetStartedFreeButton";
import { seoSpecialtiesSection } from "../../utility/constants";

const specialtyIcons: Record<string, LucideIcon> = {
  ambulance: Ambulance,
  "circle-x": CircleX,
  "test-tubes": TestTubes,
  baby: Baby,
  "heart-crack": HeartCrack,
  dna: Dna,
  camera: Camera,
};

const SeoSpecialtiesSection = () => {
  const { badge, heading, subtitle, specialties, footnote } =
    seoSpecialtiesSection;

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="section-container flex flex-col items-center gap-10 sm:gap-12 md:gap-14 lg:gap-14">
        <Reveal className="flex w-full flex-col items-center gap-4 text-center">
          <SectionPill icon={ShieldCheck}>{badge}</SectionPill>

          <h2 className="text-[28px] font-extrabold leading-9 tracking-[-1px] text-heading sm:text-[34px] sm:leading-[42px] lg:text-[36px] lg:leading-10 [text-wrap:balance]">
            {heading}
          </h2>

          <p className="mx-auto max-w-[760px] font-inter text-sm font-normal leading-6 text-neutral sm:text-base sm:leading-[26px]">
            {subtitle}
          </p>
        </Reveal>

        <StaggerContainer
          className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {specialties.map((specialty) => {
            const Icon = specialtyIcons[specialty.icon];

            return (
              <StaggerItem
                key={specialty.title}
                className="flex h-full flex-col gap-4 rounded-2xl border border-border-subtle bg-white p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-badge-soft p-2.5">
                  {Icon ? (
                    <Icon
                      className="h-6 w-6 text-accent"
                      strokeWidth={2}
                      aria-hidden
                    />
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold leading-[23px] text-heading">
                    {specialty.title}
                  </h3>
                  <p className="font-inter text-sm font-normal leading-[22px] text-neutral">
                    {specialty.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <Reveal className="flex w-full max-w-[980px] flex-col items-center gap-3 text-center">
          {footnote.heading ? (
            <h3 className="text-sm font-bold uppercase leading-[18px] tracking-[1px] text-neutral">
              {footnote.heading}
            </h3>
          ) : null}
          <p className="font-inter text-sm font-normal leading-[22px] text-neutral">
            {footnote.text}
          </p>
          {footnote.buttonText ? (
            <div className="pt-4">
              <GetStartedFreeButton href="/contact-us/">
                {footnote.buttonText}
              </GetStartedFreeButton>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
};

export default SeoSpecialtiesSection;
