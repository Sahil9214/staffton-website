"use client";

import { Plus, Minus } from "lucide-react";
import { useId, useState } from "react";
import Reveal from "../motion/Reveal";
import { StaggerContainer, StaggerItem } from "../motion/Stagger";
import SectionPill from "../SectionPill";
import { faqList } from "../../utility/constants";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQSection = ({
  badge,
  heading = "Frequently Asked Questions",
  items = faqList,
  defaultIndex = 0,
}: {
  badge?: string;
  heading?: string;
  items?: FaqItem[];
  defaultIndex?: number | null;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultIndex);
  const baseId = useId();

  const handleToggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="section-container">
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
          <Reveal className="flex flex-col items-start gap-3">
            {badge ? <SectionPill showDot>{badge}</SectionPill> : null}

            <h2 className="max-w-full text-[28px] font-extrabold leading-9 tracking-[-1px] text-title text-balance sm:text-[36px] sm:leading-[44px] lg:text-[42px] lg:leading-[52px]">
              {heading}
            </h2>
          </Reveal>

          <StaggerContainer className="w-full min-w-0">
            {items.map((item, index) => {
              const isOpen = activeIndex === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;

              return (
                <StaggerItem
                  key={item.question}
                  className="border-t border-border-subtle last:border-b"
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(index)}
                    className="flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left sm:items-center sm:gap-6 sm:py-6"
                  >
                    <span className="min-w-0 pr-2 font-inter text-base font-medium leading-7 tracking-[-0.16px] text-title sm:text-lg sm:leading-7 lg:text-[20px]">
                      {item.question}
                    </span>

                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center sm:mt-0">
                      {isOpen ? (
                        <Minus
                          className="h-6 w-6 text-heading"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      ) : (
                        <Plus
                          className="h-6 w-6 text-heading"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      )}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="w-full max-w-[1180px] pb-6 pr-4 font-inter text-sm font-normal leading-7 text-body sm:pb-8 sm:pr-10 sm:text-base sm:leading-7">
                        {item.answer}
                      </p>
                    </div>
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
