import { useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"

// lucide "sofa" outline, drawn one stroke at a time
const sofaPaths = [
  { d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3", delay: 0 },
  {
    d: "M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z",
    delay: 0.35,
  },
  { d: "M4 18v2", delay: 1.0 },
  { d: "M20 18v2", delay: 1.1 },
]

/**
 * Furniture-themed opening: a sofa illustration draws itself stroke by stroke
 * in the brand accent, the name fades in beneath it, then the panel lifts away
 * to reveal the site.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const t = setTimeout(onDone, reduce ? 400 : 2600)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = prev
    }
  }, [onDone, reduce])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { y: "-100%" }}
      transition={{ duration: reduce ? 0.3 : 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Soft warm glow behind the sofa */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute h-[460px] w-[460px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--accent) / 0.14), transparent 65%)",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      )}

      {/* Self-drawing sofa */}
      <motion.svg
        viewBox="0 0 24 24"
        className="relative h-28 w-28 md:h-36 md:w-36"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 14px hsl(var(--accent) / 0.5))" }}
      >
        {sofaPaths.map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.1, ease: "easeInOut", delay: p.delay },
              opacity: { duration: 0.3, delay: p.delay },
            }}
          />
        ))}
      </motion.svg>

      {/* Brand name */}
      <motion.h1
        className="relative px-6 text-center font-serif text-3xl tracking-tight text-white md:text-5xl"
        initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
      >
        Brothers Used <span className="text-accent">Furniture</span>
      </motion.h1>
    </motion.div>
  )
}
