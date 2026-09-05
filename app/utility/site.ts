/**
 * Site identity constants (URL, name, default description, contact).
 * Page-level titles/descriptions live in ./seo.ts — share that file with SEO.
 */
export const SITE_URL = "https://stafftonhealth.com";

export const SITE_NAME = "Staffton Health";

/** Canonical hospitals / best-medical-staffing-companies marketing page. */
export const HIRE_TALENT_PATH = "/best-medical-staffing-companies";

export const SITE_DESCRIPTION =
  "Staffton is India's healthcare hiring platform connecting hospitals with verified doctors and nurses. Automated credentials, real-time matching, hire in 48h.";

export const ORGANIZATION_DESCRIPTION =
  "Staffton is a healthcare hiring platform connecting hospitals and medical professionals across India through verified job matching, credential checks, and real-time hiring chat.";

export const CONTACT_EMAIL = "info@stafftonhealth.com";

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/people/Staffton-Health/61590806815638/",
  instagram: "https://www.instagram.com/stafftonhealth/",
  linkedin: "https://www.linkedin.com/company/staffton-health/",
  twitter: "https://x.com/stafftonhealth",
};

/**
 * Staffton app base URL.
 * Defaults to development URL ("https://d3gifdjcbs2hsb.cloudfront.net"),
 * but can be overridden with NEXT_PUBLIC_API_FRONTEND_URL for production ("https://app.stafftonhealth.com").
 */
export const APP_BASE_URL = (
  process.env.NEXT_PUBLIC_API_FRONTEND_URL ||
  "https://d3gifdjcbs2hsb.cloudfront.net"
).replace(/\/$/, "");

/**
 * Returns direct application/detail URL for a specific job in the app.
 * e.g. https://d3gifdjcbs2hsb.cloudfront.net/jobs/:jobId
 */
export const getJobApplicationUrl = (jobId?: string) => {
  if (!jobId) {
    return `${APP_BASE_URL}/jobs`;
  }
  return `${APP_BASE_URL}/jobs/${jobId}`;
};

/** Absolute URL helper — keeps trailing-slash format consistent with next.config.ts */
export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.endsWith("/") || path === "" ? path : `${path}/`}`;
