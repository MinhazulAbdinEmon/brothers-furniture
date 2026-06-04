import { ReactNode } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

type Direction = "up" | "down" | "left" | "right" | "none"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in ms before this element animates in */
  delay?: number
  /** Direction the element travels in from */
  direction?: Direction
  /** Travel distance in px */
  distance?: number
}

const EASE = [0.22, 1, 0.36, 1] as const

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance }
    case "down":
      return { y: -distance }
    case "left":
      return { x: distance }
    case "right":
      return { x: -distance }
    default:
      return {}
  }
}

/**
 * Premium scroll-reveal: fades + travels + softly unblurs and settles to scale 1
 * once in view. Animates transform/opacity/filter only. Honors reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 44,
}: RevealProps) {
  const reduce = useReducedMotion()

  // Only opacity + transform animate — no blur/scale, which are expensive to
  // composite on mobile and were a source of scroll jank.
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset(direction, distance),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: EASE, delay: delay / 1000 },
    },
  }

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </motion.div>
  )
}
