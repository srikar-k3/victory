import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure server-only deps like nodemailer are resolved externally
  // and not bundled by Turbopack.
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
