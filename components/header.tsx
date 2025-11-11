"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { useState } from "react";
import { navLinks } from "@/consts";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currTab, setCurrTab] = useState(0);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-base sm:text-lg whitespace-nowrap hover:text-primary transition-colors"
          >
            {"<Dipanshu />"}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-6 lg:gap-8 md:flex">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "transition-colors hover:text-foreground whitespace-nowrap" +
                  (currTab == idx
                    ? "text-lg font-bold text-foreground"
                    : "text-sm font-medium text-muted-foreground")
                }
                onClick={() => setCurrTab(idx)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <MobileNav
              isOpen={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
              navLinks={navLinks}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
