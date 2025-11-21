// Home page layout uses utility classes and CSS variables for rhythm.
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section id="hero" className="section section-hero section-hero-xl scroll-mt-24 bg-[var(--c-primary)]">
          <div className="inner max-w-3xl center-prose stack stack-loose text-[var(--c-light)]">
          <h1 className="h1 font-semibold text-[var(--c-light)]">A bold headline that delivers</h1>
          <p className="text-body opacity-90">Empowering women. Strengthening communities.</p>
          {/* CTA removed per request */}
        </div>
      </section>

      {/* Feature 1 */}
      <section id="feature-1" className="section section-main scroll-mt-24">
        <div className="inner grid items-center md:grid-cols-2 gap-[calc(var(--g2)*2)] md:gap-[calc(var(--g3)*2)]">
          <div className="media aspect-[4/3]" />
          <div className="stack-split">
            <h2 className="h2 font-semibold">Mission Statement</h2>
            <p className="text-body text-neutral-600 prose-measure">
            Victory in Volumes exists to bring communities together in support of women’s health and well-being. Through collective voices, shared resources, and compassionate action, we strive to empower women, address their unique needs, and create lasting impact that uplifts individuals, families, and communities alike.

            </p>
            <a className="btn btn-primary w-fit" href="#contact">Learn More</a>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="section section-main surface scroll-mt-24">
        <div className="inner grid gap-6">
          <h2 className="h2 font-semibold text-[var(--c-dark)]">Upcoming Events</h2>
          <div className="surface-card divide-y divide-neutral-200 overflow-hidden">
            {[
              { title: "Mother Daughter Care Packages", subtitle: "May (Mother’s Day) — TBD" },
              { title: "Breast Cancer Awareness 5K/Walk", subtitle: "October — TBD" },
              { title: "Pilates Class Fundraiser", subtitle: "Women’s National History Month — TBD" },
              { title: "Backpack Drive", subtitle: "August — TBD" },
              { title: "Fibroid", subtitle: "July — TBD" },
            ].map((e, i) => (
              <article key={i} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 px-4 md:px-6 py-4">
                <div className="flex-1 min-w-0">
                  <div className="text-body font-medium truncate">{e.title}</div>
                  <div className="text-body-sm text-neutral-500 truncate">{e.subtitle}</div>
                </div>
                <a href="#newsletter" className="btn btn-primary md:ml-auto">View Event</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 2 */}
      <section id="feature-2" className="section section-main scroll-mt-24">
        <div className="inner grid items-center md:grid-cols-2 md:[&>div:nth-child(1)]:order-2 gap-[calc(var(--g2)*2)] md:gap-[calc(var(--g3)*2)]">
          <div className="media aspect-[4/3]" />
          <div className="stack-split">
            <h2 className="h2 font-semibold">Contribute Directly</h2>
            <p className="text-body text-neutral-600 prose-measure">
            These donations directly support our initiatives and research that focus on women’s health, from education and preventive care to access to treatment and wellness resources. 
            </p>
            <a className="btn btn-primary w-fit" href="#contact">Donate</a>
          </div>
        </div>
      </section>

      {/* Newsletter (reusable component) */}
      <Newsletter />
    </div>
  );
}
