'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

type Review = {
  text: string
  author: string
  date: string
}

type Props = {
  rating?: number
  reviewCount?: number
  clickandboatUrl?: string
  reviews?: Review[]
}

const defaultReviews: Review[] = [
  {
    text: 'IVO ist just a really nice guy, not complicated and flexibel. We had a great time with a great boat!',
    author: 'Steven',
    date: '9/12/2025',
  },
  {
    text: 'We enjoyed the trip :)',
    author: 'Susanne',
    date: '8/19/2025',
  },
  {
    text: 'Wonderful boat booked at the last minute for an 4 hour afternoon trip. We were 4 adults and 5 kids and had a fabulous afternoon. Highly recommend and will certainly use again!',
    author: 'Soraya',
    date: '7/30/2025',
  },
]

export default function ReviewsSection({
  rating = 4.8,
  reviewCount = 78,
  clickandboatUrl = 'https://www.clickandboat.com/en/boat-rental/opatija/motorboat/jeanneau-cap-camarat-8-5-cc-868rp6q',
  reviews = defaultReviews,
}: Props) {
  const [currentReview, setCurrentReview] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
    setIsAutoPlaying(false)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
    setIsAutoPlaying(false)
  }

  // Auto-rotate reviews
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, reviews.length])

  return (
    <section className="py-20 md:py-28 bg-warm-white">
      <div className="px-5 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Section label */}
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-deep-navy/40">
            Reviews
          </span>

          <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
            {/* Left - Rating */}
            <div className="flex-shrink-0">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl md:text-7xl font-semibold text-deep-navy">{rating}</span>
                <Star className="w-8 h-8 text-sand fill-sand" />
              </div>
              <div className="mt-2">
                <p className="text-deep-navy/60">
                  Based on <span className="font-medium text-deep-navy">{reviewCount}</span> reviews
                </p>
                <a
                  href={clickandboatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-deep-navy hover:text-sand transition-colors"
                >
                  Read all on Click&Boat
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right - Review Carousel */}
            <div className="flex-1 relative">
              {/* Quote */}
              <div className="min-h-[140px] md:min-h-[120px]">
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-deep-navy leading-relaxed">
                  &ldquo;{reviews[currentReview].text}&rdquo;
                </blockquote>
                <p className="mt-4 text-deep-navy/60">
                  <span className="font-medium text-deep-navy">
                    {reviews[currentReview].author}
                  </span>
                  {' · '}
                  {reviews[currentReview].date}
                </p>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={prevReview}
                  className="w-10 h-10 rounded-full border border-deep-navy/20 flex items-center justify-center text-deep-navy hover:bg-deep-navy hover:text-warm-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextReview}
                  className="w-10 h-10 rounded-full border border-deep-navy/20 flex items-center justify-center text-deep-navy hover:bg-deep-navy hover:text-warm-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="flex gap-2 ml-2">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentReview(idx)
                        setIsAutoPlaying(false)
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentReview
                          ? 'bg-deep-navy w-6'
                          : 'bg-deep-navy/20 hover:bg-deep-navy/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
