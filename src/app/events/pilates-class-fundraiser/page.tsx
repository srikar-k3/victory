import Newsletter from "@/components/Newsletter";

export default function PilatesEventPage() {
  const title = "Pilates Class Fundraiser";
  return (
    <div>
      {/* Title */}
      <section className="section section-main scroll-mt-24">
        <div className="inner grid gap-8">
          <h1 className="font-semibold text-center">{title}</h1>
          <div className="grid grid-cols-1 gap-6 items-start">
            <div className="md:col-span-2">
              <p className="text-sm sm:text-base leading-7 text-neutral-700 max-w-none">
                Move, stretch, and support a meaningful cause! Join us for a Pilates Fundraiser dedicated
                to raising awareness and funds for endometriosis research. This class is open to
                participants of all levels, whether you’re a Pilates enthusiast or just starting your
                wellness journey.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-7 text-neutral-700 max-w-none">
                All proceeds will go toward advancing research, improving treatments, and empowering
                individuals living with endometriosis. Come strengthen your body, connect with your
                community, and make a difference in the lives of those affected by this condition.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-7 text-neutral-700 max-w-none">
                Registration will be available soon. Sign up for our newsletter below to get updates. In the meantime, please use the Donate button in the navigation bar to support this cause.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter id="event-newsletter" title="Get event updates" />
    </div>
  );
}
