import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid"
import { Reveal } from "@/components/reveal"
import {
  Sofa,
  UtensilsCrossed,
  BedDouble,
  Briefcase,
  Boxes,
  WashingMachine,
} from "lucide-react"

const items: BentoItem[] = [
  {
    title: "Living Room",
    description:
      "Sofa sets, coffee tables and accent seating to anchor the space you relax in.",
    icon: <Sofa className="w-5 h-5" />,
    tags: ["Sofa Sets", "Coffee Tables"],
    hasPersistentHover: true,
    cta: "View sofas →",
    href: "#sofas",
    image: "/covers/living-room.webp",
    imageAlt: "A living room with a sofa set",
  },
  {
    title: "Dining",
    description:
      "Dining tables and chairs in a range of sizes to gather the family around.",
    icon: <UtensilsCrossed className="w-5 h-5" />,
    tags: ["Dining Tables", "Chairs"],
    cta: "Ask in store →",
    image: "/covers/dining.webp",
    imageAlt: "A dining table with chairs",
  },
  {
    title: "Bedroom",
    description:
      "Complete bedroom sets, double and single beds, and quality mattresses.",
    icon: <BedDouble className="w-5 h-5" />,
    tags: ["Bedroom Sets", "Double Beds", "Single Beds", "Mattresses"],
    cta: "Ask in store →",
    image: "/covers/bedroom.webp",
    imageAlt: "A bedroom with a double bed",
  },
  {
    title: "Office",
    description:
      "Office tables, desks and chairs to outfit any workspace, big or small.",
    icon: <Briefcase className="w-5 h-5" />,
    tags: ["Office Tables", "Chairs"],
    cta: "Ask in store →",
    image: "/covers/office.webp",
    imageAlt: "An office chair and desk",
  },
  {
    title: "Storage & Cabinets",
    description:
      "Wardrobes and cupboards to keep every room tidy and organised.",
    icon: <Boxes className="w-5 h-5" />,
    tags: ["Wardrobes", "Cupboards"],
    cta: "View wardrobes →",
    href: "#wardrobes",
    image: "/wardrobes/wardrobe-001-enhanced.webp",
    imageAlt: "A white wardrobe",
  },
  {
    title: "Appliances",
    description:
      "Fridges, washing machines, cookers, gas cookers and ovens — checked and ready.",
    icon: <WashingMachine className="w-5 h-5" />,
    tags: ["Fridges", "Washing Machines", "Gas Cookers", "Ovens"],
    cta: "View appliances →",
    href: "#fridges",
    image: "/covers/appliances.webp",
    imageAlt: "Home appliances including fridge and washing machine",
  },
]

export function Categories() {
  return (
    <section id="categories" className="scroll-anchor px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            The Collection
          </p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight text-foreground">
            Everything for the home and office.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            One showroom, every room covered — from sofa sets and bedroom sets to
            appliances. Browse by category, or just walk in and tell us what
            you're looking for.
          </p>
        </Reveal>

        <BentoGrid items={items} />
      </div>
    </section>
  )
}
