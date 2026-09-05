import React from "react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import { nurseDoctorJobsPlatformSection } from "../../utility/constants";

const PlatformPreviewSection = () => {
  const { heading, subtext, image, features } = nurseDoctorJobsPlatformSection;

  return (
    <section className="w-full overflow-hidden bg-surface-section">
      <div className="section-container">
        <div className="w-full rounded-[24px] bg-dark px-5 py-10 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:px-8 sm:py-12 lg:p-16">
          <Reveal className="mx-auto flex w-full max-w-[1072px] flex-col items-center gap-4 text-center">
            <h2 className="text-[28px] font-extrabold leading-9 text-white text-balance sm:text-[32px] sm:leading-10 lg:text-[36px] lg:leading-10">
              {heading}
            </h2>

            <p className="max-w-[630px] font-inter text-base font-normal leading-7 text-slate sm:text-lg sm:leading-7">
              {subtext}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-center gap-8 sm:mt-12 lg:mt-12 lg:grid-cols-2 lg:gap-14">
            <Reveal delay={0.1} className="min-w-0">
              <div className="w-full  max-h-[450px]  overflow-hidden rounded-[24px] border-[0.5px] border-[rgba(248,251,255,0.5)] shadow-[0px_0px_12px_2px_rgba(250,250,250,0.2)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={750}
                  height={450}
                  className="block h-auto w-full max-w-full object-cover opacity-90"
                />
              </div>
            </Reveal>

            <StaggerContainer className="flex w-full min-w-0 flex-col justify-center gap-6">
              {features.map((feature) => (
                <StaggerItem
                  key={feature.title}
                  className="flex w-full flex-col gap-2 rounded-[24px] border border-dark-border/50 bg-dark-surface/80 p-6"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={feature.icon}
                      alt=""
                      width={22}
                      height={20}
                      className="h-5 w-[22px] shrink-0 object-contain"
                    />

                    <h3 className="font-inter text-base font-semibold leading-6 text-white">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="font-inter text-sm font-normal leading-5 text-slate">
                    {feature.description}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformPreviewSection;
