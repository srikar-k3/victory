"use client";

import { useState } from "react";

export default function Newsletter({
  id = "newsletter",
  title = "Join our newsletter",
  subtitle = "Stay up to date with latest news, articles and resources, sent to your inbox weekly.",
  subscribeUrl,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  subscribeUrl?: string;
}) {
  const defaultBase = "https://victoryinvolumes.substack.com";
  const rawBase = subscribeUrl ?? defaultBase; // hard-coded preferred; ignore env to avoid misconfig 404s
  const base = rawBase.startsWith("http://") || rawBase.startsWith("https://")
    ? rawBase
    : `https://${rawBase}`;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    // Open a new tab immediately to avoid popup blockers, then navigate it to Substack
    const newTab = window.open("about:blank", "_blank");
    try { if (newTab) newTab.opener = null; } catch {}
    const subscribeUrl = `${base.replace(/\/$/, "")}/subscribe?email=${encodeURIComponent(email)}`;
    if (newTab && !newTab.closed) newTab.location.href = subscribeUrl; else window.open(subscribeUrl, "_blank");
    setStatus("success");
    setEmail("");
  }
  return (
    <section id={id} className="section section-dense scroll-mt-24">
      <div className="inner">
        <div className="rounded-2xl bg-white p-6 sm:p-8 w-full text-center stack-split">
          <h2 className="h3 font-semibold">{title}</h2>
          <p className="text-body-sm text-neutral-600 prose-measure mx-auto">{subtitle}</p>
          <form className="flex justify-center gap-2 md:gap-3" onSubmit={handleSubmit}>
            <label htmlFor={`${id}-email`} className="sr-only">Email</label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input w-full md:w-80"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
              {status === "submitting" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
          {status === "success" && (
            <div className="text-green-600 text-body-sm mt-2">Check your email to confirm your subscription.</div>
          )}
        </div>
      </div>
    </section>
  );
}
