import React from "react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";

const TheNewStandardSection = () => {
  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 lg:py-24 xl:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <Reveal className="flex w-full min-w-0 max-w-[576px] flex-col gap-6">
            <span className="text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-[#0D9488]">
              The New Standard
            </span>

            <div className="flex flex-col gap-1">
              <h2 className="text-[32px] font-bold leading-[38px] tracking-[-1.5px] text-[#191C1E] sm:text-[44px] sm:leading-[48px] lg:text-[48px] lg:leading-[52px]">
                Precision Talent.
              </h2>

              <h2 className="text-[32px] font-bold leading-[38px] tracking-[-1.5px] text-[#0D9488] sm:text-[44px] sm:leading-[48px] lg:text-[48px] lg:leading-[52px]">
                Total Control.
              </h2>
            </div>

            <p className="max-w-[560px] text-[16px] font-normal leading-7 text-[#424754] sm:text-[18px] sm:leading-8 lg:text-[20px] lg:leading-[32px]">
              The Staffton platform offers clinical precision in medical
              recruitment, moving beyond generic listings to control center
              for healthcare staffing.
            </p>

            <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6 sm:pt-4">
              <Image
                src="/images/for_hospitals_members_image.svg"
                alt="Trusted Hospitals"
                width={120}
                height={48}
                className="h-[48px] w-[120px] shrink-0 object-contain"
              />

              <p className="text-[14px] font-medium leading-5 text-[#424754]">
                Trusted by{" "}
                <span className="font-bold text-[#191C1E]">
                  500+ Top Hospitals
                </span>{" "}
                worldwide.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex w-full min-w-0 justify-center lg:justify-end">
            <div className="w-full max-w-[576px] overflow-hidden">
              <Image
                src="/images/the_new_standard_image.svg"
                alt="Precision Dashboard"
                width={576}
                height={500}
                className="block h-auto w-full max-w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TheNewStandardSection;
