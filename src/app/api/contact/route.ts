import { NextResponse } from "next/server";
import nodemailer, { type SendMailOptions } from "nodemailer";

export const runtime = "nodejs"; // ensure Node runtime (not Edge)
export const dynamic = "force-dynamic"; // avoid caching for health check

function missing(...keys: Array<keyof NodeJS.ProcessEnv>) {
  const miss = keys.filter((k) => !process.env[k]);
  return miss.length ? `Missing env: ${miss.join(", ")}` : null;
}

function boolFromEnv(v: string | undefined, fallback: boolean) {
  if (v == null) return fallback;
  const s = v.trim().toLowerCase();
  return s === "1" || s === "true" || s === "yes";
}

// Quick health check: GET /api/contact
export async function GET() {
  const err = missing("SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS");
  return NextResponse.json(
    {
      ok: !err,
      env: {
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER ? "set" : "missing",
        CONTACT_TO: process.env.CONTACT_TO || "(default to SMTP_USER)",
      },
      note: err ?? "envs look OK",
    },
    { status: err ? 500 : 200 }
  );
}

type ContactBody = {
  name?: string;
  email?: string;
  workType?: string;
  timeframe?: string;
  comments?: string;
};

export async function POST(req: Request) {
  try {
    const envErr = missing("SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS");
    if (envErr) {
      return NextResponse.json({ ok: false, error: envErr }, { status: 500 });
    }

    // Avoid 'any' from req.json() by routing through unknown first
    const raw = (await req.json()) as unknown;
    const body = raw as ContactBody;

    const { name, email, workType, timeframe, comments } = body;

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Safe, narrowed copies after the env check above
    const SMTP_HOST = process.env.SMTP_HOST as string;
    const SMTP_PORT = Number(process.env.SMTP_PORT);
    const SMTP_USER = process.env.SMTP_USER as string;
    const SMTP_PASS = process.env.SMTP_PASS as string;
    const CONTACT_TO = (process.env.CONTACT_TO as string | undefined) ?? SMTP_USER;

    const secureByPort = SMTP_PORT === 465;
    const secureEnv = boolFromEnv(process.env.SMTP_SECURE, secureByPort);

    const commonOpts = {
      host: SMTP_HOST,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      logger: true,
      debug: true,
      connectionTimeout: 20_000,
      greetingTimeout: 15_000,
      socketTimeout: 30_000,
      tls: { servername: SMTP_HOST },
    } as const;

    // Primary transport (465 if secure; else whatever you set)
    const primary = nodemailer.createTransport({
      ...commonOpts,
      port: SMTP_PORT,
      secure: secureEnv,
    });

    const mail: SendMailOptions = {
      from: `"${name}" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Portfolio Contact — ${workType || "General"}`,
      text: `Name: ${name}\nEmail: ${email}\nType of Work: ${workType || ""}\nTimeframe: ${timeframe || ""}\n\nAdditional Comments:\n${comments || "(none)"}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Type of Work:</strong> ${escapeHtml(workType || "")}</p>
        <p><strong>Timeframe:</strong> ${escapeHtml(timeframe || "")}</p>
        <p><strong>Additional Comments:</strong></p>
        <p>${escapeHtml(comments || "(none)").replace(/\n/g, '<br/>')}</p>
      `,
    };

    try {
      await primary.sendMail(mail);
    } catch (e: unknown) {
      // Fallback: 587 STARTTLS (some networks block 465)
      console.warn("SMTP primary failed, retrying 587 STARTTLS…", e);
      const fallback = nodemailer.createTransport({
        ...commonOpts,
        port: 587,
        secure: false,
        requireTLS: true,
      });
      await fallback.sendMail(mail);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Failed to send";
    console.error("Mail error:", err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

/** Minimal HTML escaper to keep email content safe-ish */
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
