import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Hospital,
  MessageCircle,
  Zap,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { roleSlugToApiRole } from "../../../../utility/jobs-api";

interface WhyChooseStafftonProps {
  city: string;
  role?: string;
}

const WhyChooseStaffton = ({ city, role }: WhyChooseStafftonProps) => {
  const roleName = role ? roleSlugToApiRole(role) : undefined;
  const targetGroup = roleName ? `${roleName}s` : "Healthcare Professionals";
  const roleNoun = roleName ? roleName.toLowerCase() : "healthcare";

  const benefits = [
    {
      icon: Hospital,
      title: "Verified Hospitals Only",
      description:
        "Every listing comes from a credential-checked healthcare facility, so you never chase fake postings.",
    },
    {
      icon: MessageCircle,
      title: "Direct Chat, No Middlemen",
      description:
        "Message hiring managers in real time once shortlisted - no recruiter back-and-forth.",
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: `Most ${city} ${roleNoun} roles are filled within 48 hours of application.`,
    },
    {
      icon: FileCheck,
      title: "Credential Upload Once, Apply Everywhere",
      description:
        "Upload your medical license, certifications, and resume once - reuse them for every application on the platform.",
    },
  ];

  return (
    <section className="flex w-full flex-col items-center bg-white px-5 py-14 sm:px-10 sm:py-18 md:px-[120px] md:py-24">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-10 sm:gap-12 md:gap-14">
        {/* Section Header */}
        <div className="flex w-full flex-col items-center text-center">
          {/* Branded Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F0FDFA] px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" strokeWidth={2} />
            <span className="font-sans text-[13px] font-bold uppercase tracking-[0.8px] text-[#0D9488]">
              Staffton Advantage
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-4 w-full font-sans text-[28px] font-extrabold leading-tight tracking-[-1px] text-[#0F172A] sm:text-[32px] sm:leading-[40px] md:text-[36px] md:leading-[44px]">
            Why {targetGroup} Choose Staffton in {city}
          </h2>

          {/* Subtitle */}
          <p className="mt-4 max-w-[760px] font-sans text-sm font-normal leading-relaxed text-[#737373] sm:text-base sm:leading-[26px]">
            We bypass traditional recruitment bottlenecks by putting the power
            back in the hands of clinical specialists.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-start gap-5 rounded-2xl border border-[#E5E5E5] bg-[#F5F5F5] p-6 transition-all duration-200 hover:border-[#0D9488]/30 sm:p-8"
              >
                {/* Icon Box */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDFA]">
                  <Icon className="h-6 w-6 text-[#0D9488]" strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="flex flex-col items-start gap-2">
                  <h3 className="font-sans text-[18px] font-bold leading-[23px] text-[#0F172A]">
                    {benefit.title}
                  </h3>
                  <p className="font-sans text-sm font-normal leading-[22px] text-[#737373]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Us CTA Button */}
        <Link
          href="/contact-us/"
          className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0D9488] px-8 py-3.5 shadow-[0px_4px_12px_rgba(13,148,136,0.2)] transition-colors hover:bg-[#0b7d73]"
        >
          <span className="font-inter text-[15px] font-semibold leading-[18px] text-white">
            Contact Us Today
          </span>
          <ArrowRight className="h-4 w-4 text-white" strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
};

export default WhyChooseStaffton;

