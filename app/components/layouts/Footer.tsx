import React from "react";
import Link from "next/link";
import Image from "next/image";

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
              <Image
                src="/footer_logo.svg"
                alt="Staffton Logo"
                width={198}
                height={40}
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
              <Link
                href="/privacy-policy"
                className="text-[#64748B] text-[14px] leading-5 hover:text-[#0F172A] transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-of-service"
                className="text-[#64748B] text-[14px] leading-5 hover:text-[#0F172A] transition-colors"
              >
                Terms of Service
              </Link>

              <Link
                href="/cookie-policy"
                className="text-[#64748B] text-[14px] leading-5 hover:text-[#0F172A] transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#0F172A] text-[16px] leading-6 font-bold">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rahulr@stafftonhealth.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64748B] text-[14px] leading-5 hover:text-[#0F172A] transition-colors"
              >
                Contact
              </Link>

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
          <p className="text-[#64748B] text-[14px] leading-5 font-normal text-center sm:text-left">
            © 2026 Staffton Medical Recruitment. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-6">

            {/* Facebook SVG */}
            <Link
              href="https://www.facebook.com/people/Staffton-Health/61590806815638/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-[#94A3B8] group-hover:fill-[#0F172A] transition-all duration-300"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Link>

            {/* Instagram SVG */}
            <Link
              href="https://www.instagram.com/stafftonhealth/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-[#94A3B8] group-hover:fill-[#0F172A] transition-all duration-300"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </Link>

            {/* LinkedIn SVG */}
            <Link
              href="https://www.linkedin.com/company/staffton-health/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-[#94A3B8] group-hover:fill-[#0F172A] transition-all duration-300"
              >
                <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
              </svg>
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
