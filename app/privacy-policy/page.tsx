import LegalPageLayout, { LegalSection } from "../components/LegalPageLayout";
import { pageMetadata } from "../utility/seo";

export const metadata = pageMetadata.privacyPolicy;

const privacySections: LegalSection[] = [
  {
    id: "collect",
    title: "1. Information We Collect",
    paragraphs: [
      "We collect various types of information from our users to provide healthcare recruitment services and connect candidates with the right healthcare facilities across India."
    ],
    lists: [
      {
        title: "Healthcare Professionals",
        items: [
          "Name",
          "Email address",
          "Mobile number",
          "Address (optional)",
          "Resume/CV",
          "Qualifications and certifications",
          "Employment history",
          "Profile photo (optional)"
        ]
      },
      {
        title: "Employers",
        items: [
          "Organization name",
          "Contact person details",
          "Email and phone number",
          "Job posting information"
        ]
      }
    ]
  },
  {
    id: "purpose",
    title: "2. Purpose of Data Collection",
    paragraphs: [
      "The information we gather serves dedicated purposes to ensure a high-trust, functional experience on our recruitment platform."
    ],
    lists: [
      {
        title: "We collect information to:",
        items: [
          "Create user accounts.",
          "Match candidates with healthcare jobs.",
          "Facilitate communication between employers and candidates.",
          "Improve platform performance.",
          "Send important service notifications."
        ]
      }
    ]
  },
  {
    id: "consent",
    title: "3. Consent",
    paragraphs: [
      "By registering on Staffton Health, users consent to the collection, storage, and processing of personal data for recruitment-related purposes."
    ]
  },
  {
    id: "sharing",
    title: "4. Data Sharing",
    paragraphs: [
      "To connect healthcare professionals with recruiters, we share profile details with registered health institutions. We hold privacy in high regard and will never sell your personal information to third parties."
    ],
    lists: [
      {
        title: "We may share candidate information with:",
        items: [
          "Hospitals",
          "Clinics",
          "Diagnostic centers",
          "Nursing homes",
          "Healthcare employers registered on the platform"
        ]
      }
    ]
  },
  {
    id: "security",
    title: "5. Data Security",
    paragraphs: [
      "We implement reasonable technical and organizational measures to protect personal information from unauthorized access, disclosure, or misuse."
    ]
  },
  {
    id: "retention",
    title: "6. Data Retention",
    paragraphs: [
      "We retain personal information only as long as necessary to provide services and comply with legal obligations."
    ]
  },
  {
    id: "rights",
    title: "7. User Rights",
    paragraphs: [
      "We believe you should have control over your data. Registered users are entitled to several rights regarding their personal data."
    ],
    lists: [
      {
        title: "Users may:",
        items: [
          "Access their information.",
          "Update profile details.",
          "Request correction of inaccurate information.",
          "Request account deletion by contacting us."
        ]
      }
    ]
  },
  {
    id: "cookies",
    title: "8. Cookies",
    paragraphs: [
      "We may use cookies and similar technologies to improve user experience, store preferences, and analyze website usage to optimize our layout."
    ]
  },
  {
    id: "changes",
    title: "9. Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy periodically. Any changes will be posted on our website. We recommend checking this page from time to time to stay informed about how we protect your information."
    ]
  },
  {
    id: "contact",
    title: "10. Contact Us",
    paragraphs: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, feel free to reach out to us:",
      "Staffton Health",
      "Email: info@stafftonhealth.com"
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full">
      <LegalPageLayout
        title="Privacy Policy"
        effectiveDate="Effective Date: June 2026"
        sections={privacySections}
      />
    </main>
  );
}
