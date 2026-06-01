import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Intro } from "@/components/intro"
import { ScrollProgress } from "@/components/scroll-progress"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Brand } from "@/components/brand"
import { Categories } from "@/components/categories"
import { Delivery } from "@/components/delivery"
import { Featured } from "@/components/featured"
import { Footer } from "@/components/footer"

export default function App() {
  const [introDone, setIntroDone] = useState(false)

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
          <Delivery />
          <Featured />
        </main>
      </div>
      <Footer />
    </div>
  )
}
