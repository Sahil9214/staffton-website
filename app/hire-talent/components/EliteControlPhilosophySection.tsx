import React from "react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import GetStartedFreeButton from "../../components/GetStartedFreeButton";
import { APP_AUTH_URLS } from "../../utility/app-auth-urls";
import {
  eliteControlPhilosophyPillars,
  hospitalEliteControlSection,
} from "../../utility/constants";

const EliteControlPhilosophySection = () => {
  const { heading } = hospitalEliteControlSection;

  return (
    <section className="w-full overflow-hidden bg-white py-16 lg:py-[96px] px-6 lg:px-[120px]">
      <div className="mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-[56px] max-w-[1200px] w-full">
        {/* Left Column: Testimonial Card */}
        <Reveal className="w-full max-w-[572px] shrink-0">
          <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[615px] rounded-[24px] overflow-hidden shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] bg-[rgba(255,255,255,0.002)] isolate">
            <Image
              src="/images/staffton_transformed_image.webp"
              alt="Hospital Administrator reviewing candidate credentials on a tablet"
              fill
              sizes="(max-w-[572px]) 100vw, 572px"
              className="object-cover z-0"
              priority
            />
            <div 
              className="absolute inset-0 top-[-0.5px] bottom-[0.5px] left-0 right-0 z-10 flex flex-row items-end p-6 sm:p-10 lg:p-[48px]"
              style={{ background: "linear-gradient(0deg, rgba(25, 28, 30, 0.6) 0%, rgba(25, 28, 30, 0) 100%)" }}
            >
              <div className="flex flex-col gap-2 w-full max-w-[456.56px]">
                <blockquote className="font-plus-jakarta font-bold text-2xl sm:text-3xl lg:text-[36px] lg:leading-[40px] text-white">
                  &ldquo;Staffton transformed our surgical department&apos;s efficiency overnight.&rdquo;
                </blockquote>
                <cite className="not-italic font-plus-jakarta font-medium text-sm sm:text-base text-white/70">
                  St. Jude Medical Center
                </cite>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Vetting Pillars */}
        <div className="flex flex-col items-start gap-8 lg:gap-[32px] w-full max-w-[572px] lg:h-[612px] justify-between">
          <Reveal className="flex flex-col items-start w-full">
            <h2 className="font-plus-jakarta text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[35px] lg:leading-[45px] text-[#191C1E] text-balance">
              {heading}
            </h2>
          </Reveal>

          <StaggerContainer className="flex flex-col items-start gap-8 lg:gap-[48px] w-full">
            {eliteControlPhilosophyPillars.map((item, index) => (
              <StaggerItem key={index} className="flex flex-row items-start gap-6 lg:gap-[24px] w-full">
                <div className="flex h-12 w-12 min-w-[48px] shrink-0 items-center justify-center rounded-[12px] border border-[rgba(0,87,195,0.2)] bg-white">
                  <span className="font-plus-jakarta text-base font-bold leading-6 text-[#0D9488]">
                    {item.number}
                  </span>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                  <h3 className="font-plus-jakarta text-lg lg:text-[20px] font-bold leading-7 text-[#191C1E]">
                    {item.title}
                  </h3>
                  <p className="font-plus-jakarta text-sm lg:text-base font-normal leading-[26px] text-[#424754]">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal className="w-full">
            <GetStartedFreeButton 
              href={APP_AUTH_URLS.hospitalSignup} 
              className="w-[208px]" 
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EliteControlPhilosophySection;
