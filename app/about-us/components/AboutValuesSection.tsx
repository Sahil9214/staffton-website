import React from "react";
import { Activity, Handshake, Cpu, CircleX } from "lucide-react";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <div className="bg-white border border-border rounded-[16px] p-8 flex flex-col items-start gap-4 w-full max-w-[282px] h-[292px] shadow-[0px_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="w-12 h-12 bg-badge-soft rounded-[12px] flex items-center justify-center p-3 select-none shrink-0">
        {icon}
      </div>

      <h3 className="font-sans font-bold text-heading text-[20px] leading-7 tracking-tight">
        {title}
      </h3>

      <p className="font-inter font-normal text-muted text-sm leading-6">
        {description}
      </p>
    </div>
  );
};

const AboutValuesSection = () => {
  const values = [
    {
      icon: <Activity className="w-6 h-6 text-accent shrink-0" strokeWidth={2} />,
      title: "Clinical Excellence",
      description:
        "A non-negotiable dedication to matching candidates whose surgical skills and patient ethics match top tier hospital guidelines.",
    },
    {
      icon: <Handshake className="w-6 h-6 text-accent shrink-0" strokeWidth={2} />,
      title: "Trust & Transparency",
      description:
        "Simple pricing, pre-vetted qualifications, and secure direct-messenger lines that build honest clinic-to-candidate bonds.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-accent shrink-0" strokeWidth={2} />,
      title: "Innovation",
      description:
        "Leveraging smart algorithms and predictive pipeline analytics to shorten recruitment cycles down to 48 hours.",
    },
    {
      icon: <CircleX className="w-6 h-6 text-accent shrink-0" strokeWidth={2} />,
      title: "Compliance First",
      description:
        "Rigorous manual and automated verification of medical licenses, board certifications, and HIPAA policies.",
    },
  ];

  return (
    <section className="w-full bg-surface-hover overflow-hidden">
      <div className="section-container flex flex-col gap-10 md:gap-14">
        <Reveal className="w-full flex flex-col items-center text-center gap-4">
          <h2 className="font-sans font-extrabold text-heading text-[28px] sm:text-[36px] leading-[36px] sm:leading-[44px] tracking-tight">
            Our Core Values
          </h2>
          <p className="font-inter font-normal text-body text-base leading-[26px] max-w-[640px] [text-wrap:balance]">
            The foundation of Staffton&apos;s technology, operations, and
            partnerships is built on safety, compliance, and clinical focus.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-items-center">
          {values.map((val, idx) => (
            <StaggerItem key={idx} className="w-full flex justify-center">
              <ValueCard
                icon={val.icon}
                title={val.title}
                description={val.description}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default AboutValuesSection;
