"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { LinkButton } from "../ui/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];
export function Navbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY < lastScrollY.current || currentScrollY < 80) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          visible ? "translate-y-0" : "-translate-y-full",
          scrolled
            ? "bg-background/95 backdrop-blur shadow-sm"
            : "bg-transparent"
        )}>
        <div className="mx-auto px-4 h-16 flex items-center justify-between md:justify-start">
          <Link
            href="/"
            className="font-bold text-xl lg:text-2xl tracking-tight">
            <span className="text-success">A.</span>T.
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 md:ml-auto">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm md:text-base font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:ml-8 lg:ml-24">
            <LinkButton
              href="/contact"
              variant="secondary"
              size="default"
              borderRadiuss="sm">
              Let's Connect
            </LinkButton>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md w-9 h-9 hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? (
                <X className="h-5 w-5" size={18} />
              ) : (
                <Menu className="h-5 w-5" size={18} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu content */}
        <nav
          className={cn(
            "absolute top-16 left-0 right-0 flex flex-col px-4 py-6 gap-1 transition-all duration-300",
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          )}>
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-lg font-medium py-3 px-4 rounded-lg transition-colors",
                pathname === link.href
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
