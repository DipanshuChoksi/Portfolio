import { socialsArr } from "@/consts";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold">Get In Touch</h3>
            <p className="mb-6 max-w-sm text-muted-foreground leading-relaxed">
              I&apos;m always interested in hearing about new projects and
              opportunities. Feel free to reach out!
            </p>
            <a
              href="mailto:dipanshuchoksi@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:opacity-90"
            >
              <Mail size={20} />
              Send me an email
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-bold">Follow</h3>
            <div className="flex gap-4">
              {socialsArr.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-border transition-all hover:bg-secondary hover:border-accent"
                  aria-label={item.name}
                >
                  <Image
                    src={item.path}
                    alt={"logo of " + item.name}
                    height={30}
                    width={30}
                  />
                </a>
              ))}
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
