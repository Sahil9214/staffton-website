import React from "react";
import FAQSection from "../../components/sections/FAQSection";

export const contactFaqs = [
  {
    question: "How quickly can Staffton fill a position?",
    answer:
      "Staffton reduces the average time-to-fill to under 48 hours. By utilizing our pre-verified network of clinical professionals, we match urgent shift vacancies and permanent roles with extreme speed.",
  },
  {
    question: "What credentials does Staffton verify?",
    answer:
      "We verify state licenses, clinical certifications (BLS, ACLS, etc.), background history, and employment history. Every professional undergoes our multi-stage credential check before they are cleared to work.",
  },
  {
    question: "Is there a cost for professionals to join?",
    answer:
      "No, joining Staffton is completely free for medical professionals. Clinicians can create a profile, upload credentials, browse jobs, and message recruiters without any fees.",
  },
  {
    question: "Which locations does Staffton operate in?",
    answer:
      "Staffton operates nationwide across India. Our network connects verified healthcare facilities and clinicians across major metro cities and tier-2 locations, offering both full-time and temporary clinical staffing.",
  },
];

const FAQMiniSection = () => {
  return (
    <FAQSection
      badge="Frequently Asked Questions"
      heading="Frequently Asked Questions"
      items={contactFaqs}
      defaultIndex={null}
    />
  );
};

export default FAQMiniSection;
