import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";

export default function Hero() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl text-balance">
              Dipanshu Choksi
            </h1>
            <p className="mb-4 text-lg text-muted-foreground sm:text-xl">
              Software Engineer
            </p>
            <p className="mb-8 max-w-lg text-base text-muted-foreground leading-relaxed">
              I build beautiful, performant web applications with a focus on
              user experience and clean code. Passionate about open source and
              learning new frameworks and technologies.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:opacity-90"
              >
                View My Work
                <ExternalLink size={18} />
              </Link>
              <a
                href="mailto:dipanshuchoksi@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium transition-colors hover:bg-secondary"
              >
                Get in Touch
                <Mail size={18} />
              </a>
            </div>

            <div className="mt-8 gap-4 flex items-center">
              <a
                href="https://github.com/dipanshuchoksi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:opacity-80 flex justify-center items-center"
                aria-label="GitHub"
              >
                <img
                  src="/icon.github.svg"
                  alt="logo of Github"
                  className="h-[25px]"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/dipanshu-choksi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:opacity-80 flex justify-center items-center"
                aria-label="LinkedIn"
              >
                <img
                  src="/icon.linkedin.svg"
                  alt="logo of linkedin"
                  className="h-[28px]"
                />
              </a>
              <a
                href="https://x.com/dipanshuchoksi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:opacity-80 flex justify-center items-center"
                aria-label="Twitter"
              >
                <img
                  src="/icon.twitter.svg"
                  alt="logo of X(formerly known as twitter)"
                  className="h-[25px]"
                />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative h-72 w-72 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 p-8 md:h-96 md:w-96">
              <img
                src="/me.jpeg"
                alt="It's me (Dipanshu Choksi)."
                className="object-cover object-center h-full w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
