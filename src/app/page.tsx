// Home page layout uses utility classes and CSS variables for rhythm.
import Newsletter from "@/components/Newsletter";
import EventsTimeline from "@/components/EventsTimeline";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section id="hero" className="section section-hero section-hero-xl scroll-mt-24 bg-[var(--c-primary)] relative">
          <div className="inner max-w-3xl center-prose stack stack-loose text-[var(--c-light)]">
          <h1 className="h1 font-semibold text-[var(--c-light)]">Empowering women. Strengthening communities.</h1>
        </div>
        {/* Bottom CTA: Learn more + bouncing chevron */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-2 text-[var(--c-light)]">
          <div className="text-body-sm opacity-85 tracking-wide">Learn more</div>
          <a
            href="#feature-1"
            aria-label="Scroll to next section"
            className="inline-flex items-center justify-center"
          >
            <svg className="w-7 h-7 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        </div>
      </section>

      {/* Feature 1 */}
      <section id="feature-1" className="section section-main scroll-mt-24">
        <div className="inner grid items-center md:grid-cols-2 gap-[calc(var(--g2)*2)] md:gap-[calc(var(--g3)*2)]">
          <div className="relative rounded-md overflow-hidden aspect-[4/3] bg-[var(--c-secondary)]">
            <Image
              src="/Artboard 25.png"
              alt="Mission collage"
              fill
              className="object-contain scale-125"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
          <div className="stack-split">
            <h2 className="h2 font-semibold">Mission Statement</h2>
            <p className="text-body text-neutral-600 prose-measure">
            Victory in Volumes exists to bring communities together in support of women’s health and well-being. Through collective voices, shared resources, and compassionate action, we strive to empower women, address their unique needs, and create lasting impact that uplifts individuals, families, and communities alike.

            </p>
            <a className="btn btn-primary w-fit" href="/about#about-us">Learn More</a>
          </div>
        </div>
      </section>

      {/* Events - Responsive Timeline (vertical on mobile, horizontal on md+) */}
      <section id="events" className="section section-main surface scroll-mt-24">
        <div className="inner grid gap-6">
          <h2 className="h2 font-semibold text-[var(--c-dark)]">Upcoming Events</h2>
          {(() => {
            const events = [
              { title: "Mother Daughter Care Packages", subtitle: "May (Mother’s Day) — TBD" },
              { title: "Breast Cancer Awareness 5K/Walk", subtitle: "October — TBD" },
              { title: "Pilates Class Fundraiser", subtitle: "Women’s National History Month — TBD" },
              { title: "Backpack Drive", subtitle: "August — TBD" },
              { title: "Fibroid", subtitle: "July — TBD" },
            ];
            return (
              <>
                {/* Mobile: vertical timeline */}
                <div className="relative md:hidden mt-2">
                  <div className="absolute left-3 top-0 bottom-0 w-px bg-[var(--c-dark)] opacity-25" aria-hidden />
                  <ul className="grid grid-cols-1 gap-6">
                    {events.map((e, i) => (
                      <li key={i} className="relative">
                        <div className="absolute left-3 top-5 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--c-accent)] ring-4 ring-white" aria-hidden />
                        <article className="card-accent pl-6 pr-4 py-4">
                          <div className="text-body font-medium">{e.title}</div>
                          <div className="text-body-sm mt-1 text-[var(--c-primary)]">{e.subtitle}</div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Desktop: horizontal timeline with arrow controls */}
                <EventsTimeline events={events} />
              </>
            );
          })()}
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
            <a className="btn btn-primary w-fit" href="#contact">Donate (coming soon)</a>
          </div>
        </div>
      </section>

      {/* Newsletter (reusable component) */}
      <Newsletter />
    </div>
  );
}
