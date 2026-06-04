import React from "react";
import Reveal from "../motion/Reveal";
import { StaggerContainer, StaggerItem } from "../motion/Stagger";

const statsData = [
  {
    value: "15k+",
    label: "Verified Professionals",
  },
  {
    value: "48h",
    label: "Avg. Time to Hire",
  },
  {
    value: "98%",
    label: "Placement Success",
  },
  {
    value: "1.2M",
    label: "Shifts Filled",
  },
];

const StatsSection = () => {
  return (
    <section className="w-full bg-[#F5F5F5] py-16 md:py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="w-full flex flex-col gap-8 md:gap-10 lg:gap-12">
          <Reveal className="flex justify-center">
            <h2 className="text-center uppercase text-[#64748B] font-bold tracking-[1.4px] text-[12px] sm:text-[13px] lg:text-[14px] leading-5 max-w-[90%] sm:max-w-none">
              Built for Healthcare Organizations of All Sizes
            </h2>
          </Reveal>

          <StaggerContainer className=" font-inter grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-8 md:gap-y-0">
            {statsData.map((item, index) => (
              <StaggerItem
                key={index}
                className="flex flex-col items-center justify-center gap-2 text-center min-w-0 px-1 sm:px-0"
              >
                <h3 className="text-[#0D9488]  font-extrabold text-[30px] sm:text-[34px] lg:text-[36px] leading-[40px]">
                  {item.value}
                </h3>

                <p className="text-[#424754] font-medium text-[14px] sm:text-[15px] md:text-[16px] leading-6">
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
