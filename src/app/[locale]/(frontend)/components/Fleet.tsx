'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Users, Ruler, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { BoatCard } from '@/lib/boat-actions'

type Props = {
  boats: BoatCard[]
}

type Filter = 'all' | 'small' | 'large'

export default function FleetSection({ boats }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const scrollRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('Fleet')
  // scroll funkcionalnost
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const flexContainer = scrollRef.current.children[0] as HTMLElement
    const card = flexContainer.children[0] as HTMLElement
    if (!card) return
    const gap = 32 // md:gap-8 = 32px
    const scrollAmount = card.offsetWidth + gap
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const filteredBoats = boats.filter((boat) => {
    if (filter === 'small') return boat.capacity <= 7
    if (filter === 'large') return boat.capacity > 7
    return true
  })

  return (
    <section id="fleet" className="bg-deep-navy py-24 md:py-32 lg:py-40">
      {/* Header */}
      <div className="px-5 md:px-10 lg:px-16">
        <h2 className="text-5xl font-semibold text-warm-white md:text-6xl xl:text-7xl">
          {t('title')}
        </h2>
        <p className="mt-4 text-warm-white/50 md:mt-6 md:text-lg pl-1">
          {t('subtitle')}
        </p>
        {/* Filter Buttons & Navigation Arrows */}
        <div className="mt-10 flex items-center justify-between md:mt-12">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium md:px-5 md:py-2.5 md:text-sm  ${
                filter === 'all'
                  ? 'bg-sand text-deep-navy'
                  : 'border border-warm-white/20 text-warm-white hover:border-warm-white/40'
              }`}
            >
              {t('filterAll')}
            </button>
            <button
              onClick={() => setFilter('small')}
              className={`rounded-full px-5 py-2.5 text-sm font-medium  ${
                filter === 'small'
                  ? 'bg-sand text-deep-navy'
                  : 'border border-warm-white/20 text-warm-white hover:border-warm-white/40'
              }`}
            >
              {t('filterSmall')}
            </button>
            <button
              onClick={() => setFilter('large')}
              className={`rounded-full px-5 py-2.5 text-sm font-medium  ${
                filter === 'large'
                  ? 'bg-sand text-deep-navy'
                  : 'border border-warm-white/20 text-warm-white hover:border-warm-white/40'
              }`}
            >
              {t('filterLarge')}
            </button>
          </div>

          {/* Navigation Arrows - desktop only */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-warm-white/20 flex items-center justify-center hover:border-warm-white/40 transition"
            >
              <ChevronLeft className="w-5 h-5 text-warm-white" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-warm-white/20 flex items-center justify-center hover:border-warm-white/40 transition"
            >
              <ChevronRight className="w-5 h-5 text-warm-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div
        ref={scrollRef}
        className="mt-12 snap-x snap-mandatory scroll-pl-5 overscroll-x-contain overflow-x-auto scrollbar-hide md:mt-16 md:snap-none"
      >
        <div className="flex gap-5 px-5 pb-4 md:gap-8 md:px-10 lg:px-16">
          {' '}
          {filteredBoats.map((boat) => (
            <Link
              href={`/boats/${boat.slug}`}
              key={boat.id}
              className="snap-start snap-always group relative w-[295px] flex-shrink-0 overflow-hidden rounded-2xl backdrop-blur-sm bg-warm-white/[0.03] border border-warm-white/10 transition-all duration-500 hover:shadow-lg hover:shadow-sand/10 hover:border-warm-white/20 hover:-translate-y-1 md:w-[400px]"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sand/50 to-transparent" />
              {/* Image */}

              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={boat.featuredImage.url}
                  alt={boat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* 
                  
                  
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 to-transparent" />
                  
                  */}
              </div>

              {/* Content */}
              <div className="p-6 text-left md:p-8">
                <h3 className="text-xl font-semibold text-warm-white md:text-2xl">{boat.name}</h3>

                {/* Specs */}
                <div className="mt-5 flex gap-5">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-sand" />
                    <span className="text-base text-warm-white/70">{boat.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-sand" />
                    <span className="text-base text-warm-white/70">{boat.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-sand" />
                    <span className="text-base text-warm-white/70">{boat.year}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 flex items-center gap-2 text-sand">
                  <span className="text-base font-medium">{t('viewDetails')}</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
          {/* Spacer za padding na kraju */}
          <div className="w-1 flex-shrink-0 md:w-6" />
        </div>
      </div>
    </section>
  )
}
