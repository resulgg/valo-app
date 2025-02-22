import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "media.valorant-api.com",
      },
      {
        hostname: "cdn2.thecatapi.com",
      },
    ],
  },
};

export default nextConfig;
