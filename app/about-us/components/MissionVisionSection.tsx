import React from "react";
import { Compass, Eye } from "lucide-react";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";

const MissionVisionSection = () => {
  return (
    <section className="w-full bg-surface-hover overflow-hidden">
      <div className="section-container flex flex-col gap-10">
        <StaggerContainer className="w-full flex flex-col lg:flex-row gap-8 items-stretch">
          <StaggerItem className="flex-1 bg-white p-8 md:p-12 rounded-[24px] shadow-[0px_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-start gap-6">
            <div className="w-14 h-14 bg-badge-soft rounded-[16px] flex items-center justify-center p-4 select-none shrink-0">
              <Compass className="w-6 h-6 text-accent shrink-0" strokeWidth={2} />
            </div>

            <h2 className="font-sans font-extrabold text-heading text-[28px] md:text-[32px] leading-[36px] md:leading-[40px] tracking-tight">
              Our Mission
            </h2>

            <p className="font-inter font-normal text-body text-base leading-[26px] [text-wrap:balance]">
              To eliminate administrative friction in healthcare recruitment by
              connecting elite medical facilities with verified professionals
              instantly. We employ AI-powered precision matching, automated
              credentialing, and secure in-app workflows to ensure patients
              always receive safe, timely, and excellent care from qualified
              specialists.
            </p>
          </StaggerItem>

          <StaggerItem className="flex-1 bg-white p-8 md:p-12 rounded-[24px] shadow-[0px_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-start gap-6">
            <div className="w-14 h-14 bg-badge-soft rounded-[16px] flex items-center justify-center p-4 select-none shrink-0">
              <Eye className="w-6 h-6 text-accent shrink-0" strokeWidth={2} />
            </div>

            <h2 className="font-sans font-extrabold text-heading text-[28px] md:text-[32px] leading-[36px] md:leading-[40px] tracking-tight">
              Our Vision
            </h2>

            <p className="font-inter font-normal text-body text-base leading-[26px] [text-wrap:balance]">
              To create a healthcare ecosystem where staffing crises are a thing
              of the past. We envision a future where hospital networks,
              clinical laboratories, and regional healthcare providers have
              on-demand access to certified talent pools
              nationwide—redefining medical staffing with compliance, safety,
              and operational transparency first.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default MissionVisionSection;
