/**
 * Login / Sign Up redirect URLs.
 *
 * Change the strings below — Navbar and home CTAs read from this file.
 */
import { APP_BASE_URL, HIRE_TALENT_PATH } from "./site";

/** Home page — edit these two when the app URLs change. */
export const HOME_AUTH_URLS = {
  login: "https://app.stafftonhealth.com/auth/register",
  signup: "https://app.stafftonhealth.com/",
} as const;

export const APP_AUTH_URLS = {
  homeLogin: HOME_AUTH_URLS.login,
  homeSignup: HOME_AUTH_URLS.signup,

  /** Other marketing pages (About, Contact, etc.) */
  login: `/contact-us/`,
  signup: `/contact-us/`,

  /** Hire Talent / hospitals */
  hospitalLogin: `${APP_BASE_URL}/auth/login`,
  hospitalSignup: `${APP_BASE_URL}/auth/request-access`,

  /** Jobs / professionals */
  professionalLogin: `${APP_BASE_URL}/auth/login`,
  professionalSignup: `${APP_BASE_URL}/auth/register?role=job`,
} as const;

const isHomePath = (path: string) => path === "/";

const isHireTalentPath = (path: string) =>
  path === HIRE_TALENT_PATH || path === "/for-hospitals";

const isJobsPath = (path: string) =>
  path === "/nurse-doctor-jobs-india" || path.startsWith("/jobs/in/");

/** Pick login / signup URLs based on the current marketing page. */
export const getAuthUrls = (pathname: string) => {
  const path = pathname.replace(/\/$/, "") || "/";

  if (isHomePath(path)) {
    return {
      login: APP_AUTH_URLS.homeLogin,
      signup: APP_AUTH_URLS.homeSignup,
    };
  }

  if (isHireTalentPath(path)) {
    return {
      login: APP_AUTH_URLS.hospitalLogin,
      signup: APP_AUTH_URLS.hospitalSignup,
    };
  }

  if (isJobsPath(path)) {
    return {
      login: APP_AUTH_URLS.professionalLogin,
      signup: APP_AUTH_URLS.professionalSignup,
    };
  }

  return {
    login: APP_AUTH_URLS.login,
    signup: APP_AUTH_URLS.signup,
  };
};
