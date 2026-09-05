import React from "react";
import Image from "next/image";
import Reveal from "../../components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "../../components/motion/Stagger";

interface TeamMemberProps {
  imageSrc: string;
  name: string;
  role: string;
  bio: string;
}

const TeamMemberCard = ({ imageSrc, name, role, bio }: TeamMemberProps) => {
  return (
    <div className="bg-white border border-border rounded-[20px] overflow-hidden flex flex-col items-start w-full max-w-[282px] h-[480px] shadow-[0px_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="relative w-full h-[280px] overflow-hidden bg-slate-50 shrink-0">
        <Image
          src={imageSrc}
          alt={`Professional portrait of ${name}, ${role} at Staffton`}
          fill
          sizes="(max-width: 640px) 100vw, 282px"
          className="object-cover"
        />
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1 select-none">
        <div className="flex flex-col gap-1">
          <h3 className="font-sans font-bold text-heading text-[20px] leading-7 tracking-tight">
            {name}
          </h3>
          <span className="font-sans font-semibold text-accent text-sm leading-5">
            {role}
          </span>
        </div>

        <p className="font-inter font-normal text-muted text-sm leading-[22px]">
          {bio}
        </p>
      </div>
    </div>
  );
};

const AboutLeadershipSection = () => {
  const team = [
    {
      imageSrc: "/images/sarah_chen.png",
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Ex-Chief of Staff with 12 years managing busy trauma centers. Focused on standardizing algorithmic trust.",
    },
    {
      imageSrc: "/images/michael_torres.png",
      name: "Michael Torres",
      role: "CTO & Co-Founder",
      bio: "Technologist who built enterprise cloud systems. Leading the core automated compliance features.",
    },
    {
      imageSrc: "/images/priya_patel.png",
      name: "Dr. Priya Patel",
      role: "Chief Medical Officer",
      bio: "Pediatric surgeon who directs our credential peer-reviews. Overseeing license validation standard operating procedures.",
    },
    {
      imageSrc: "/images/james_richardson.png",
      name: "James Richardson",
      role: "VP of Partnerships",
      bio: "Ex-hospital recruiter with 15+ years experience. Expanding clinical staff pipelines across 50 states.",
    },
  ];

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="section-container flex flex-col gap-10 md:gap-14">
        <Reveal className="w-full flex flex-col items-center text-center gap-4">
          <h2 className="font-sans font-extrabold text-heading text-[28px] sm:text-[36px] leading-[36px] sm:leading-[44px] tracking-tight">
            Meet Our Leadership
          </h2>
          <p className="font-inter font-normal text-body text-base leading-[26px] max-w-[640px] [text-wrap:balance]">
            Leading Staffton with extensive medical backgrounds and innovative
            software backgrounds.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-items-center">
          {team.map((member, index) => (
            <StaggerItem key={index} className="w-full flex justify-center">
              <TeamMemberCard
                imageSrc={member.imageSrc}
                name={member.name}
                role={member.role}
                bio={member.bio}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default AboutLeadershipSection;
