"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  navLinks: Array<{ href: string; label: string }>;
}

/**
 * Render a mobile menu button and a right-side navigation sheet for small screens.
 *
 * @param isOpen - Whether the navigation sheet is open.
 * @param onOpenChange - Callback invoked with the new open state when the sheet should open or close.
 * @param navLinks - Array of navigation entries; each item must have `href` (destination URL) and `label` (link text).
 * @returns A React element containing the mobile menu button and a right-side sheet that lists the provided navigation links.
 */
export function MobileNav({ isOpen, onOpenChange, navLinks }: MobileNavProps) {
  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        onClick={() => onOpenChange(true)}
        className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Navigation Sheet */}
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[300px] sm:w-[350px]">
          <SheetHeader>
            <SheetTitle className="text-2xl">Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <SheetClose asChild key={link.href}>
                <a
                  href={link.href}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}