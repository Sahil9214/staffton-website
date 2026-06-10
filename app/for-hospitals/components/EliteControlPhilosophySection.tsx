import React from "react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import { eliteControlPhilosophyPillars } from "../../utility/constants";

const EliteControlPhilosophySection = () => {
  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 lg:py-24 xl:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <Reveal className="flex w-full min-w-0 justify-center lg:justify-start">
            <div className="relative h-[420px] w-full max-w-[560px] overflow-hidden rounded-[24px] shadow-[0px_20px_50px_rgba(0,0,0,0.18)] sm:h-[560px] lg:h-[700px]">
              <Image
                src="/images/staffton_transformed_image.svg"
                alt="Elite Control"
                width={560}
                height={700}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 z-10 sm:bottom-8 sm:left-8 sm:right-8">
                <h2 className="text-[24px] font-bold leading-[32px] text-white sm:text-[32px] sm:leading-[38px] lg:text-[36px] lg:leading-[42px]">
                  &ldquo;Staffton transformed
                  <br />
                  our surgical department&apos;s
                  <br />
                  efficiency overnight.&rdquo;
                </h2>

                <p className="mt-3 text-[16px] font-medium leading-7 text-white/80 sm:mt-4 sm:text-[18px]">
                  St. Jude Medical Center
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex w-full min-w-0 max-w-[560px] flex-col gap-8 lg:max-w-none">
            <Reveal className="flex flex-col gap-1">
              <h2 className="text-[32px] font-extrabold leading-[38px] text-[#191C1E] sm:text-[42px] sm:leading-[48px] lg:text-[48px] lg:leading-[52px]">
                The Elite Control
              </h2>

              <h2 className="text-[32px] font-extrabold leading-[38px] text-[#0D9488] sm:text-[42px] sm:leading-[48px] lg:text-[48px] lg:leading-[52px]">
                Philosophy.
              </h2>
            </Reveal>

            <StaggerContainer className="flex flex-col gap-10 sm:gap-12">
              {eliteControlPhilosophyPillars.map((item, index) => (
                <StaggerItem key={index} className="flex items-start gap-4 sm:gap-6">
                  <div className="flex h-12 min-w-[48px] shrink-0 items-center justify-center rounded-[12px] border border-[#D7E3F4] bg-white">
                    <span className="text-[16px] font-bold leading-6 text-[#0D9488]">
                      {item.number}
                    </span>
                  </div>

                  <div className="min-w-0 flex flex-col gap-3">
                    <h3 className="text-[18px] font-bold leading-7 text-[#191C1E] sm:text-[20px]">
                      {item.title}
                    </h3>

                    <p className="text-[15px] font-normal leading-[26px] text-[#424754] sm:text-[16px]">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteControlPhilosophySection;
