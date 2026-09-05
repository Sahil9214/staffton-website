import LegalPageLayout, { LegalSection } from "../components/LegalPageLayout";
import { pageMetadata } from "../utility/seo";

export const metadata = pageMetadata.termsOfService;

const termsSections: LegalSection[] = [
  {
    id: "about",
    title: "1. About Staffton Health",
    paragraphs: [
      "Staffton Health is an online healthcare recruitment platform that connects healthcare professionals, hospitals, clinics, diagnostic centers, nursing homes, and healthcare employers across India."
    ]
  },
  {
    id: "eligibility",
    title: "2. User Eligibility",
    paragraphs: [
      "Access to and use of Staffton Health is subject to standard eligibility guidelines to maintain the integrity and professional nature of the platform."
    ],
    lists: [
      {
        title: "Eligibility Requirements:",
        items: [
          "Users must be at least 18 years old.",
          "Healthcare professionals must provide accurate qualifications, registrations, certifications, and employment information.",
          "Employers must provide genuine job opportunities and accurate company information."
        ]
      }
    ]
  },
  {
    id: "registration",
    title: "3. Account Registration",
    paragraphs: [
      "To access certain platform features, you must register an account. You agree to provide accurate and complete registration information."
    ],
    lists: [
      {
        title: "Account Responsibilities:",
        items: [
          "Users are responsible for maintaining account security.",
          "Any unauthorized use of an account should be reported immediately.",
          "Staffton Health may suspend accounts that contain false or misleading information."
        ]
      }
    ]
  },
  {
    id: "listings",
    title: "4. Job Listings and Applications",
    paragraphs: [
      "Our platform enables job postings and applications, but we do not mediate or act as an employer in these transactions."
    ],
    lists: [
      {
        title: "Terms for Postings and Applications:",
        items: [
          "Employers are solely responsible for the content of their job postings.",
          "Staffton Health does not guarantee interviews, job offers, or successful placements.",
          "We reserve the right to remove any job listing that violates applicable laws or platform policies."
        ]
      }
    ]
  },
  {
    id: "credentials",
    title: "5. Professional Credentials",
    paragraphs: [
      "Professional credentials form the core of trust on Staffton Health. Verification and accuracy are critical."
    ],
    lists: [
      {
        title: "Healthcare professionals are responsible for ensuring that:",
        items: [
          "Licenses and registrations are valid.",
          "Uploaded documents are authentic.",
          "Information provided is accurate and up to date."
        ]
      }
    ]
  },
  {
    id: "acceptable-use",
    title: "6. Acceptable Use",
    paragraphs: [
      "Users must utilize the platform in a respectful, lawful, and professional manner."
    ],
    lists: [
      {
        title: "Users agree not to:",
        items: [
          "Post false or misleading information.",
          "Use the platform for unlawful purposes.",
          "Interfere with platform operations.",
          "Collect data from other users without authorization."
        ]
      }
    ]
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property",
    paragraphs: [
      "All content, trademarks, logos, software, and platform features are the property of Staffton Health and may not be copied or reproduced without permission."
    ]
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    paragraphs: [
      "Staffton Health acts solely as a technology platform facilitating recruitment connections. We do not participate in actual hiring or employment contracts."
    ],
    lists: [
      {
        title: "Staffton Health is not responsible for:",
        items: [
          "Hiring decisions.",
          "Employment disputes.",
          "Salary negotiations.",
          "Verification of credentials beyond information provided by users."
        ]
      }
    ]
  },
  {
    id: "termination",
    title: "9. Termination",
    paragraphs: [
      "We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent behavior, or breach platform guidelines."
    ]
  },
  {
    id: "contact",
    title: "10. Contact Information",
    paragraphs: [
      "If you have any questions or concerns regarding these Terms of Service, please contact us:",
      "Staffton Health",
      "Email: info@stafftonhealth.com"
    ]
  }
];

export default function TermsOfServicePage() {
  return (
    <main className="w-full">
      <LegalPageLayout
        title="Terms of Service"
        effectiveDate="Effective Date: June 2026"
        sections={termsSections}
      />
    </main>
  );
}
