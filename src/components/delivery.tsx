import { Reveal } from "@/components/reveal"
import { Truck } from "lucide-react"

const emirates = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
]

export function Delivery() {
  // Duplicated so the marquee can loop seamlessly (translateX -50%)
  const track = [...emirates, ...emirates]

  return (
    <section id="delivery" className="scroll-anchor border-y border-border/60 bg-card/40 px-6 py-24 md:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
            <Truck className="size-6" />
          </span>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-7 text-xs uppercase tracking-[0.3em] text-accent">
            Delivery across the UAE
          </p>
        </Reveal>
        <Reveal delay={140}>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight text-foreground">
            Delivered to your door, anywhere in the Emirates.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Choose your pieces in our Ajman showroom and we'll bring them home —
            to any of the seven emirates.
          </p>
        </Reveal>
      </div>

      {/* Seamless marquee of the seven emirates */}
      <Reveal delay={260} className="mt-14">
        <div className="marquee-mask relative flex overflow-hidden">
          <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
            {track.map((name, i) => (
              <li
                key={i}
                className="flex items-center gap-10 whitespace-nowrap font-serif text-2xl text-muted-foreground/70 md:text-3xl"
              >
                {name}
                <span className="text-accent/60">•</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
