import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Ensure legacy /favicon.ico requests resolve to our PNG favicon
      { source: "/favicon.ico", destination: "/profile-picture.png?v=2" },
    ];
  },
};

export default nextConfig;
