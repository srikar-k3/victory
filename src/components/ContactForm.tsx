'use client';

import { useState } from 'react';

type Status =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success' }
  | { type: 'error'; message: string; missing?: string[] };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: 'idle' });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.type === 'submitting') return;
    setStatus({ type: 'submitting' });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();
    // Portfolio API expects workType/timeframe/comments. Map our fields accordingly.
    const payload = {
      name,
      email,
      workType: subject,
      timeframe: '',
      comments: message,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const baseMessage = data?.error || `Request failed (${res.status})`;
        setStatus({ type: 'error', message: baseMessage, missing: Array.isArray(data?.missing) ? data.missing : undefined });
        return;
      }

      setStatus({ type: 'success' });
      form.reset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send message';
      setStatus({ type: 'error', message });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-describedby="contact-status">
      <div className="grid gap-1">
        <label htmlFor="name" className="text-sm">Name</label>
        <input id="name" name="name" type="text" placeholder="Jane Doe" className="input" required />
      </div>
      <div className="grid gap-1">
        <label htmlFor="email" className="text-sm">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" className="input" required />
      </div>
      <div className="sm:col-span-2 grid gap-1">
        <label htmlFor="subject" className="text-sm">Subject</label>
        <input id="subject" name="subject" type="text" placeholder="How can we help?" className="input" required />
      </div>
      <div className="sm:col-span-2 grid gap-1">
        <label htmlFor="message" className="text-sm">Message</label>
        <textarea id="message" name="message" rows={5} placeholder="Write your message..." className="input" required />
      </div>
      <div className="sm:col-span-2 flex items-center gap-3">
        <button className="btn btn-primary" type="submit" disabled={status.type === 'submitting'}>
          {status.type === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
        <div id="contact-status" className="text-sm">
          {status.type === 'success' && <span className="text-green-600">Message sent! We’ll get back to you soon.</span>}
          {status.type === 'error' && (
            <span className="text-red-600">
              {status.message}
              {status.missing && status.missing.length > 0 && (
                <> — missing: <code>{status.missing.join(', ')}</code></>
              )}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
