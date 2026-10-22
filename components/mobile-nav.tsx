"use client";

import { Menu, Moon, Sun, LogIn, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import useIntersectionObserver from "@/hooks/useIntersectionOberver";
import { login, logout } from "@/app/actions/auth";
import { toast } from "sonner";

import { NavItem } from "@/interfaces";

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  navLinks: NavItem[];
  isLoggedIn?: boolean;
}

export function MobileNav({ isOpen, onOpenChange, navLinks, isLoggedIn = false }: MobileNavProps) {
  const { activeSection, setActiveSection } = useIntersectionObserver();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

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
      <Sheet open={isOpen} onOpenChange={onOpenChange} >
        <SheetContent side="right" className="w-75 sm:w-87.5 flex flex-col overflow-y-scroll">
          <SheetHeader>
            <SheetTitle className="text-2xl text-left">Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-between py-6">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((item, idx) => {
                if (item.children && item.children.length > 0) {
                  return (
                    <div key={item.label || idx} className="py-2">
                      <div className="px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="flex flex-col pl-2 mt-1 space-y-1">
                        {item.children.map((child) => {
                          let isActive = false;
                          if (child.href.startsWith("/#") || child.href === "/") {
                            if (pathname === "/") {
                              isActive = child.label.toLowerCase() === activeSection;
                            }
                          } else {
                            if (pathname !== "/" && pathname.startsWith(child.href)) {
                              isActive = true;
                            }
                          }

                          return (
                            <SheetClose asChild key={child.href}>
                              <Link
                                href={child.href}
                                className={`flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                                  isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground hover:bg-secondary/80"
                                }`}
                                onClick={() => setActiveSection(child.label.toLowerCase())}
                              >
                                {child.label}
                              </Link>
                            </SheetClose>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                if (!item.href) return null;

                let isActive = false;
                if (item.href.startsWith("/#") || item.href === "/") {
                  if (pathname === "/") {
                    isActive = item.label.toLowerCase() === activeSection;
                  }
                } else {
                  if (pathname !== "/" && pathname.startsWith(item.href)) {
                    isActive = true;
                  }
                }

                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-lg px-4 py-3 text-base font-semibold transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary/80"
                      }`}
                      onClick={() => setActiveSection(item.label.toLowerCase())}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}

              {isLoggedIn && !pathname.startsWith("/admin") && (
                <SheetClose asChild>
                  <Link
                    href="/admin/dashboard"
                    className={`flex items-center rounded-lg px-4 py-3 text-base font-semibold transition-colors ${pathname.startsWith("/admin")
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary/80"
                      }`}
                  >
                    Admin Dashboard
                  </Link>
                </SheetClose>
              )}
              {!pathname.startsWith("/admin") && <SheetClose asChild>
                <Link
                  href="/connect"
                  className={`flex items-center rounded-lg px-4 py-3 text-base font-semibold transition-colors ${pathname.startsWith("/connect")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-secondary/80"
                    }`}
                >
                  Contact Me
                </Link>
              </SheetClose>
              }
            </nav>

            <div className="flex flex-col space-y-1 pt-6 mt-6 border-t border-border/50">
              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
                className="flex items-center gap-3 w-full rounded-lg px-4 py-3 text-base font-semibold text-left text-foreground hover:bg-secondary/80 transition-colors"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
              <form
                action={async () => {
                  if (isLoggedIn) {
                    await logout();
                    toast.success("You have successfully logged out.");
                  } else {
                    await login();
                  }
                }}
                className="w-full"
              >
                <button
                  type="submit"
                  className="flex items-center gap-3 w-full rounded-lg px-4 py-3 text-base font-semibold text-left text-primary hover:bg-primary/10 transition-colors"
                >
                  {isLoggedIn ? <LogOut className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                  <span>{isLoggedIn ? "Logout" : "Login"}</span>
                </button>
              </form>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
