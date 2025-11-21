import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 section section-footer">
      {/* Top row: centered quick links, right social icons */}
      <div className="inner grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        <div className="hidden md:block" />
        <nav aria-label="Quick links" className="flex justify-center">
          <ul className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm justify-center">
            <li>
              <Link href="/" className="hover:underline underline-offset-4">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline underline-offset-4">
                About
              </Link>
            </li>
            <li>
              <Link href="/#events" className="hover:underline underline-offset-4">
                Events
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline underline-offset-4">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex justify-center md:justify-end items-center gap-3">
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="w-8 h-8 rounded-full border border-neutral-300 grid place-items-center hover:bg-neutral-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5"/>
              <circle cx="12" cy="12" r="4.2"/>
              <circle cx="17.2" cy="7.2" r="1.2" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom row removed per request */}
    </footer>
  );
}
