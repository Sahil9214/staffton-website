import type { Metadata } from "next";
import LegalPageLayout, { LegalSection } from "../components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy - Staffton Health",
  description: "Read the Staffton Health Cookie Policy to understand how we use cookies, tracking technologies, and how you can manage your preferences.",
};

const cookieSections: LegalSection[] = [
  {
    id: "introduction",
    title: "1. What Are Cookies?",
    paragraphs: [
      "Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.",
      "At Staffton Health, we use cookies and similar tracking technologies to enhance your browsing experience, provide secure authentication, customize content, and analyze our traffic."
    ]
  },
  {
    id: "how-we-use",
    title: "2. How We Use Cookies",
    paragraphs: [
      "We use cookies to improve your user experience and make our services run smoothly. Cookies help us identify your session when you log in, remember your preferences, and protect candidate and employer accounts from unauthorized access."
    ]
  },
  {
    id: "categories",
    title: "3. Cookie Categories We Use",
    paragraphs: [
      "The cookies we use are classified into the following categories depending on their function and purpose on our platform:"
    ],
    lists: [
      {
        title: "1. Essential Cookies (Always Active)",
        items: [
          "User authentication: Keeping you securely logged in during your session.",
          "OTP verification: Verifying your identity during registration and login.",
          "Security and fraud prevention: Detecting suspicious activities and preventing unauthorized account access.",
          "Platform functionality: Ensuring page elements load correctly and session state is preserved."
        ]
      },
      {
        title: "2. Functional Cookies",
        items: [
          "Remembering user preferences: Storing your language settings or view preferences.",
          "Saved filters: Remembering search filters for candidates or job listings so you don't have to re-enter them.",
          "Dashboard personalization: Customizing layouts based on whether you are a hospital employer or a healthcare professional."
        ]
      },
      {
        title: "3. Analytics Cookies",
        items: [
          "Understanding user behavior: Gathering insights into how candidates and employers navigate the website.",
          "Measuring feature adoption: Evaluating which features are most useful to help us make improvement decisions.",
          "Performance monitoring: Tracking site loading speeds and identifying potential bugs or errors."
        ]
      },
      {
        title: "4. Security Cookies",
        items: [
          "Threat identification: Recognizing and blocking malicious traffic.",
          "Data integrity: Keeping your resume, credentials, and organizational details secure.",
          "Session control: Expiring inactive sessions to safeguard sensitive profile details."
        ]
      }
    ]
  },
  {
    id: "consent-management",
    title: "4. Managing Your Cookie Preferences",
    paragraphs: [
      "We respect your right to privacy. Non-essential cookies (such as Functional and Analytics cookies) are only activated after you provide consent through our Cookie Consent Banner.",
      "You can accept all cookies, reject non-essential ones, or customize your settings directly through our Cookie Consent Banner when visiting the platform. You can also adjust your cookie settings at any time or clear cookies through your web browser preferences."
    ],
    lists: [
      {
        title: "Browser controls allow you to:",
        items: [
          "Block all cookies (which may prevent some features of Staffton Health from working properly).",
          "Delete existing cookies from your browser history.",
          "Configure notifications whenever a new cookie is placed on your device."
        ]
      }
    ]
  },
  {
    id: "changes",
    title: "5. Changes to This Cookie Policy",
    paragraphs: [
      "We may update this Cookie Policy from time to time in response to changing legal, technical, or business developments. When we update our Cookie Policy, we will take appropriate measures to inform you, consistent with the significance of the changes we make.",
      "We recommend that you review this page periodically for the latest information on our cookie practices."
    ]
  },
  {
    id: "contact",
    title: "6. Contact Us",
    paragraphs: [
      "If you have any questions, concerns, or requests regarding this Cookie Policy or how we handle cookies on the Staffton Health platform, please contact us:",
      "Staffton Health",
      "Email: info@stafftonhealth.com"
    ]
  }
];

export default function CookiePolicyPage() {
  return (
    <main className="w-full">
      <LegalPageLayout
        title="Cookie Policy"
        effectiveDate="Effective Date: June 2026"
        sections={cookieSections}
      />
    </main>
  );
}
