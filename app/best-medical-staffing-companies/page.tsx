import { pageMetadata } from "../utility/seo";
import HospitalsLanding from "./HospitalsLanding";

export const metadata = pageMetadata.hireTalent;

export default function HireTalentPage() {
  return (
    <HospitalsLanding
      breadcrumbName="Hire Talent"
      breadcrumbPath="/best-medical-staffing-companies"
    />
  );
}
