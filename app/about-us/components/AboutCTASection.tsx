import React from "react";
import Link from "next/link";
import Reveal from "../../components/motion/Reveal";
import { HIRE_TALENT_PATH } from "../../utility/site";

const AboutCTASection = () => {
  return (
    <section className="w-full bg-accent overflow-hidden select-none">
      <div className="section-container flex flex-col items-center gap-8">
        <Reveal className="w-full flex flex-col items-center gap-4 text-center">
          <h2 className="font-sans font-extrabold text-white text-[32px] sm:text-[40px] md:text-[48px] leading-[40px] sm:leading-[48px] md:leading-[56px] tracking-[-1.5px]">
            Ready to Partner with Staffton?
          </h2>
          <p className="font-inter font-normal text-badge-mint text-base sm:text-lg leading-[26px] sm:leading-[28px] max-w-[655px] [text-wrap:balance]">
            Whether you are a hospital administrator needing certified staffing
            or a medical specialist looking for verified opportunities, Staffton
            helps you bridge the gap.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full"
        >
          <Link
            href={`${HIRE_TALENT_PATH}/`}
            className="inline-flex items-center justify-center bg-white hover:bg-teal-50 text-accent font-sans font-bold text-base leading-[20px] rounded-lg px-8 py-3.5 h-12 w-full sm:w-[166px] transition-colors duration-200 shadow-sm"
          >
            For Hospitals
          </Link>
          <Link
            href="/nurse-doctor-jobs-india/"
            className="inline-flex items-center justify-center bg-dark hover:bg-slate-800 text-white font-sans font-bold text-base leading-[20px] rounded-lg px-8 py-3.5 h-12 w-full sm:w-[198px] transition-colors duration-200 shadow-sm"
          >
            For Professionals
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutCTASection;
