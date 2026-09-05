import { HIRE_TALENT_PATH } from "./site";

export type NavLink = {
  name: string;
  href: string;
  external?: boolean;
  dropdown?: "jobs";
};

/**
 * Navigation links displayed in the desktop and mobile header navbar.
 */
export const navigationLinks: NavLink[] = [
  { name: "Jobs", href: "/nurse-doctor-jobs-india/", dropdown: "jobs" },
  { name: "Hire Talent", href: `${HIRE_TALENT_PATH}/` },
  { name: "Blogs", href: "https://stafftonhealth.com/blog/", external: true },
  { name: "About Us", href: "/about-us/" },
  { name: "Contact Us", href: "/contact-us/" },
];

/**
 * =============================================================================
 * API CONFIGURATION & ENDPOINTS
 * =============================================================================
 * Base URL and endpoint paths are centralized here for easy configuration.
 * Change API_BASE_URL (or set NEXT_PUBLIC_API_BASE_URL in .env) for dev/prod.
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://dev-api.stafftonhealth.com"
).replace(/\/$/, "");

export const API_ENDPOINTS = {
  PUBLIC: {
    SEO_CITIES: "/api/v1/public/jobs/seo/cities",
    SEO_CITY_JOBS: "/api/v1/public/jobs/seo/city",
  },
  COMMON: {
    CONTACT_US: "/api/v1/common/contact-us",
  },
} as const;

/** Full URL for SEO cities list (used in Navbar jobs dropdown) */
export const SEO_CITIES_API_URL = `${API_BASE_URL}${API_ENDPOINTS.PUBLIC.SEO_CITIES}`;

/**
 * WordPress REST API base (posts, media, terms).
 * Override with NEXT_PUBLIC_WORDPRESS_API_URL for a different blog origin.
 */
export const WORDPRESS_API_URL = (
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://hirium.com/blog/wp-json/wp/v2"
).replace(/\/$/, "");

export type WordpressRendered = {
  rendered?: string;
};

export type WordpressEmbeddedTerm = {
  name?: string;
};

export type WordpressFeaturedMedia = {
  source_url?: string;
  alt_text?: string;
};

export type WordpressPost = {
  id: number | string;
  date?: string;
  link?: string;
  title?: WordpressRendered;
  excerpt?: WordpressRendered;
  _embedded?: {
    "wp:featuredmedia"?: WordpressFeaturedMedia[];
    "wp:term"?: WordpressEmbeddedTerm[][];
  };
};

/**
 * Strip WordPress HTML / entities so card copy is safe plain text.
 */
