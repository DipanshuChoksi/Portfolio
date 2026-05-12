import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import { siteConfig } from "@/config";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  authors: [
    {
      name: siteConfig.name,
    },
  ],
  creator: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Tailwind",
    "Server Components",
    "ShadCN",
    "JavaScript",
    "TypeScript",
    "JSX",
    "TSX",
    "JS",
    "Node.js",
    "Blog",
    "Technical Blog",
  ],
  openGraph: {
    description: siteConfig.description,
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased relative">
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <div className="fixed z-50 bottom-4 right-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/95 text-primary">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide">PORTFOLIO</span>
        </div>
      </body>
    </html>
  );
}
