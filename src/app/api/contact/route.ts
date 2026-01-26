import { NextResponse } from "next/server";
import { SERVER_ENV } from "@/lib/serverEnv";

export const runtime = "nodejs"; // ensure Node runtime for SMTP
export const dynamic = "force-dynamic"; // avoid CDN caching

// Simple validation helper
function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    // Support both JSON (from fetch) and form POSTs
    let name = "";
    let email = "";
    let subject = "";
    let message = "";

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      name = (body?.name ?? "").toString();
      email = (body?.email ?? "").toString();
      subject = (body?.subject ?? "").toString();
      message = (body?.message ?? "").toString();
    } else {
      const form = await req.formData();
      name = (form.get("name") ?? "").toString();
      email = (form.get("email") ?? "").toString();
      subject = (form.get("subject") ?? "").toString();
      message = (form.get("message") ?? "").toString();
    }

    // Basic validation
    if (!isNonEmptyString(name)) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!isNonEmptyString(email) || !/.+@.+\..+/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!isNonEmptyString(subject)) {
      return NextResponse.json({ error: "Subject is required" }, { status: 400 });
    }
    if (!isNonEmptyString(message)) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Config captured at build time (works on Amplify when using Hosting env vars)
    const SMTP_HOST = SERVER_ENV.SMTP_HOST;
    const SMTP_PORT = Number(SERVER_ENV.SMTP_PORT || 587);
    const SMTP_USER = SERVER_ENV.SMTP_USER;
    const SMTP_PASS = SERVER_ENV.SMTP_PASS;
    const SMTP_SECURE = String(SERVER_ENV.SMTP_SECURE || "false").toLowerCase() === "true" || SMTP_PORT === 465;
    const CONTACT_TO = SERVER_ENV.CONTACT_TO || "victoryinvolumes@gmail.com";
    const FROM_EMAIL = SERVER_ENV.SMTP_FROM || SMTP_USER || `no-reply@${SMTP_HOST ?? "localhost"}`;

    const missing: string[] = [];
    if (!SMTP_HOST) missing.push("SMTP_HOST");
    if (!SMTP_PORT) missing.push("SMTP_PORT");
    if (!SMTP_USER) missing.push("SMTP_USER");
    if (!SMTP_PASS) missing.push("SMTP_PASS");
    if (missing.length) {
      return NextResponse.json(
        {
          error: "Email transport is not configured.",
          missing,
        },
        { status: 500 },
      );
    }

    // Lazy import nodemailer to ensure server-only usage
    const { default: nodemailer } = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

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

    await transporter.sendMail({
      to: CONTACT_TO,
      from: FROM_EMAIL,
      subject: mailSubject,
      text,
      html,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
