import { ImageResponse } from "next/og";
import { colorValue } from "../utility/colors";

export const dynamic = "force-static";

export const alt = "Contact Staffton Health | Hire Faster or Get Hired";

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
          background: `linear-gradient(135deg, #0f172a 0%, ${colorValue["gradient-og-to"]} 100%)`,
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
          Get in Touch
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
          Let&apos;s talk healthcare hiring.
        </div>

        {/* Sub-line */}
        <div
          style={{
            color: colorValue["accent-lighter"],
            fontSize: "30px",
            fontWeight: 500,
            marginTop: "24px",
          }}
        >
          info@stafftonhealth.com · Bangalore, India
        </div>

        {/* CTA tags */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "48px",
          }}
        >
          {["Hospital Hiring", "Job Queries", "Partnerships", "Support"].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: colorValue["accent-lighter"],
                  borderRadius: "999px",
                  padding: "8px 24px",
                  fontSize: "22px",
                  fontWeight: 600,
                  border: `1px solid rgba(255,255,255,0.15)`,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
