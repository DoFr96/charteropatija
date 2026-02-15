import { notFound } from 'next/navigation'
import { getBoatBySlug, getAllBoatSlugs, getAllBoatImages, AppLocale } from '@/lib/boat-actions'
import BoatPage from './BoatsPage'

export const dynamic = 'force-static'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllBoatSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const boat = await getBoatBySlug(slug)

  if (!boat) return { title: 'Boat Not Found' }

  return {
    title: `${boat.name} | All In One Charter`,
    description: boat.tagline || `Charter ${boat.name} in Opatija, Croatia`,
  }
}

export default async function BoatDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const boat = await getBoatBySlug(slug, locale as AppLocale)

  if (!boat) {
    notFound()
  }

  const images = getAllBoatImages(boat)

  return <BoatPage boat={boat} images={images} />
}
