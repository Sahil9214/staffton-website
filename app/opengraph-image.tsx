import { ImageResponse } from "next/og";
import { colorValue } from "./utility/colors";

export const dynamic = "force-static";

export const alt =
  "Staffton - Healthcare Hiring Platform for Doctors & Nurses";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: `linear-gradient(135deg, ${colorValue["gradient-og-from"]} 0%, ${colorValue["gradient-og-to"]} 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: colorValue.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colorValue.white,
              fontSize: "36px",
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div
            style={{
              color: colorValue["accent-light"],
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            Staffton Health
          </div>
        </div>

        <div
          style={{
            color: colorValue.white,
            fontSize: "68px",
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: "1000px",
          }}
        >
          Healthcare hiring, built for hospitals & medical professionals.
        </div>

        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "56px",
            color: colorValue["accent-lighter"],
            fontSize: "30px",
            fontWeight: 600,
          }}
        >
          <div>500+ Hospitals</div>
          <div>15k+ Verified Professionals</div>
          <div>48h Avg. Time to Hire</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
