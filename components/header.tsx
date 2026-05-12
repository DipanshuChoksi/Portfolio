"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { useState, useEffect } from "react";
import { navLinks } from "@/consts";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import useIntersectionObserver from "@/hooks/useIntersectionOberver";
import { cn } from "@/lib/utils";

// TODO: After clicking on any navitem it takes us to that section or page, but after that when user comeback to the home page, it doesn't work anymore, it is stuck to the prev navitem section only.

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { activeSection, setActiveSection } = useIntersectionObserver();

  // Add scroll event listener for changing header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-sm py-2"
          : "bg-transparent py-4 border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="group text-lg font-black md:text-xl whitespace-nowrap transition-all duration-300 hover:scale-105"
          >
            <span className="text-primary group-hover:text-accent transition-colors">{"<"}</span>
            <span className="hidden sm:inline">
              <span className="text-foreground tracking-tight"> dipanshu</span>
              <span className="text-primary group-hover:text-accent transition-colors">choksi</span>
            </span>
            <span className="sm:hidden">
              <span className="text-foreground tracking-tight">dipanshu </span>
            </span>
            <span className="text-primary group-hover:text-accent transition-colors">{"/>"}</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            {navLinks.map((link, idx) => {
              const isActive = link.label.toLowerCase() === activeSection;

              return (
                <NavigationMenuItem
                  key={idx}
                  className="bg-transparent"
                  onClick={() => setActiveSection(link.label.toLowerCase())}
                  asChild
                >
                  <NavigationMenuLink
                    asChild
                    active={isActive}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "transition-all duration-300 rounded-full px-4 py-2 mx-0.5 text-sm font-semibold",
                      isActive
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    )}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenu>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <Link
                href="/#contact"
                className="inline-flex h-9 items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 hover:shadow-lg hover:shadow-primary/20"
              >
                Let&apos;s connect
              </Link>
            </div>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <MobileNav isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} navLinks={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
