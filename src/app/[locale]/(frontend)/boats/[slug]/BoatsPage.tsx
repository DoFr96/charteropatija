'use client'

import { useState, useRef, TouchEvent, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Ruler,
  Gauge,
  Fuel,
  Anchor,
  Calendar,
  X,
  Info,
  CreditCard,
  BadgeCheck,
  Ship,
  GraduationCap,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import type { BoatFull } from '@/lib/boat-actions'

type Props = {
  boat: BoatFull
  images: string[]
}

// Animation variants
const heroImageVariants = {
  initial: { scale: 1.05, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const }
  }
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.3 }
  }
}

const specCardVariants = {
  initial: { opacity: 0, y: 15, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const }
  }
}

const galleryItemVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
}

const lightboxVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
}

const lightboxImageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
}

export default function BoatPage({ boat, images }: Props) {
  const [currentImage, setCurrentImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const t = useTranslations('BoatPage')
  const tNav = useTranslations('Navbar')

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

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

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
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-deep-navy/80 backdrop-blur-md md:px-10 lg:px-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/#fleet"
          className="flex items-center gap-2 text-warm-white hover:text-sand transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">{t('back')}</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-warm-white">{tNav('brand')}</span>
          <span className="text-sm font-light text-warm-white/60">{tNav('charter')}</span>
        </div>
      </motion.header>

      {/* Gallery */}
      <section className="pt-[52px] lg:pt-16">
        {/* Mobile Gallery - Cover Image */}
        <div className="lg:hidden">
          <motion.button
            onClick={() => {
              setCurrentImage(0)
              setLightboxOpen(true)
            }}
            className="relative w-full aspect-[4/3]"
            variants={heroImageVariants}
            initial="initial"
            animate="animate"
          >
            <Image
              src={images[0]}
              alt={`${boat.name}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-deep-navy/30" />

            {/* Tap to view indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-deep-navy/60 backdrop-blur-sm">
              <span className="text-xs text-warm-white/80">{images.length} {t('photos')}</span>
            </div>
          </motion.button>
        </div>

        {/* Tablet/Desktop Bento Gallery */}
        <div className="hidden lg:block px-10 xl:px-16">
          <div className="max-w-[1400px] mx-auto">
            {/* Tablet: 4 images (1 large + 3 small) */}
            <motion.div
              className="xl:hidden flex gap-2 h-[360px]"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Large left */}
              <motion.button
                onClick={() => openLightbox(0)}
                className="group relative w-1/2 overflow-hidden rounded-xl"
                variants={galleryItemVariants}
              >
                <Image
                  src={images[0]}
                  alt={`${boat.name} - 1`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </motion.button>

              {/* Right column - 3 images */}
              <div className="w-1/2 flex flex-col gap-2">
                <motion.button
                  onClick={() => openLightbox(1)}
                  className="group relative flex-1 overflow-hidden rounded-xl"
                  variants={galleryItemVariants}
                >
                  <Image
                    src={images[1] || images[0]}
                    alt={`${boat.name} - 2`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.button>
                <div className="flex-1 flex gap-2">
                  <motion.button
                    onClick={() => openLightbox(2)}
                    className="group relative flex-1 overflow-hidden rounded-xl"
                    variants={galleryItemVariants}
                  >
                    <Image
                      src={images[2] || images[0]}
                      alt={`${boat.name} - 3`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.button>
                  <motion.button
                    onClick={() => openLightbox(3)}
                    className="group relative flex-1 overflow-hidden rounded-xl"
                    variants={galleryItemVariants}
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
                          +{images.length - 4} {t('more')}
                        </span>
                      </div>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Desktop: 6 images (1 large left + 2x2 grid + 1 tall right) */}
            <motion.div
              className="hidden xl:flex gap-3 h-[480px]"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Large left */}
              <motion.button
                onClick={() => openLightbox(0)}
                className="group relative w-[45%] overflow-hidden rounded-2xl"
                variants={galleryItemVariants}
              >
                <Image
                  src={images[0]}
                  alt={`${boat.name} - 1`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </motion.button>

              {/* Middle 2x2 grid */}
              <div className="w-[30%] grid grid-cols-2 grid-rows-2 gap-3">
                <motion.button
                  onClick={() => openLightbox(1)}
                  className="group relative overflow-hidden rounded-2xl"
                  variants={galleryItemVariants}
                >
                  <Image
                    src={images[1] || images[0]}
                    alt={`${boat.name} - 2`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.button>
                <motion.button
                  onClick={() => openLightbox(2)}
                  className="group relative overflow-hidden rounded-2xl"
                  variants={galleryItemVariants}
                >
                  <Image
                    src={images[2] || images[0]}
                    alt={`${boat.name} - 3`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.button>
                <motion.button
                  onClick={() => openLightbox(3)}
                  className="group relative overflow-hidden rounded-2xl"
                  variants={galleryItemVariants}
                >
                  <Image
                    src={images[3] || images[0]}
                    alt={`${boat.name} - 4`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.button>
                <motion.button
                  onClick={() => openLightbox(4)}
                  className="group relative overflow-hidden rounded-2xl"
                  variants={galleryItemVariants}
                >
                  <Image
                    src={images[4] || images[0]}
                    alt={`${boat.name} - 5`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.button>
              </div>

              {/* Tall right */}
              <motion.button
                onClick={() => openLightbox(5)}
                className="group relative w-[25%] overflow-hidden rounded-2xl"
                variants={galleryItemVariants}
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
                      {t('viewAllPhotos', { count: images.length })}
                    </span>
                  </div>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 md:px-10 lg:px-16 py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Title & Price */}
          <motion.div
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
                  <p className="text-sm md:text-base text-warm-white/60">{t('pricing.fullDay')}</p>
                  <p className="mt-1 text-2xl md:text-3xl font-semibold text-sand">
                    €{boat.priceLow.toLocaleString()} - €{boat.priceHigh.toLocaleString()}
                  </p>
                  {boat.priceNote && (
                    <p className="mt-2 text-xs text-warm-white/50">{boat.priceNote}</p>
                  )}
                  <motion.a
                    href={`https://wa.me/385911507107?text=${encodeURIComponent(t('pricing.bookMessage', { boatName: boat.name }))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full py-3 px-6 md:py-3.5 md:px-8 rounded-full bg-sand text-deep-navy font-medium hover:bg-sand/90 transition text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('pricing.bookNow')}
                  </motion.a>
                </div>

                {/* Half Day & Weekly - side on desktop only */}
                {(boat.priceHalfDayLow || boat.priceWeeklyLow) && (
                  <div className="hidden md:flex flex-col gap-3">
                    {boat.priceHalfDayLow && (
                      <div className="p-3 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center flex-1 flex flex-col justify-center">
                        <p className="text-xs text-warm-white/50">{t('pricing.halfDay')}</p>
                        <p className="mt-1 text-sm font-semibold text-warm-white">
                          €{boat.priceHalfDayLow.toLocaleString()}
                          {boat.priceHalfDayHigh && ` - €${boat.priceHalfDayHigh.toLocaleString()}`}
                        </p>
                      </div>
                    )}
                    {boat.priceWeeklyLow && (
                      <div className="p-3 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center flex-1 flex flex-col justify-center">
                        <p className="text-xs text-warm-white/50">{t('pricing.weekly')}</p>
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
                      <p className="text-xs text-warm-white/50">{t('pricing.halfDay')}</p>
                      <p className="mt-1 text-sm font-semibold text-warm-white">
                        €{boat.priceHalfDayLow.toLocaleString()}
                        {boat.priceHalfDayHigh && ` - €${boat.priceHalfDayHigh.toLocaleString()}`}
                      </p>
                    </div>
                  )}
                  {boat.priceWeeklyLow && (
                    <div className="p-3 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center">
                      <p className="text-xs text-warm-white/50">{t('pricing.weekly')}</p>
                      <p className="mt-1 text-sm font-semibold text-warm-white">
                        €{boat.priceWeeklyLow.toLocaleString()}
                        {boat.priceWeeklyHigh && ` - €${boat.priceWeeklyHigh.toLocaleString()}`}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Key Specs */}
          <motion.div
            className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.div
              className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center"
              variants={specCardVariants}
            >
              <Users className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.capacity}</p>
              <p className="text-xs text-warm-white/50">{t('specs.guests')}</p>
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center"
              variants={specCardVariants}
            >
              <Ruler className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.length || '-'}</p>
              <p className="text-xs text-warm-white/50">{t('specs.length')}</p>
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center"
              variants={specCardVariants}
            >
              <Anchor className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.width || '-'}</p>
              <p className="text-xs text-warm-white/50">{t('specs.width')}</p>
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center"
              variants={specCardVariants}
            >
              <Gauge className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.maxSpeed || '-'}</p>
              <p className="text-xs text-warm-white/50">{t('specs.maxSpeed')}</p>
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center"
              variants={specCardVariants}
            >
              <Fuel className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.fuelTank || '-'}</p>
              <p className="text-xs text-warm-white/50">{t('specs.fuelTank')}</p>
            </motion.div>

            <motion.div
              className="p-4 rounded-xl bg-warm-white/5 border border-warm-white/10 text-center"
              variants={specCardVariants}
            >
              <Calendar className="w-5 h-5 text-sand mx-auto" />
              <p className="mt-2 text-lg font-semibold text-warm-white">{boat.year || '-'}</p>
              <p className="text-xs text-warm-white/50">{t('specs.year')}</p>
            </motion.div>
          </motion.div>

          {/* Description */}
          {boat.description && (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-warm-white">{t('about')}</h2>
              <div className="mt-4 text-warm-white/70 leading-relaxed">
                <p>{boat.description}</p>
              </div>
            </motion.div>
          )}

          {/* Rental Info */}
          <motion.div
            className="mt-10 p-5 md:p-6 rounded-2xl bg-warm-white/[0.02] border border-warm-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Info className="w-4 h-4 text-sand" />
              <h3 className="text-sm font-medium text-warm-white/80">{t('goodToKnow')}</h3>
            </div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.div className="flex items-start gap-3" variants={specCardVariants}>
                <div className="shrink-0 w-8 h-8 rounded-lg bg-sand/10 flex items-center justify-center">
                  <Fuel className="w-4 h-4 text-sand/70" />
                </div>
                <div>
                  <p className="text-sm text-warm-white">{t('rentalInfo.fuelNotIncluded')}</p>
                  <p className="text-xs text-warm-white/50">{t('rentalInfo.paidSeparately')}</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-3" variants={specCardVariants}>
                <div className="shrink-0 w-8 h-8 rounded-lg bg-sand/10 flex items-center justify-center">
                  <BadgeCheck className="w-4 h-4 text-sand/70" />
                </div>
                <div>
                  <p className="text-sm text-warm-white">{t('rentalInfo.licenseRequired')}</p>
                  <p className="text-xs text-warm-white/50">{t('rentalInfo.validLicenseNeeded')}</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-3" variants={specCardVariants}>
                <div className="shrink-0 w-8 h-8 rounded-lg bg-sand/10 flex items-center justify-center">
                  <Ship className="w-4 h-4 text-sand/70" />
                </div>
                <div>
                  <p className="text-sm text-warm-white">{t('rentalInfo.skipperAvailable')}</p>
                  <p className="text-xs text-warm-white/50">{t('rentalInfo.additionalFee')}</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-3" variants={specCardVariants}>
                <div className="shrink-0 w-8 h-8 rounded-lg bg-sand/10 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-sand/70" />
                </div>
                <div>
                  <p className="text-sm text-warm-white">{t('rentalInfo.cashCard')}</p>
                  <p className="text-xs text-warm-white/50">{t('rentalInfo.bothAccepted')}</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-3" variants={specCardVariants}>
                <div className="shrink-0 w-8 h-8 rounded-lg bg-sand/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-sand/70" />
                </div>
                <div>
                  <p className="text-sm text-warm-white">{t('rentalInfo.skipperTraining')}</p>
                  <p className="text-xs text-warm-white/50">{t('rentalInfo.learnNavigate')}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Full Specs */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-warm-white">{t('specifications')}</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {boat.length && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">{t('specs.length')}</span>
                  <span className="text-warm-white font-medium">{boat.length}</span>
                </div>
              )}
              {boat.width && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">{t('specs.width')}</span>
                  <span className="text-warm-white font-medium">{boat.width}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-b border-warm-white/10">
                <span className="text-warm-white/60">{t('specs.maxCapacity')}</span>
                <span className="text-warm-white font-medium">{boat.capacity} {t('specs.persons')}</span>
              </div>
              {boat.motor && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">{t('specs.motor')}</span>
                  <span className="text-warm-white font-medium">{boat.motor}</span>
                </div>
              )}
              {boat.fuelTank && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">{t('specs.fuelTank')}</span>
                  <span className="text-warm-white font-medium">{boat.fuelTank}</span>
                </div>
              )}
              {boat.waterTank && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">{t('specs.waterTank')}</span>
                  <span className="text-warm-white font-medium">{boat.waterTank}</span>
                </div>
              )}
              {boat.maxSpeed && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">{t('specs.maxSpeed')}</span>
                  <span className="text-warm-white font-medium">{boat.maxSpeed}</span>
                </div>
              )}
              {boat.cruisingSpeed && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">{t('specs.cruisingSpeed')}</span>
                  <span className="text-warm-white font-medium">{boat.cruisingSpeed}</span>
                </div>
              )}
              {boat.fuelConsumption && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">{t('specs.fuelConsumption')}</span>
                  <span className="text-warm-white font-medium">{boat.fuelConsumption}</span>
                </div>
              )}
              {boat.cabins && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">{t('specs.cabins')}</span>
                  <span className="text-warm-white font-medium">{boat.cabins}</span>
                </div>
              )}
              {boat.year && (
                <div className="flex justify-between py-3 border-b border-warm-white/10">
                  <span className="text-warm-white/60">{t('specs.year')}</span>
                  <span className="text-warm-white font-medium">{boat.year}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-deep-navy flex flex-col"
            variants={lightboxVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-deep-navy">
              <span className="text-warm-white/70 text-sm">
                {currentImage + 1} / {images.length}
              </span>
              <motion.button
                onClick={() => setLightboxOpen(false)}
                className="w-9 h-9 rounded-full bg-warm-white/10 flex items-center justify-center text-warm-white hover:bg-warm-white/20 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  className="absolute inset-0"
                  variants={lightboxImageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Image
                    src={images[currentImage]}
                    alt={`${boat.name} - Image ${currentImage + 1}`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Desktop nav buttons */}
              <motion.button
                onClick={prevImage}
                className="hidden md:flex absolute left-4 w-10 h-10 rounded-full bg-warm-white/10 items-center justify-center text-warm-white hover:bg-warm-white/20 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="hidden md:flex absolute right-4 w-10 h-10 rounded-full bg-warm-white/10 items-center justify-center text-warm-white hover:bg-warm-white/20 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Dots indicator - mobile */}
            <div className="md:hidden flex justify-center gap-1.5 py-4 bg-deep-navy">
              {images.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`h-1.5 rounded-full ${
                    idx === currentImage ? 'bg-sand' : 'bg-warm-white/30'
                  }`}
                  animate={{
                    width: idx === currentImage ? 24 : 6,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
