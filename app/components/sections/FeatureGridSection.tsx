import React from "react";
import Image from "next/image";
import Reveal from "../motion/Reveal";
import { StaggerContainer, StaggerItem } from "../motion/Stagger";

const FeatureGridSection = ({sectionData}: any) => {
  const data = sectionData;
  return (
    <section className="w-full overflow-hidden bg-surface-page">
      <div className="section-container">
        <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
          <Reveal className="gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
          
              <h2 className="text-[28px] font-extrabold leading-[36px] text-title text-balance sm:text-[34px] sm:leading-[40px] lg:text-[36px]">
                {data?.heading}
              </h2>
            </div>

            <div className="min-w-0 max-w-[620px] lg:pt-3 ">
              <p className="text-base font-normal leading-7 text-body sm:text-lg">
                {data?.subheading}
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {data?.features.map((feature:any= [], index: number) => (
              <StaggerItem
                key={index}
                className="flex min-h-[220px] flex-col rounded-[24px] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.06)] sm:min-h-[254px] sm:p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-surface-icon">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:mt-8">
                  <h3 className="text-lg font-bold leading-7 text-title sm:text-[20px]">
                    {feature.title}
                  </h3>

                  <p className="text-sm font-normal leading-[26px] text-body sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default FeatureGridSection;
