"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { useState } from "react";
import { navLinks } from "@/consts";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import useIntersectionObserver from "@/hooks/useIntersectionOberver";

// TODO: After clicking on any navitem it takes us to that section or page, but after that when user comeback to the home page, it doesn't work anymore, it is stuck to the prev navitem section only.

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { activeSection, setActiveSection } = useIntersectionObserver();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold md:text-xl whitespace-nowrap hover:text-primary transition-colors"
          >
            {"<Dipanshu />"}
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            {navLinks.map((link, idx) => (
              <NavigationMenuItem
                key={idx}
                className="transition-colors hover:opacity-70 bg-transparent"
                onClick={() => setActiveSection(link.label.toLowerCase())}
                asChild
              >
                <NavigationMenuLink
                  asChild
                  active={link.label.toLowerCase() === activeSection || false}
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenu>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <MobileNav isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} navLinks={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
