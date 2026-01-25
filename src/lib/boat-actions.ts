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
  // Media
  featuredImage: {
    url: string
    alt: string
  }
  gallery: Array<{
    image: {
      url: string
      alt: string
    }
    caption?: string
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
      featuredImage: true,
    },
    sort: '-featured,-createdAt',
    limit: 20,
    depth: 1,
  })

  return docs as unknown as BoatCard[]
}

// ============================================
// DETAIL PAGE - Full data
// ============================================

export async function getBoatBySlug(slug: string): Promise<BoatFull | null> {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'boats',
    where: {
      slug: { equals: slug },
    },
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

export function getAllBoatImages(boat: BoatFull): string[] {
  const images: string[] = []

  if (boat.featuredImage?.url) {
    images.push(boat.featuredImage.url)
  }

  if (boat.gallery) {
    boat.gallery.forEach((item) => {
      if (item.image?.url) {
        images.push(item.image.url)
      }
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
