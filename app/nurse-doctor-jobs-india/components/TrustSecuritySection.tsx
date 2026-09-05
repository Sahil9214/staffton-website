import React from "react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import GetStartedFreeButton from "../../components/GetStartedFreeButton";
import { nurseDoctorJobsTrustSection } from "../../utility/constants";
import { APP_AUTH_URLS } from "../../utility/app-auth-urls";

const TrustSecuritySection = () => {
  const { heading, ctaLabel, image, features } = nurseDoctorJobsTrustSection;

  return (
    <section className="w-full overflow-hidden bg-surface-gray">
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="w-full min-w-0">
            <div className="relative aspect-[584/504] w-full overflow-hidden rounded-[24px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 584px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="flex w-full min-w-0 flex-col gap-8">
            <Reveal>
              <h2 className="text-[28px] font-extrabold leading-9 text-title text-balance sm:text-[32px] sm:leading-10 lg:text-[36px] lg:leading-[45px]">
                {heading}
              </h2>
            </Reveal>

            <StaggerContainer className="flex flex-col gap-8">
              {features.map((item) => (
                <StaggerItem
                  key={item.title}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-badge-mint">
                    <Image
                      src={item.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h3 className="font-inter text-lg font-semibold leading-7 text-title sm:text-[20px]">
                      {item.title}
                    </h3>
                    <p className="font-inter text-base font-normal leading-6 text-body">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <Reveal>
              <GetStartedFreeButton href={APP_AUTH_URLS.professionalSignup}>
                {ctaLabel}
              </GetStartedFreeButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSecuritySection;
