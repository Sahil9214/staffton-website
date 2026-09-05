import React from "react";
import { ShieldCheck } from "lucide-react";
import SectionPill from "../../../../components/SectionPill";
import { roleSlugToApiRole } from "../../../../utility/jobs-api";

const cityCoverage: Record<string, string> = {
  Ahmedabad: "Ahmedabad, Gandhinagar, and the wider Gujarat healthcare corridor",
  Bengaluru: "Bengaluru and the wider Karnataka healthcare corridor",
  Mumbai: "Mumbai and the surrounding Maharashtra healthcare corridor",
  Pune: "Pune and the surrounding Maharashtra healthcare corridor",
  Delhi: "Delhi and the NCR healthcare corridor",
  Chennai: "Chennai and the wider Tamil Nadu healthcare corridor",
  Indore: "Indore and the surrounding Madhya Pradesh healthcare corridor",
  Hyderabad: "Hyderabad and the wider Telangana healthcare corridor",
  Kolkata: "Kolkata and the wider West Bengal healthcare corridor",
};

interface HeaderProps {
  city: string;
  role?: string;
  h1Title?: string;
}

const Header = ({ city, role, h1Title }: HeaderProps) => {
  const coverage =
    cityCoverage[city] ?? `${city} and the surrounding healthcare corridor`;
  const roleName = role ? roleSlugToApiRole(role) : undefined;
  const fallbackHeading = roleName ? `${roleName} Jobs in ${city}` : `Jobs in ${city}`;
  const heading = h1Title || fallbackHeading;
  const targetAudience = roleName ? `${roleName.toLowerCase()}s` : `healthcare professionals`;

  return (
    <section className="flex w-full flex-col items-center justify-center bg-gradient-to-r from-accent to-dark px-5 py-10 sm:px-10 sm:py-12 md:px-[120px] md:py-14">
      <div className="flex w-full max-w-[1200px] flex-col items-start gap-6">
        <SectionPill icon={ShieldCheck}>Direct Hospital Placement</SectionPill>

        <h1 className="w-full font-sans text-[32px] font-extrabold leading-10 tracking-[-1.5px] text-white sm:text-[42px] sm:leading-[50px] md:text-[54px] md:leading-[62px]">
          {heading}
        </h1>

        <p className="w-full font-sans text-base font-normal leading-7 text-white/80">
          Staffton connects {targetAudience} with hiring hospitals
          across {coverage}. No agents, no waiting — just verified openings,
          direct hospital chat, and credential-based matching.
        </p>
      </div>
    </section>
  );
};

export default Header;

