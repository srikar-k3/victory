import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { email?: string; firstUrl?: string };

export async function POST(req: Request) {
  try {
    const json = (await req.json().catch(() => ({}))) as Body;
    const email = String(json?.email || "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || undefined;
    const referer = req.headers.get("referer") || undefined;
    const firstUrl = json.firstUrl || origin || referer || undefined;

    const pub = "https://victoryinvolumes.substack.com";

    // Try JSON API first
    const primary = await fetch(`${pub}/api/v1/free`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ email, first_url: firstUrl, referrer: referer }),
    });

    if (primary.ok) {
      return NextResponse.json({ ok: true });
    }

    // Fallback to form-encoded + nojs endpoint
    const params = new URLSearchParams();
    params.set("email", email);
    if (firstUrl) params.set("first_url", firstUrl);
    if (referer) params.set("referrer", referer);

    const fallback = await fetch(`${pub}/api/v1/free?nojs=1`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: params.toString(),
      redirect: "follow",
    });

    if (fallback.ok) {
      return NextResponse.json({ ok: true });
    }

    const msg = await safeText(primary).catch(() => undefined);
    return NextResponse.json(
      { ok: false, error: msg || `Subscribe failed (${primary.status})` },
      { status: 502 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

async function safeText(r: Response) {
  try {
    return await r.text();
  } catch {
    return undefined;
  }
}

