import React from "react";
import { Phone } from "lucide-react";
import Reveal from "../../components/motion/Reveal";
import SectionPill from "../../components/SectionPill";

const HeroSection = () => {
  return (
    <section className="w-full bg-badge-soft overflow-hidden">
      <div className="section-container flex flex-col gap-5">
        <Reveal immediate className="w-fit">
          <SectionPill variant="mint" icon={Phone} className="select-none">
            SUPPORT 24/7
          </SectionPill>
        </Reveal>

        <Reveal immediate delay={0.05}>
          <h1 className="font-sans font-extrabold text-heading text-[32px] sm:text-[40px] md:text-[48px] leading-[40px] sm:leading-[48px] md:leading-[56px] tracking-[-1.5px] max-w-[610px] [text-wrap:balance]">
            Get in Touch with Staffton
          </h1>
        </Reveal>

        <Reveal immediate delay={0.1}>
          <p className="font-inter font-normal text-neutral text-base md:text-lg leading-[26px] md:leading-[28px] max-w-[780px] [text-wrap:balance]">
            Whether you&apos;re a healthcare facility looking to fill critical
            positions or a medical professional seeking your next opportunity,
            we&apos;re here to help. Reach out to our specialist teams today.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
