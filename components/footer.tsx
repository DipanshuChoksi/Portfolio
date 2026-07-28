export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 relative overflow-hidden mt-12 py-6 snap-start">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            © 2026 Dipanshu Choksi. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <span>Built with</span>
            <span className="text-blue-700 animate-pulse">❤</span>
            <span>in Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
