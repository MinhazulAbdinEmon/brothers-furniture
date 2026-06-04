import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  Facebook,
  Instagram,
  Phone,
  MapPin,
  Clock,
  Truck,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { site, primaryPhone } from "@/lib/site"

const exploreLinks = [
  { title: "Collection", href: "#categories" },
  { title: "Featured", href: "#featured" },
  { title: "Back to top", href: "#top" },
]

const socialLinks = [
  { title: "Facebook", href: site.socials.facebook, icon: Facebook },
  { title: "Instagram", href: site.socials.instagram, icon: Instagram },
]

export function Footer() {
  return (
    <footer
      id="visit"
      className="scroll-anchor relative w-full overflow-hidden border-t border-border bg-background"
    >
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 isolate z-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
              {/* Brand */}
              <AnimatedContainer className="w-full max-w-sm space-y-5">
                <a href="#top" className="font-serif text-2xl tracking-tight text-foreground">
                  Shahid Used Furniture<span className="text-accent">.</span>
                </a>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Sofa sets, dining tables, bedroom sets, beds and mattresses,
                  cupboards, fridges, washing machines, cookers and ovens —
                  hand-picked, fairly priced, and delivered across the UAE. Visit
                  our showroom in {site.location.label}.
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.title}
                      asChild
                      size="icon"
                      variant="outline"
                      className="size-9 rounded-full"
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.title}
                      >
                        <link.icon className="size-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </AnimatedContainer>

              {/* Visit */}
              <AnimatedContainer delay={0.1} className="w-full md:max-w-xs">
                <h3 className="text-sm uppercase tracking-widest text-foreground">
                  Visit
                </h3>
                <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{site.location.label}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{site.hours}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Truck className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>Delivery across the UAE</span>
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 rounded-full"
                >
                  <a
                    href={site.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get directions
                    <ArrowUpRight className="ml-1.5 size-4" />
                  </a>
                </Button>
              </AnimatedContainer>

              {/* Contact */}
              <AnimatedContainer delay={0.2} className="w-full md:max-w-xs">
                <h3 className="text-sm uppercase tracking-widest text-foreground">
                  Contact
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  {site.phones.map((p) => (
                    <li key={p.tel}>
                      <a
                        href={`tel:${p.tel}`}
                        className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-foreground"
                      >
                        <Phone className="size-4 text-accent" />
                        {p.label}
                        {p.primary && (
                          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-accent">
                            Primary
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-6 rounded-full bg-[#25D366] text-black hover:bg-[#25D366]/90"
                >
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 size-4" />
                    WhatsApp {primaryPhone.label}
                  </a>
                </Button>
              </AnimatedContainer>

              {/* Explore */}
              <AnimatedContainer delay={0.3} className="w-full md:max-w-[10rem]">
                <h3 className="text-sm uppercase tracking-widest text-foreground">
                  Explore
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  {exploreLinks.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="transition-colors duration-300 hover:text-foreground"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Shahid Used Furniture Trading. All rights reserved.</p>
          <p>{site.location.label}</p>
        </div>
      </div>
    </footer>
  )
}

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode
  delay?: number
}

function AnimatedContainer({ delay = 0.1, children, ...props }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div {...(props as React.ComponentProps<"div">)}>{children}</div>
  }

  return (
    <motion.div
      initial={{ translateY: -8, opacity: 0 }}
      whileInView={{ translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
