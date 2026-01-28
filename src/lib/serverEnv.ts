// Server-only environment values with a baked fallback.
// Do NOT import this file in any client component.
//
// At runtime on Amplify, process.env in the Lambda may be empty. To ensure
// the API still has credentials, we optionally read a build-generated JSON
// (created in amplify.yml) that embeds secrets into the server bundle only.

type Key =
  | "SMTP_HOST"
  | "SMTP_PORT"
  | "SMTP_SECURE"
  | "SMTP_USER"
  | "SMTP_PASS"
  | "SMTP_FROM"
  | "CONTACT_TO";

let baked: Partial<Record<Key, string>> = {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  baked = require("./bakedEnv.json");
} catch {
  baked = {};
}

const pick = (k: Key) => process.env[k] ?? baked[k];

export const SERVER_ENV = {
  SMTP_HOST: pick("SMTP_HOST"),
  SMTP_PORT: pick("SMTP_PORT"),
  SMTP_SECURE: pick("SMTP_SECURE"),
  SMTP_USER: pick("SMTP_USER"),
  SMTP_PASS: pick("SMTP_PASS"),
  SMTP_FROM: pick("SMTP_FROM"),
  CONTACT_TO: pick("CONTACT_TO"),
} as const;
