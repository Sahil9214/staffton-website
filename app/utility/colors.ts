import { readFileSync } from "fs";
import { join } from "path";

/** CSS variable reference for inline styles in client components */
export const color = {
  brand: "var(--color-brand)",
  brandHover: "var(--color-brand-hover)",
  brandDark: "var(--color-brand-dark)",
  brandMid: "var(--color-brand-mid)",
  accent: "var(--color-accent)",
  accentLight: "var(--color-accent-light)",
  accentLighter: "var(--color-accent-lighter)",
  accentMint: "var(--color-accent-mint)",
  accentTeal: "var(--color-accent-teal)",
  accentTealDark: "var(--color-accent-teal-dark)",
  accentTealDarker: "var(--color-accent-teal-darker)",
  accentHighlight: "var(--color-accent-highlight)",
  badgeMint: "var(--color-badge-mint)",
  badgeHospitalBg: "var(--color-badge-hospital-bg)",
  badgeHospitalText: "var(--color-badge-hospital-text)",
  badgeProfessionalBg: "var(--color-badge-professional-bg)",
  badgeProfessionalText: "var(--color-badge-professional-text)",
  gradientBrandVia: "var(--color-gradient-brand-via)",
  gradientBrandTo: "var(--color-gradient-brand-to)",
  gradientOgFrom: "var(--color-gradient-og-from)",
  gradientOgTo: "var(--color-gradient-og-to)",
  heading: "var(--color-heading)",
  title: "var(--color-title)",
  body: "var(--color-body)",
  nav: "var(--color-nav)",
  muted: "var(--color-muted)",
  mutedGray: "var(--color-muted-gray)",
  faqTitle: "var(--color-faq-title)",
  faqBody: "var(--color-faq-body)",
  slate: "var(--color-slate)",
  surfacePage: "var(--color-surface-page)",
  surfaceSection: "var(--color-surface-section)",
  surfaceSectionAlt: "var(--color-surface-section-alt)",
  surfaceGray: "var(--color-surface-gray)",
  surfaceHover: "var(--color-surface-hover)",
  surfaceIcon: "var(--color-surface-icon)",
  border: "var(--color-border)",
  borderLight: "var(--color-border-light)",
  borderSubtle: "var(--color-border-subtle)",
  borderInput: "var(--color-border-input)",
  borderBlue: "var(--color-border-blue)",
  dark: "var(--color-dark)",
  darkCard: "var(--color-dark-card)",
  darkSurface: "var(--color-dark-surface)",
  darkBorder: "var(--color-dark-border)",
  white: "var(--color-white)",
  borderGray: "var(--color-border-gray)",
  mutedLight: "var(--color-muted-light)",
  brandNavy: "var(--color-brand-navy)",
  surfaceOffwhite: "var(--color-surface-offwhite)",
  brandDarker: "var(--color-brand-darker)",
} as const;

function parseThemeColors(): Record<string, string> {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf-8");
  const matches = [...css.matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]+)/g)];
  return Object.fromEntries(matches.map(([, name, value]) => [name, value]));
}

/** Resolved hex values parsed from globals.css — for server-side rendering (e.g. OG images) */
export const colorValue = parseThemeColors();
