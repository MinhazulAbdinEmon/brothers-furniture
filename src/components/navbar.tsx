import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { site, primaryPhone } from "@/lib/site"

const links = [
  { label: "Collection", href: "#categories" },
  { label: "Delivery", href: "#delivery" },
  { label: "Featured", href: "#featured" },
  { label: "Visit", href: "#visit" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent",
        mounted ? "opacity-100" : "opacity-0"
      )}
      style={{ transitionProperty: "opacity, background-color, backdrop-filter, border-color" }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <Button
          asChild
          size="sm"
          className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <a href={`tel:${primaryPhone.tel}`} aria-label={`Call ${site.name}`}>
            <Phone className="mr-2 size-4" />
            Call us
          </a>
        </Button>
      </nav>
    </header>
  )
}
