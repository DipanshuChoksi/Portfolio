import Link from "next/link";
import Image from "next/image";
import { socialsArr } from "@/consts";
import { heroSection } from "@/interfaces";
import { cn } from "@/lib/utils";
import { TypewriterRole } from "@/components/typewriter-role";

export default function Hero({ heroContent }: { heroContent: heroSection }) {
  return (
    <section
      id="hero"
      className="min-h-screen border-b border-border pt-20 md:pt-0 flex justify-center items-center snap-start"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 -mt-12 md:-mt-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center animate-in slide-in-from-bottom-8 fade-in duration-1000">
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              {heroContent.name}
            </h1>
            <p className="mb-6 text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-accent min-h-[32px] sm:min-h-[40px]">
              <TypewriterRole role={heroContent.role} />
            </p>
            <p className="mb-8 max-w-lg text-base text-muted-foreground leading-relaxed">
              {heroContent.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {heroContent.call_to_action.map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-6 py-3",
                    idx === 0
                      ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                      : "border border-input bg-background hover:bg-accent/10 hover:text-primary hover:border-primary/50"
                  )}
                >
                  {item.name}
                  <item.icon size={18} className="ml-2" />
                </Link>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4">
              {socialsArr.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-all hover:border-primary hover:bg-primary/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                  aria-label={item.name}
                >
                  <Image
                    src={item.path}
                    alt={"logo of " + item.name}
                    height={22}
                    width={22}
                    className="dark:hidden transition-transform duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  />
                  <Image
                    src={item.path.replace(".svg", ".light.svg")}
                    alt={"logo of " + item.name}
                    height={22}
                    width={22}
                    className="hidden dark:block transition-transform duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center animate-in slide-in-from-right-8 fade-in duration-1000 delay-150 fill-mode-both">
            <div className="relative flex items-center justify-center h-72 w-72 rounded-full bg-linear-to-br from-primary/20 to-accent/20 p-4 md:h-96 md:w-96 shadow-2xl shadow-primary/10">
              <Image
                src={heroContent.image_path}
                alt="It's me (Dipanshu Choksi)."
                className="object-cover object-center h-full w-full rounded-full border-4 border-background shadow-inner"
                height={400}
                width={400}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
