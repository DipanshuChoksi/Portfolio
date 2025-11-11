import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import Image from "next/image";
import { socialsArr } from "@/consts";
import { heroSection } from "@/interfaces";

export default function Hero({ heroContent }: { heroContent: heroSection }) {
  return (
    <section id="hero" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl text-balance">
              {heroContent.name}
            </h1>
            <p className="mb-4 text-lg text-muted-foreground sm:text-xl">
              {heroContent.role}
            </p>
            <p className="mb-8 max-w-lg text-base text-muted-foreground leading-relaxed">
              {heroContent.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {heroContent.call_to_action.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium transition-colors hover:bg-secondary"
                >
                  {item.name}
                  <item.icon size={18} />
                </Link>
              ))}
            </div>

            <div className="mt-8 gap-4 flex items-center">
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

          <div className="flex items-center justify-center">
            <div className="relative flex items-center justify-center h-72 w-72 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 p-8 md:h-96 md:w-96">
              <Image
                src={heroContent.image_path}
                alt="It's me (Dipanshu Choksi)."
                className="object-cover object-center h-full w-full rounded-2xl"
                height={300}
                width={240}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
