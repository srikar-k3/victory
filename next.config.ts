/* eslint-disable no-console */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure server-only deps like nodemailer are resolved externally
  // and not bundled by Turbopack.
  serverExternalPackages: ["nodemailer"],
};

// Minimal build-time diagnostics so we can confirm env presence in CI
try {
  const show = (k: string) => {
    const v = process.env[k];
    const hint = v ? `(len=${String(v).length})` : "(missing)";
    // Avoid printing secrets; just log presence
    console.log(`[build-env] ${k}: ${hint}`);
  };
  if (process.env.AMPLIFY_BRANCH || process.env.CI) {
    [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_SECURE",
      "SMTP_USER",
      "SMTP_PASS",
      "SMTP_FROM",
      "CONTACT_TO",
    ].forEach(show);
  }
} catch {}

export default nextConfig;
