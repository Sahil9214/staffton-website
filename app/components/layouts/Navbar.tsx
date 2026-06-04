"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "For Hospitals", href: "/for-hospitals" },
    { name: "For Professionals", href: "/for-professionals" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Background Scroll Disable
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenu]);

  // Close Menu Function
  const closeMenu = () => {
    setMobileMenu(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] rounded-b-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
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
              />VerifiedIcon
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-2 relative">
              {navLinks.map((link, idx) => {
                const normalizePath = (path: string) => path.replace(/\/$/, "") || "/";
                const isActive = normalizePath(pathname) === normalizePath(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative px-4 py-2 text-[14px] font-semibold transition-colors duration-200 rounded-lg ${
                      isActive ? "text-[#0F9D94]" : "text-[#344054] hover:text-[#0F9D94]"
                    }`}
                  >
                    {/* Hover highlight background */}
                    {hoveredIndex === idx && (
                      <motion.span
                        layoutId="desktopHoverHighlight"
                        className="absolute inset-0 bg-[#0F9D94]/5 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      />
                    )}
                    {/* Active line indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="desktopActiveUnderline"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#0F9D94] rounded-full"
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
  <a
    target="_blank"
    href={
      process.env.NEXT_PUBLIC_API_FRONTEND_URL ||
      "https://app.stafftonhealth.com/"
    }
    className="inline-flex h-9 items-center justify-center px-4 text-[14px] font-semibold text-[#344054] hover:text-[#0F9D94] transition-all duration-200"
  >
    Login
  </a>

  <a
    target="_blank"
    href={
      process.env.NEXT_PUBLIC_API_FRONTEND_URL ||
      "https://app.stafftonhealth.com/"
    }
    className="inline-flex h-10 items-center justify-center px-6 rounded-[8px] bg-[#0F9D94] text-white text-[14px] font-semibold hover:bg-[#0c857d] transition-all duration-200"
  >
    Sign Up
  </a>
</div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenu(true)}
              className="md:hidden flex items-center justify-center"
            >
              <Menu size={32} className="text-[#0F9D94] cursor-pointer" />
            </button>
          </div>
        </section>
      </header>

      {/* Spacer to offset fixed navbar height (py-1 + h-[72px]) */}
      <div aria-hidden className="h-[80px]" />

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-0 z-[999] transition-all duration-300 ${
          mobileMenu
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
          bg-gradient-to-br from-[#0F9D94] via-[#13B8A6] to-[#53E0D0]
          backdrop-blur-xl
          transform transition-transform duration-300
          ${
            mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-5">
            <button onClick={closeMenu}>
              <X size={34} className="text-white cursor-pointer" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-10">

            {/* Top Text */}
            <div className="mb-10">
              <h2 className="text-white text-[30px] leading-[38px] font-semibold">
                Welcome to Staffton
              </h2>

              <p className="text-white/90 text-[15px] mt-3 leading-6">
                Find hospitals and healthcare professionals easily.
              </p>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col gap-2 border-t border-white/20 pt-6 relative">
              {navLinks.map((link) => {
                const normalizePath = (path: string) => path.replace(/\/$/, "") || "/";
                const isActive = normalizePath(pathname) === normalizePath(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`relative text-[17px] px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${
                      isActive
                        ? "text-[#0F9D94] font-semibold"
                        : "text-white font-medium hover:bg-white/10"
                    }`}
                  >
                    {/* Active background pill */}
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
                        className="relative z-10 w-2 h-2 rounded-full bg-[#0F9D94]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4">
  {/* Login Button */}
  <a
    target="_blank"
    href={
      process.env.NEXT_PUBLIC_API_FRONTEND_URL ||
      "https://app.stafftonhealth.com/"
    }
    onClick={closeMenu}
    className="flex w-full h-[50px] items-center justify-center rounded-xl border border-white text-white text-[16px] font-semibold hover:bg-white hover:text-[#0F9D94] transition-all duration-300"
  >
    Login
  </a>

  {/* Sign Up Button */}
  <a
    target="_blank"
    href={
      process.env.NEXT_PUBLIC_API_FRONTEND_URL ||
      "https://app.stafftonhealth.com/"
    }
    onClick={closeMenu}
    className="flex w-full h-[50px] items-center justify-center rounded-xl bg-white text-[#0F9D94] text-[16px] font-semibold hover:bg-[#f5f5f5] transition-all duration-300"
  >
    Sign Up
  </a>
</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;