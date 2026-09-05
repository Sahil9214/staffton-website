import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import Reveal from "./components/motion/Reveal";
import { navigationLinks } from "./utility/constants";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="w-full flex-1 bg-surface-page">
      <section className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-20 md:py-28 lg:py-32">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center">
          <Reveal immediate>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-mint/60 mb-6">
              <SearchX className="w-8 h-8 text-accent-teal-dark" aria-hidden />
            </div>
          </Reveal>

          <Reveal immediate delay={0.05}>
            <p className="font-inter text-[12px] leading-4 tracking-[0.6px] uppercase font-semibold text-accent-teal-dark mb-3">
              Error 404
            </p>
          </Reveal>

          <Reveal immediate delay={0.1}>
            <h1 className="font-extrabold text-heading text-[36px] sm:text-[44px] leading-[44px] sm:leading-[52px] [text-wrap:balance] mb-4">
              This page could not be found
            </h1>
          </Reveal>

          <Reveal immediate delay={0.15}>
            <p className="text-body text-base leading-7 max-w-md mb-8">
              The page you are looking for may have been moved, removed, or the
              URL might be incorrect. Try one of the links below or head back
              home.
            </p>
          </Reveal>

          <Reveal immediate delay={0.2} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-10">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 px-6 rounded-[8px] bg-brand text-white text-sm font-semibold hover:bg-brand-hover transition-colors duration-200"
            >
              <Home className="w-4 h-4" aria-hidden />
              Back to Home
            </Link>
            <Link
              href="/contact-us/"
              className="inline-flex h-11 items-center justify-center gap-2 px-6 rounded-[8px] border border-border-input bg-white text-heading text-sm font-semibold hover:bg-surface-hover transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
              Contact Support
            </Link>
          </Reveal>

          <Reveal immediate delay={0.25}>
            <nav aria-label="Popular pages">
              <p className="text-[13px] font-medium text-muted mb-3">
                Popular pages
              </p>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-brand hover:text-brand-hover transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
