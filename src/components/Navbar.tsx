"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", kind: "link" as const },
  { href: "/about", label: "About", kind: "link" as const },
  { href: "/#events", label: "Events", kind: "link" as const },
  { href: "/contact", label: "Contact", kind: "link" as const },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState<string>("" );
  useEffect(() => {
    const update = () => setHash(typeof window !== "undefined" ? window.location.hash : "");
    update();
    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", update);
      return () => window.removeEventListener("hashchange", update);
    }
  }, []);

  return (
    <header className={`sticky top-0 z-50 header-primary`}>
      <nav className="site-header page-x">
        <div className="inner w-full flex items-center justify-between h-full">
        {/* Left: logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <span className="relative inline-block w-8 h-8 shrink-0">
            <Image
              src="/profile-picture.png"
              alt="Victory logo"
              fill
              sizes="32px"
              className="rounded-md object-cover"
              priority
              unoptimized
            />
          </span>
          <span className="hidden sm:inline text-sm font-medium tracking-wide text-accent">
            VICTORY IN VOLUMES
          </span>
        </Link>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="sm:hidden rounded-md p-2 hover:bg-neutral-100"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>

        {/* Right: nav links + donate aligned together */}
        <div className="hidden sm:flex items-center gap-6 h-full">
          <ul className="flex items-center gap-6 text-body-sm h-full m-0 list-none p-0">
            {navItems.map((item) => {
              const isAnchor = item.href.startsWith("/#");
              const isActive = isAnchor
                ? pathname === "/" && hash === item.href.slice(1)
                : pathname === item.href;
              const base = "nav-link inline-flex items-center leading-none h-full";
              const cls = base;
              return (
                <li key={item.href}>
                  <Link href={item.href} className={cls} data-active={isActive}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/contact" className="btn btn-donate text-body-sm leading-none inline-flex items-center self-center">Donate (coming soon)</Link>
        </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open ? (
        <div className="sm:hidden border-t border-neutral-200">
          <ul className="mx-auto max-w-5xl px-4 py-3 grid gap-2">
            {navItems.map((item) => {
              const isAnchor = item.href.startsWith("/#");
              const isHome = item.href === "/";
              const homeActive = pathname === "/" && (!hash || hash === "#top" || hash === "#hero");
              const isActive = isHome
                ? homeActive
                : isAnchor
                ? pathname === "/" && hash === item.href.slice(1)
                : pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link block py-2" data-active={isActive} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/contact" className="btn btn-donate w-full" onClick={() => setOpen(false)}>
                Donate (coming soon)
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
