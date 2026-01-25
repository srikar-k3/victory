// Contact page
import Newsletter from "@/components/Newsletter";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="">
      {/* Contact Form */}
      <section id="contact" className="section section-main scroll-mt-24">
        <div className="inner grid gap-6">
          <h1 className="font-semibold text-center">Contact Us</h1>
          <div className="rounded-xl border border-neutral-200 p-6 sm:p-8 grid gap-4">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Stay in Touch (newsletter) */}
      {/* Reusable newsletter */}
      <Newsletter id="contact-newsletter" title="Join our newsletter" />
    </div>
  );
}
