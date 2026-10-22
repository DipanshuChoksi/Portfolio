"use client";

import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { useState, useEffect } from "react";
import { navLinks } from "@/consts";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "../ui/navigation-menu";
import useIntersectionObserver from "@/hooks/useIntersectionOberver";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SettingsMenu } from "../settings-menu";

export default function Header({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { activeSection, setActiveSection } = useIntersectionObserver();
  const pathname = usePathname();

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
        "sticky top-0 z-50 transition-all duration-300 w-full border-b py-2",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-border shadow-sm"
          : "bg-transparent border-border"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 font-medium">
          {/* Logo */}
          <Link
            href="/"
            className="group text-lg font-medium md:text-xl whitespace-nowrap transition-all duration-300 hover:scale-105"
          >
            <span className="text-primary group-hover:text-accent transition-colors">{"< "}</span>
            <span className="hidden sm:inline">
              <span className="text-foreground tracking-tight">dipanshu</span>
              <span className="text-primary group-hover:text-accent transition-colors">choksi</span>
            </span>
            <span className="sm:hidden">
              <span className="text-foreground tracking-tight">dipanshu</span>
            </span>
            <span className="text-primary group-hover:text-accent transition-colors">{" />"}</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {navLinks.map((item, idx) => {
                if (item.children && item.children.length > 0) {
                  const isDropdownActive = item.children.some((child) => {
                    if (child.href.startsWith("/#")) {
                      const sectionId = child.href.replace("/#", "");
                      return pathname === "/" && activeSection === sectionId;
                    }
                    return pathname !== "/" && pathname.startsWith(child.href);
                  });

                  return (
                    <NavigationMenuItem key={item.label || idx} className="bg-transparent">
                      <NavigationMenuTrigger
                        className={cn(
                          "group/nav-link cursor-pointer bg-transparent hover:bg-transparent focus:bg-transparent data-popup-open:bg-transparent data-open:bg-transparent px-4 py-2 text-sm font-semibold transition-colors shadow-none",
                          isDropdownActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className={cn("nav-link-underline", isDropdownActive && "active")}>
                          {item.label}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="w-56 p-2 rounded-xl bg-popover/95 backdrop-blur-md border border-border shadow-lg">
                        <ul className="flex flex-col gap-1">
                          {item.children.map((child, cIdx) => {
                            const isChildActive = child.href.startsWith("/#")
                              ? pathname === "/" && activeSection === child.href.replace("/#", "")
                              : pathname !== "/" && pathname.startsWith(child.href);

                            return (
                              <li key={child.label || cIdx}>
                                <NavigationMenuLink
                                  render={
                                    <Link
                                      href={child.href}
                                      onClick={() => {
                                        if (child.href.startsWith("/#")) {
                                          setActiveSection(child.href.replace("/#", ""));
                                        }
                                      }}
                                    />
                                  }
                                  className={cn(
                                    "flex flex-col gap-0.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted focus:bg-muted",
                                    isChildActive ? "text-primary font-medium" : "text-foreground"
                                  )}
                                >
                                  <span className="font-medium text-sm">{child.label}</span>
                                  {child.description && (
                                    <span className="text-xs text-muted-foreground">{child.description}</span>
                                  )}
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                if (!item.href) return null;

                const isSectionLink = item.href.startsWith("/#");
                const sectionId = isSectionLink ? item.href.replace("/#", "") : "";
                const isActive = isSectionLink
                  ? pathname === "/" && activeSection === sectionId
                  : pathname !== "/" && pathname.startsWith(item.href);

                return (
                  <NavigationMenuItem key={item.label || idx} className="bg-transparent">
                    <NavigationMenuLink
                      render={
                        <Link
                          href={item.href}
                          onClick={() => {
                            if (isSectionLink) {
                              setActiveSection(sectionId);
                            }
                          }}
                        />
                      }
                      className={cn(
                        "group/nav-link inline-flex items-center justify-center px-4 py-2 text-sm font-semibold transition-colors bg-transparent",
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className={cn("nav-link-underline", isActive && "active")}>
                        {item.label}
                      </span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <Link
                href="/connect"
                className="inline-flex h-9 items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 hover:shadow-lg hover:shadow-primary/20"
              >
                Let&apos;s connect
              </Link>
            </div>

            <div className="hidden md:block">
              <SettingsMenu isLoggedIn={isLoggedIn} />
            </div>

            {/* Mobile Menu Button */}
            <MobileNav isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} navLinks={navLinks} isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
    </header>
  );
}
