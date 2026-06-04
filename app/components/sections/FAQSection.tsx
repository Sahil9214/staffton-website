"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import Reveal from "../motion/Reveal";
import { StaggerContainer, StaggerItem } from "../motion/Stagger";

const faqData = [
  {
    question: "What Staffton healthcare hiring platform does?",
    answer:
      "Staffton helps hospitals and healthcare organizations hire qualified medical professionals faster, including doctors, nurses, specialists, technicians, and support staff, through a streamlined hiring platform.",
  },
  {
    question: "How does Staffton improve the hiring process?",
    answer:
      "Staffton improves hiring by helping employers quickly find, screen, and shortlist the right medical professionals based on role, experience, skills, certifications, and availability.",
  },
  {
    question: "What features does Staffton offer for employers?",
    answer:
      "Staffton offers job posting, candidate matching, resume screening, applicant tracking, interview scheduling, credential verification support, and hiring insights for healthcare employers.",
  },
  {
    question: "Can Staffton integrate with existing Hospital systems?",
    answer:
      "Yes, Staffton can support integration with existing hospital HR or workforce management systems, helping teams manage hiring data smoothly without duplicate manual work.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex]: any = useState(0);

  const handleToggle = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="w-full bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16 md:py-20 lg:py-24">
        <div className="flex flex-col gap-8 md:gap-9 lg:gap-10">
          <Reveal>
            <h2 className="font-semibold text-[#261B07] tracking-[-1.44px] text-[34px] sm:text-[44px] lg:text-[56px] leading-[42px] sm:leading-[52px] lg:leading-[72px] max-w-full">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <StaggerContainer className="w-full min-w-0">
            {faqData.map((item, index) => {
              const isOpen = activeIndex === index;

              return (
                <StaggerItem
                  key={index}
                  className="border-t border-[#E6E6E6] last:border-b border-solid"
                >
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-start sm:items-center justify-between gap-4 sm:gap-6 py-5 sm:py-6 text-left"
                  >
                    <h3 className="text-[#261B07] font-normal text-[18px] sm:text-[20px] leading-7 tracking-[-0.16px] min-w-0 pr-2">
                      {item.question}
                    </h3>

                    <div className="min-w-[24px] min-h-[24px] shrink-0 flex items-center justify-center mt-0.5 sm:mt-0">
                      {isOpen ? (
                        <X className="w-6 h-6 text-black" />
                      ) : (
                        <Plus className="w-6 h-6 text-black" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`
                      overflow-hidden
                      transition-all
                      duration-300
                      ease-in-out
                      ${
                        isOpen
                          ? "max-h-[500px] opacity-100 pb-6 sm:pb-8"
                          : "max-h-0 opacity-0"
                      }
                    `}
                  >
                    <p className="w-full max-w-[1180px] text-[#5A5246] text-[16px] sm:text-[18px] leading-7 font-normal pr-4 sm:pr-10">
                      {item.answer}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
