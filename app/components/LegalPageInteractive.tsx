"use client";

import React, { useState, useEffect } from "react";
import { Search, FileText, Copy, Check, X } from "lucide-react";
import Reveal from "./motion/Reveal";
import type { LegalSection } from "./legal-types";

interface LegalPageInteractiveProps {
  sections: LegalSection[];
}

export default function LegalPageInteractive({
  sections,
}: LegalPageInteractiveProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const [showMatchesOnly, setShowMatchesOnly] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections, showMatchesOnly]);

  const handleCopyLink = (sectionId: string) => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSectionId(sectionId);
      setTimeout(() => setCopiedSectionId(null), 2000);
    });
  };

  const matchesQuery = (section: LegalSection) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();

    if (section.title.toLowerCase().includes(query)) return true;

    const matchParagraph = section.paragraphs.some((p) =>
      p.toLowerCase().includes(query)
    );
    if (matchParagraph) return true;

    if (section.lists) {
      const matchLists = section.lists.some((list) => {
        if (list.title && list.title.toLowerCase().includes(query)) return true;
        return list.items.some((item) => item.toLowerCase().includes(query));
      });
      if (matchLists) return true;
    }

    return false;
  };

  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;

    const escapedSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(${escapedSearch})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark
              key={index}
              className="bg-accent-mint/40 text-accent-highlight font-semibold px-1 rounded transition-colors duration-150"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const filteredSections = sections.filter(matchesQuery);
  const totalMatchesCount = searchQuery.trim() ? filteredSections.length : 0;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 mt-12">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search policies (e.g. eligibility, email, liability)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (showMatchesOnly && !e.target.value.trim()) {
                setShowMatchesOnly(false);
              }
            }}
            className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setShowMatchesOnly(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {searchQuery.trim() && (
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-sm text-slate-500 font-medium">
              Found <strong className="text-brand">{totalMatchesCount}</strong>{" "}
              matching sections
            </span>
            <button
              onClick={() => setShowMatchesOnly(!showMatchesOnly)}
              className={`text-sm px-4 py-2 rounded-lg font-semibold border transition-all ${
                showMatchesOnly
                  ? "bg-brand text-white border-transparent shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {showMatchesOnly ? "Show All Sections" : "Show Matches Only"}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-[100px] flex flex-col gap-6 max-h-[calc(100vh-140px)] overflow-y-auto pr-2">
            <div className="flex items-center gap-2 px-1 text-slate-400 font-bold uppercase tracking-wider text-xs">
              <FileText className="w-4 h-4 text-brand" />
              <span>Table of Contents</span>
            </div>

            <nav className="flex flex-col gap-1.5">
              {sections.map((section) => {
                const isSectionVisible = filteredSections.some(
                  (fs) => fs.id === section.id
                );
                const isSectionActive = activeSection === section.id;

                if (showMatchesOnly && !isSectionVisible) return null;

                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all relative flex items-center group ${
                      !isSectionVisible ? "opacity-40" : "opacity-100"
                    } ${
                      isSectionActive
                        ? "text-brand bg-brand/5 font-semibold"
                        : "text-slate-600 hover:text-brand hover:bg-slate-100"
                    }`}
                  >
                    {isSectionActive && (
                      <span className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-brand rounded-full" />
                    )}
                    <span className="truncate">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <Reveal key={section.id}>
                <article
                  id={section.id}
                  className={`bg-white border rounded-2xl p-6 md:p-8 transition-shadow relative group ${
                    activeSection === section.id
                      ? "shadow-md border-brand/30"
                      : "shadow-sm border-slate-200 hover:shadow"
                  }`}
                >
                  <button
                    onClick={() => handleCopyLink(section.id)}
                    className="absolute right-4 top-4 md:right-6 md:top-6 opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all"
                    title="Copy link to this section"
                  >
                    {copiedSectionId === section.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 pr-10 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="text-brand">
                      {highlightText(
                        section.title.split(".")[0] + ".",
                        searchQuery
                      )}
                    </span>
                    <span>
                      {highlightText(
                        section.title.substring(
                          section.title.indexOf(".") + 1
                        ),
                        searchQuery
                      )}
                    </span>
                  </h2>

                  <div className="flex flex-col gap-4 text-sm leading-relaxed text-slate-600 font-normal">
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{highlightText(para, searchQuery)}</p>
                    ))}
                  </div>

                  {section.lists && section.lists.length > 0 && (
                    <div className="mt-5 flex flex-col gap-6">
                      {section.lists.map((list, lIdx) => (
                        <div key={lIdx} className="flex flex-col gap-3">
                          {list.title && (
                            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                              {highlightText(list.title, searchQuery)}
                            </h3>
                          )}
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1">
                            {list.items.map((item, itemIdx) => (
                              <li
                                key={itemIdx}
                                className="flex items-start gap-3 bg-slate-50/70 hover:bg-slate-50 p-3 rounded-xl border border-slate-100 transition-colors"
                              >
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand/10 text-brand text-xs font-bold mt-0.5 shrink-0">
                                  {list.isOrdered ? itemIdx + 1 : "✓"}
                                </span>
                                <span className="text-slate-600 text-sm leading-relaxed">
                                  {highlightText(item, searchQuery)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            ))
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                No matching sections found
              </h3>
              <p className="text-slate-500 text-sm max-w-sm">
                We couldn&apos;t find any results matching &quot;{searchQuery}
                &quot;. Please check your spelling or try searching for another
                term.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowMatchesOnly(false);
                }}
                className="mt-2 inline-flex items-center gap-2 bg-brand text-white hover:bg-brand-mid px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
              >
                Clear Search Query
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
