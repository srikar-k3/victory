// Contact page
import Newsletter from "@/components/Newsletter";

export default function ContactPage() {
  return (
    <div className="">
      {/* Contact Form */}
      <section id="contact" className="section section-main scroll-mt-24">
        <div className="inner grid gap-6">
          <h1 className="font-semibold text-center">Contact Us</h1>
          <div className="rounded-xl border border-neutral-200 p-6 sm:p-8 grid gap-4">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <label htmlFor="name" className="text-sm">Name</label>
                <input id="name" type="text" placeholder="Jane Doe" className="input" />
              </div>
              <div className="grid gap-1">
                <label htmlFor="email" className="text-sm">Email</label>
                <input id="email" type="email" placeholder="you@example.com" className="input" />
              </div>
              <div className="sm:col-span-2 grid gap-1">
                <label htmlFor="subject" className="text-sm">Subject</label>
                <input id="subject" type="text" placeholder="How can we help?" className="input" />
              </div>
              <div className="sm:col-span-2 grid gap-1">
                <label htmlFor="message" className="text-sm">Message</label>
                <textarea id="message" rows={5} placeholder="Write your message..." className="input" />
              </div>
              <div className="sm:col-span-2">
                <button className="btn btn-primary" type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Stay in Touch (newsletter) */}
      {/* Reusable newsletter */}
      <Newsletter id="contact-newsletter" title="Join our newsletter" />
    </div>
  );
}
