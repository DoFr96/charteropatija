import KvarnerMap from './components/KvarnerMap'
import FleetSection from './components/Fleet'
import HeroSection from './components/Hero'
import Info from './components/Info'
import './styles.css'

export default async function HomePage() {
  return (
    <section>
      <HeroSection />
      <Info />
      <FleetSection />
      <KvarnerMap />
    </section>
  )
}
