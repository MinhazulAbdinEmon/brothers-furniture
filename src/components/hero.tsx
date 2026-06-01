import { type CSSProperties, useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion"
import { Phone, MessageCircle, ChevronDown } from "lucide-react"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { Button } from "@/components/ui/button"
import { site, primaryPhone } from "@/lib/site"

const images = [
  "/gallery/living-navy.jpg",
  "/gallery/office-chair.jpg",
  "/gallery/sofa-blue.jpg",
  "/gallery/oven.jpg",
  "/gallery/bed.jpg",
  "/gallery/fridge.jpg",
  "/gallery/washer.jpg",
]

const titleWords = [
  { text: "Shahid", className: "text-white" },
  { text: "Used", className: "text-white" },
  { text: "Furniture", className: "text-accent" },
]

const NUM_COLS = 4

// Each column gets a rotated order + its own speed/direction so nothing lines up.
const columns = [
  { dir: "up" as const, dur: "38s", show: "", offset: 0 },
  { dir: "down" as const, dur: "46s", show: "", offset: 1 },
  { dir: "up" as const, dur: "42s", show: "hidden sm:flex", offset: 2 },
  { dir: "down" as const, dur: "52s", show: "hidden lg:flex", offset: 3 },
]

function rotate<T>(arr: T[], by: number) {
  return arr.map((_, i) => arr[(i + by) % arr.length])
}

const EASE = [0.22, 1, 0.36, 1] as const

const contentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.6 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
}

export function Hero({ start = true }: { start?: boolean }) {
  const reduce = useReducedMotion()
  const active = start || reduce

  // Subtle parallax: the image wall drifts as you scroll through the hero
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const wallY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Scrolling image wall — tiles reveal one by one, with scroll parallax */}
      <motion.div
        aria-hidden
        style={{ y: wallY }}
        className="pointer-events-none absolute inset-x-0 -inset-y-[16%] z-0 flex gap-3 px-3 md:gap-4 md:px-4"
      >
        {columns.map((col, ci) => {
          // Fewer tiles per column keeps the wall light; offsets still surface
          // all 7 photos across the columns.
          const ordered = rotate(images, col.offset).slice(0, 4)
          const tiles = [...ordered, ...ordered]
          return (
            <div key={ci} className={`min-w-0 flex-1 ${col.show} flex-col`}>
              <div
                className={`flex flex-col gap-3 md:gap-4 ${
                  col.dir === "up" ? "animate-scroll-up" : "animate-scroll-down"
                }`}
                style={{ "--dur": col.dur } as CSSProperties}
              >
                {tiles.map((src, i) => {
                  const firstSet = i < ordered.length
                  // Row-major sequence across columns for a one-by-one cascade
                  const order = firstSet ? i * NUM_COLS + ci : 0
                  const delay = firstSet ? 0.2 + order * 0.07 : 0.1
                  return (
                    <motion.img
                      key={i}
                      src={src}
                      alt=""
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="aspect-[3/4] w-full rounded-2xl border border-white/10 object-cover"
                      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, ease: EASE, delay: active ? delay : 0 }}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Readability overlays */}
      <div aria-hidden className="absolute inset-0 z-10 bg-black/55" />
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-b from-background/80 via-transparent to-background"
      />

      {/* Hero content */}
      <motion.div
        className="relative z-20 mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
        variants={contentVariants}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      >
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.3em] text-accent drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
        >
          {site.location.label} · Open daily
        </motion.p>

        <motion.div variants={itemVariants} className="mt-2">
          <TypewriterEffectSmooth
            words={titleWords}
            className="my-0 justify-center font-serif"
            cursorClassName="bg-accent h-9 sm:h-11 md:h-14 lg:h-16"
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-xl text-base leading-relaxed text-foreground/90 drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] md:text-lg"
        >
          Quality home & office furniture and appliances — hand-picked, fairly
          priced, and delivered across the UAE.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a href={`tel:${primaryPhone.tel}`}>
              <Phone className="mr-2 size-4" />
              Call us
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[#25D366] text-black hover:bg-[#25D366]/90"
          >
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 size-4" />
              WhatsApp
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/25 bg-white/5 text-foreground backdrop-blur hover:bg-white/10"
          >
            <a href="#categories">Browse collection</a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#categories"
        aria-label="Scroll to explore"
        className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-foreground/60 transition-colors hover:text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: active ? 1.8 : 0, duration: 0.8 }}
      >
        <ChevronDown className="size-7 animate-bounce" />
      </motion.a>
    </section>
  )
}
