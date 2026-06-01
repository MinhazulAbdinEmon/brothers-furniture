import { useEffect, useState } from "react"
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect"
import { Reveal } from "@/components/reveal"

function useResponsiveFontSize() {
  const [size, setSize] = useState("64px")
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setSize(w < 640 ? "34px" : w < 1024 ? "56px" : "84px")
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return size
}

export function Brand() {
  const fontSize = useResponsiveFontSize()

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-28 md:py-40">
      <Reveal className="mb-10">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Furnishing homes & offices across the UAE
        </p>
      </Reveal>

      {/* Vaporizing brand name */}
      <div className="h-[64px] w-full sm:h-[96px] lg:h-[140px]">
        <VaporizeTextCycle
          texts={["Shahid Used Furniture", "Home & Office", "Open Late, Daily"]}
          font={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize,
            fontWeight: 600,
          }}
          color="rgb(245, 240, 232)"
          spread={4}
          density={6}
          animation={{
            vaporizeDuration: 2.2,
            fadeInDuration: 1,
            waitDuration: 1.2,
          }}
          direction="left-to-right"
          alignment="center"
          tag={Tag.H2}
        />
      </div>
    </section>
  )
}
