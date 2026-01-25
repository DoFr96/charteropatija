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
      {/* Header - keeps padding */}
      <div className="px-5 md:px-10 lg:px-16">
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
      </div>

      {/* Gallery - full width with minimal padding */}
      <div className="mt-12 md:mt-16 px-5 md:px-4 lg:px-6 xl:px-8">
        {/* Mobile: Simple 2-column grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {destinations.slice(0, 6).map((dest) => (
            <div key={dest.id} className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
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

        {/* Tablet: 4 slike (1 velika + 3) */}
        <div className="hidden md:flex lg:hidden gap-2 h-[400px]">
          {/* Large left */}
          <div className="group relative w-1/2 overflow-hidden rounded-xl cursor-pointer">
            <Image
              src={destinations[0].image}
              alt={destinations[0].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-medium uppercase tracking-wider text-sand">
                {destinations[0].location}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-warm-white">{destinations[0].name}</h3>
            </div>
          </div>

          {/* Right - 1 top + 2 bottom */}
          <div className="w-1/2 flex flex-col gap-2">
            <div className="group relative flex-1 overflow-hidden rounded-xl cursor-pointer">
              <Image
                src={destinations[1].image}
                alt={destinations[1].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <h3 className="text-sm font-semibold text-warm-white">{destinations[1].name}</h3>
              </div>
            </div>
            <div className="flex-1 flex gap-2">
              <div className="group relative flex-1 overflow-hidden rounded-xl cursor-pointer">
                <Image
                  src={destinations[2].image}
                  alt={destinations[2].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-sm font-semibold text-warm-white">{destinations[2].name}</h3>
                </div>
              </div>
              <div className="group relative flex-1 overflow-hidden rounded-xl cursor-pointer">
                <Image
                  src={destinations[3].image}
                  alt={destinations[3].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1.5 rounded-lg bg-warm-white text-deep-navy text-xs font-medium">
                    View all
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop: 5 slika (1 velika + 2x2) */}
        <div className="hidden lg:flex xl:hidden gap-3 h-[480px]">
          {/* Large left */}
          <div className="group relative w-[45%] overflow-hidden rounded-2xl cursor-pointer">
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
              <h3 className="mt-1 text-xl font-semibold text-warm-white">{destinations[0].name}</h3>
            </div>
          </div>

          {/* Right - 2x2 grid */}
          <div className="w-[55%] grid grid-cols-2 grid-rows-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <Image
                  src={destinations[i].image}
                  alt={destinations[i].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-transparent" />
                {i === 4 ? (
                  <div className="absolute bottom-4 right-4">
                    <span className="px-4 py-2 rounded-lg bg-warm-white text-deep-navy text-sm font-medium">
                      View all
                    </span>
                  </div>
                ) : (
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-sm font-semibold text-warm-white">
                      {destinations[i].name}
                    </h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop XL: 6 slika (1 velika + 2x2 + 1 visoka) */}
        <div className="hidden xl:flex gap-3 h-[520px]">
          {/* Large left */}
          <div className="group relative w-[38%] overflow-hidden rounded-2xl cursor-pointer">
            <Image
              src={destinations[0].image}
              alt={destinations[0].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs font-medium uppercase tracking-wider text-sand">
                {destinations[0].location}
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-warm-white">
                {destinations[0].name}
              </h3>
            </div>
          </div>

          {/* Middle - 2x2 grid */}
          <div className="w-[40%] grid grid-cols-2 grid-rows-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <Image
                  src={destinations[i].image}
                  alt={destinations[i].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-sm font-semibold text-warm-white">{destinations[i].name}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Tall right */}
          <div className="group relative w-[22%] overflow-hidden rounded-2xl cursor-pointer">
            <Image
              src={destinations[5].image}
              alt={destinations[5].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-lg font-semibold text-warm-white">{destinations[5].name}</h3>
              <p className="text-xs text-warm-white/60 mt-1">{destinations[5].location}</p>
            </div>
            <div className="absolute top-4 right-4">
              <span className="px-4 py-2 rounded-lg bg-warm-white text-deep-navy text-sm font-medium">
                View all
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
