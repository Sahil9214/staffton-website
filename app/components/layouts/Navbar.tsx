"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navigationLinks, type NavLink } from "../../utility/constants";
import { getAuthUrls } from "../../utility/app-auth-urls";
import { useSeoCities, type CityNavItem } from "../../utility/useSeoCities";

const normalizePath = (path: string) => path.replace(/\/$/, "") || "/";

const JobsDropdownCard = ({
  cities,
  onNavigate,
}: {
  cities: CityNavItem[];
  onNavigate?: () => void;
}) => {
  const half = Math.ceil(cities.length / 2);
  const col1 = cities.slice(0, half);
  const col2 = cities.slice(half);

  return (
    <div
      className="box-border flex flex-col items-stretch p-6 gap-4 w-[480px] max-w-[calc(100vw-2rem)] bg-white border border-border-subtle shadow-[0px_12px_32px_-4px_rgba(15,23,42,0.08)] rounded-xl"
      role="menu"
      aria-label="Browse jobs by city"
    >
      <div className="flex flex-col items-start gap-1">
        <p className="font-inter font-bold text-[12px] leading-[15px] tracking-[1px] uppercase text-accent">
          Browse Jobs by City
        </p>
        <p className="font-inter font-normal text-[13px] leading-4 text-neutral">
          Find clinical placement opportunities near you.
        </p>
      </div>

      <div className="flex flex-row items-start gap-4 w-full">
        {[col1, col2].map((column, colIdx) => (
          <div key={colIdx} className="flex flex-col items-stretch gap-1 flex-1 min-w-0">
            {column.map((city) => (
              <Link
                key={city.name}
                href={city.href}
                role="menuitem"
                onClick={onNavigate}
                className="group flex flex-row items-center px-3.5 py-2.5 gap-2 rounded-lg font-inter text-sm leading-[17px] font-medium text-body hover:font-semibold hover:text-heading hover:bg-badge-soft transition-colors duration-150"
              >
                <span className="flex-1 truncate">{city.name}</span>
                <ChevronRight
                  className="size-3 shrink-0 text-accent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150"
                  strokeWidth={2.5}
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center p-3 gap-3 w-full bg-surface-gray rounded-lg">
        <p className="flex-1 font-inter font-medium text-[12px] leading-[15px] text-body">
          Can&apos;t find your city? Contact us
        </p>
        <Link
          href="/contact-us/"
          onClick={onNavigate}
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-accent text-white font-inter font-bold text-[12px] leading-[15px] hover:bg-brand-hover transition-colors duration-150 shrink-0"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const { login: loginHref, signup: signupHref } = getAuthUrls(pathname);
  const cities = useSeoCities();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileJobsOpen, setMobileJobsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [jobsOpen, setJobsOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const jobsMenuRef = useRef<HTMLDivElement>(null);
  const jobsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openJobsMenu = () => {
    if (jobsCloseTimer.current) {
      clearTimeout(jobsCloseTimer.current);
      jobsCloseTimer.current = null;
    }
    setJobsOpen(true);
  };

  const scheduleCloseJobsMenu = () => {
    if (jobsCloseTimer.current) clearTimeout(jobsCloseTimer.current);
    jobsCloseTimer.current = setTimeout(() => setJobsOpen(false), 150);
  };

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setJobsOpen(false);
    setMobileJobsOpen(false);
  }

  const setMobileMenuOpen = (open: boolean) => {
    setMobileMenu(open);
    if (!open) setMobileJobsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenu]);

  useEffect(() => {
    if (!jobsOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!jobsMenuRef.current?.contains(event.target as Node)) {
        if (jobsCloseTimer.current) {
          clearTimeout(jobsCloseTimer.current);
          jobsCloseTimer.current = null;
        }
        setJobsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (jobsCloseTimer.current) {
          clearTimeout(jobsCloseTimer.current);
          jobsCloseTimer.current = null;
        }
        setJobsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [jobsOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const isLinkActive = (link: NavLink) => {
    if (link.external) return false;
    return normalizePath(pathname) === normalizePath(link.href);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-border-light shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          : "bg-white border-b border-transparent shadow-none"
          }`}
      >
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-1">

          {/* Main Row */}
          <div className="h-[72px] flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/header_logo.svg"
                alt="Staffton Logo"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-2 relative">
              {navigationLinks.map((link, idx) => {
                const isActive = isLinkActive(link);
                const isJobs = link.dropdown === "jobs";
                const showHover = hoveredIndex === idx || (isJobs && jobsOpen);

                if (isJobs) {
                  return (
                    <div
                      key={link.name}
                      ref={jobsMenuRef}
                      className="relative"
                      onMouseEnter={() => {
                        setHoveredIndex(idx);
                        openJobsMenu();
                      }}
                      onMouseLeave={() => {
                        setHoveredIndex(null);
                        scheduleCloseJobsMenu();
                      }}
                    >
                      <button
                        type="button"
                        aria-expanded={jobsOpen}
                        aria-haspopup="menu"
                        onClick={openJobsMenu}
                        onFocus={openJobsMenu}
                        className={`relative inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg cursor-pointer ${isActive || jobsOpen ? "text-brand" : "text-nav hover:text-brand"
                          }`}
                      >
                        {showHover && (
                          <motion.span
                            layoutId="desktopHoverHighlight"
                            className="absolute inset-0 bg-brand/5 rounded-lg -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 24 }}
                          />
                        )}
                        {isActive && (
                          <motion.span
                            layoutId="desktopActiveUnderline"
                            className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand rounded-full"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{link.name}</span>
                        <ChevronDown
                          className={`relative z-10 size-3.5 shrink-0 transition-transform duration-200 ${jobsOpen ? "rotate-180" : ""}`}
                          aria-hidden
                        />
                      </button>

                      <AnimatePresence>
                        {jobsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute top-full left-0 pt-3 z-50"
                          >
                            <JobsDropdownCard
                              cities={cities}
                              onNavigate={() => setJobsOpen(false)}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg ${isActive ? "text-brand" : "text-nav hover:text-brand"
                      }`}
                  >
                    {hoveredIndex === idx && (
                      <motion.span
                        layoutId="desktopHoverHighlight"
                        className="absolute inset-0 bg-brand/5 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="desktopActiveUnderline"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href={loginHref}
                className="inline-flex h-9 items-center justify-center px-4 text-sm font-semibold text-nav hover:text-brand transition-all duration-200"
              >
                Login
              </Link>

              <Link
                href={signupHref}
                className="inline-flex h-10 items-center justify-center px-6 rounded-[8px] bg-brand text-white text-sm font-semibold hover:bg-brand-hover transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu size={32} className="text-brand cursor-pointer" />
            </button>
          </div>
        </section>
      </header>

      {/* Spacer to offset fixed navbar height (py-1 + h-[72px]) */}
      <div aria-hidden className="h-[80px]" />

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-0 z-[999] transition-all duration-300 ${mobileMenu
            ? "opacity-100 visible"
            : "opacity-0 invisible"
          }`}
      >
        {/* Overlay */}
        <div
          onClick={closeMenu}
          className="absolute inset-0 bg-black/40"
        ></div>

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 h-screen w-[85%] max-w-[340px]
          bg-gradient-to-br from-brand via-gradient-brand-via to-gradient-brand-to
          backdrop-blur-xl
          transform transition-transform duration-300
          overflow-y-auto
          ${mobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-5">
            <button onClick={closeMenu} aria-label="Close menu">
              <X size={34} className="text-white cursor-pointer" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-10">

            {/* Top Text */}
            <div className="mb-10">
              <p className="text-white text-[30px] leading-[38px] font-semibold">
                Welcome to Staffton
              </p>

              <p className="text-white/90 text-sm mt-3 leading-6">
                Find hospitals and healthcare professionals easily.
              </p>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col gap-2 border-t border-white/20 pt-6 relative">
              {navigationLinks.map((link) => {
                const isActive = isLinkActive(link);
                const isJobs = link.dropdown === "jobs";

                if (isJobs) {
                  return (
                    <div key={link.name} className="flex flex-col">
                      <button
                        type="button"
                        aria-expanded={mobileJobsOpen}
                        onClick={() => setMobileJobsOpen((open) => !open)}
                        className={`relative text-[17px] px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${isActive
                            ? "text-brand font-semibold"
                            : "text-white font-medium hover:bg-white/10"
                          }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveTab"
                            className="absolute inset-0 bg-white rounded-xl shadow-md -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                        <span className="relative z-10">{link.name}</span>
                        <ChevronDown
                          className={`relative z-10 size-4 transition-transform duration-200 ${mobileJobsOpen ? "rotate-180" : ""} ${isActive ? "text-brand" : "text-white"}`}
                          aria-hidden
                        />
                      </button>

                      <AnimatePresence>
                        {mobileJobsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-1 mb-2 px-2 py-3 rounded-xl bg-white/10">
                              <p className="px-2 mb-2 font-inter font-bold text-[11px] leading-[14px] tracking-[1px] uppercase text-white/80">
                                Browse Jobs by City
                              </p>
                              <div className="flex flex-col">
                                {cities.map((city) => (
                                  <Link
                                    key={city.name}
                                    href={city.href}
                                    onClick={closeMenu}
                                    className="flex items-center justify-between min-h-[44px] px-3 py-2.5 rounded-lg text-white/95 text-sm font-medium hover:bg-white/10"
                                  >
                                    <span>{city.name}</span>
                                    <ChevronRight className="size-3.5 text-white/70" aria-hidden />
                                  </Link>
                                ))}
                              </div>
                              <Link
                                href="/contact-us/"
                                onClick={closeMenu}
                                className="mt-2 flex items-center justify-center h-10 rounded-lg bg-white text-brand text-[13px] font-bold"
                              >
                                Can&apos;t find your city? Contact us
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={closeMenu}
                    className={`relative text-[17px] px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${isActive
                        ? "text-brand font-semibold"
                        : "text-white font-medium hover:bg-white/10"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveTab"
                        className="absolute inset-0 bg-white rounded-xl shadow-md -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                        className="relative z-10 w-2 h-2 rounded-full bg-brand"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4">
              {/* Login Button */}
              <Link
                href={loginHref}
                onClick={closeMenu}
                className="flex w-full h-[50px] items-center justify-center rounded-xl border border-white text-white text-base font-semibold hover:bg-white hover:text-brand transition-all duration-300"
              >
                Login
              </Link>

              {/* Sign Up Button */}
              <Link
                href={signupHref}
                onClick={closeMenu}
                className="flex w-full h-[50px] items-center justify-center rounded-xl bg-white text-brand text-base font-semibold hover:bg-surface-gray transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
