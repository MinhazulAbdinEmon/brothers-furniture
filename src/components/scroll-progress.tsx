import { motion, useScroll, useSpring } from "framer-motion"

/**
 * Thin accent bar pinned to the top that tracks scroll progress, smoothed with
 * a spring so it glides rather than jumps.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent/40 via-accent to-accent/40"
    />
  )
}
