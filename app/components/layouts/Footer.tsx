import React from "react";
import Link from "next/link";
import {
  cityJobsHref,
  footerCompanyLinks,
  footerJobCityColumns,
  footerPlatformLinks,
  footerTagline,
} from "../../utility/constants";
import { SOCIAL_LINKS } from "../../utility/site";

const Footer = () => {
  // Reverse to match the Figma order: "Hire Talent" first, then "Hospitals"
  const platformLinks = [...footerPlatformLinks].reverse();

  return (
    <footer className="w-full bg-white border-t border-border font-sans">
      <div className="max-w-[1440px] mx-auto px-6 xl:px-30 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-[197px]">
          
          {/* Brand section */}
          <div className="w-full lg:w-[320px] flex flex-col items-start gap-4 shrink-0">
            {/* Logo Container */}
            <Link
              href="/"
              aria-label="Staffton home"
              className="flex flex-row items-center gap-[4.09px] w-[198px] h-[44px] relative shrink-0"
            >
              {/* Group 11 (Logo Mark) */}
              <svg
                width="42.91"
                height="44"
                viewBox="0 0 43 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 animate-pulse-slow"
              >
                <path d="M42.9025 0C42.9045 0.011233 42.9059 0.0224655 42.9078 0.0336985C40.4413 7.31687 35.9127 13.7964 30.5991 19.2814C29.3297 20.5918 28.9108 20.9479 28.0744 21.7861C28.55 20.9708 28.9386 20.0994 29.3518 19.2537C30.423 17.0613 31.1857 15.1709 31.7801 12.7964C30.5821 13.525 28.9753 14.2197 27.6815 14.8177C25.8212 15.6777 22.0431 16.8851 20.9677 18.6667C20.7366 19.0559 20.6707 19.5213 20.7845 19.9594C21.1911 21.4973 23.5459 22.1078 24.8805 22.5643C28.1156 23.6711 32.2468 24.9308 33.23 28.6634C33.6512 30.2627 33.328 32.0363 32.4739 33.4528C29.7566 37.7023 24.3346 39.5297 19.6945 40.751C19.3775 40.837 17.9286 41.2739 17.7337 41.0884C17.8562 40.8829 18.6029 40.6707 18.8601 40.5679C22.7258 39.0627 29.8217 35.6378 28.4123 30.3329C26.8869 24.5912 11.8863 26.723 15.8521 17.8172C16.4498 16.4751 18.8919 14.5317 20.2654 14.1306C19.5017 14.1044 18.8015 14.0025 18.1516 13.5648C17.4802 13.1106 17.0236 12.4018 16.8877 11.6027C16.5849 9.91061 17.6494 8.28851 19.3704 7.99114C21.0067 7.7084 22.7281 9.03304 22.8789 10.6917C22.9753 11.7524 22.6575 12.3742 22.0207 13.1986C22.4761 12.9929 22.9503 12.8004 23.4134 12.6152C29.5178 10.1755 35.5979 7.37667 40.3701 2.73795C41.2654 1.86779 42.0732 0.934829 42.9025 0Z" fill="#14B8A6"/>
                <path d="M9.75931 14.1636C10.1908 14.1298 10.5532 14.1478 10.9638 14.288C11.6062 14.5059 12.1352 14.971 12.4337 15.5801C12.8048 16.3455 12.7594 17.1906 12.4818 17.9763C14.0118 16.8047 14.5741 16.4656 16.3314 15.6302C15.5425 16.3283 14.8382 17.1675 14.3712 18.1161C13.7506 19.3763 13.6233 20.9259 14.09 22.2602C15.3914 25.982 20.941 26.5541 24.0574 28.0708C25.201 28.6274 26.2928 29.419 26.7174 30.6748C27.0874 31.7693 26.8799 32.9868 26.3669 33.9999C23.5769 39.5101 9.2502 42.1138 3.53052 44C4.2859 43.1955 5.06557 42.2672 5.80251 41.4312C7.24847 39.7897 8.70733 38.1593 10.179 36.5408C11.8829 34.631 13.6405 32.7843 15.3535 30.8905C14.5171 32.6848 13.5081 36.0102 12.9546 37.9064C15.4906 36.992 17.9655 36.4165 20.2305 34.7892C21.9845 33.6608 22 31.5799 19.8965 30.7761C14.9553 28.8881 7.53412 28.5203 5.98262 22.2902C5.57971 20.6724 5.77536 18.8625 6.01316 17.2049C6.60732 20.7844 7.30234 22.0312 10.4574 23.8686C10.4512 23.8348 10.4455 23.8009 10.4402 23.767C10.1351 21.86 10.6655 20.3683 11.7872 18.8358C11.4206 19.0759 11.1037 19.2432 10.6703 19.3413C10.0171 19.4925 9.3304 19.3766 8.76306 19.0192C8.1626 18.6395 7.73784 18.0366 7.5824 17.3434C7.42571 16.6477 7.55319 15.9182 7.93655 15.3169C8.38568 14.6267 8.98237 14.3336 9.75931 14.1636Z" fill="#0D9488"/>
                <path d="M19.1695 2.23404C20.7194 2.11367 24.3322 2.39421 25.7195 3.06829C24.09 2.75076 22.4263 2.6444 20.7695 2.7519C15.8202 3.06729 11.2026 5.34898 7.94527 9.08863C4.69132 12.8524 2.84642 17.8474 3.20636 22.8418C3.53613 27.418 5.59059 31.8739 9.08904 34.887C9.33836 35.0903 9.49825 35.2158 9.77287 35.3931C9.10295 36.0294 8.17969 37.1269 7.56531 37.8276C7.34987 37.5843 6.78808 37.1025 6.52575 36.8625C5.96529 36.3592 5.43265 35.8257 4.93023 35.2641C-1.68666 27.8432 -1.60898 16.4487 4.95733 9.04494C8.75396 4.76405 13.4651 2.53508 19.1695 2.23404Z" fill="#0D9488"/>
                <path d="M30.8561 1.99238C31.9083 1.81026 32.9772 2.20768 33.6548 3.03304C34.3324 3.85836 34.5141 4.9842 34.1306 5.98079C33.7471 6.97742 32.8576 7.69103 31.8015 7.84925C30.1942 8.09002 28.6924 6.99267 28.4334 5.38821C28.1744 3.7837 29.2546 2.26953 30.8561 1.99238Z" fill="#0D9488"/>
                <path d="M21.8005 3.56763C23.0499 3.56877 24.1108 3.63957 25.3411 3.8778C25.9987 4.00519 26.638 4.16943 27.2902 4.29572C27.2394 5.13739 27.2555 5.86548 27.5529 6.66819C26.79 6.3094 26.0045 6.0008 25.2013 5.74431C20.7343 4.33582 16.378 5.05082 12.2979 7.17506C10.5726 8.1314 9.36819 9.12039 8.0481 10.564C8.26162 10.1529 8.71166 9.61636 9.03603 9.27932C12.5513 5.62638 16.7511 3.71911 21.8005 3.56763Z" fill="#0D9488"/>
              </svg>

              {/* Frame 13 (Logo Text) */}
              <div className="flex flex-col items-start p-0 w-[141.13px] h-[26px]">
                <span
                  className="w-[141.13px] h-[19px] font-bold text-[18.2104px] leading-[19px] tracking-[0.1em] text-brand-navy"
                  style={{ fontFamily: "var(--font-syncopate), sans-serif" }}
                >
                  STAFFTON
                </span>
                <span
                  className="w-[141px] h-[7px] font-normal text-[5.55443px] leading-[7px] tracking-[0.1em] uppercase text-brand-navy opacity-90"
                  style={{ fontFamily: "var(--font-instrument-sans), sans-serif" }}
                >
                  Connecting Healthcare Professionals
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <p className="w-[320px] font-inter font-normal text-sm leading-[22px] text-muted">
              {footerTagline}
            </p>

            {/* Social Icons Container */}
            <div className="flex flex-row items-center p-0 gap-6 w-[72px] h-[24px]">
              <Link
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Staffton on X"
                className="w-6 h-6 flex flex-col items-start p-0 text-slate hover:text-accent transition-colors duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-current"
                  aria-hidden
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </Link>

              <Link
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Staffton on LinkedIn"
                className="w-6 h-6 flex flex-col items-start p-0 text-slate hover:text-accent transition-colors duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-current"
                  aria-hidden
                >
                  <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Columns Section */}
          <div className="w-full lg:w-[660px] flex flex-col sm:flex-row items-start gap-10 sm:gap-12 lg:gap-6">
            {/* Platform Column */}
            <nav className="flex flex-col items-start gap-4 w-full sm:w-[160px] shrink-0" aria-label="Platform">
              <h3
                className="w-full font-bold text-base leading-[24px] text-heading"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                Platform
              </h3>
              <div className="flex flex-col items-start gap-3 w-full">
                {platformLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="w-full font-inter font-normal text-sm leading-[20px] text-muted hover:text-heading transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Company Column */}
            <nav className="flex flex-col items-start gap-4 w-full sm:w-[160px] shrink-0" aria-label="Company">
              <h3
                className="w-full font-bold text-base leading-[24px] text-heading"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                Company
              </h3>
              <div className="flex flex-col items-start gap-3 w-full">
                {footerCompanyLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    {...("external" in item && item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="w-full font-inter font-normal text-sm leading-[20px] text-muted hover:text-heading transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Jobs by City Column */}
            <nav className="flex flex-col items-start gap-4 w-full sm:w-[292px] shrink-0" aria-label="Jobs by city">
              <h3
                className="w-full font-bold text-base leading-[24px] text-heading"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                Jobs by City
              </h3>
              <div className="flex flex-row items-start gap-6 w-full">
                {footerJobCityColumns.map((column, colIdx) => (
                  <div key={colIdx} className="flex flex-col items-start gap-2 flex-1">
                    {column.map((city) => (
                      <Link
                        key={city}
                        href={cityJobsHref(city)}
                        className="w-full font-inter font-normal text-sm leading-[20px] text-muted hover:text-heading transition-colors duration-150"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </nav>
          </div>

        </div>
      </div>
      <div className="w-full bg-white border-t border-border box-border">
        <div className="max-w-[1440px] mx-auto px-6 xl:px-[120px] py-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 md:h-[68px]">
          {/* Container */}
          <div className="flex flex-col items-start p-0 w-full md:w-[431px] h-5 shrink-0">
            <p className="w-full md:w-[431px] h-5 font-inter font-normal text-sm leading-[20px] text-muted text-center md:text-left">
              &copy; {new Date().getFullYear()} Staffton Medical Recruitment. All rights reserved.
            </p>
          </div>
          <div className="flex flex-row items-center p-0 gap-2 w-[292px] h-5 shrink-0 justify-center">
            <div className="w-[1px] h-3.5 bg-border-gray shrink-0" />
            <div className="flex flex-row justify-center items-center px-4 py-0 gap-[10px] w-[144px] h-5 shrink-0">
              <Link
                href="/terms-of-service/"
                className="w-[112px] h-5 font-inter font-normal text-sm leading-[20px] text-muted hover:text-heading transition-colors duration-150 text-center"
              >
                Terms of Service
              </Link>
            </div>
            <div className="w-[1px] h-3.5 bg-border-gray shrink-0" />
            <div className="flex flex-row justify-center items-center px-4 py-0 gap-[10px] w-32 h-5 shrink-0">
              <Link
                href="/privacy-policy/"
                className="w-24 h-5 font-inter font-normal text-sm leading-[20px] text-muted hover:text-heading transition-colors duration-150 text-center"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
