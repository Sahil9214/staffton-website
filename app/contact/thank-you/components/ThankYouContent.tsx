"use client";

import Link from "next/link";
import { CircleCheckBig, Home, Mail } from "lucide-react";
import { CONTACT_EMAIL } from "../../../utility/site";
import Reveal from "../../../components/motion/Reveal";
import ConfettiBurst from "./ConfettiBurst";

const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`;

const ThankYouContent = () => {
  return (
    <section className="relative w-full overflow-hidden bg-surface-page">
      <ConfettiBurst />

      {/* Soft brand atmosphere — not a flat single color */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-badge-soft)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(13,148,136,0.08)_0%,_transparent_45%)]"
      />

      <div className="section-container relative flex min-h-[70vh] flex-col items-center justify-center py-20 md:py-28 lg:py-32">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
          <Reveal immediate>
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-badge-soft text-accent">
              <CircleCheckBig className="h-12 w-12" strokeWidth={1.75} aria-hidden />
            </div>
          </Reveal>

          <Reveal immediate delay={0.05}>
            <h1 className="mb-4 font-inter text-[32px] font-extrabold leading-[40px] text-heading [text-wrap:balance] sm:text-[40px] sm:leading-[48px]">
              Thanks for reaching out
            </h1>
          </Reveal>

          <Reveal immediate delay={0.1}>
            <p className="mb-10 max-w-lg font-inter text-base font-normal leading-7 text-body">
              Your message is with us now. Thanks for taking the time to fill
              out the form. The team goes through every query personally, so it
              may take a little while, but a reply is on its way. If it&apos;s
              something urgent, just contact us via the email below.
            </p>
          </Reveal>

          <Reveal immediate delay={0.15} className="mb-10 w-full max-w-md">
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full flex-row items-center gap-4 rounded-2xl border border-border-light bg-white p-5 shadow-[0px_10px_24px_-10px_rgba(0,0,0,0.05)] transition-colors hover:border-accent sm:p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-badge-soft">
                <Mail className="h-5 w-5 text-accent" aria-hidden />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 text-left">
                <span className="font-inter text-xs font-bold uppercase leading-[15px] tracking-[0.5px] text-neutral">
                  Email Support
                </span>
                <span className="font-inter text-sm font-semibold leading-[18px] break-all text-heading transition-colors group-hover:text-accent">
                  {CONTACT_EMAIL}
                </span>
              </div>
            </a>
          </Reveal>

          <Reveal immediate delay={0.2}>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-accent px-6 font-inter text-sm font-semibold text-white shadow-[0px_10px_24px_-10px_rgba(13,148,136,0.2)] transition-colors hover:bg-brand-hover active:bg-brand-dark"
            >
              <Home className="h-4 w-4" aria-hidden />
              Go back home
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ThankYouContent;
