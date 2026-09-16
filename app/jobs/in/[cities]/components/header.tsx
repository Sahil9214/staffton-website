import React from "react";
import { ShieldCheck } from "lucide-react";
import SectionPill from "../../../../components/SectionPill";
import { stripHtml } from "../../../../utility/seo-pages-api";

interface HeaderProps {
  city: string;
  role?: string;
  h1Title?: string;
  pill?: string;
  shortDescription?: string;
}

const Header = ({ h1Title, pill, shortDescription }: HeaderProps) => {
  const heading = stripHtml(h1Title);
  const description = stripHtml(shortDescription);
  const pillLabel = pill?.trim();

  if (!heading && !description && !pillLabel) {
    return null;
  }

  return (
    <section className="flex w-full flex-col items-center justify-center bg-gradient-to-r from-accent to-dark px-5 py-10 sm:px-10 sm:py-12 md:px-[120px] md:py-14">
      <div className="flex w-full max-w-[1200px] flex-col items-start gap-6">
        {pillLabel ? (
          <SectionPill icon={ShieldCheck}>{pillLabel}</SectionPill>
        ) : null}

        {heading ? (
          <h1 className="w-full font-sans text-[32px] font-extrabold leading-10 tracking-[-1.5px] text-white sm:text-[42px] sm:leading-[50px] md:text-[54px] md:leading-[62px]">
            {heading}
          </h1>
        ) : null}

        {description ? (
          <p className="w-full font-sans text-base font-normal leading-7 text-white/80">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default Header;
