import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skips ESLint checks during builds
  }
};

export default nextConfig;
