import { Hero } from "@/components/hero"
import { CategoryNav } from "@/components/category-nav"
import { Brand } from "@/components/brand"
import { Delivery } from "@/components/delivery"
import { Featured } from "@/components/featured"
import { ProductGallery } from "@/components/gallery/product-gallery"
import { CATEGORIES } from "@/lib/categories-registry"
import type { Product } from "@/lib/catalog"

const PREVIEW_COUNT = 4

/** Products marked `featured: true` lead their homepage preview; everything
 *  else keeps its catalog order (sort is stable). */
function featuredFirst(products: Product[]): Product[] {
  return [...products].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  )
}

/** Homepage: hero → visual category nav → a short preview of each category
 *  (4 products + View All + WhatsApp) → trust sections. Full catalogues live
 *  on the dedicated category pages, keeping this page light and fast. */
export function HomePage({ start }: { start: boolean }) {
  return (
    <>
      <Hero start={start} />
      <CategoryNav />
      <Brand />
      {CATEGORIES.map((c) => (
        <ProductGallery
          key={c.slug}
          id={`preview-${c.slug}`}
          eyebrow={c.eyebrow}
          title={c.title}
          subtitle={c.subtitle}
          products={featuredFirst(c.products)}
          icon={c.productIcon}
          categoryLabel={c.categoryLabel}
          previewCount={PREVIEW_COUNT}
          viewAllHref={`/${c.slug}`}
          whatsappCategory={c.title}
        />
      ))}
      <Delivery />
      <Featured />
    </>
  )
}
