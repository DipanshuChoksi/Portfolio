import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold">Get In Touch</h3>
            <p className="mb-6 max-w-sm text-muted-foreground leading-relaxed">
              I'm always interested in hearing about new projects and
              opportunities. Feel free to reach out!
            </p>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:opacity-90"
            >
              <Mail size={20} />
              Send me an email
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-bold">Follow</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/dipanshuchoksi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-border transition-all hover:bg-secondary hover:border-accent"
                aria-label="GitHub"
              >
                <img
                  src="/icon.github.svg"
                  alt="logo of Github"
                  className="h-[28px]"
                />
              </a>
              <a
                href="https://linkedin.com/in/dipanshu-choksi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-border transition-all hover:bg-secondary hover:border-accent"
                aria-label="LinkedIn"
              >
                <img
                  src="/icon.linkedin.svg"
                  alt="logo of linkedin"
                  className="h-[25px]"
                />
              </a>
              <a
                href="https://x.com/dipanshuchoksi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-border transition-all hover:bg-secondary hover:border-accent"
                aria-label="Twitter"
              >
                <img
                  src="/icon.twitter.svg"
                  alt="logo of X(formerly known as twitter)"
                  className="h-[28px]"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Dipanshu Choksi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
