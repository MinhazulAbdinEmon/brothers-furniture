import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Lenis from "lenis"
import { RouterProvider, useRouter } from "@/lib/router"
import { Intro } from "@/components/intro"
import { ScrollProgress } from "@/components/scroll-progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HomePage } from "@/components/pages/home-page"
import { CategoryPage } from "@/components/pages/category-page"
import { AllProductsPage } from "@/components/pages/all-products-page"
import { categoryBySlug } from "@/lib/categories-registry"

export default function App() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  )
}

function Shell() {
  const { path } = useRouter()
  // Skip the brand intro when the visitor deep-links straight to a sub-page.
  const [introDone, setIntroDone] = useState(
    () => (window.location.pathname.replace(/\/+$/, "") || "/") !== "/"
  )

  // Buttery momentum scrolling on desktop only (native scroll on touch). Also
  // smoothly handles in-page anchor jumps like #visit.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 })
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

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

  const slug = path.replace(/^\/+|\/+$/g, "")
  let page
  if (slug === "") {
    page = <HomePage start={introDone} />
  } else if (slug === "all-products") {
    page = <AllProductsPage />
  } else {
    const category = categoryBySlug(slug)
    page = category ? (
      <CategoryPage category={category} />
    ) : (
      <HomePage start={introDone} />
    )
  }

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
        <main>{page}</main>
      </div>
      <Footer />
    </div>
  )
}
