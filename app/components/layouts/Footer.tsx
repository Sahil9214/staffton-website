import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-[#E2E8F0]">

      {/* Top Footer */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">

          {/* Logo + Description */}
          <div className="max-w-[320px] flex flex-col gap-4">

            {/* Logo */}
            <Link href="/">
              <img
                src="/footer_logo.svg"
                alt="Staffton Logo"
                className="w-[198px] h-auto object-contain"
              />
            </Link>

            {/* Description */}
            <p className="text-[#64748B] text-[12px] leading-[22.75px] font-normal">
              Connecting elite healthcare facilities with world-
              class medical professionals through automated
              precision and clinical trust.
            </p>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#0F172A] text-[16px] leading-6 font-bold">
              Platform
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/for-hospitals/"
                className="text-[#64748B] text-[14px] leading-5 hover:text-[#0F172A] transition-colors"
              >
                Hospitals
              </Link>

              <Link
                href="/for-professionals/"
                className="text-[#64748B] text-[14px] leading-5 hover:text-[#0F172A] transition-colors"
              >
                Professionals
              </Link>
            </div>
          </div>


          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#0F172A] text-[16px] leading-6 font-bold">
              Legal
            </h3>

            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-[#64748B] text-[14px] leading-5 hover:text-[#0F172A] transition-colors"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-[#64748B] text-[14px] leading-5 hover:text-[#0F172A] transition-colors"
              >
                Terms of Service
              </a>

              <a
                href="#"
                className="text-[#64748B] text-[14px] leading-5 hover:text-[#0F172A] transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#0F172A] text-[16px] leading-6 font-bold">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              {/* <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rahulr@stafftonhealth.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64748B] text-[14px] leading-5 hover:text-[#0F172A] transition-colors"
              >
                Contact
              </a> */}

              {/* <Link
                href="/support"
                className="text-[#64748B] text-[14px] leading-5 hover:text-[#0F172A] transition-colors"
              >
                Support
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full border-t border-[#E2E8F0]">
        <div
          className="
            max-w-[1440px]
            mx-auto
            px-4 sm:px-6 lg:px-6
            py-6
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          {/* Copyright */}
          {/* <p className="text-[#64748B] text-[14px] leading-5 font-normal text-center sm:text-left">
            © 2026 Staffton Medical Recruitment. All rights reserved.
          </p> */}

          {/* Social Icons */}
          <div className="flex items-center gap-6">

            {/* Twitter SVG */}
            {/* <a href="#" className="group">
              <svg
                className="w-6 h-6 fill-[#94A3B8] group-hover:fill-[#0F172A] transition-all duration-300"
                viewBox="0 0 24 24"
              >
                <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.8-2.6 1-1.5-1.6-4.1-1.7-5.8-.2-1.1 1-1.5 2.5-1.1 3.9-3.3-.2-6.3-1.8-8.3-4.4-1.1 1.9-.5 4.3 1.3 5.5-.6 0-1.2-.2-1.7-.5 0 2 1.4 3.8 3.4 4.2-.6.2-1.2.2-1.8.1.5 1.7 2.1 2.9 3.9 2.9-1.5 1.2-3.4 1.8-5.3 1.8H2c1.9 1.2 4.2 1.9 6.6 1.9 7.9 0 12.3-6.6 12.3-12.3v-.6c.8-.5 1.5-1.2 2.1-2z" />
              </svg>
            </a> */}

            {/* LinkedIn SVG */}
            {/* <a href="#" className="group">
              <svg
                className="w-6 h-6 fill-[#94A3B8] group-hover:fill-[#0F172A] transition-all duration-300"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-.9 1.8-2.2 3.8-2.2 4.1 0 4.9 2.7 4.9 6.3V24h-4v-7.4c0-1.8 0-4.1-2.5-4.1s-2.9 1.9-2.9 4V24h-4V8z" />
              </svg>
            </a> */}

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
