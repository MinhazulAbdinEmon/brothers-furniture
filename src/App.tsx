import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Lenis from "lenis"
import { Intro } from "@/components/intro"
import { ScrollProgress } from "@/components/scroll-progress"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Brand } from "@/components/brand"
import { Categories } from "@/components/categories"
import { Sofas } from "@/components/sofas"
import { Fridges } from "@/components/fridges"
import { Ovens } from "@/components/ovens"
import { WashingMachines } from "@/components/washing-machines"
import { Wardrobes } from "@/components/wardrobes"
import { Delivery } from "@/components/delivery"
import { Featured } from "@/components/featured"
import { Footer } from "@/components/footer"

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  // Buttery momentum scrolling + smooth in-page anchor jumps (Lenis).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      lerp: 0.09, // frame-rate-independent smoothing — smooth but responsive
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Smoothly scroll to in-page anchors instead of jumping
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      )
      if (!link) return
      const hash = link.getAttribute("href")
      if (!hash || hash.length < 2) return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.2 })
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatePresence>
        {!introDone && <Intro key="intro" onDone={() => setIntroDone(true)} />}
      </AnimatePresence>

      <ScrollProgress />
      <Navbar />
      {/* Opaque content layer sits above the fixed sticky footer so the footer
          only reveals once you scroll past this layer. */}
      <div className="relative z-10 bg-background">
        <main>
          <Hero start={introDone} />
          <Brand />
          <Categories />
          <Sofas />
          <Fridges />
          <Ovens />
          <WashingMachines />
          <Wardrobes />
          <Delivery />
          <Featured />
        </main>
      </div>
      <Footer />
    </div>
  )
}
