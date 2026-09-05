import React from "react";
import Reveal from "../../components/motion/Reveal";
import GetStartedFreeButton from "../../components/GetStartedFreeButton";
import { nurseDoctorJobsFinalCtaSection } from "../../utility/constants";
import { APP_AUTH_URLS } from "../../utility/app-auth-urls";

const FinalCTASection = () => {
  const { heading, subtext, ctaLabel } = nurseDoctorJobsFinalCtaSection;

  return (
    <section className="w-full flex flex-col items-center justify-center bg-[#0D9488] py-[56px] px-6 lg:px-[120px] lg:h-[377px] overflow-hidden">
      <div className="w-full max-w-[896px] flex flex-col items-center gap-6 text-center">
        <Reveal className="w-full flex flex-col items-center gap-6 text-center">
          <h2 className="w-full font-sans font-extrabold text-[28px] leading-9 sm:text-[34px] sm:leading-[42px] lg:text-[42px] lg:leading-[53px] text-white">
            {heading}
          </h2>

          <p className="max-w-[655.6px] font-inter font-normal text-base leading-7 sm:text-lg sm:leading-8 lg:text-[20px] lg:leading-[32px] text-[#F7F9FB]">
            {subtext}
          </p>

          <GetStartedFreeButton
            href={APP_AUTH_URLS.professionalSignup}
            variant="inverse"
            className="w-[208px]"
          >
            {ctaLabel}
          </GetStartedFreeButton>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTASection;

