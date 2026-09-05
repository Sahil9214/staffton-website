import React from "react";
import Reveal from "../motion/Reveal";
import { StaggerContainer, StaggerItem } from "../motion/Stagger";
import { platformStats } from "../../utility/constants";

const StatsSection = () => {
  return (
    <section className="w-full bg-surface-gray py-16 md:py-20 lg:py-24">
      <div className="common-container">
        <div className="w-full flex flex-col gap-8 md:gap-10 lg:gap-12">
          <Reveal className="flex justify-center">
            <h2 className="text-center uppercase text-muted font-bold tracking-[1.4px] text-[12px] sm:text-[13px] lg:text-sm leading-5 max-w-[90%] sm:max-w-none">
              Built for Healthcare Organizations of All Sizes
            </h2>
          </Reveal>

          <StaggerContainer className=" font-inter grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-8 md:gap-y-0">
            {platformStats.map((item, index) => (
              <StaggerItem
                key={index}
                className="flex flex-col items-center justify-center gap-2 text-center min-w-0 px-1 sm:px-0"
              >
                <p className="text-accent font-extrabold text-[30px] sm:text-[34px] lg:text-[36px] leading-[40px]">
                  {item.value}
                </p>

                <p className="text-body font-medium text-sm sm:text-sm md:text-base leading-6">
                  {item.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
