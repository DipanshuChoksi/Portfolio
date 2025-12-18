import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";

import Header from "@/components/header";
import Footer from "@/components/footer";
function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
