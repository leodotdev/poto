"use client"

import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            The Poetic Toolbox™
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            A sanctuary for creative souls. Built with 
            <Heart className="mx-1 inline-block h-4 w-4 fill-primary text-primary" />
            and a bit of chaos.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground">
            Legal
          </Link>
        </div>
      </div>
    </footer>
  )
}