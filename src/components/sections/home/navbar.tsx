"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "./logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/facilities", label: "All Facilities" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex h-[76px] w-full max-w-[1580px] items-center justify-between gap-4 px-5 sm:px-6">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[17px] transition-colors",
                  active
                    ? "font-semibold text-[#16a34a]"
                    : "font-medium text-[#4b5563] hover:text-[#16a34a]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop login */}
        <Link
          href="/login"
          className={cn(
            buttonVariants({ size: "lg" }),
            "hidden h-12 rounded-xl px-7 text-[16px] font-semibold shadow-none md:inline-flex"
          )}
        >
          Login
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg text-[#111827] transition-colors hover:bg-muted md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-black/5 bg-white px-5 pt-2 pb-5 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-[15px] transition-colors",
                    active
                      ? "bg-[#16a34a]/10 font-semibold text-[#16a34a]"
                      : "font-medium text-[#4b5563] hover:bg-muted hover:text-[#16a34a]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-2 h-12 rounded-xl px-7 text-[16px] font-semibold shadow-none"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
