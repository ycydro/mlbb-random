import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "akmweb.youngjoygame.com",
      "akmwebstatic.yuanzhanapp.com",
      "indoch.s3.ml.moonlian.com",
      "cdn.jsdelivr.net",
    ],
  },
};

export default nextConfig;
