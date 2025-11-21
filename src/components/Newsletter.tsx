export default function Newsletter({
  id = "newsletter",
  title = "Join our newsletter",
  subtitle = "Stay up to date with latest news, articles and resources, sent to your inbox weekly.",
}: {
  id?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section id={id} className="section section-dense scroll-mt-24">
      <div className="inner">
        <div className="rounded-2xl bg-white p-6 sm:p-8 w-full text-center stack-split">
          <h2 className="h3 font-semibold">{title}</h2>
          <p className="text-body-sm text-neutral-600 prose-measure mx-auto">{subtitle}</p>
          <form className="flex justify-center gap-2 md:gap-3">
            <label htmlFor={`${id}-email`} className="sr-only">Email</label>
            <input
              id={`${id}-email`}
              type="email"
              placeholder="Enter your email"
              className="input w-full md:w-80"
            />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}
