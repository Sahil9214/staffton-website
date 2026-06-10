"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Mail, FileText, Calendar, Copy, Check, ArrowRight, X } from "lucide-react";
import Reveal from "./motion/Reveal";
import { motion, AnimatePresence } from "framer-motion";

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  lists?: {
    title?: string;
    items: string[];
    isOrdered?: boolean;
  }[];
}

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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const [showMatchesOnly, setShowMatchesOnly] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Intersection Observer to track active section while scrolling
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Focus on the middle-upper part of the screen
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Track active sections
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections, showMatchesOnly]);

  // Copy direct section link to clipboard
  const handleCopyLink = (sectionId: string) => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSectionId(sectionId);
      setTimeout(() => setCopiedSectionId(null), 2000);
    });
  };

  // Helper function to check if section matches the search query
  const matchesQuery = (section: LegalSection) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    
    // Check title
    if (section.title.toLowerCase().includes(query)) return true;
    
    // Check paragraphs
    const matchParagraph = section.paragraphs.some((p) =>
      p.toLowerCase().includes(query)
    );
    if (matchParagraph) return true;

    // Check list items
    if (section.lists) {
      const matchLists = section.lists.some((list) => {
        if (list.title && list.title.toLowerCase().includes(query)) return true;
        return list.items.some((item) => item.toLowerCase().includes(query));
      });
      if (matchLists) return true;
    }

    return false;
  };

  // Helper function to highlight search text in React
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    
    // Escape regex characters
    const escapedSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(${escapedSearch})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark
              key={index}
              className="bg-[#86F2E4]/40 text-[#005c54] font-semibold px-1 rounded transition-colors duration-150"
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

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for the sticky header
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
    <div className="w-full bg-slate-50 min-h-screen text-slate-800 font-sans pb-24">
      {/* Decorative gradient blur elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0F9D94]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-[300px] right-1/4 w-[400px] h-[400px] bg-[#86F2E4]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="relative w-full bg-gradient-to-b from-[#0F9D94] via-[#0E8880] to-[#0B7069] text-white overflow-hidden py-16 md:py-24">
        {/* Abstract design elements in header */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square rounded-full border-[3px] border-white" />
          <div className="absolute bottom-[-20%] left-[-5%] w-[30%] aspect-square rounded-full border-[2px] border-white" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col items-center text-center max-w-[800px] mx-auto gap-4 md:gap-6">
            <Reveal immediate className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
              <Calendar className="w-4 h-4 text-[#86F2E4]" />
              <span className="text-[12px] font-semibold tracking-wider uppercase text-[#86F2E4]">
                {effectiveDate}
              </span>
            </Reveal>

            <Reveal immediate delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-[800] tracking-tight text-white drop-shadow-sm">
                {title}
              </h1>
            </Reveal>

            <Reveal immediate delay={0.2}>
              <p className="text-white/80 text-[16px] md:text-[18px] leading-relaxed max-w-[600px]">
                Please read these details carefully to understand how we operate and handle communications at Staffton Health.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive Controls & Content Area */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 mt-12">
        {/* Search Bar Container */}
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
              className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F9D94]/20 focus:border-[#0F9D94] transition-all"
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
                Found <strong className="text-[#0F9D94]">{totalMatchesCount}</strong> matching sections
              </span>
              <button
                onClick={() => setShowMatchesOnly(!showMatchesOnly)}
                className={`text-sm px-4 py-2 rounded-lg font-semibold border transition-all ${
                  showMatchesOnly
                    ? "bg-[#0F9D94] text-white border-transparent shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {showMatchesOnly ? "Show All Sections" : "Show Matches Only"}
              </button>
            </div>
          )}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sticky Left Sidebar (Table of Contents) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-[100px] flex flex-col gap-6 max-h-[calc(100vh-140px)] overflow-y-auto pr-2">
              <div className="flex items-center gap-2 px-1 text-slate-400 font-bold uppercase tracking-wider text-xs">
                <FileText className="w-4 h-4 text-[#0F9D94]" />
                <span>Table of Contents</span>
              </div>

              <nav className="flex flex-col gap-1.5">
                {sections.map((section) => {
                  const isSectionVisible = filteredSections.some((fs) => fs.id === section.id);
                  const isSectionActive = activeSection === section.id;

                  // If showMatchesOnly is true, hide active highlights for sections that are filtered out
                  if (showMatchesOnly && !isSectionVisible) return null;

                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all relative flex items-center group ${
                        !isSectionVisible ? "opacity-40" : "opacity-100"
                      } ${
                        isSectionActive
                          ? "text-[#0F9D94] bg-[#0F9D94]/5 font-semibold"
                          : "text-slate-600 hover:text-[#0F9D94] hover:bg-slate-100"
                      }`}
                    >
                      {isSectionActive && (
                        <span className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-[#0F9D94] rounded-full" />
                      )}
                      <span className="truncate">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Document Content */}
          <main className="col-span-1 lg:col-span-3 flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSections.length > 0 ? (
                filteredSections.map((section, idx) => (
                  <motion.article
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    className={`bg-white border rounded-2xl p-6 md:p-8 transition-shadow relative group ${
                      activeSection === section.id
                        ? "shadow-md border-[#0F9D94]/30"
                        : "shadow-sm border-slate-200 hover:shadow"
                    }`}
                  >
                    {/* Copy Link button on hover */}
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

                    {/* Section Header */}
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 pr-10 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                      <span className="text-[#0F9D94]">
                        {highlightText(section.title.split(".")[0] + ".", searchQuery)}
                      </span>
                      <span>
                        {highlightText(section.title.substring(section.title.indexOf(".") + 1), searchQuery)}
                      </span>
                    </h2>

                    {/* Paragraphs */}
                    <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-slate-600 font-normal">
                      {section.paragraphs.map((para, pIdx) => (
                        <p key={pIdx}>{highlightText(para, searchQuery)}</p>
                      ))}
                    </div>

                    {/* Custom Lists (if any) */}
                    {section.lists && section.lists.length > 0 && (
                      <div className="mt-5 flex flex-col gap-6">
                        {section.lists.map((list, lIdx) => (
                          <div key={lIdx} className="flex flex-col gap-3">
                            {list.title && (
                              <h3 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0F9D94]" />
                                {highlightText(list.title, searchQuery)}
                              </h3>
                            )}
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1">
                              {list.items.map((item, itemIdx) => (
                                <li
                                  key={itemIdx}
                                  className="flex items-start gap-3 bg-slate-50/70 hover:bg-slate-50 p-3 rounded-xl border border-slate-100 transition-colors"
                                >
                                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0F9D94]/10 text-[#0F9D94] text-xs font-bold mt-0.5 shrink-0">
                                    {list.isOrdered ? itemIdx + 1 : "✓"}
                                  </span>
                                  <span className="text-slate-600 text-[14px] leading-relaxed">
                                    {highlightText(item, searchQuery)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.article>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">No matching sections found</h3>
                  <p className="text-slate-500 text-sm max-w-sm">
                    We couldn&apos;t find any results matching &quot;{searchQuery}&quot;. Please check your spelling or try searching for another term.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowMatchesOnly(false);
                    }}
                    className="mt-2 inline-flex items-center gap-2 bg-[#0F9D94] text-white hover:bg-[#0E8880] px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
                  >
                    Clear Search Query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
