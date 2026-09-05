import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stafftonhealth.com",
        pathname: "/blog/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/ncxpvfuo/**",
      },
    ],
  },
};

export default nextConfig;
