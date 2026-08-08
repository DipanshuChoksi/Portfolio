export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 relative overflow-hidden mt-12 py-6 snap-start">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="flex justify-center items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <span>Thank you for scrolling to the bottom. Built with</span>
          <span className="text-blue-700 animate-pulse">❤</span>
          <span>in Next.js</span>
        </div>
      </div>
    </footer>
  );
}
