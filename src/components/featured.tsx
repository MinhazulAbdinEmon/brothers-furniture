import { GlowCard } from "@/components/ui/spotlight-card"
import { Reveal } from "@/components/reveal"
import { ShieldCheck, Clock, MapPin, ArrowUpRight } from "lucide-react"
import { site } from "@/lib/site"

const cards = [
  {
    icon: ShieldCheck,
    title: "Quality you can see",
    body: "From sofa sets, dining tables and bedroom sets to fridges, washing machines, cookers and ovens — every piece is hand-picked and checked before it reaches the floor.",
    foot: "Walk in & inspect",
    href: undefined as string | undefined,
  },
  {
    icon: Clock,
    title: "Open late, every day",
    body: "No rush, no weekday-only hours. We're open from 8:00 AM until 11:30 PM, seven days a week.",
    foot: site.hours,
    href: undefined,
  },
  {
    icon: MapPin,
    title: "Right here in Ajman",
    body: "Find us easily and see the full range in person. Tap below for directions to the showroom.",
    foot: "Get directions",
    href: site.location.mapsUrl,
  },
]

export function Featured() {
  return (
    <section id="featured" className="scroll-anchor px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Why Brothers
          </p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight text-foreground">
            A simpler way to furnish.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon
            const inner = (
              <>
                <div className="flex flex-col gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-serif text-2xl text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-accent">
                  {card.foot}
                  {card.href && <ArrowUpRight className="size-4" />}
                </div>
              </>
            )

            return (
              <Reveal key={card.title} delay={i * 120}>
                <GlowCard
                  glowColor="orange"
                  customSize
                  className="h-full min-h-[20rem] w-full"
                >
                  {card.href ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contents"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </GlowCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
