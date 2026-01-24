'use client'

import Image from 'next/image'

const destinations = [
  {
    id: 1,
    name: 'Lubenice',
    location: 'Cres Island',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    size: 'large',
  },
  {
    id: 2,
    name: 'Valun',
    location: 'Cres Island',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop',
    size: 'medium',
  },
  {
    id: 3,
    name: 'Baška',
    location: 'Krk Island',
    image:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=800&auto=format&fit=crop',
    size: 'medium',
  },
  {
    id: 4,
    name: 'Rabac',
    location: 'Istria',
    image:
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: 5,
    name: 'Mošćenička Draga',
    location: 'Opatija Riviera',
    image:
      'https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=800&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: 6,
    name: 'Crikvenica',
    location: 'Vinodol Coast',
    image:
      'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=800&auto=format&fit=crop',
    size: 'large',
  },
  {
    id: 7,
    name: 'Sveti Ivan',
    location: 'Cres Island',
    image:
      'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?q=80&w=800&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: 8,
    name: 'Oprna Bay',
    location: 'Krk Island',
    image:
      'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?q=80&w=800&auto=format&fit=crop',
    size: 'small',
  },
]

export default function TripsGallery() {
  return (
    <section className="bg-deep-navy py-24 md:py-32 lg:py-40">
      <div className="px-5 md:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-sand">
            Destinations
          </span>
          <h2 className="mt-3 text-4xl font-semibold text-warm-white md:text-5xl lg:text-6xl">
            Where will your
            <br />
            <span className="text-sand">adventure</span> take you?
          </h2>
          <p className="mt-4 text-warm-white/50 md:mt-6 md:text-lg">
            Crystal-clear waters and hidden beaches await. Each destination offers its own unique
            charm.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 md:mt-16">
          {/* Mobile: Simple 2-column grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {destinations.slice(0, 6).map((dest) => (
              <div
                key={dest.id}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-deep-navy/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-sm font-semibold text-warm-white">{dest.name}</h3>
                  <p className="text-xs text-warm-white/60">{dest.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Bento Layout - 1 large left + 4 small right (2x2) */}
          <div className="hidden md:flex gap-3 lg:gap-4 max-w-6xl mx-auto h-[420px] lg:h-[480px]">
            {/* Large - Left side */}
            <div className="group relative w-1/2 overflow-hidden rounded-2xl cursor-pointer">
              <Image
                src={destinations[0].image}
                alt={destinations[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-xs font-medium uppercase tracking-wider text-sand">
                  {destinations[0].location}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-warm-white lg:text-2xl">
                  {destinations[0].name}
                </h3>
              </div>
            </div>

            {/* Right side - 2x2 grid */}
            <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-3 lg:gap-4">
              {/* Top left */}
              <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <Image
                  src={destinations[1].image}
                  alt={destinations[1].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-sm font-semibold text-warm-white">{destinations[1].name}</h3>
                </div>
              </div>

              {/* Top right */}
              <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <Image
                  src={destinations[2].image}
                  alt={destinations[2].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-sm font-semibold text-warm-white">{destinations[2].name}</h3>
                </div>
              </div>

              {/* Bottom left */}
              <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <Image
                  src={destinations[3].image}
                  alt={destinations[3].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-sm font-semibold text-warm-white">{destinations[3].name}</h3>
                </div>
              </div>

              {/* Bottom right - with "View all" button */}
              <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <Image
                  src={destinations[4].image}
                  alt={destinations[4].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
