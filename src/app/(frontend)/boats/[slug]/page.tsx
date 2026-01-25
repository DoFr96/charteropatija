'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Ruler,
  Gauge,
  Fuel,
  Anchor,
  Calendar,
  ChevronDown,
  X,
} from 'lucide-react'

// Placeholder data - later from Payload CMS
const boatData = {
  slug: 'cranchi-z-35',
  name: 'Cranchi Z 35',
  tagline: 'Premium day cruiser for unforgettable adventures',
  description: `The Cranchi Z 35 is a masterpiece of Italian design and engineering. With its sleek lines and powerful twin Volvo Penta engines, this vessel offers the perfect combination of performance and luxury.

Ideal for day trips along the stunning Kvarner coastline, the Z 35 comfortably accommodates up to 12 guests. The spacious deck layout provides ample seating and sunbathing areas, while the cabin below offers a comfortable retreat with two sleeping areas.

Whether you're exploring hidden coves, anchoring at secluded beaches, or cruising to nearby islands, the Cranchi Z 35 delivers an exceptional experience on the water.`,
  images: [
    'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559494007-9f5847c49d94?q=80&w=1200&auto=format&fit=crop',
  ],
  specs: {
    length: '11.70 m',
    width: '3.5 m',
    capacity: 12,
    motor: '2x Volvo Penta 270 HP',
    fuelTank: '600 L',
    waterTank: '190 L',
    maxSpeed: '35 knots',
    cruisingSpeed: '28 knots',
    fuelConsumption: '80 L/hour',
    cabins: '2 (4+2)',
    year: 2022,
  },
  priceRange: {
    low: 1200,
    high: 1600,
    note: 'Full day with skipper (09:00 - 18:00)',
  },
}

