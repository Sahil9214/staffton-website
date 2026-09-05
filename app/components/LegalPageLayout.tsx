import React from "react";
import { Calendar } from "lucide-react";
import LegalPageInteractive from "./LegalPageInteractive";
import type { LegalSection } from "./legal-types";

export type { LegalSection } from "./legal-types";

interface LegalPageLayoutProps {
  title: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export default function LegalPageLayout({
  title,
  effectiveDate,
  sections,
}: LegalPageLayoutProps) {
  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-800 font-sans pb-24">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-[300px] right-1/4 w-[400px] h-[400px] bg-accent-mint/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <section className="relative w-full bg-gradient-to-b from-brand via-brand-mid to-brand-dark text-white overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square rounded-full border-[3px] border-white" />
          <div className="absolute bottom-[-20%] left-[-5%] w-[30%] aspect-square rounded-full border-[2px] border-white" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col items-center text-center max-w-[800px] mx-auto gap-4 md:gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
              <Calendar className="w-4 h-4 text-accent-mint" />
              <span className="text-[12px] font-semibold tracking-wider uppercase text-accent-mint">
                {effectiveDate}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[800] tracking-tight text-white drop-shadow-sm">
              {title}
            </h1>

            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-[600px]">
              Please read these details carefully to understand how we operate
              and handle communications at Staffton Health.
            </p>
          </div>
        </div>
      </section>

      <LegalPageInteractive sections={sections} />
    </div>
  );
}
