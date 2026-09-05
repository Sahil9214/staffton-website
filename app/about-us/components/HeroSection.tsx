import React from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import Reveal from "../../components/motion/Reveal";
import SectionPill from "../../components/SectionPill";

const HeroSection = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="section-container flex flex-col items-center gap-12">
        <Reveal
          immediate
          className="w-full max-w-[1200px] flex flex-col items-center text-center gap-6"
        >
          <SectionPill variant="softTeal" icon={ShieldCheck} className="select-none">
            Clinical Staffing Redefined
          </SectionPill>

          <h1 className="font-sans font-extrabold text-heading text-[32px] sm:text-[44px] md:text-[56px] leading-[44px] sm:leading-[52px] md:leading-[64px] tracking-[-1.5px] max-w-[80%] ">
            Transforming Healthcare Staffing with Technology &amp; Trust
          </h1>

          <p className="font-inter font-normal text-body text-base md:text-lg leading-[26px] md:leading-[28px] max-w-[64%]">
            Staffton is the premier healthcare recruitment ecosystem. Our
            mission is to seamlessly bridge the gap between world-class
            healthcare facilities and verified medical professionals through
            automated precision, real-time matchmaking, and compliance built on
            absolute clinical trust.
          </p>
        </Reveal>

        <Reveal
          immediate
          delay={0.1}
          className="w-full max-w-[1200px] overflow-hidden rounded-[24px]"
        >
          <Image
            src="https://res.cloudinary.com/ncxpvfuo/image/upload/f_auto,q_auto/about_us_hero.webp"
            alt="A diverse group of confident healthcare professionals, including doctors and nurses, standing side by side in a clean, modern high-tech hospital corridor, smiling warmly"
            width={1200}
            height={480}
            sizes="(max-width: 1280px) 100vw, 1200px"
            priority
            fetchPriority="high"
            className="w-full h-auto object-cover rounded-[24px] transition-transform duration-700 hover:scale-102"
          />
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
