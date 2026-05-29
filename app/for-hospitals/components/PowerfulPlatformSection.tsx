import React from "react";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";

const platformFeatures = [
  {
    title: "Talent Pipeline",
    description:
      "Visualize your recruitment funnel from applicant to hired staff.",
    icon: "/users_icon.svg",
  },
  {
    title: "Secure Messaging",
    description:
      "Encrypted chat for discussing clinical roles and contracts.",
    icon: "/chat_green_icon.svg",
  },
  {
    title: "Smart Contracts",
    description:
      "Digital signature and automated compliance checking.",
    icon: "/doc_icon.svg",
  },
];

const PowerfulPlatformSection = () => {
  return (
    <section className="w-full overflow-hidden bg-[#F7F9FB]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 lg:py-24 xl:px-12">
        <div className="w-full rounded-[24px] bg-[#0F172A] px-5 py-10 sm:px-8 sm:py-12 lg:px-16 lg:py-16">
          <Reveal className="mx-auto flex max-w-[1104px] flex-col items-center gap-4 text-center">
            <h2 className="text-[28px] font-extrabold leading-[36px] text-white sm:text-[34px] sm:leading-[40px] lg:text-[36px]">
              One Powerful Platform
            </h2>

            <p className="max-w-[700px] text-[16px] font-normal leading-7 text-[#94A3B8] sm:text-[18px]">
              A complete operating system for medical recruitment. Integrated,
              fast, and secure.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-center gap-8 sm:mt-12 lg:mt-14 lg:grid-cols-12">
            <Reveal delay={0.1} className="min-w-0 lg:col-span-8">
              <div className="w-full overflow-hidden rounded-[24px] bg-[#111827] shadow-[0px_20px_80px_rgba(0,0,0,0.45)]">
                <img
                  src="/images/powerful_platform_dashboard_image.svg"
                  alt="Platform Dashboard"
                  className="block h-auto w-full max-w-full object-cover opacity-90"
                />
              </div>
            </Reveal>

            <StaggerContainer className="flex w-full min-w-0 flex-col gap-5 sm:gap-6 lg:col-span-4">
              {platformFeatures.map((feature, index) => (
                <StaggerItem
                  key={index}
                  className="flex w-full flex-col gap-3 rounded-[24px] border border-[#33415580] bg-[#1E293B80] p-5 backdrop-blur-sm sm:p-6"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="h-4 w-[22px] shrink-0 object-contain"
                    />

                    <h3 className="text-[16px] font-semibold leading-6 text-white">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-[14px] font-normal leading-5 text-[#94A3B8]">
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

export default PowerfulPlatformSection;
