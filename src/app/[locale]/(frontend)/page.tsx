import KvarnerMap from './components/KvarnerMap'
import FleetSection from './components/Fleet'
import HeroSection from './components/Hero'
import Info from './components/Info'
import Navbar from './components/Navbar'
import './styles.css'
import TripsGallery from './components/TripsGallery'
import ReviewsSection from './components/Reviews'
import { getBoatsForFleet } from '@/lib/boat-actions'
import OfficeSection from './components/Office'

import { routing } from '@/i18n/routing'
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function HomePage() {
  const boats = await getBoatsForFleet()
  return (
    <section className="relative bg-deep-navy">
      <Navbar />
      <HeroSection />
      <Info />
      <FleetSection boats={boats} />
      <KvarnerMap />
      <TripsGallery />
      <OfficeSection />
      <ReviewsSection />
    </section>
  )
}