export function stripWordpressHtml(value: string, maxLength?: number): string {
  const text = value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#8211;|&ndash;/gi, "–")
    .replace(/&#8212;|&mdash;/gi, "—")
    .replace(/&#8216;|&lsquo;/gi, "‘")
    .replace(/&#8217;|&rsquo;/gi, "’")
    .replace(/&#8220;|&ldquo;/gi, "“")
    .replace(/&#8221;|&rdquo;/gi, "”")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCharCode(Number.parseInt(code, 10))
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCharCode(Number.parseInt(hex, 16))
    )
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

  if (maxLength && text.length > maxLength) {
    return text.slice(0, maxLength).trimEnd();
  }

  return text;
}

/**
 * Fetch latest WordPress posts with embedded media and terms.
 * Returns an empty list on failure so a static homepage build still succeeds.
 */
export async function getAllBlogs(perPage: number): Promise<WordpressPost[]> {
  const count = Number.isFinite(perPage) ? Math.min(Math.max(perPage, 1), 20) : 5;

  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/posts?_embed=1&per_page=${count}`,
      {
        headers: { accept: "application/json" },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch blog posts: ${res.status}`);
      return [];
    }

    const json: unknown = await res.json();
    return Array.isArray(json) ? (json as WordpressPost[]) : [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export interface SeoCityItem {
  city: string;
  slug: string;
  metaTitle?: string;
  jobCount?: number;
}

export interface SeoCitiesApiResponse {
  success: boolean;
  message?: string;
  data: SeoCityItem[];
  timestamp?: string;
}

export const DEFAULT_SEO_CITIES: SeoCityItem[] = [
  { city: "Bengaluru", slug: "/jobs/in/bengaluru/" },
  { city: "Pune", slug: "/jobs/in/pune/" },
  { city: "Chennai", slug: "/jobs/in/chennai/" },
  { city: "Hyderabad", slug: "/jobs/in/hyderabad/" },
  { city: "Kolkata", slug: "/jobs/in/kolkata/" },
  { city: "Ahmedabad", slug: "/jobs/in/ahmedabad/" },
  { city: "Mumbai", slug: "/jobs/in/mumbai/" },
  { city: "Delhi", slug: "/jobs/in/delhi/" },
  { city: "Indore", slug: "/jobs/in/indore/" },
];

/**
 * Server-side / static helper to fetch SEO cities list.
 * Falls back to DEFAULT_SEO_CITIES if the API is unreachable during build or runtime.
 */
export async function getSeoCities(): Promise<SeoCityItem[]> {
  try {
    const res = await fetch(SEO_CITIES_API_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return DEFAULT_SEO_CITIES;
    const json: SeoCitiesApiResponse = await res.json();
    return json?.success && Array.isArray(json?.data) && json.data.length > 0
      ? json.data
      : DEFAULT_SEO_CITIES;
  } catch (error) {
    console.error("Error fetching SEO cities:", error);
    return DEFAULT_SEO_CITIES;
  }
}

export function toCitySlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function cityJobsHref(name: string) {
  return `/jobs/in/${toCitySlug(name)}/`;
}

export const ALL_ROLE_SLUGS = [
  "doctor",
  "nurse",
  "allied",
  "technician",
  "non-allied",
  "non-technician",
] as const;

export type RoleSlug = (typeof ALL_ROLE_SLUGS)[number];

/**
 * Homepage hero copy (H1, subtext, and checklist).
 */
export const homeHeroSection = {
  badge: "Trusted by 500+ Medical Centers",
  heading: "India's Trusted Healthcare Hiring Platform for Hospitals & Doctors",
  subtext:
    "Whether you're hiring specialists or searching for your next clinical role, our healthcare recruitment platform in India connects the right talent with the right facility instantly.",
  features: [
    "Automated Credential Verification",
    "Smart Hiring Pipelines for Every Hospital",
    "One-Step In-App Chat & Communication",
    "Real-Time Doctor & Nurse Matchmaking",
    "Secure Direct Messaging Facility",
  ],
};

/**
 * Hero copy for the nurse & doctor jobs in India landing page.
 */
export const nurseDoctorJobsHeroSection = {
  badge: "Trusted by 500+ Medical Centers",
  heading: "Nurse & Doctor Jobs in India. Get Hired Faster.",
  subtext:
    "India's trusted healthcare job portal for doctors, nurses, and allied professionals. Skip the noise and get matched directly with hospitals looking to hire fast.",
  features: [
    "Automated Credential Verification",
    "One-Click Apply to Verified Hospital Jobs",
    "Direct In-App Chat with Hospitals",
    "Real-Time Job Matchmaking",
    "Direct Hospital-to-Clinician Messaging",
  ],
  imageSrc: "/images/for_professionals_hero_image.webp",
  imageAlt:
    "Nurses and doctors finding verified hospital jobs in India on the Staffton platform",
};

/**
 * Features grid on the Nurse & Doctor Jobs in India landing page.
 */
export const nurseDoctorJobsFeaturesSection = {
  badge: "Healthcare Recruitment Platform",
  heading: "Nurse & Doctor Jobs in India, All in One Place",
  subtitle:
    "Own your career with tools built for clinical specialists first — search nurse jobs, doctor jobs, and hospital jobs across India, without the black-hole applications.",
  features: [
    {
      title: "Healthcare-Only Jobs",
      description:
        "A curated portal for nurse jobs, doctor jobs, and hospital jobs across India — no distractions, just real clinical opportunities.",
      icon: "/hospital_green_bag_icon.svg",
    },
    {
      title: "Direct Chat",
      description:
        "Message hiring managers at top hospitals directly and get instant answers to your hiring questions.",
      icon: "/green_chat_icon.svg",
    },
    {
      title: "Save Jobs",
      description:
        "Bookmark ICU nurse jobs, ER nurse jobs, or any role you like, and apply with one click when you're ready.",
      icon: "/save_icon.svg",
    },
    {
      title: "Smart Alerts",
      description:
        "Get notified the moment a new opening — from OT technician jobs to oncology nurse jobs — matches your specialty and salary range.",
      icon: "/green_aler_notification_icon.svg",
    },
    {
      title: "Digital Credentials",
      description:
        "Share your licenses and certificates securely, ideally whether you're applying to nursing jobs for freshers or doctor jobs for freshers.",
      icon: "/green_bag.svg",
    },
    {
      title: "Career Insights",
      description:
        "See real-time salary benchmarks and trending skills for specialties like cardiology, radiology, and critical care.",
      icon: "/green_career_insights.svg",
    },
  ],
};

/**
 * Platform preview on the Nurse & Doctor Jobs in India landing page.
 */
export const nurseDoctorJobsPlatformSection = {
  heading: "Get Hired for Nurse & Doctor Jobs in India, Track Every Step",
  subtext:
    "One dashboard for your entire job search from application to offer letter. See exactly where every hospital job stands, in real time.",
  image: {
    src: "/images/for_Professionals_powerful_platform_image.webp",
    alt: "Staffton dashboard for tracking nurse and doctor job applications, hospital chat, and offer letters in India",
  },
  features: [
    {
      title: "Application Pipeline",
      description:
        "Track your ICU nurse job, ER nurse job, or any hospital job application from applied to offered, all in real time.",
      icon: "/users_icon.svg",
    },
    {
      title: "Secure Messaging",
      description:
        "Chat directly with hospitals hiring for staff nurse, registered nurse, and doctor roles across India — fully encrypted, no delays.",
      icon: "/chat_green_icon.svg",
    },
    {
      title: "Digital Offer Letters",
      description:
        "E-sign contracts and clear compliance checks the moment you're offered a role, so nursing jobs for freshers and experienced hires move just as fast.",
      icon: "/doc_icon.svg",
    },
  ],
};

/**
 * Trust & security section on the Nurse & Doctor Jobs in India landing page.
 */
export const nurseDoctorJobsTrustSection = {
  heading: "Apply to Verified Hospital Jobs, Safely and Securely",
  ctaLabel: "Get Started Free",
  image: {
    src: "/images/clinical_trust_image.webp",
    alt: "Doctors and nurses in a hospital setting — verified hospital jobs in India on Staffton",
  },
  features: [
    {
      title: "Security Compliant",
      description:
        "Enterprise-grade encryption protects every candidate document and health organization's data.",
      icon: "/security_icon.svg",
    },
    {
      title: "Vetted Professionals",
      description:
        "Our team manually verifies every license and credential against official state registries.",
      icon: "/right_check_icon.svg",
    },
    {
      title: "Privacy Focused",
      description:
        "No public resumes — your data is shared only with the hospitals you choose to apply to.",
      icon: "/privacy_lock_icon.svg",
    },
  ],
};

/**
 * Final CTA on the Nurse & Doctor Jobs in India landing page.
 */
export const nurseDoctorJobsFinalCtaSection = {
  heading: "Ready for Your Next Healthcare Job? India's Nurse & Doctor Jobs Platform.",
  subtext:
    "From staff nurse and ER nurse jobs to pediatric and oncology roles, get hired faster with Staffton.",
  ctaLabel: "Get Started Free",
};

/**
 * FAQ copy for the Nurse & Doctor Jobs in India landing page.
 */
export const nurseDoctorJobsFaqSection = {
  badge: "Get Hired Healthcare Jobs",
  heading: "Frequently Asked Questions",
  items: [
    {
      question: "What kind of jobs can I find on Staffton?",
      answer:
        "Staffton lists verified nurse jobs, doctor jobs, and hospital jobs across India including staff nurse and registered nurse jobs, ICU and critical care nurse jobs, ER nurse and emergency medicine jobs, OT technician and scrub nurse jobs, L&D nurse jobs, pediatric nurse and pediatrician jobs, cardiology and cardiac care nurse jobs, oncology nurse jobs, and radiology technician or MRI technologist jobs.",
    },
    {
      question: "Does Staffton have openings for freshers?",
      answer:
        "Yes. We regularly list nursing jobs for freshers and doctor jobs for freshers alongside experienced roles, so you can start your healthcare career on a platform built for every stage.",
    },
    {
      question: "How fast can I get hired through Staffton?",
      answer:
        "Most candidates on our healthcare job portal get matched with hospitals and clinics within 48 hours, thanks to automated credential verification and real-time job matchmaking.",
    },
    {
      question: "Is my personal information safe on Staffton?",
      answer:
        "Yes. We don't publish public resumes. Your credentials and profile are shared only with the hospitals you choose to apply to, protected by enterprise-grade encryption.",
    },
    {
      question: "Can I check salary trends for healthcare jobs in India on Staffton?",
      answer:
        "Yes. Our Career Insights tool shows real-time salary benchmarks and in-demand skills across medical jobs in India, so you can negotiate confidently and plan your next move in healthcare jobs India-wide.",
    },
  ],
};

/**
 * Core benefits displayed in the Hero section of the For Professionals page.
 * Highlights direct connection, speed, and matchmaking features tailored to clinicians.
 */
export const professionalHeroFeatures = [
  "Automated Credential Verification",
  "Candidate pipelines for easy pool management.",
  "One step communication solution with in app chat.",
  "Real-time Matchmaking.",
  "Direct hospital-to-clinician messaging",
];

/**
 * Hero copy for the hospitals / hire-talent page.
 */
export const hospitalHeroSection = {
  badge: "Trusted by 500+ Medical Centers",
  heading: "One of India's Best Medical Staffing Companies For Hospitals.",
  subtext:
    "Partner with a top medical staffing agency built for hospitals. Skip generic job boards and connect directly with credentialed specialists ready to join your team.",
  features: [
    "Automated Credential Verification",
    "Real-Time Messaging",
    "Direct Hospital-to-Candidate Chat",
  ],
};

/**
 * "Precision Talent. Total Control." section on the hospitals page.
 */
export const hospitalPrecisionSection = {
  badge: "Best Medical Staffing.",
  heading: "What Makes Staffton One of the Best Medical Staffing Companies",
  subtext:
    "Staffton is a top medical staffing company built for precision hiring, moving beyond generic listings into a true control center for hospital staffing.",
};

/**
 * "Built for Medical Sovereignty" section on the hospitals page.
 */
export const hospitalSovereigntySection = {
  badge: "Built for Medical Sovereignty",
  heading: "A Medical Staffing Nursing Agency Built for Complete Control",
  subtext:
    "Infrastructure built for elite facilities that expect surgical precision from their medical staffing nursing agency partner.",
  credentialing: {
    title: "Credentialing & Compliance",
    description:
      "Automated verification of medical licenses, board certifications, and compliance standards in real-time, across every state in India.",
  },
  talentNetwork: {
    title: "The Talent Network",
    description:
      "Direct access to the top 3% of medical professionals, curated through our proprietary screening protocol, trusted as one of the top medical staffing agencies and companies in India.",
    stat: "12k+",
    statLabel: "Verified Experts",
  },
};

/**
 * "Elite Control Philosophy" section on the hospitals page.
 */
export const hospitalEliteControlSection = {
  badge: "",
  heading: "How We Vet Talent Better Than a Traditional Medical Job Agency",
};

/**
 * "One powerful platform" section on the hospitals page.
 */
export const hospitalPlatformSection = {
  badge: "One powerful platform",
  heading:
    "See Why We're Ranked Among the Best Medical Staffing Companies in India",
  subtext:
    "One powerful platform to post roles, screen applicants, and hire everything you'd expect from a top medical jobs recruitment agency, built into a single dashboard.",
};

/**
 * Key performance metrics and scale statistics of the platform.
 * Displays overall verified professionals, speed-to-hire, placement success, and total filled shifts.
 */
export const platformStats = [
  {
    value: "15k+",
    label: "Verified Professionals",
  },
  {
    value: "48h",
    label: "Avg. Time to Hire",
  },
  {
    value: "98%",
    label: "Placement Success",
  },
  {
    value: "1.2M",
    label: "Shifts Filled",
  },
];

/**
 * Onboarding and usage steps for healthcare organizations (Hospitals).
 * Walks hospitals through registration, role posting, reviewing, chatting, and hiring.
 */
export const hospitalOnboardingSteps = [
  {
    title: "Register Organization",
    description:
      "Set up your hospital profile and verify your facility within minutes.",
  },
  {
    title: "Post Precise Roles",
    description:
      "Define specialties, shift patterns, and benefits using our smart job editor.",
  },
  {
    title: "Review & Shortlist",
    description:
      "Browse ranked candidates with pre-verified credentials from our healthcare talent marketplace.",
  },
  {
    title: "Instant Direct Chat",
    description:
      "Interview candidates directly through our secure in-platform messenger.",
  },
  {
    title: "Secure Hire",
    description:
      "Finalize contracts and start onboarding instantly with our hospital hiring software.",
  },
];

/**
 * Onboarding and career steps for healthcare professionals (Clinicians).
 * Guides professionals from building profiles to applying and communicating with hospitals.
 */
export const professionalOnboardingSteps = [
  {
    title: "Create Elite Profile",
    description:
      "Build your medical resume and upload certifications for instant verification.",
  },
  {
    title: "Browse Top Jobs",
    description:
      "Filter roles by specialty, pay, and facility type on India's trusted nurse and doctor job portal.",
  },
  {
    title: "Apply with One Click",
    description:
      "Send your verified credentials instantly to hiring managers nationwide.",
  },
  {
    title: "Chat with Hospitals",
    description:
      "Connect directly with the team you'll be working with, before you accept.",
  },
  {
    title: "Track Application",
    description:
      "Get real-time status updates at every step of your hiring journey.",
  },
];

/**
 * Homepage "Simple. Transparent. Efficient." section headings.
 */
export const homeHowItWorksSection = {
  badge:"",
  heading: "One Healthcare Hiring Platform, Built for Hospitals and Professionals",
};

/**
 * Site-wide footer tagline.
 */
export const footerTagline =
  "India's trusted healthcare recruitment platform, connecting hospitals with verified doctors and nurses through automated precision and clinical trust.";

/**
 * Footer "Platform" column links.
 */
export const footerPlatformLinks = [

  
  { name: "Professional", href: "/nurse-doctor-jobs-india/" },
  { name: "Hire Talent", href: `${HIRE_TALENT_PATH}/` },
] as const;

/**
 * Footer "Company" column links.
 */
export const footerCompanyLinks = [
  { name: "Contact Us", href: "/contact-us/" },
  { name: "About Us", href: "/about-us/" },
  {
    name: "Blogs",
    href: "https://stafftonhealth.com/blog/",
    external: true,
  },
] as const;

/**
 * Footer "Jobs by City" columns (left, then right), matching the design order.
 */
export const footerJobCityColumns = [
  ["Bengaluru", "Pune", "Chennai", "Hyderabad", "Kolkata"],
  ["Ahmedabad", "Mumbai", "Delhi", "Indore"],
] as const;

/**
 * Core operating system features of the Staffton platform.
 * Showcases pipeline visibility, messaging, and digital contract signing.
 */
export const platformFeatures = [
  {
    title: "Talent Pipeline",
    description: "Visualize your recruitment funnel from applicant to hired staff.",
    icon: "/users_icon.svg",
  },
  {
    title: "Secure Messaging",
    description: "Encrypted chat for discussing clinical roles and contracts.",
    icon: "/chat_green_icon.svg",
  },
  {
    title: "Smart Contracts",
    description: "Digital signature and automated compliance checking.",
    icon: "/doc_icon.svg",
  },
];

/**
 * Side cards for the hospitals "One powerful platform" section.
 */
export const hospitalPlatformFeatures = [
  {
    title: "Applicant Pipeline, Fully Visible",
    description:
      "Track every applicant from posted to hired, the same visibility top medical staffing agencies charge hospitals extra for.",
    icon: "/users_icon.svg",
  },
  {
    title: "Encrypted Hospital-to-Candidate Chat",
    description:
      "Discuss clinical roles and contracts securely, without routing through a third-party medical job agency.",
    icon: "/chat_green_icon.svg",
  },
  {
    title: "Digital Signatures & Compliance Checks",
    description:
      "Finalize offers and compliance documentation instantly, with no manual paperwork or agency delays.",
    icon: "/doc_icon.svg",
  },
];

/**
 * Security and privacy features listed under the trust section for professionals.
 * Emphasizes data encryption, clinical vetting, and privacy controls.
 */
export const trustSecurityFeatures = [
  {
    title: "Security Compliant",
    description:
      "Enterprise-grade encryption protects every candidate document and health organization's data.",
    icon: "/security_icon.svg",
  },
  {
    title: "Vetted Professionals",
    description: "Our team manually verifies licenses and credentials against state databases regularly.",
    icon: "/right_check_icon.svg",
  },
  {
    title: "Privacy Focused",
    description: "No public resumes. Your data is only shared with hospitals you choose to apply to.",
    icon: "/privacy_lock_icon.svg",
  },
];

/**
 * Sub-features for the Medical Sovereignty section on the Hospitals page.
 * Highlights telemetry, notification systems, and leak-proof pipeline architecture.
 */
export const medicalSovereigntySubFeatures = [
  {
    title: "Live Telemetry",
    description:
      "Monitor your candidate pipeline in real-time, the moment there's progress.",
    icon: "/live_telemetry_icon.svg",
  },
  {
    title: "Instant Notifications",
    description:
      "Get notified by email and on-platform the moment there's a candidate update.",
    icon: "/notification_icon.svg",
  },
  {
    title: "Leakage Proof",
    description:
      "Structured pipelines ensure you never miss out on a shortlisted candidate.",
    icon: "/wallet_icon.svg",
  },
];

/**
 * Three pillars of the Elite Control Philosophy for hospitals.
 * Focused on curated onboarding, algorithmic matches, and quality analytics.
 */
export const eliteControlPhilosophyPillars = [
  {
    number: "01",
    title: "Curated Onboarding",
    description:
      "We don't just accept resumes. Every professional completes a multi-stage clinical assessment and peer-review process before joining our verified talent network.",
  },
  {
    number: "02",
    title: "Algorithmic Matching",
    description:
      "Our proprietary AI matches professionals based on clinical competency, procedural experience, and facility culture fit, driving a 98.4% retention rate.",
  },
  {
    number: "03",
    title: "Continuous Quality Management",
    description:
      "Post-deployment analytics give hospitals actionable data on staff performance and patient outcome correlations.",
  },
];

/**
 * FAQ copy for the hospitals / hire-talent page.
 */
export const hospitalFaqSection = {
  badge: "Get Hired Healthcare Jobs",
  heading: "Frequently Asked Questions",
  items: [
    {
      question:
        "What makes Staffton one of the best medical staffing companies in India?",
      answer:
        "Staffton combines automated credential verification, AI-powered matching, and direct hospital-to-candidate chat, making it one of the top medical staffing companies and medical jobs recruitment agencies built specifically for Indian hospitals and clinics.",
    },
    {
      question: "Is Staffton a medical staffing agency or a job portal?",
      answer:
        "Staffton works as both a full medical staffing nursing agency for structured hiring, and a self-serve staffing agency for medical jobs, so hospitals can either post roles directly or work with our team like a traditional medical job agency.",
    },
    {
      question: "Can Staffton help me find a hospital staffing solution near me?",
      answer:
        "Yes. Staffton connects hospitals across India from metro cities to tier-2 towns with verified doctors, nurses, and medical assistants, working as a nationwide medical personnel staffing agency and hospital staffing solution, rather than a single local agency.",
    },
    {
      question:
        "Does Staffton work as a staffing agency for medical assistants and allied health roles?",
      answer:
        "Yes. Beyond doctors and nurses, Staffton also supports medical staffing agencies for medical assistants, technicians, and allied health roles, covering the full clinical hiring need on one platform.",
    },
    {
      question:
        "How is Staffton different from traditional medical job placement agencies?",
      answer:
        "Unlike traditional medical job placement agencies that rely on manual sourcing, Staffton uses automated credential checks and AI matching to fill critical roles in under 48 hours, with full visibility into your hiring pipeline.",
    },
  ],
};

/**
 * Frequently Asked Questions (FAQ) list used on the For Professionals page.
 */
export const faqList = [
  {
    question: "What Staffton healthcare hiring platform does?",
    answer: "Staffton helps hospitals and healthcare organizations hire qualified medical professionals faster, including doctors, nurses, specialists, technicians, and support staff, through a streamlined hiring platform.",
  },
  {
    question: "How does Staffton improve the hiring process?",
    answer: "Staffton improves hiring by helping employers quickly find, screen, and shortlist the right medical professionals based on role, experience, skills, certifications, and availability.",
  },
  {
    question: "What features does Staffton offer for employers?",
    answer: "Staffton offers job posting, candidate matching, resume screening, applicant tracking, interview scheduling, credential verification support, and hiring insights for healthcare employers.",
  },
  {
    question: "Can Staffton integrate with existing Hospital systems?",
    answer: "Yes, Staffton can support integration with existing hospital HR or workforce management systems, helping teams manage hiring data smoothly without duplicate manual work.",
  },
];

/**
 * About Us page FAQ copy and items.
 */
export const aboutUsFaqSection = {
  badge: "Frequently Asked Questions",
  heading: "Frequently Asked Questions",
  items: [
    {
      question: "What is Staffton and how does the healthcare hiring platform work?",
      answer:
        "Staffton is a specialized healthcare hiring platform connecting hospitals, medical centers, and clinical facilities across India with pre-verified doctors, nurses, and allied medical specialists. We streamline candidate discovery, credentialing, direct communication, and hiring workflows.",
    },
    {
      question: "How does Staffton verify medical professionals and hospital employers?",
      answer:
        "Every healthcare professional undergoes a thorough credentialing check, including verification against state medical councils and nursing registries, background history, and degree credentials. Similarly, all healthcare institutions are credentialed to guarantee legitimate vacancies.",
    },
    {
      question: "How quickly can healthcare positions be filled on Staffton?",
      answer:
        "By replacing slow third-party agency middlemen with automated matching and direct in-app messaging, hospitals and clinics on Staffton typically match and interview candidates in under 48 to 72 hours.",
    },
    {
      question: "Is Staffton free for nurses, doctors, and clinical specialists?",
      answer:
        "Yes, 100% free for healthcare professionals. Medical candidates can create profiles, upload verified credentials, browse hospital openings across India, and connect directly with hiring teams without any registration fees or placement commissions.",
    },
    {
      question: "How does Staffton protect data privacy and ensure security compliance?",
      answer:
        "Staffton employs enterprise-grade encryption and strict data security protocols. Resumes and contact information are never made publicly searchable; your profile and documents are shared strictly with the hospitals you choose to apply to.",
    },
  ],
};

/**
 * Homepage FAQ copy and heading.
 */
export const homeFaqSection = {
  badge: "Healthcare Recruitment Platform",
  heading: "  Frequently Asked Questions",
  items: [
    {
      question: "What is Staffton's healthcare hiring platform?",
      answer:
        "Staffton is a healthcare hiring platform that connects hospitals, clinics, and medical professionals across India. It combines job posting, credential verification, and secure messaging into one online medical recruitment platform.",
    },
    {
      question: "How does Staffton improve the hiring process?",
      answer:
        "Staffton brings average time-to-fill down to under 48 hours by automating credential checks and matching hospitals with pre-verified doctors and nurses through our healthcare recruitment platform.",
    },
    {
      question: "What features does Staffton offer for hospitals?",
      answer:
        "Hospitals get access to a hospital staffing platform with smart job posting, ranked candidate pipelines, in-app chat, and an automated credential verification platform for healthcare.",
    },
    {
      question: "Can Staffton integrate with existing hospital systems?",
      answer:
        "Yes. Staffton's hospital hiring software is built to integrate smoothly with existing HR and administrative systems, so hospitals can adopt it without disrupting daily operations.",
    },
    {
      question: "How can I hire doctors and nurses online through Staffton?",
      answer:
        "Hospitals simply register on our healthcare workforce platform, post their staffing requirements, and get matched with verified candidates from our nurse and doctor job portal in India making it possible to hire doctors and nurses online in under 48 hours, without manual screening.",
    },
  ],
};

/**
 * Detailed feature grid content specifically structured for the Hospitals page.
 * Highlights verified profiles, smart shortlists, scheduling, and onboarding tools.
 */
export const hospitalFeaturesGrid = {
  badge: "Empowering Hospital HR with Precision",
  heading: "Everything a Staffing Agency for Medical Jobs Should Offer",
  subheading:
    "Streamline your entire staffing lifecycle with enterprise-grade tools built specifically for hospitals and healthcare HR teams. No employment agency for medical jobs required.",
  features: [
    {
      title: "Verified Profiles",
      description: "Every professional's credentials, licenses, and background are pre-verified by our clinical team.",
      icon: "/verified_icon.svg",
    },
    {
      title: "Smart Shortlisting",
      description: "Our platform analyzes experience, location, and specialty to deliver the top 1% of candidates instantly.",
      icon: "/smater_icon.svg",
    },
    {
      title: "Real-Time Chat",
      description: "Communicate directly with candidates, no third-party recruiters or delayed emails.",
      icon: "/chat_icon.svg",
    },
    {
      title: "Schedule Management",
      description: "Integrated interview booking that syncs with your clinical team's existing calendars.",
      icon: "/calendar_icon.svg",
    },
    {
      title: "Hiring Analytics",
      description: "Detailed reports on time-to-hire, cost-per-hire, and retention metrics at your fingertips.",
      icon: "/hiring_analytics_icon.svg",
    },
    {
      title: "Compliant Onboarding",
      description: "Security-compliant document handling for contracts, background checks, and certifications.",
      icon: "/security_icon.svg",
    },
  ],
};

/**
 * SEO "Why Staffton" section copy for the homepage.
 * Explains why healthcare facilities choose Staffton for medical staffing.
 */
export const whyStafftonSection = {
  badge: "Hospital Staffing Platform",
  heading: "Why Healthcare Facilities Trust Staffton's Hospital Staffing Platform",
  feature: {
    title: "A Medical Staffing platform in India Built for 48-Hour Hiring",
    description:
      "In high-pressure clinical environments, vacant shifts and understaffed wards raise patient-care risks. As a dedicated medical staffing platform in India, Staffton brings average time-to-fill down to under 48 hours. By connecting hospitals with a vast network of pre-screened doctors and nurses, our healthcare staffing platform keeps emergency rooms, ICUs, and labor clinics fully operational without compromising talent quality.",
  },
  ctaLabel: "Contact Us Today",
  image: {
    src: "/images/home_section_3.webp",
    alt: "Healthcare professionals collaborating around a clinical display in a modern hospital corridor",
  },
};

/**
 * SEO "How It Works" section copy for the homepage.
 * Walks visitors through Staffton's healthcare recruitment workflow.
 */
export const seoHowItWorksSection = {
  badge: "Healthcare Recruitment Platform",
  heading: "India's Healthcare Recruitment Platform, From Post to Placement",
  subtitle:
    "By combining hiring pipelines, license verification, and communication into one dashboard, our healthcare recruitment platform cuts manual HR work so hospitals can focus on what matters most: patient care.",
  steps: [
    {
      title: "List Your Openings on India's Healthcare Job Portal",
      description:
        "Post your medical staffing needs through our smart portal. Specify clinical specialties, experience level, license requirements, and shift duration to begin instant matching on India's leading healthcare job portal.",
    },
    {
      title: "A Credential Verification Platform Built for Healthcare",
      description:
        "Our system instantly cross-checks every applicant against state medical council records. Licenses, background checks, and certifications are verified automatically, a true credential verification platform built for healthcare hiring.",
    },
    {
      title: "Hire Doctors and Nurses Online, Interview-Ready",
      description:
        "Browse ranked candidate pipelines and interview instantly through secure, HIPAA-compliant video calls or in-app chat — everything you need to hire doctors and nurses online, in one place.",
    },
    {
      title: "Placement, Powered by an Online Medical Recruitment Platform",
      description:
        "Complete paperwork digitally and finish onboarding with ready-made templates and ongoing check-ins, ensuring a smooth placement experience from day one on our healthcare workforce platform.",
    },
  ],
  image: {
    src: "/images/home_section_4.webp",
    alt: "Healthcare professional reviewing clinical staffing data on a tablet in a modern clinical setting",
  },
};

/**
 * SEO "Medical Specialties" section copy for the homepage.
 * Highlights clinical disciplines Staffton staffs and nationwide coverage.
 */
export const seoSpecialtiesSection = {
  badge: "Medical Specialties We Staff",
  heading: "A Healthcare Workforce Platform for Every Medical Specialty",
  subtitle:
    "Staffton is India's healthcare talent marketplace, connecting hospitals with verified medical professionals nationwide. From trauma rooms to specialty clinics, we ensure the perfect clinical match, every time.",
  specialties: [
    {
      title: "Emergency Medicine",
      description:
        "ER-trained physicians, trauma-certified nurses, and rapid-response coordinators ready for critical care staffing.",
      icon: "ambulance",
    },
    {
      title: "ICU & Critical Care",
      description:
        "Skilled ICU nurses, critical care physicians, and respiratory therapists for round-the-clock patient monitoring.",
      icon: "circle-x",
    },
    {
      title: "Operating Room",
      description:
        "Surgical technicians, scrub nurses, and certified nurse anesthetists for seamless OR operations.",
      icon: "test-tubes",
    },
    {
      title: "Labor & Delivery",
      description:
        "L&D specialists, postpartum nurses, and certified midwives supporting complete maternal care.",
      icon: "baby",
    },
    {
      title: "Pediatrics",
      description:
        "Pediatricians, NICU specialists, and child-life professionals trained specifically for young patients.",
      icon: "baby",
    },
    {
      title: "Cardiology",
      description:
        "Interventional cardiologists, echo technicians, and cardiac care specialists for critical heart health.",
      icon: "heart-crack",
    },
    {
      title: "Oncology",
      description:
        "Oncology-certified nurses, clinical research coordinators, and radiation therapists for precision cancer care.",
      icon: "dna",
    },
    {
      title: "Radiology",
      description:
        "MRI technologists, CT specialists, ultrasound technicians, and radiologic technologists for diagnostic imaging.",
      icon: "camera",
    },
  ],
  footnote: {
    heading: "NATIONWIDE CLINICAL STAFFING COVERAGE",
    text: "Our medical recruitment network spans nationwide, delivering pre-screened specialists to hospitals, clinics, and private practices across India. Every candidate on our healthcare hiring platform completes a rigorous 5-step credential verification process confirming licenses, certifications, and work history within 48 hours to minimize time-to-hire.",
    buttonText:"Find Your Specialist",
  },
};

/**
 * Homepage blog carousel copy (Figma: Section — Blog Cards).
 */
export const homeBlogSection = {
  badge: "Insights & Updates",
  heading: "Latest from Our Blog",
  description:
    "Stay ahead with professional career guides, healthcare recruitment insights, and administrative workflows curated by clinical staffing experts.",
  ctaLabel: "Contact Our Team",
  ctaHref: "/contact-us/",
};

/**
 * Detailed feature grid content specifically structured for the Professionals page.
 * Showcases features relevant to clinicians seeking a tailored career path.
 */
export const professionalFeaturesGrid = {
  heading: "The Career Partner You Deserve",
  subheading: "Own your professional journey with tools designed to put clinical specialists first. No more black-hole job applications.",
  features: [
    {
      title: "Healthcare-Only Jobs",
      description: "A curated marketplace exclusively for clinical roles. No distractions, just opportunities.",
      icon: "/hospital_green_bag_icon.svg",
    },
    {
      title: "Direct Chat",
      description: "Message hiring managers at top hospitals directly. Get answers for hiring related queries.",
      icon: "/green_chat_icon.svg",
    },
    {
      title: "Save Jobs",
      description: "Keep track of interesting roles and apply when you're ready with one-click applications.",
      icon: "/save_icon.svg",
    },
    {
      title: "Smart Alerts",
      description: "Get notified the very second a job matching your specialty and salary preference is posted.",
      icon: "/green_aler_notification_icon.svg",
    },
    {
      title: "Digital Credentials",
      description: "Share all your licenses and certificates through our secure messaging facility.",
      icon: "/green_bag.svg",
    },
    {
      title: "Career Insights",
      description: "See salary benchmarks and trending skills for your specialty in real-time.",
      icon: "/green_career_insights.svg",
    },
  ],
};
