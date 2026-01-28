'use client'

import { useState, useRef, TouchEvent, useEffect } from 'react'
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
import type { BoatFull } from '@/lib/boat-actions'

type Props = {
  boat: BoatFull
  images: string[]
}

export default function BoatPage({ boat, images }: Props) {
  const [currentImage, setCurrentImage] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Touch swipe
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Preload all images in background
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [images])

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage()
      } else {
        prevImage()
      }
    }
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
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
          href="/#fleet"
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
        {/* Mobile Gallery */}
        <div className="lg:hidden">
          <div
            className="relative aspect-[4/3]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={images[currentImage]}
              alt={`${boat.name} - Image ${currentImage + 1}`}
              fill
              className="object-cover cursor-pointer"
              onClick={() => setLightboxOpen(true)}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-deep-navy/30" />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
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
                  src={images[0]}
                  alt={`${boat.name} - 1`}
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
                    src={images[1] || images[0]}
                    alt={`${boat.name} - 2`}
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
                      src={images[2] || images[0]}
                      alt={`${boat.name} - 3`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                  <button
                    onClick={() => openLightbox(3)}
                    className="group relative flex-1 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={images[3] || images[0]}
                      alt={`${boat.name} - 4`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {images.length > 4 && (
                      <div className="absolute inset-0 bg-deep-navy/50 flex items-center justify-center">
                        <span className="text-warm-white font-medium">
                          +{images.length - 4} more
                        </span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop: 6 images (1 large left + 2x2 grid + 1 tall right) */}
            <div className="hidden xl:flex gap-3 h-[480px]">
              {/* Large left */}
              <button
                onClick={() => openLightbox(0)}
                className="group relative w-[45%] overflow-hidden rounded-2xl"
              >
                <Image
                  src={images[0]}
                  alt={`${boat.name} - 1`}
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
                    src={images[1] || images[0]}
                    alt={`${boat.name} - 2`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <button
                  onClick={() => openLightbox(2)}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <Image
                    src={images[2] || images[0]}
                    alt={`${boat.name} - 3`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <button
                  onClick={() => openLightbox(3)}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <Image
                    src={images[3] || images[0]}
                    alt={`${boat.name} - 4`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <button
                  onClick={() => openLightbox(4)}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <Image
                    src={images[4] || images[0]}
                    alt={`${boat.name} - 5`}
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
                  src={images[5] || images[0]}
                  alt={`${boat.name} - 6`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {images.length > 6 && (
                  <div className="absolute inset-0 bg-deep-navy/50 flex items-center justify-center">
                    <span className="px-4 py-2 bg-warm-white rounded-lg text-deep-navy font-medium">
                      View all {images.length} photos
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
                {boat.name}
              </h1>
              {boat.tagline && <p className="mt-2 text-warm-white/60">{boat.tagline}</p>}
            </div>

            <div className="flex-shrink-0">
              <div className="flex gap-3">
                {/* Main Price - Full Day */}
                <div className="flex-1 md:flex-initial p-5 md:p-6 rounded-2xl bg-warm-white/5 border border-warm-white/10 text-center md:text-left">
                  <p className="text-sm md:text-base text-warm-white/60">Full Day (8h)</p>
                  <p className="mt-1 text-2xl md:text-3xl font-semibold text-sand">
                    €{boat.priceLow.toLocaleString()} - €{boat.priceHigh.toLocaleString()}
                  </p>
                  {boat.priceNote && (
                    <p className="mt-2 text-xs text-warm-white/50">{boat.priceNote}</p>
                  )}
                  <a
                    href={`https://wa.me/385911507107?text=${encodeURIComponent(`Hi, I would like to book "${boat.name}"`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full py-3 px-6 md:py-3.5 md:px-8 rounded-full bg-sand text-deep-navy font-medium hover:bg-sand/90 transition text-center"
                  >
                    Book Now
                  </a>
                </div>

                {/* Half Day & Weekly - side on desktop only */}
                {(boat.priceHalfDayLow || boat.priceWeeklyLow) && (
                  <div className="hidden md:flex flex-col gap-3">
                    {boat.priceHalfDayLow && (
                      <div className="p-3 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center flex-1 flex flex-col justify-center">
                        <p className="text-xs text-warm-white/50">Half Day (4h)</p>
                        <p className="mt-1 text-sm font-semibold text-warm-white">
                          €{boat.priceHalfDayLow.toLocaleString()}
                          {boat.priceHalfDayHigh && ` - €${boat.priceHalfDayHigh.toLocaleString()}`}
                        </p>
                      </div>
                    )}
                    {boat.priceWeeklyLow && (
                      <div className="p-3 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center flex-1 flex flex-col justify-center">
                        <p className="text-xs text-warm-white/50">Weekly (7d)</p>
                        <p className="mt-1 text-sm font-semibold text-warm-white">
                          €{boat.priceWeeklyLow.toLocaleString()}
                          {boat.priceWeeklyHigh && ` - €${boat.priceWeeklyHigh.toLocaleString()}`}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Half Day & Weekly - below on mobile only */}
              {(boat.priceHalfDayLow || boat.priceWeeklyLow) && (
                <div className="mt-3 grid grid-cols-2 gap-3 md:hidden">
                  {boat.priceHalfDayLow && (
                    <div className="p-3 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
                      <p className="text-xs text-warm-white/50">Half Day (4h)</p>
                      <p className="mt-1 text-sm font-semibold text-warm-white">
                        €{boat.priceHalfDayLow.toLocaleString()}
                        {boat.priceHalfDayHigh && ` - €${boat.priceHalfDayHigh.toLocaleString()}`}
                      </p>
                    </div>
                  )}
                  {boat.priceWeeklyLow && (
                    <div className="p-3 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
                      <p className="text-xs text-warm-white/50">Weekly (7d)</p>
                      <p className="mt-1 text-sm font-semibold text-warm-white">
                        €{boat.priceWeeklyLow.toLocaleString()}
                        {boat.priceWeeklyHigh && ` - €${boat.priceWeeklyHigh.toLocaleString()}`}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Key Specs */}
          <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Users className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.capacity}</p>
              <p className="text-xs text-warm-white/50">Guests</p>
            </div>
            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Ruler className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.length || '-'}</p>
              <p className="text-xs text-warm-white/50">Length</p>
            </div>
            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Anchor className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.width || '-'}</p>
              <p className="text-xs text-warm-white/50">Width</p>
            </div>
            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Gauge className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.maxSpeed || '-'}</p>
              <p className="text-xs text-warm-white/50">Max Speed</p>
            </div>
            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Fuel className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.fuelTank || '-'}</p>
              <p className="text-xs text-warm-white/50">Fuel Tank</p>
            </div>

            <div className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
              <Calendar className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.year || '-'}</p>
              <p className="text-xs text-warm-white/50">Year</p>
            </div>
          </div>

          {/* Description */}
          {boat.description && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-warm-white">About this boat</h2>
              <div className={`mt-4 text-warm-white/70 leading-relaxed `}>
                <p>{boat.description}</p>
              </div>
            </div>
          )}

          {/* Full Specs */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-warm-white">Specifications</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {boat.length && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">Length</span>
                  <span className="text-warm-white font-medium">{boat.length}</span>
                </div>
              )}
              {boat.width && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">Width</span>
                  <span className="text-warm-white font-medium">{boat.width}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">Max. Capacity</span>
                <span className="text-warm-white font-medium">{boat.capacity} persons</span>
              </div>
              {boat.motor && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">Motor</span>
                  <span className="text-warm-white font-medium">{boat.motor}</span>
                </div>
              )}
              {boat.fuelTank && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">Fuel Tank</span>
                  <span className="text-warm-white font-medium">{boat.fuelTank}</span>
                </div>
              )}
              {boat.waterTank && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">Water Tank</span>
                  <span className="text-warm-white font-medium">{boat.waterTank}</span>
                </div>
              )}
              {boat.maxSpeed && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">Max. Speed</span>
                  <span className="text-warm-white font-medium">{boat.maxSpeed}</span>
                </div>
              )}
              {boat.cruisingSpeed && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">Cruising Speed</span>
                  <span className="text-warm-white font-medium">{boat.cruisingSpeed}</span>
                </div>
              )}
              {boat.fuelConsumption && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">Fuel Consumption</span>
                  <span className="text-warm-white font-medium">{boat.fuelConsumption}</span>
                </div>
              )}
              {boat.cabins && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">Cabins</span>
                  <span className="text-warm-white font-medium">{boat.cabins}</span>
                </div>
              )}
              {boat.year && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">Year</span>
                  <span className="text-warm-white font-medium">{boat.year}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-deep-navy/95 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-warm-white/10 flex items-center justify-center text-warm-white hover:bg-warm-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-warm-white/70 text-sm">
            {currentImage + 1} / {images.length}
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
              src={images[currentImage]}
              alt={`${boat.name} - Image ${currentImage + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </main>
  )
}
