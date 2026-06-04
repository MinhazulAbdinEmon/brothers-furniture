import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { site, primaryPhone } from "@/lib/site"
import { Link } from "@/lib/router"
import { CATEGORIES } from "@/lib/categories-registry"

const links = [
  ...CATEGORIES.map((c) => ({ label: c.label, to: `/${c.slug}` })),
  { label: "All", to: "/all-products" },
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
        "fixed top-0 inset-x-0 z-50 transition-[background-color,border-color] duration-500 ease-out",
        scrolled
          ? "bg-background/95 border-b border-border"
          : "bg-transparent border-b border-transparent",
        mounted ? "opacity-100" : "opacity-0"
      )}
      style={{ transitionProperty: "opacity, background-color, border-color" }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          to="/"
          className="shrink-0 font-serif text-lg text-foreground transition-colors hover:text-accent"
          aria-label={`${site.name} — home`}
        >
          {site.name}
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Button
          asChild
          size="sm"
          className="shrink-0 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
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
