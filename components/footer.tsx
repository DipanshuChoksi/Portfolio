import { socialsArr } from "@/consts";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-border/50 bg-background/50 relative overflow-hidden snap-start"
    >
      <div className="mx-auto  max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
              Get In Touch
            </h2>
            <div className="h-1.5 w-16 bg-primary rounded-full mb-6"></div>

            <p className="mb-8 max-w-sm text-muted-foreground leading-relaxed text-lg">
              I&apos;m always open to new opportunities, collaborations, and interesting
              conversations.
            </p>
            <a
              href="mailto:dipanshuchoksi@gmail.com"
              className="inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(13,148,136,0.5)] focus:ring-2 focus:ring-primary/50 group"
            >
              <Mail
                size={20}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:rotate-6"
              />
              Say Hello
            </a>
          </div>

          <div
            className="animate-in slide-in-from-bottom-6 duration-700"
            style={{ animationDelay: "150ms", animationFillMode: "both" }}
          >
            <h3 className="mb-6 text-xl font-bold tracking-tight">Connect with me</h3>
            <div className="flex flex-wrap gap-4">
              {socialsArr.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                  aria-label={item.name}
                >
                  <Image
                    src={item.path}
                    alt={"logo of " + item.name}
                    height={28}
                    width={28}
                    className="dark:hidden transition-transform duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  />
                  <Image
                    src={item.path.replace(".svg", ".light.svg")}
                    alt={"logo of " + item.name}
                    height={28}
                    width={28}
                    className="hidden dark:block transition-transform duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            © 2026 Dipanshu Choksi. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <span className="text-primary animate-pulse">❤</span>
            <span>in Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
