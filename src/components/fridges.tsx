import { ProductGallery } from "./gallery/product-gallery"
import { FridgeFilterIcon } from "./fridges/fridge-icons"
import {
  fridges,
  FRIDGE_FILTERS,
  FRIDGE_CATEGORY_LABEL,
  type FridgeCategory,
} from "@/lib/fridges"

export function Fridges() {
  return (
    <ProductGallery
      id="fridges"
      eyebrow="Appliances"
      title="Fridges"
      subtitle="Checked and ready — see the real photo before you contact us."
      products={fridges}
      filters={FRIDGE_FILTERS}
      filterAriaLabel="Filter fridges by colour"
      icon={(value, className) => (
        <FridgeFilterIcon
          value={value as FridgeCategory | null}
          className={className}
        />
      )}
      categoryLabel={(c) => FRIDGE_CATEGORY_LABEL[c as FridgeCategory]}
    />
  )
}
