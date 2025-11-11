import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { siteConfig } from "@/config";

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
      <body className={`font-sans antialiased`}>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
