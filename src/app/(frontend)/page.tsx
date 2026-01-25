import KvarnerMap from './components/KvarnerMap'
import FleetSection from './components/Fleet'
import HeroSection from './components/Hero'
import Info from './components/Info'
import Navbar from './components/Navbar'
import './styles.css'
import TripsGallery from './components/TripsGallery'
import ReviewsSection from './components/Reviews'
import { getBoatsForFleet } from '@/lib/boat-actions'

export const dynamic = 'force-static'
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
      <ReviewsSection />
    </section>
  )
}
