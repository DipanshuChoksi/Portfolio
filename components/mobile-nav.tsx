"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  navLinks: Array<{ href: string; label: string }>;
}

export function MobileNav({ isOpen, onOpenChange, navLinks }: MobileNavProps) {
  const [currTab, setCurrTab] = useState(0);

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
            {navLinks.map((link, idx) => (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={
                    "text-lg font-medium hover:text-primary/70 transition-colors py-2 " +
                    (currTab == idx ? "text-primary" : "text-foreground")
                  }
                  onClick={() => setCurrTab(idx)}
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
