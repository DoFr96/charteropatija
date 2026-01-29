import Image from 'next/image'

const featuredBoats = [
  {
    id: 1,
    name: 'Cap Camarat',
    image: '/images/camaratthumbnailhero.jpg',
  },
  {
    id: 2,
    name: 'Merry Fisher',
    image: '/images/fisherthumbnailhero.JPG',
  },
  {
    id: 3,
    name: '2BAR',
    image: '/images/2barthumbnailhero.jpg',
  },
]

export default function HeroSection() {
  return (
    <section className="relative h-svh w-full overflow-hidden bg-deep-navy">
      {/* Background Image - different for mobile/desktop */}
      <div className="absolute inset-x-0 top-0 h-[90%] md:h-full">
        {/* Mobile image */}
        <Image
          src="/images/IMG_4865.jpg"
          alt="Cranchi Z 35 cruising on Adriatic"
          fill
          className="object-cover md:hidden"
          priority
        />
        {/* Desktop image */}
        <Image
          src="/images/IMG_4865.jpg"
          alt="Cranchi Z 35 cruising on Adriatic"
          fill
          className="hidden object-cover md:block"
          priority
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/70 via-deep-navy/10 to-deep-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/40 via-transparent to-transparent md:from-deep-navy/50" />
      </div>

      {/* Title Content - Top on mobile only */}
      <div className="absolute inset-x-0 top-28 z-10 px-5 md:hidden">
        <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-sand">
          Opatija • Kvarner Bay
        </span>

        <h1 className="text-[11vw] font-semibold leading-[0.95] tracking-[-0.02em] text-warm-white">
          Your Adriatic
          <br />
          <span className="text-sand">Adventure</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 md:px-10 md:pb-10 lg:px-16 lg:pb-14">
        {/* Text Content - Desktop only */}
        <span className="mb-3 hidden text-sm font-medium uppercase tracking-[0.2em] text-sand md:block">
          Opatija • Kvarner Bay
        </span>

        <h1 className="hidden font-semibold leading-[0.95] tracking-[-0.02em] text-warm-white md:block md:text-6xl lg:text-7xl">
          Your Adriatic
          <br />
          <span className="text-sand">Adventure</span>
        </h1>

        <p className="max-w-[280px] text-sm leading-relaxed text-warm-white/60 md:mt-5 md:max-w-md md:text-base">
          Your gateway to the Adriatic. Discover Cres, Krk, Crikvenica and the stunning Kvarner
          coastline.
        </p>

        {/* Boat Thumbnails - inline on mobile, absolute on desktop */}
        <div className="mt-6 flex gap-3 md:absolute md:bottom-10 md:right-10 md:mt-0 lg:bottom-14 lg:right-16">
          {featuredBoats.map((boat) => (
            <div
              key={boat.id}
              className="group relative aspect-[4/3] flex-1 overflow-hidden rounded-xl  md:aspect-auto md:h-24 md:w-32 md:flex-none md:rounded-lg xl:h-36 xl:w-44"
            >
              <Image src={boat.image} alt={boat.name} fill className="object-cover" />
              <div className="absolute -inset-px bg-gradient-to-t from-deep-navy/80 via-deep-navy/20 to-transparent" />
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
