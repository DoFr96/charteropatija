import Image from 'next/image'

const featuredBoats = [
  {
    id: 1,
    name: 'Cap Camarat 8.5',
    image:
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Merry Fisher 795',
    image:
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Cranchi Z 35',
    image:
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=500&auto=format&fit=crop',
  },
]

export default function HeroSection() {
  return (
    <section className="relative h-svh w-full overflow-hidden bg-deep-navy">
      {/* Background Image - different for mobile/desktop */}
      <div className="absolute inset-x-0 top-0 h-[90%] md:h-full">
        {/* Mobile image */}
        <Image
          src="/images/chartermobile1.png"
          alt="Cranchi Z 35 cruising on Adriatic"
          fill
          className="object-cover md:hidden"
          priority
        />
        {/* Desktop image */}
        <Image
          src="/images/cranchicover1.png"
          alt="Cranchi Z 35 cruising on Adriatic"
          fill
          className="hidden object-cover md:block"
          priority
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/20 to-deep-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/50 via-transparent to-transparent md:from-deep-navy/60" />
      </div>

      {/* Main Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 md:px-10 md:pb-10 lg:px-16 lg:pb-14">
        {/* Text Content */}
        <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-sand md:mb-3 md:text-sm">
          Opatija • Kvarner Bay
        </span>

        <h1 className="text-[11vw] font-semibold leading-[0.95] tracking-[-0.02em] text-warm-white md:text-6xl lg:text-7xl">
          Your Adriatic
          <br />
          <span className="text-sand">Adventure</span>
        </h1>

        <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-warm-white/60 md:mt-5 md:max-w-md md:text-base">
          Premium boat charter. Explore hidden coves of Mošćenička Draga, Brseč and beyond.
        </p>

        {/* Boat Thumbnails - inline on mobile, absolute on desktop */}
        <div className="mt-6 flex gap-3 md:absolute md:bottom-10 md:right-10 md:mt-0 lg:bottom-14 lg:right-16">
          {featuredBoats.map((boat) => (
            <div
              key={boat.id}
              className="group relative aspect-[4/3] flex-1 overflow-hidden rounded-xl  md:aspect-auto md:h-24 md:w-32 md:flex-none md:rounded-lg xl:h-36 xl:w-44"
            >
              <Image src={boat.image} alt={boat.name} fill className="object-cover" />
              <div className="absolute -inset-px bg-gradient-to-t from-deep-navy/80 via-deep-navy/20 to-transparent" />{' '}
              <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-warm-white/10 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <svg
                  className="h-2.5 w-2.5 text-warm-white md:h-3 md:w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute bottom-2 left-2 right-2 md:right-auto">
                <span className="text-xs font-medium text-warm-white">{boat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
