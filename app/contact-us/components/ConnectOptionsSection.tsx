import React from "react";
import Link from "next/link";
import { Hospital, User, AlertTriangle, Link as LinkIcon } from "lucide-react";
import { HIRE_TALENT_PATH } from "../../utility/site";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";

const ConnectOptionsSection = () => {
  const options = [
    {
      icon: <Hospital className="w-6 h-6 text-accent" />,
      title: "For Hospitals",
      description:
        "Partner with Staffton to automate your credential verification, manage shifts, and build resilient talent pools.",
      linkText: "Schedule a Demo",
      linkUrl: `${HIRE_TALENT_PATH}/`,
    },
    {
      icon: <User className="w-6 h-6 text-accent" />,
      title: "For Professionals",
      description:
        "Access top-tier healthcare positions nationwide. Enjoy direct messaging with recruiters and verified profile setup.",
      linkText: "Browse Open Positions",
      linkUrl: "/nurse-doctor-jobs-india/",
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-accent" />,
      title: "Emergency Staffing",
      description:
        "Need to fill critical nursing or clinician vacancies immediately? Contact our rapid response staffing desk 24/7.",
      linkText: "Call Now",
      linkUrl: "tel:9111101377",
    },
  ];

  return (
    <section className="w-full bg-surface-gray">
      <div className="section-container flex flex-col gap-12">
        <Reveal className="flex flex-col items-center text-center gap-3 max-w-[600px] mx-auto select-none">
          <h2 className="font-sans font-extrabold text-heading text-2xl sm:text-[32px] leading-10">
            Additional Ways to Connect
          </h2>
          <p className="font-inter font-normal text-base leading-[22px] text-neutral">
            Get straight to the point. Choose the dedicated pipeline that matches
            your current goal.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((option, idx) => (
            <StaggerItem
              key={idx}
              className="bg-white border border-border-light rounded-[16px] p-8 flex flex-col items-start gap-5 hover:shadow-soft hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-badge-mint rounded-xl flex items-center justify-center text-accent shrink-0 select-none">
                {option.icon}
              </div>

              <div className="flex flex-col gap-2 flex-grow">
                <h3 className="font-inter font-bold text-[20px] leading-[24px] text-heading">
                  {option.title}
                </h3>
                <p className="font-inter font-normal text-sm leading-[22px] text-neutral">
                  {option.description}
                </p>
              </div>

              {option.linkUrl.startsWith("tel:") ? (
                <a
                  href={option.linkUrl}
                  className="flex flex-row items-center gap-2 text-accent group-hover:text-brand-hover transition-colors"
                >
                  <LinkIcon className="w-4 h-4 text-accent group-hover:text-brand-hover transition-colors" />
                  <span className="font-sans font-medium text-sm leading-[20px]">
                    {option.linkText}
                  </span>
                </a>
              ) : (
                <Link
                  href={option.linkUrl}
                  className="flex flex-row items-center gap-2 text-accent group-hover:text-brand-hover transition-colors"
                >
                  <LinkIcon className="w-4 h-4 text-accent group-hover:text-brand-hover transition-colors" />
                  <span className="font-sans font-medium text-sm leading-[20px]">
                    {option.linkText}
                  </span>
                </Link>
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ConnectOptionsSection;
