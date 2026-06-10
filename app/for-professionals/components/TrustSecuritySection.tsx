import React from "react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";
import { trustSecurityFeatures } from "../../utility/constants";

const TrustSecuritySection = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div
        className="
          max-w-[1232px]
          mx-auto
          px-4
          sm:px-6
          lg:px-0
          py-20
          lg:py-24
        "
      >

        {/* Main Grid */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-16
            lg:gap-16
            items-center
          "
        >

          {/* LEFT IMAGE */}
          <Reveal className="w-full">
            <div
              className="
                w-full
                max-w-[584px]
                overflow-hidden
                rounded-[24px]
              "
            >
              <Image
                src="/images/clinical_trust_image.svg"
                alt="Clinical Trust"
                width={584}
                height={500}
                className="
                  w-full
                  h-auto
                  object-cover
                "
              />
            </div>
          </Reveal>

          {/* RIGHT CONTENT */}
          <div
            className="
              w-full
              max-w-[584px]
              flex
              flex-col
              gap-8
            "
          >

            {/* Heading */}
            <Reveal>
              <h2
                className="
                  text-[#191C1E]
                  font-extrabold
                  text-[30px]
                  sm:text-[34px]
                  lg:text-[36px]
                  leading-[40px]
                "
              >
                Clinical Trust & Security First
              </h2>
            </Reveal>

            {/* Features List */}
            <StaggerContainer className="flex flex-col gap-8">
              {trustSecurityFeatures.map((item, index) => (
                <StaggerItem
                  key={index}
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >

                  {/* Icon Wrapper */}
                  <div
                    className="
                      min-w-[48px]
                      h-12
                      rounded-full
                      bg-[#CCFBF1]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={16}
                      height={20}
                      className="
                        w-4
                        h-5
                        object-contain
                      "
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">

                    {/* Title */}
                    <h3
                      className="
                        text-[#191C1E]
                        font-semibold
                        text-[20px]
                        leading-7
                      "
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="
                        text-[#424754]
                        text-[16px]
                        leading-6
                        font-normal
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSecuritySection;
