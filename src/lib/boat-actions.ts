import { getPayload } from 'payload'
import config from '@payload-config'

// ============================================
// TYPES
// ============================================

// Minimal data for fleet cards
export type BoatCard = {
  id: string
  name: string
  slug: string
  category: 'motorboat' | 'yacht' | 'sailboat' | 'catamaran' | 'rib'
  capacity: number
  length: string | null
  motor: string | null
  priceLow: number
  year: string
  featuredImage: {
    url: string
    alt: string
  }
}

// Full data for detail page
export type BoatFull = {
  id: string
  name: string
  slug: string
  tagline: string | null
  description: string | null
  category: 'motorboat' | 'yacht' | 'sailboat' | 'catamaran' | 'rib'
  status: 'available' | 'maintenance' | 'booked' | 'hidden'
  // Specs
  length: string | null
  width: string | null
  capacity: number
  cabins: string | null
  year: number | null
  motor: string | null
  maxSpeed: string | null
  cruisingSpeed: string | null
  fuelTank: string | null
  waterTank: string | null
  fuelConsumption: string | null
  // Pricing
  priceLow: number
  priceHigh: number
  priceNote: string | null
  clickandboatUrl: string | null
  priceHalfDayLow: number | null
  priceHalfDayHigh: number | null
  priceWeeklyLow: number | null
  priceWeeklyHigh: number | null
  // Media
  featuredImage: {
    url: string
    alt: string
  }
  gallery: Array<{
    url: string
    alt: string
  }> | null
  // Reviews
  rating: number | null
  reviewCount: number | null
  reviews: Array<{
    text: string
    author: string
    country?: string
  }> | null
}

// ============================================
// FLEET PAGE - Minimal data, fast loading
// ============================================

export async function getBoatsForFleet(): Promise<BoatCard[]> {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'boats',
    where: {
      status: { not_equals: 'hidden' },
    },
    select: {
      name: true,
      slug: true,
      category: true,
      capacity: true,
      length: true,
      motor: true,
      priceLow: true,
      year: true,
      featuredImage: true,
    },
    sort: 'priceLow',
    limit: 20,
    depth: 1,
  })

  return docs as unknown as BoatCard[]
}

// ============================================
// DETAIL PAGE - Full data
// ============================================
export type AppLocale = 'en' | 'de'

export async function getBoatBySlug(
  slug: string,
  locale: AppLocale = 'en',
): Promise<BoatFull | null> {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'boats',
    where: {
      slug: { equals: slug },
    },
    locale: locale === 'en' ? undefined : locale,
    limit: 1,
    depth: 2,
  })

  if (!docs[0]) return null
  return docs[0] as unknown as BoatFull
}

// ============================================
// STATIC PARAMS - for generateStaticParams
// ============================================

export async function getAllBoatSlugs(): Promise<string[]> {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'boats',
    where: {
      status: { not_equals: 'hidden' },
    },
    select: {
      slug: true,
    },
    limit: 100,
    depth: 0,
  })

  return docs.map((doc) => doc.slug)
}

// ============================================
// HELPERS
// ============================================

{
  /*
  export function getAllBoatImages(boat: BoatFull): string[] {
  const images: string[] = []

  if (boat.featuredImage?.url) {
    images.push(boat.featuredImage.url)
  }

  if (boat.gallery) {
    boat.gallery.forEach((image) => {
      if (image?.url) {
        images.push(image.url)
      }
    })
  }

  return images
}
  
  */
}
export function getAllBoatImages(boat: BoatFull): string[] {
  const images: string[] = []

  const getOptimized = (img: any): string | null => {
    const hero = img?.sizes?.hero?.url
    const original = img?.url

    if (hero && hero !== 'null') return hero
    if (original && original !== 'null') return original
    return null
  }

  const featured = getOptimized(boat.featuredImage)
  if (featured) images.push(featured)

  if (boat.gallery) {
    boat.gallery.forEach((image: any) => {
      const url = getOptimized(image)
      if (url) images.push(url)
    })
  }

  return images
}

export function formatPrice(price: number): string {
  return `€${price.toLocaleString()}`
}

export function formatPriceRange(low: number, high: number): string {
  return `${formatPrice(low)} - ${formatPrice(high)}`
}
