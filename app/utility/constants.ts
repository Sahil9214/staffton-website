/**
 * Navigation links displayed in the desktop and mobile header navbar.
 * Helps users navigate between Home, For Hospitals, and For Professionals pages.
 */
export const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "For Hospitals", href: "/for-hospitals" },
  { name: "For Professionals", href: "/for-professionals" },
];

/**
 * Key selling points displayed in the Hero section of the homepage.
 * Communicates core capabilities (verification, pipeline management, communication) to general visitors.
 */
export const homeHeroFeatures = [
  "Automated Credential Verification",
  "Jobs pipelines for easy pool management.",
  "One step communication solution with in app chat.",
  "Real-time Matchmaking.",
  "Direct messaging facilities.",
];

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
 * Core benefits displayed in the Hero section of the For Hospitals page.
 * Highlights trust, compliance, and messaging tailored to hiring managers/facilities.
 */
export const hospitalHeroFeatures = [
  "Automated Credential Verification",
  "Real-time Messaging",
  "Direct hospital-to-candidate messaging",
];

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
    description: "Setup your hospital profile and verify your facility in minutes.",
  },
  {
    title: "Post Precise Roles",
    description: "Define requirements, shift patterns, and benefits with our smart editor.",
  },
  {
    title: "Review & Shortlist",
    description: "Browse through ranked candidates with pre-verified credentials.",
  },
  {
    title: "Instant Direct Chat",
    description: "Interview candidates through our secure in-platform messenger.",
  },
  {
    title: "Secure Hire",
    description: "Finalize contracts and start onboarding instantly.",
  },
];

/**
 * Onboarding and career steps for healthcare professionals (Clinicians).
 * Guides professionals from building profiles to applying and communicating with hospitals.
 */
export const professionalOnboardingSteps = [
  {
    title: "Create Elite Profile",
    description: "Build your medical resume and upload certifications for verification.",
  },
  {
    title: "Browse Top Jobs",
    description: "Filter by specialty, pay, and facility type to find your match.",
  },
  {
    title: "Apply with One Click",
    description: "Send your verified credentials instantly to hiring managers.",
  },
  {
    title: "Chat with Hospitals",
    description: "Connect directly with the team you'll be working with.",
  },
  {
    title: "Track Application",
    description: "Get real-time status updates on every step of your hiring journey.",
  },
];

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
 * Security and privacy features listed under the trust section for professionals.
 * Emphasizes data encryption, clinical vetting, and privacy controls.
 */
export const trustSecurityFeatures = [
  {
    title: "Security Compliant",
    description: "Enterprise-grade encryption for all candidate documents and private health organization data.",
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
    description: "Monitor candidate pipeline in real-time as soon as there is progress.",
    icon: "/live_telemetry_icon.svg",
  },
  {
    title: "Instant Notifications",
    description: "Get notified on email and platform for candidate related updates.",
    icon: "/notification_icon.svg",
  },
  {
    title: "Leakage Proof",
    description: "Pipelines to ensure you dont miss out on any candidate you shortlisted.",
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
    description: "We don't just accept resumes. Every professional undergoes a multi-stage clinical assessment and peer-review process before joining our instrad of Aeline Network.",
  },
  {
    number: "02",
    title: "Algorithmic Matching",
    description: "Our proprietary AI matches professionals based on clinical competency, procedural experience, and facility culture fit, ensuring a 98.4% retention rate.",
  },
  {
    number: "03",
    title: "Continuous Quality Management",
    description: "Post-deployment analytics provide hospitals with actionable data on staff performance and patient outcome correlations.",
  },
];

/**
 * Frequently Asked Questions (FAQ) list.
 * Explains what Staffton does, how it improves recruitment, its features, and hospital system integrations.
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
 * Detailed feature grid content specifically structured for the Hospitals page.
 * Highlights verified profiles, smart shortlists, scheduling, and onboarding tools.
 */
export const hospitalFeaturesGrid = {
  heading: "Empowering Hospital HR with Precision",
  subheading: "Streamline your entire medical staffing lifecycle with enterprise-grade tools designed specifically for healthcare environments.",
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
      description: "Communicate directly with candidates. No third-party recruiters or delayed emails.",
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
