import React from "react";
import FAQSection from "../../../../components/sections/FAQSection";
import { roleSlugToApiRole } from "../../../../utility/jobs-api";

interface CityFaqSectionProps {
  city: string;
  role?: string;
}

export function getCityFaqList(city: string, role?: string) {
  const roleTitle = role ? roleSlugToApiRole(role) : undefined;
  const roleName = roleTitle ? roleTitle.toLowerCase() : "healthcare";
  const rolePlural = roleTitle ? `${roleTitle.toLowerCase()}s` : "healthcare professionals";

  return [
    {
      question: `What ${roleName} jobs are currently available in ${city} on Staffton?`,
      answer: `Staffton lists verified ${roleName} openings across leading private hospitals, multi-speciality medical centres, and healthcare facilities in ${city}. Opportunities are updated daily with direct application access.`,
    },
    {
      question: `Do I need prior clinical experience to apply for ${roleName} jobs in ${city}?`,
      answer: `We feature opportunities for both freshers and experienced ${rolePlural} in ${city}. Entry-level roles are available alongside specialist consultant and senior positions requiring relevant clinical experience.`,
    },
    {
      question: `How does Staffton verify hospitals and ${roleName} job postings?`,
      answer: `Every healthcare facility in ${city} on Staffton goes through an institutional verification process before posting openings. We check hospital credentials, NABH/JCI accreditations, and HR authenticity to ensure legitimate vacancies with zero middlemen.`,
    },
    {
      question: `How long does it take for ${rolePlural.toLowerCase()} to get hired in ${city}?`,
      answer: `Because Staffton connects ${rolePlural.toLowerCase()} directly with hospital hiring authorities in ${city} without recruitment consultancies, shortlisted candidates typically receive interview invites and offers within 48 to 72 hours.`,
    },
    {
      question: `Is it free for ${rolePlural.toLowerCase()} to apply for jobs on Staffton?`,
      answer: `Yes, 100% free. Staffton does not charge clinicians or healthcare staff any registration fees, application fees, or salary cuts. You negotiate and receive your compensation directly from your employing hospital.`,
    },
  ];
}

const CityFaqSection = ({ city, role }: CityFaqSectionProps) => {
  const faqItems = getCityFaqList(city, role);

  return (
    <FAQSection
      badge="Frequently Asked Questions"
      heading="Frequently Asked Questions"
      items={faqItems}
      defaultIndex={null}
    />
  );
};

export default CityFaqSection;

