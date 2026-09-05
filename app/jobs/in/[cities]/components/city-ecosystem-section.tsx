import React from "react";
import { Info } from "lucide-react";
import MediaTextSection from "../../../../components/sections/MediaTextSection";
import { roleSlugToApiRole } from "../../../../utility/jobs-api";

interface CityEcosystemSectionProps {
  city: string;
  role?: string;
}

interface CityEcosystemData {
  paragraphs: string[];
}

const CITY_ECOSYSTEM_DATA: Record<string, CityEcosystemData> = {
  Ahmedabad: {
    paragraphs: [
      "Ahmedabad's healthcare network has expanded rapidly along the SG Highway and Civil Hospital corridors, with multi-specialty private hospitals now operating alongside major government institutions across the city and neighboring Gandhinagar. The demand for verified, qualified clinical talent has grown just as fast, especially in ICU, NICU, and OT specialties.",
      "Clinical salaries in Ahmedabad offer strong career growth for doctors, nurses, technicians, and healthcare professionals. With Staffton, candidates can bypass recruitment consultancies and establish transparent, direct salary baselines with institutional human resource heads.",
    ],
  },
  Bengaluru: {
    paragraphs: [
      "Bengaluru's world-class medical ecosystem spans premier tertiary hospitals, super-specialty research centers, and fast-growing health corridors across Whitefield, Bannerghatta, and Hebbal. The region requires highly credentialed medical talent across oncology, cardiology, critical care, and robotic surgery.",
      "Healthcare salaries in Bengaluru offer competitive compensation depending on clinical specialization and NABH/JCI facility accreditation. Staffton connects clinicians directly to hiring authorities without third-party commission deductions.",
    ],
  },
  Mumbai: {
    paragraphs: [
      "Mumbai's healthcare infrastructure features premier institutional hospitals and high-volume trauma care centers across South Mumbai, the Western Suburbs, and Navi Mumbai. The constant demand for clinical specialists in emergency medicine, neonatal care, and critical care drives high placement velocity.",
      "Competitive compensation in Mumbai is available for qualified physicians, nurses, technicians, and clinical leads. Staffton streamlines direct communication with hospital HR teams, reducing hiring delays from weeks to days.",
    ],
  },
  Pune: {
    paragraphs: [
      "Pune has emerged as a premier healthcare and medical education hub in western India, with extensive multi-specialty setups in Kothrud, Baner, and Hadapsar. Hospitals actively recruit certified clinical talent with expertise in perioperative care, pediatrics, and critical diagnostics.",
      "Healthcare professional salaries in Pune offer transparent career progression. Through Staffton, healthcare professionals connect directly with verified hospitals to secure direct offers.",
    ],
  },
  Delhi: {
    paragraphs: [
      "The Delhi NCR healthcare landscape brings together national apex institutes and internationally accredited private healthcare networks across Delhi, Gurugram, and Noida. The ecosystem has ongoing demand for skilled professionals in critical care, organ transplant units, and cardiac care.",
      "Medical packages in Delhi NCR are among the most competitive in India for specialized roles. Staffton enables direct hospital interaction, transparent salary benchmarks, and rapid onboarding.",
    ],
  },
  Chennai: {
    paragraphs: [
      "Chennai, widely recognized as a primary healthcare capital in South India, attracts domestic and international patients across major multi-specialty and research centers. Facilities maintain high demand for experienced clinicians in surgical suites, intensive care, and oncology units.",
      "Compensation in Chennai offers excellent stability for specialized clinicians. Staffton's credential-first platform provides clinicians direct access to hiring hospital departments.",
    ],
  },
  Indore: {
    paragraphs: [
      "Indore has established itself as central India's primary medical destination, with expanding private multi-specialty centers and tertiary medical institutions across the city. Clinical roles in emergency, ICU, and maternal care continue to expand steadily.",
      "Staff compensation in Indore is growing rapidly. Staffton helps local medical professionals access verified opportunities directly without middleman commissions.",
    ],
  },
  Hyderabad: {
    paragraphs: [
      "Hyderabad's healthcare corridor in HITEC City, Banjara Hills, and Gachibowli boasts premier multi-specialty hospitals with cutting-edge medical infrastructure. The demand for qualified medical specialists in critical care, dialysis, and surgical care remains consistently high.",
      "Salaries in Hyderabad offer great career growth for certified healthcare specialists. Staffton eliminates middlemen, putting hiring decisions and direct communication into candidates' hands.",
    ],
  },
  Kolkata: {
    paragraphs: [
      "Kolkata serves as eastern India's primary healthcare hub, with major multi-specialty hospitals and specialized clinics centered around EM Bypass and Salt Lake. The city regularly recruits certified clinical talent across intensive care, cardiology, and general wards.",
      "Clinical salaries in Kolkata reward experience and specialization. Staffton provides direct access to credential-checked hospital positions.",
    ],
  },
};

const CityEcosystemSection = ({ city, role }: CityEcosystemSectionProps) => {
  const roleName = role ? roleSlugToApiRole(role) : undefined;
  const headingText = roleName
    ? `About ${roleName} Jobs in ${city}`
    : `About Healthcare Jobs in ${city}`;

  const cityData = CITY_ECOSYSTEM_DATA[city] || {
    paragraphs: [
      `${city}'s healthcare network continues to expand with modern multi-specialty hospitals and clinical centers providing comprehensive medical care across the region. The demand for verified, qualified clinical talent is strong across ICU, emergency, and inpatient departments.`,
      `Healthcare salaries in ${city} offer competitive career growth for credentialed healthcare workers. With Staffton, candidates can bypass recruitment consultancies and establish transparent, direct salary baselines with institutional human resource heads.`,
    ],
  };

  return (
    <MediaTextSection
      badge={`${city} Clinical Ecosystem`}
      badgeIcon={Info}
      heading={headingText}
      paragraphs={cityData.paragraphs}
      ctaLabel="Contact Us Today"
      ctaHref="/contact-us/"
      image={{
        src: "/images/city_clinical_ecosystem.jpg",
        alt: `About healthcare jobs in ${city}`,
      }}
      background="bg-surface-page"
    />
  );
};

export default CityEcosystemSection;

