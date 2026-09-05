import React from "react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import {
  hospitalSovereigntySection,
  medicalSovereigntySubFeatures,
} from "../../utility/constants";

const MedicalSovereigntySection = () => {
  const { badge, heading, subtext, credentialing, talentNetwork } =
    hospitalSovereigntySection;

  return (
    <section className="w-full overflow-hidden bg-surface-gray">
      <div className="section-container">
        <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
          <Reveal className="flex min-w-0 flex-col gap-4">
        
            <h2 className="text-[28px] font-extrabold leading-[36px] text-title text-balance text-center sm:text-[34px] sm:leading-[40px] lg:text-[36px]">
              {heading}
            </h2>

            <p className="text-base font-normal leading-7 text-body sm:text-lg text-center">
              {subtext}
            </p>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <StaggerItem className="flex flex-col gap-8 rounded-[24px] border border-border-input/5 bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] sm:p-8 lg:col-span-8 lg:p-10">
              <Image
                src="/verified_icon.svg"
                alt="Verified Icon"
                width={46}
                height={46}
                className="h-[46px] w-[46px] shrink-0 object-contain"
              />

              <div className="flex flex-col gap-4">
                <h3 className="text-[24px] font-bold leading-8 text-title lg:text-[30px] lg:leading-[36px]">
                  {credentialing.title}
                </h3>

                <p className="max-w-[620px] text-base font-normal leading-7 text-body lg:text-lg">
                  {credentialing.description}
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-[16px] border border-border-light">
                <Image
                  src="/images/credentialing_dashboard_image.webp"
                  alt="Credential Dashboard"
                  width={750}
                  height={450}
                  className="block h-auto w-full max-w-full object-cover"
                />
              </div>
            </StaggerItem>

            <StaggerItem className="flex min-h-[420px] flex-col justify-between rounded-[24px] bg-accent p-6 sm:min-h-[480px] sm:p-8 lg:col-span-4 lg:min-h-[528px] lg:p-10">
              <div className="flex flex-col gap-8">
                <Image
                  src="/images/talent-network.svg"
                  alt="Network Icon"
                  width={46}
                  height={46}
                  className="h-12 w-12 shrink-0 object-contain opacity-50"
                />

                <div className="flex flex-col gap-4">
                  <h3 className="text-[22px] font-bold leading-8 text-white sm:text-[24px]">
                    {talentNetwork.title}
                  </h3>

                  <p className="text-base font-normal leading-[26px] text-white">
                    {talentNetwork.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex w-full flex-col gap-1 rounded-[16px] border border-white/10 bg-white/10 p-4 lg:mt-0">
                <h4 className="text-[28px] font-extrabold leading-9 text-white sm:text-[30px]">
                  {talentNetwork.stat}
                </h4>

                <p className="text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-white">
                  {talentNetwork.statLabel}
                </p>
              </div>
            </StaggerItem>

            {medicalSovereigntySubFeatures.map((card, index) => (
              <StaggerItem
                key={index}
                className="flex flex-col gap-6 rounded-[24px] border border-border-input/5 bg-white p-6 sm:min-h-[250px] sm:p-8 lg:col-span-4"
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={23}
                  height={23}
                  className="h-[22.5px] w-[22.5px] shrink-0 object-contain"
                />

                <div className="flex flex-col gap-3">
                  <h3 className="text-[20px] font-bold leading-7 text-title">
                    {card.title}
                  </h3>

                  <p className="text-sm font-normal leading-[22.75px] text-body">
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
