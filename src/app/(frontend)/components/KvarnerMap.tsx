'use client'

import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'

const destinations = [
  {
    name: 'Ičići',
    position: { lat: 45.3072, lng: 14.28 },
    isHome: true,
    description: 'Your starting point for Adriatic adventures',
    highlights: ['Marina', 'Easy access to all destinations', 'Beautiful bay'],
    time: '—',
  },
  {
    name: 'Opatija',
    position: { lat: 45.3376, lng: 14.3052 },
    description: 'The pearl of Adriatic tourism',
    highlights: ['Historic villas', 'Lungomare promenade', 'Elegant architecture'],
    time: '5 min',
  },
  {
    name: 'Mošćenička Draga',
    position: { lat: 45.2333, lng: 14.25 },
    description: 'Charming fishing village with pebble beaches',
    highlights: ['Authentic atmosphere', 'Great seafood', 'Quiet coves'],
    time: '20 min',
  },
  {
    name: 'Brseč',
    position: { lat: 45.1795, lng: 14.2351 },
    description: 'Hidden paradise perched on cliffs',
    highlights: ['Panoramic views', 'Secluded beaches', 'Medieval architecture'],
    time: '35 min',
  },
  {
    name: 'Rabac',
    position: { lat: 45.0782, lng: 14.1617 },
    description: 'Pearl of Kvarner Bay',
    highlights: ['White pebble beaches', 'Turquoise water', 'Water sports'],
    time: '50 min',
  },
  {
    name: 'Cres',
    position: { lat: 44.9611, lng: 14.4084 },
    description: 'Unspoiled island beauty',
    highlights: ['Venetian architecture', 'Griffon vultures', 'Blue cave'],
    time: '1h 15min',
  },
  {
    name: 'Lubenice',
    position: { lat: 44.8869, lng: 14.3314 },
    description: 'Medieval hilltop village with stunning views',
    highlights: ['One of most beautiful beaches', 'Ancient stone houses', 'Untouched nature'],
    time: '1h 20min',
  },
  {
    name: 'Valun',
    position: { lat: 44.9002, lng: 14.3628 },
    description: 'Secluded bay with crystal clear water',
    highlights: ['Hidden gem', 'Stone houses', 'Perfect for swimming'],
    time: '1h 30min',
  },
  {
    name: 'Malinska',
    position: { lat: 45.1251, lng: 14.5288 },
    description: 'Green oasis on the island of Krk',
    highlights: ['Pine forests', 'Family beaches', 'Romantic sunsets'],
    time: '35 min',
  },
  {
    name: 'Krk',
    position: { lat: 45.0279, lng: 14.5752 },
    description: 'Golden island with rich history',
    highlights: ['Roman ruins', 'Frankopan castle', 'Local wine'],
    time: '45 min',
  },
  {
    name: 'Baška',
    position: { lat: 44.9711, lng: 14.7522 },
    description: 'Famous for stunning pebble beach',
    highlights: ['Vela plaža beach', 'Glagolitic heritage', 'Hiking trails'],
    time: '1h 10min',
  },
  {
    name: 'Crikvenica',
    position: { lat: 45.1772, lng: 14.6928 },
    description: 'Popular family resort with sandy beaches',
    highlights: ['Shallow waters', 'Promenade', 'Wellness tradition'],
    time: '40 min',
  },
  {
    name: 'Novi Vinodolski',
    position: { lat: 45.1281, lng: 14.7889 },
    description: 'Historic coastal town with thermal springs',
    highlights: ['Frankopan tower', 'Wine tradition', 'Family beaches'],
    time: '55 min',
  },
]

// Lighter dark map style
const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1a2d47' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a2d47' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a9bae' }] },
  // gradovi skriveni ili ne
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ visibility: 'off' }],
  },

  // Sakrij sve labels generalno
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d4c5a9' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c54' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2d4a6a' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1a3550' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2d4a6a' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1a3550' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#d4c5a9' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2d4a6a' }] },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d4c5a9' }],
  },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#2a4865' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#6a8caa' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#1a2d47' }] },
]

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = { lat: 45.15, lng: 14.4 }
export default function KvarnerMap() {
  const [selectedDest, setSelectedDest] = useState<(typeof destinations)[0] | null>(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  const onMarkerClick = useCallback((dest: (typeof destinations)[0]) => {
    setSelectedDest(dest)
  }, [])

  const onInfoWindowClose = useCallback(() => {
    setSelectedDest(null)
  }, [])
  const zoom = typeof window !== 'undefined' && window.innerWidth < 768 ? 9 : 10
  return (
    <section className="bg-deep-navy py-24 md:py-32 lg:py-40">
      <div className="px-5 md:px-10 lg:px-16">
        <h2 className="text-5xl font-semibold text-warm-white md:text-6xl xl:text-7xl">
          Explore the
          <br />
          <span className="text-sand">Kvarner Bay</span>
        </h2>
        <p className="mt-4 max-w-md text-warm-white/50 md:mt-6 md:text-lg">
          Discover hidden coves, pristine beaches, and charming coastal towns
        </p>
      </div>

      <div className="relative mt-12 md:mt-16 px-5 md:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl aspect-[9/16] md:aspect-[4/3]  overflow-hidden">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
              onClick={onInfoWindowClose}
              options={{
                styles: darkMapStyle,
                disableDefaultUI: true,
                zoomControl: false,
                scrollwheel: false,
              }}
            >
              {destinations.map((dest) => (
                <Marker
                  key={dest.name}
                  position={dest.position}
                  onClick={() => onMarkerClick(dest)}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: dest.isHome ? 8 : 8,
                    fillColor: dest.isHome ? '#22d3ee' : '#c4b59d',
                    fillOpacity: 1,
                    strokeColor: dest.isHome ? '#0e7490' : '#1a2d47',
                    strokeWeight: dest.isHome ? 3 : 3,
                  }}
                />
              ))}

              {selectedDest && (
                <InfoWindow position={selectedDest.position} onCloseClick={onInfoWindowClose}>
                  <div className="p-2 min-w-[200px]">
                    <h3
                      className={`font-semibold text-lg ${selectedDest.isHome ? 'text-cyan-600' : 'text-gray-900'}`}
                    >
                      {selectedDest.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{selectedDest.description}</p>

                    <ul className="mt-3 space-y-1">
                      {selectedDest.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <span className="text-amber-600">✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {!selectedDest.isHome && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm font-medium text-amber-700">
                          ⏱ {selectedDest.time} from Ičići
                        </p>
                      </div>
                    )}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <div className="w-full h-full bg-deep-navy/50 flex items-center justify-center">
              <p className="text-warm-white/50">Loading map...</p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-8 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 border-2 border-cyan-700" />
            <span className="text-sm text-warm-white/50">Starting point (Ičići)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-sand" />
            <span className="text-sm text-warm-white/50">Destinations</span>
          </div>
        </div>
      </div>
    </section>
  )
}
