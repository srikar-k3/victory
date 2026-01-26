import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const secretBag = (process as unknown as { env?: { secrets?: Record<string, string> } })?.env?.secrets;
  const safe = (name: string) => {
    const v = process.env[name] ?? secretBag?.[name];
    if (v == null) return { present: false };
    return { present: true, length: String(v).length };
  };

  return NextResponse.json({
    node: process.versions.node,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      AMPLIFY_APP_ID: Boolean(process.env.AMPLIFY_APP_ID),
      AMPLIFY_BRANCH: process.env.AMPLIFY_BRANCH || null,
      SMTP_HOST: safe("SMTP_HOST"),
      SMTP_USER: safe("SMTP_USER"),
      SMTP_PASS: safe("SMTP_PASS"),
      SMTP_PORT: process.env.SMTP_PORT ?? secretBag?.SMTP_PORT ?? null,
      SMTP_SECURE: process.env.SMTP_SECURE ?? secretBag?.SMTP_SECURE ?? null,
    },
  });
}
