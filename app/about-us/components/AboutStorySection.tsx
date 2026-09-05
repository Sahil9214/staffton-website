import React from "react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";
import SectionPill from "../../components/SectionPill";

const AboutStorySection = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="section-container flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <Reveal className="w-full max-w-[560px] lg:w-[560px] aspect-[56/54] lg:h-[540px] relative rounded-[24px] overflow-hidden shrink-0 bg-slate-100 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
          <Image
            src="https://res.cloudinary.com/ncxpvfuo/image/upload/f_auto,q_auto/story.webp"
            alt="A collaborative meeting of hospital administrators and technologists around a wooden desk, discussing on a tablet, in a well-lit medical facility administrative office."
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            priority
            className="object-cover transition-transform duration-700 hover:scale-102"
          />
        </Reveal>

        <Reveal
          delay={0.1}
          className="flex-1 flex flex-col items-start gap-6 w-full max-w-[560px]"
        >
          <SectionPill variant="softTeal" className="select-none">
            how it all began
          </SectionPill>

          <h2 className="font-sans font-extrabold text-heading text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] tracking-tight">
            Our Story
          </h2>

          <div className="flex flex-col gap-6">
            <p className="font-inter font-normal text-body text-base leading-[26px]">
              Staffton was founded in 2024 by a coalition of healthcare
              administrators, physicians, and medical technologists who
              experienced firsthand the immense friction and delays plaguing
              traditional recruitment models. We watched hospitals operate
              under-staffed while certified specialists struggled to find
              immediate placement.
            </p>
            <p className="font-inter font-normal text-body text-base leading-[26px]">
              Recognizing that patient care hangs in the balance of every open
              shift, we engineered an elite automation platform designed
              strictly for healthcare. From starting out with a regional
              network of local clinics, Staffton has grown rapidly to partner
              with top hospital groups nationwide.
            </p>
            <p className="font-inter font-normal text-body text-base leading-[26px]">
              Today, our system automates credentials, integrates chat features
              directly between talent and administrators, and schedules with
              surgical precision. We maintain our core commitment to compliance,
              credentialing, and medical excellence in everything we build.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutStorySection;
