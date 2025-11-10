"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

/**
 * Wraps children with the next-themes ThemeProvider and forwards all ThemeProviderProps to it.
 *
 * @param children - React nodes to render inside the theme provider.
 * @param props - Props accepted by next-themes' ThemeProvider (forwarded).
 * @returns The NextThemesProvider element containing `children`.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}