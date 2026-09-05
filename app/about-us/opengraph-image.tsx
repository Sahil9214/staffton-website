import { ImageResponse } from "next/og";
import { colorValue } from "../utility/colors";

export const dynamic = "force-static";

export const alt =
  "About Staffton Health | Healthcare Recruitment Platform";

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
          background: `linear-gradient(135deg, ${colorValue["gradient-og-from"]} 0%, ${colorValue["brand-darker"]} 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo row */}
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

        {/* Label */}
        <div
          style={{
            color: colorValue["accent-mint"] || "#86f2e4",
            fontSize: "26px",
            fontWeight: 600,
            marginBottom: "16px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Our Story
        </div>

        {/* Headline */}
        <div
          style={{
            color: colorValue.white,
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: "950px",
          }}
        >
          Connecting healthcare professionals with the best hospitals.
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "56px",
            color: colorValue["accent-lighter"],
            fontSize: "28px",
            fontWeight: 600,
          }}
        >
          <div>500+ Hospitals</div>
          <div>15k+ Professionals</div>
          <div>Based in Bangalore, India</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