export default function BoatDetailPage() {
  const [currentImage, setCurrentImage] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % boatData.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + boatData.images.length) % boatData.images.length)
  }

  const openLightbox = (index: number) => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  return (
    <main className="min-h-screen bg-deep-navy">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-deep-navy/80 backdrop-blur-md md:px-10 lg:px-16">
        <Link
          href="/"
          className="flex items-center gap-2 text-warm-white hover:text-sand transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-warm-white">Kvarner</span>
          <span className="text-sm font-light text-warm-white/60">Charter</span>
        </div>
      </header>

      {/* Gallery */}
      <section className="pt-16">
        {/* Mobile Gallery - UNCHANGED */}
        <div className="lg:hidden">
          <div className="relative aspect-[4/3]">
            <Image
              src={boatData.images[currentImage]}
              alt={`${boatData.name} - Image ${currentImage + 1}`}
              fill
              className="object-cover cursor-pointer"
              onClick={() => setLightboxOpen(true)}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-deep-navy/30" />

            {/* Gallery Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-deep-navy/50 backdrop-blur-sm flex items-center justify-center text-warm-white hover:bg-deep-navy/70 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-deep-navy/50 backdrop-blur-sm flex items-center justify-center text-warm-white hover:bg-deep-navy/70 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {boatData.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImage ? 'bg-sand w-6' : 'bg-warm-white/40 hover:bg-warm-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tablet/Desktop Bento Gallery */}
        <div className="hidden lg:block px-10 xl:px-16">
          <div className="max-w-[1400px] mx-auto">
            {/* Tablet: 4 images (1 large + 3 small) */}
            <div className="xl:hidden flex gap-2 h-[360px]">
              {/* Large left */}
              <button
                onClick={() => openLightbox(0)}
                className="group relative w-1/2 overflow-hidden rounded-xl"
              >
                <Image
                  src={boatData.images[0]}
                  alt={`${boatData.name} - 1`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </button>

              {/* Right column - 3 images */}
              <div className="w-1/2 flex flex-col gap-2">
                <button
                  onClick={() => openLightbox(1)}
                  className="group relative flex-1 overflow-hidden rounded-xl"
                >
                  <Image
                    src={boatData.images[1]}
                    alt={`${boatData.name} - 2`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <div className="flex-1 flex gap-2">
                  <button
                    onClick={() => openLightbox(2)}
                    className="group relative flex-1 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={boatData.images[2]}
                      alt={`${boatData.name} - 3`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                  <button
                    onClick={() => openLightbox(3)}
                    className="group relative flex-1 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={boatData.images[3]}
                      alt={`${boatData.name} - 4`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {boatData.images.length > 4 && (
                      <div className="absolute inset-0 bg-deep-navy/50 flex items-center justify-center">
                        <span className="text-warm-white font-medium">
                          +{boatData.images.length - 4} more
                        </span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop: 6 images (1 large left + 2x2 grid + 1 tall right) */}
            <div className="hidden lg:flex gap-3 h-[480px]">
              {/* Large left */}
              <button
                onClick={() => openLightbox(0)}
                className="group relative w-[45%] overflow-hidden rounded-2xl"
              >
                <Image
                  src={boatData.images[0]}
                  alt={`${boatData.name} - 1`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </button>

              {/* Middle 2x2 grid */}
              <div className="w-[30%] grid grid-cols-2 grid-rows-2 gap-3">
                <button
                  onClick={() => openLightbox(1)}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <Image
                    src={boatData.images[1]}
                    alt={`${boatData.name} - 2`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <button
                  onClick={() => openLightbox(2)}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <Image
                    src={boatData.images[2]}
                    alt={`${boatData.name} - 3`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <button
                  onClick={() => openLightbox(3)}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <Image
                    src={boatData.images[3]}
                    alt={`${boatData.name} - 4`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <button
                  onClick={() => openLightbox(4)}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <Image
                    src={boatData.images[4]}
                    alt={`${boatData.name} - 5`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              </div>

              {/* Tall right */}
              <button
                onClick={() => openLightbox(5)}
                className="group relative w-[25%] overflow-hidden rounded-2xl"
              >
                <Image
                  src={boatData.images[5]}
                  alt={`${boatData.name} - 6`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {boatData.images.length > 6 && (
                  <div className="absolute inset-0 bg-deep-navy/50 flex items-center justify-center">
                    <span className="px-4 py-2 bg-warm-white rounded-lg text-deep-navy font-medium">
                      View all {boatData.images.length} photos
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 md:px-10 lg:px-16 py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Title & Price */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-warm-white">
                {boatData.name}
              </h1>
              <p className="mt-2 text-warm-white/60">{boatData.tagline}</p>
            </div>

            <div className="flex-shrink-0 p-5 rounded-2xl bg-warm-white/5 border border-warm-white/10">
              <p className="text-sm text-warm-white/60">{boatData.priceRange.note}</p>
              <p className="mt-1 text-2xl font-semibold text-sand">
                €{boatData.priceRange.low} - €{boatData.priceRange.high}
              </p>
              <button className="mt-4 w-full py-3 px-6 rounded-full bg-sand text-deep-navy font-medium hover:bg-sand/90 transition">
                Book Now
              </button>
            </div>
          </div>

          {/* Key Specs */}
          <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Users className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">
                {boatData.specs.capacity}
              </p>
              <p className="text-xs text-warm-white/50">Guests</p>
            </div>
            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Ruler className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boatData.specs.length}</p>
              <p className="text-xs text-warm-white/50">Length</p>
            </div>
            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Gauge className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">
                {boatData.specs.maxSpeed}
              </p>
              <p className="text-xs text-warm-white/50">Max Speed</p>
            </div>
            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Fuel className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">
                {boatData.specs.fuelTank}
              </p>
              <p className="text-xs text-warm-white/50">Fuel Tank</p>
            </div>
            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Anchor className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boatData.specs.cabins}</p>
              <p className="text-xs text-warm-white/50">Cabins</p>
            </div>
            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Calendar className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boatData.specs.year}</p>
              <p className="text-xs text-warm-white/50">Year</p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-warm-white">About this boat</h2>
            <div
              className={`mt-4 text-warm-white/70 leading-relaxed ${!showFullDescription && 'line-clamp-3'}`}
            >
              {boatData.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 flex items-center gap-1 text-sand hover:text-sand/80 transition"
            >
              <span className="text-sm font-medium">
                {showFullDescription ? 'Show less' : 'Read more'}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showFullDescription && 'rotate-180'}`}
              />
            </button>
          </div>

          {/* Full Specs */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-warm-white">Specifications</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Length</span>
                <span className="text-warm-white font-medium">{boatData.specs.length}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Width</span>
                <span className="text-warm-white font-medium">{boatData.specs.width}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Max. Capacity</span>
                <span className="text-warm-white font-medium">
                  {boatData.specs.capacity} persons
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Motor</span>
                <span className="text-warm-white font-medium">{boatData.specs.motor}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Fuel Tank</span>
                <span className="text-warm-white font-medium">{boatData.specs.fuelTank}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Water Tank</span>
                <span className="text-warm-white font-medium">{boatData.specs.waterTank}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Max. Speed</span>
                <span className="text-warm-white font-medium">{boatData.specs.maxSpeed}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Cruising Speed</span>
                <span className="text-warm-white font-medium">{boatData.specs.cruisingSpeed}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Fuel Consumption</span>
                <span className="text-warm-white font-medium">
                  {boatData.specs.fuelConsumption}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Cabins</span>
                <span className="text-warm-white font-medium">{boatData.specs.cabins}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Year</span>
                <span className="text-warm-white font-medium">{boatData.specs.year}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-deep-navy/95 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-warm-white/10 flex items-center justify-center text-warm-white hover:bg-warm-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-warm-white/70 text-sm">
            {currentImage + 1} / {boatData.images.length}
          </div>

          <button
            onClick={prevImage}
            className="absolute left-4 w-10 h-10 rounded-full bg-warm-white/10 flex items-center justify-center text-warm-white hover:bg-warm-white/20 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 w-10 h-10 rounded-full bg-warm-white/10 flex items-center justify-center text-warm-white hover:bg-warm-white/20 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[16/9] mx-4">
            <Image
              src={boatData.images[currentImage]}
              alt={`${boatData.name} - Image ${currentImage + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </main>
  )
}
