import { ProductGallery } from "./gallery/product-gallery"
import { WardrobeIcon } from "./wardrobes/wardrobe-icons"
import { wardrobes } from "@/lib/wardrobes"

export function Wardrobes() {
  return (
    <ProductGallery
      id="wardrobes"
      eyebrow="Storage & Cabinets"
      title="Wardrobes"
      subtitle="Keep every room tidy — see the real photo before you contact us."
      products={wardrobes}
      icon={(_value, className) => <WardrobeIcon className={className} />}
      categoryLabel={() => "Wardrobe"}
    />
  )
}
