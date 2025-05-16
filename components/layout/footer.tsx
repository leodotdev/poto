"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

// Define navItems here, ideally this would be imported from a shared location
const navItems = [
  { path: "/", label: "Portal" },
  { path: "/about", label: "Origin Story" },
  { path: "/archive", label: "Ritual Index" },
  { path: "/contact", label: "Contact" },
  { path: "/shop", label: "Gift Shop" },
];

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link
            href="/"
            // onClick={() => setOpen(false)} // setOpen is not defined in footer, removing
            className="flex items-center gap-2 font-serif text-lg font-bold tracking-tight"
          >
            The Poetic Toolbox™
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            A sanctuary for creative souls. Built with
            <span className="inline-flex items-center gap-1">
              <Heart className="h-4 w-4 fill-primary text-primary" />
              and a bit of chaos.
            </span>
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:justify-end">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/legal"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Legal
          </Link>
        </div>
      </div>
    </footer>
  );
}
