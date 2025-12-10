// About page
import Newsletter from "@/components/Newsletter";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="">
      {/* 1. About Us */}
      <section id="about-us" className="section section-main scroll-mt-24">
        <div className="inner grid gap-8">
          <h1 className="font-semibold text-center">About Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-sm sm:text-base leading-7 text-neutral-700">
                Victory in Volumes was originally started in the midst of COVID-19 and was
                dedicated to collecting your used books and redistributing them to children who
                love to read. We had ties to multiple organizations across the nation to donate our
                community’s books to students who didn’t have access to the same material. As the
                impact of the COVID-19 pandemic has lessened, the organization’s efforts have
                shifted to focusing on an issue that many women face: a limited knowledge and
                understanding in women’s health.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-7 text-neutral-700">
                Victory in Volumes is now focused on building a community that advocates for
                women’s health and well-being. We host several events throughout the year
                dedicated to supporting women through every stage of life — from young adulthood
                and pregnancy to motherhood, midlife, and beyond. Our mission extends beyond
                individual well-being to encompass the broader family unit. By creating programs
                that engage both women and their loved ones, we aim to provide generational support
                that advocates for healthier, more connected communities.
              </p>
            </div>
            <div>
              <div className="relative rounded-md overflow-hidden aspect-[4/3]">
                <Image
                  src="/about_prev.jpeg"
                  alt="About Victory in Volumes"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Mission Statement (feature row format from Home) */}
      <section id="mission" className="section section-main surface scroll-mt-24">
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
            <p className="text-body text-neutral-700 prose-measure">
              Victory in Volumes exists to bring communities together in support of women’s health and well‑being. Through collective voices, shared resources, and compassionate action, we strive to empower women, address their unique needs, and create lasting impact that uplifts individuals, families, and communities alike.
            </p>
            <a href="/contact" className="btn btn-primary w-fit">Donate (coming soon)</a>
          </div>
        </div>
      </section>

      {/* 4. Team */}
      <section id="team" className="section section-main scroll-mt-24">
        <div className="inner grid gap-6">
          <h2 className="font-semibold text-center">Our Team</h2>
          <div className="grid gap-6">
            {/* Member 1 */}
            <div className="rounded-xl border border-neutral-200 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 items-start">
                <div className="relative rounded-md overflow-hidden h-48 sm:h-56">
                  <Image
                    src="/adi.JPG"
                    alt="Advaitha Kamalakkanan portrait"
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 160px, 100vw"
                    priority
                  />
                </div>
                <div className="grid gap-2">
                  <div>
                    <h3 className="font-medium">Advaitha Kamalakkanan</h3>
                    <p className="text-xs text-neutral-500">Co-Founder, Co-Director</p>
                  </div>
                  <p className="text-sm text-neutral-700">
                    Advaitha Kamalakkanan recently graduated from Rutgers University–New Brunswick
                    with a degree in Molecular Biology &amp; Biochemistry. Her aspirations to pursue
                    medicine continue to guide her work and advocacy. During her undergraduate
                    years, her experiences working at an OBGYN clinic deepened her interest in
                    advancing public awareness of women’s health and the unique challenges women
                    face in accessing care.
                  </p>
                  <p className="text-sm text-neutral-700">
                    Advaitha co-founded this nonprofit with Kaitlyn while in high school, during
                    the height of the COVID-19 pandemic, when many students faced barriers to
                    education and lacked access to learning materials. What began as an effort to
                    provide books and educational resources to those in need has since grown into a
                    community-driven initiative dedicated to empowering women and promoting health
                    education.
                  </p>
                  <p className="text-sm text-neutral-700">
                    Now, with her scientific background and passion for service, Advaitha hopes to
                    continue shaping the organization into a space that brings people together for
                    the united purpose of improving women’s health and well-being.
                  </p>
                </div>
              </div>
            </div>

            {/* Member 2 */}
            <div className="rounded-xl border border-neutral-200 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 items-start">
                <div className="relative rounded-md overflow-hidden h-48 sm:h-56">
                  <Image
                    src="/kaitlyn.jpeg"
                    alt="Kaitlyn Victor portrait"
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 160px, 100vw"
                  />
                </div>
                <div className="grid gap-2">
                  <div>
                    <h3 className="font-medium">Kaitlyn Victor</h3>
                    <p className="text-xs text-neutral-500">Co-Founder, Co-Director</p>
                  </div>
                  <p className="text-sm text-neutral-700">
                    Kaitlyn Victor is the Co-Founder and Co-Director of the nonprofit. She earned
                    her degree in Bioengineering and Biochemistry from Northeastern University in
                    Boston. Her background encompasses work in both the medical device industry and
                    oncology clinical research, where she gained valuable insight into the lack of
                    awareness in women’s health and research.
                  </p>
                  <p className="text-sm text-neutral-700">
                    Kaitlyn co-founded the organization with Advaitha while in high school, during
                    the COVID-19 pandemic, to address the urgent need for books and educational
                    resources within their community. What began as a grassroots effort has evolved
                    into a broader mission of uniting people for the education and advancement of
                    women’s health and empowerment.
                  </p>
                  <p className="text-sm text-neutral-700">
                    With her background and her passion for health equity, Kaitlyn hopes to
                    continue shaping the organization into a community-engaging platform that
                    bridges awareness and education on women’s health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sponsors (temporarily disabled) */}
      {false && (
        <section
          id="sponsors"
          className="scroll-mt-24"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 grid gap-6">
            <div className="text-center">
              <h2 className="font-semibold">Sponsors & Partners</h2>
              <p className="text-sm text-neutral-600 mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-md bg-neutral-200 grid place-items-center text-xs text-neutral-500"
                >
                  Logo
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      

      {/* Reusable Newsletter */}
      <Newsletter id="about-newsletter" />
    </div>
  );
}
