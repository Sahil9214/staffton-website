import React from "react";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center w-full min-w-0">
      <span className="font-sans font-extrabold text-white text-[32px] md:text-[40px] leading-[36px] md:leading-[44px] tracking-tight">
        {value}
      </span>
      <span className="font-inter font-medium text-badge-mint text-sm md:text-sm leading-[22px]">
        {label}
      </span>
    </div>
  );
};

const AboutStatsSection = () => {
  const stats = [
    { value: "15,000+", label: "Verified Professionals" },
    { value: "500+", label: "Partner Hospitals" },
    { value: "98%", label: "Placement Success" },
    { value: "48hr", label: "Avg. Time-to-Fill" },
  ];

  return (
    <section className="w-full bg-accent py-16 px-4 overflow-hidden flex flex-col items-center justify-center">
      <div className="common-container">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 items-start justify-items-center">
          {stats.map((stat, index) => (
            <StaggerItem key={index} className="w-full min-w-0">
              <StatItem value={stat.value} label={stat.label} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default AboutStatsSection;
