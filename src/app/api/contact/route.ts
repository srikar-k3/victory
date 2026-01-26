import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure Node runtime for SMTP
export const dynamic = "force-dynamic"; // avoid CDN caching

// Helpers similar to working srikar-portfolio implementation
function missing(...keys: Array<keyof NodeJS.ProcessEnv>) {
  const miss = keys.filter((k) => !process.env[k]);
  return miss.length ? miss : null;
}

function boolFromEnv(v: string | undefined, fallback: boolean) {
  if (v == null) return fallback;
  const s = v.trim().toLowerCase();
  return s === "1" || s === "true" || s === "yes";
}

// Minimal HTML escaper
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Optional health check like portfolio: GET /api/contact
export async function GET() {
  const miss = missing("SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS");
  return NextResponse.json(
    {
      ok: !miss,
      env: {
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER ? "set" : "missing",
        CONTACT_TO: process.env.CONTACT_TO || "(default to SMTP_USER)",
      },
      note: miss ? `Missing env: ${miss.join(", ")}` : "envs look OK",
    },
    { status: miss ? 500 : 200 },
  );
}

export async function POST(req: Request) {
  try {
    // Parse both JSON and form posts
    const contentType = req.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const body: any = isJson ? await req.json().catch(() => ({})) : Object.fromEntries((await req.formData()).entries());

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const subject = String(body?.subject || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const miss = missing("SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS");
    if (miss) {
      return NextResponse.json({ error: `Email transport not configured`, missing: miss }, { status: 500 });
    }

    // Read env at runtime (works on AWS like portfolio)
    const SMTP_HOST = process.env.SMTP_HOST as string;
    const SMTP_PORT = Number(process.env.SMTP_PORT);
    const SMTP_USER = process.env.SMTP_USER as string;
    const SMTP_PASS = process.env.SMTP_PASS as string;
    const SMTP_SECURE = boolFromEnv(process.env.SMTP_SECURE, SMTP_PORT === 465);
    const CONTACT_TO = (process.env.CONTACT_TO as string | undefined) || SMTP_USER || "victoryinvolumes@gmail.com";
    const FROM_EMAIL = (process.env.SMTP_FROM as string | undefined) || SMTP_USER || `no-reply@${SMTP_HOST}`;

    // Lazy import to keep on server only
    const { default: nodemailer } = await import("nodemailer");

    const commonOpts = {
      host: SMTP_HOST,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      logger: false,
      debug: false,
      connectionTimeout: 20_000,
      greetingTimeout: 15_000,
      socketTimeout: 30_000,
      tls: { servername: SMTP_HOST },
    } as const;

    // Primary transport based on env
    const primary = nodemailer.createTransport({
      ...commonOpts,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
    } as any);

    const mailSubject = `[Victory] ${subject}`;
    const text = `New message from Victory contact form\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size: 16px; color: #111;">
        <p>New message from Victory contact form</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
      </div>
    `;

    const mail = {
      to: CONTACT_TO,
      from: FROM_EMAIL,
      subject: mailSubject,
      text,
      html,
      replyTo: email,
    } as any;

    try {
      await primary.sendMail(mail);
    } catch (e) {
      // Fallback to 587 STARTTLS (some environments block 465)
      const fallback = nodemailer.createTransport({
        ...commonOpts,
        port: 587,
        secure: false,
        requireTLS: true,
      } as any);
      await fallback.sendMail(mail);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error", err);
    const msg = err instanceof Error ? err.message : "Failed to send message";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
