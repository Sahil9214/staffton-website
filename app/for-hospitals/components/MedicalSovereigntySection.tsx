import React from "react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import { medicalSovereigntySubFeatures } from "../../utility/constants";

const MedicalSovereigntySection = () => {
  return (
    <section className="w-full overflow-hidden bg-[#F5F5F5]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 lg:py-24 xl:px-12">
        <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
          <Reveal className="flex max-w-[672px] min-w-0 flex-col gap-4">
            <h2 className="text-[28px] font-extrabold leading-[36px] text-[#191C1E] sm:text-[34px] sm:leading-[40px] lg:text-[36px]">
              Built for Medical Sovereignty.
            </h2>

            <p className="text-[16px] font-normal leading-7 text-[#424754] sm:text-[18px] sm:leading-[29px]">
              Infrastructure designed for elite facilities that demand surgical
              precision in their staffing operations.
            </p>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <StaggerItem className="flex flex-col gap-8 rounded-[24px] border border-[#C2C6D60D] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] sm:p-8 lg:col-span-8 lg:p-10">
              <Image
                src="/verified_icon.svg"
                alt="Verified Icon"
                width={46}
                height={46}
                className="h-[46px] w-[46px] shrink-0 object-contain"
              />

              <div className="flex flex-col gap-4">
                <h3 className="text-[24px] font-bold leading-8 text-[#191C1E] lg:text-[30px] lg:leading-[36px]">
                  Credentialing & Compliance
                </h3>

                <p className="max-w-[620px] text-[16px] font-normal leading-7 text-[#424754] lg:text-[18px]">
                  Automated verification of medical licenses, board
                  certifications, and Security compliance in real-time across
                  50 states.
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-[16px] border border-[#E5E7EB]">
                <Image
                  src="/images/credentialing_dashboard_image.svg"
                  alt="Credential Dashboard"
                  width={750}
                  height={450}
                  className="block h-auto w-full max-w-full object-cover opacity-80"
                />
              </div>
            </StaggerItem>

            <StaggerItem className="flex min-h-[420px] flex-col justify-between rounded-[24px] bg-[#0D9488] p-6 sm:min-h-[480px] sm:p-8 lg:col-span-4 lg:min-h-[528px] lg:p-10">
              <div className="flex flex-col gap-8">
                <Image
                  src="/network_icon.svg"
                  alt="Network Icon"
                  width={46}
                  height={46}
                  className="h-[46px] w-[46px] shrink-0 object-contain"
                />

                <div className="flex flex-col gap-4">
                  <h3 className="text-[22px] font-bold leading-8 text-white sm:text-[24px]">
                    The Talent Network
                  </h3>

                  <p className="text-[16px] font-normal leading-[26px] text-white">
                    Direct access to the top 3% of medical professionals
                    curated through our proprietary screening protocol.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex w-full flex-col gap-1 rounded-[16px] border border-[#FFFFFF1A] bg-white/10 p-4 lg:mt-0">
                <h4 className="text-[28px] font-extrabold leading-9 text-white sm:text-[30px]">
                  12k+
                </h4>

                <p className="text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-white">
                  Verified Experts
                </p>
              </div>
            </StaggerItem>

            {medicalSovereigntySubFeatures.map((card, index) => (
              <StaggerItem
                key={index}
                className="flex flex-col gap-6 rounded-[24px] border border-[#C2C6D60D] bg-white p-6 sm:min-h-[250px] sm:p-8 lg:col-span-4"
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={23}
                  height={23}
                  className="h-[22.5px] w-[22.5px] shrink-0 object-contain"
                />

                <div className="flex flex-col gap-3">
                  <h3 className="text-[20px] font-bold leading-7 text-[#191C1E]">
                    {card.title}
                  </h3>

                  <p className="text-[14px] font-normal leading-[22.75px] text-[#424754]">
                    {card.description}
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

export default MedicalSovereigntySection;
