'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

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

// Animation variants
const heroImageVariants = {
  initial: { opacity: 0, scale: 1.05 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: 'easeOut' as const }
  }
}

const textContainerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
}

const textItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const }
  }
}

const thumbnailContainerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.6 }
  }
}

const thumbnailVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
}

export default function HeroSection() {
  const t = useTranslations('Hero')

  return (
    <section className="relative h-svh w-full overflow-hidden bg-deep-navy">
      {/* Background Image - different for mobile/desktop */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[90%] md:h-full"
        variants={heroImageVariants}
        initial="initial"
        animate="animate"
      >
        <Image
          src="/images/IMG_4865.jpg"
          alt={t('altText')}
          fill
          className="object-cover"
          priority
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/70 via-deep-navy/10 to-deep-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/40 via-transparent to-transparent md:from-deep-navy/50" />
      </motion.div>

      {/* Title Content - Top on mobile only */}
      <motion.div
        className="absolute inset-x-0 top-28 z-10 px-5 md:hidden"
        variants={textContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-sand"
          variants={textItemVariants}
        >
          {t('location')}
        </motion.span>

        <motion.h1
          className="text-[11vw] font-semibold leading-[0.95] tracking-[-0.02em] text-warm-white"
          variants={textItemVariants}
        >
          {t('title1')}
          <br />
          <span className="text-sand">{t('title2')}</span>
        </motion.h1>
      </motion.div>

      {/* Main Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 md:px-10 md:pb-10 lg:px-16 lg:pb-14">
        {/* Text Content - Desktop only */}
        <motion.div
          variants={textContainerVariants}
          initial="initial"
          animate="animate"
          className="hidden md:block"
        >
          <motion.span
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-sand block"
            variants={textItemVariants}
          >
            {t('location')}
          </motion.span>

          <motion.h1
            className="font-semibold leading-[0.95] tracking-[-0.02em] text-warm-white md:text-6xl lg:text-7xl"
            variants={textItemVariants}
          >
            {t('title1')}
            <br />
            <span className="text-sand">{t('title2')}</span>
          </motion.h1>
        </motion.div>

        <motion.p
          className="max-w-[280px] text-sm leading-relaxed text-warm-white/60 md:mt-5 md:max-w-md md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        >
          {t('description')}
        </motion.p>

        {/* Boat Thumbnails - inline on mobile, absolute on desktop */}
        <motion.div
          className="mt-6 flex gap-3 md:absolute md:bottom-10 md:right-10 md:mt-0 lg:bottom-14 lg:right-16"
          variants={thumbnailContainerVariants}
          initial="initial"
          animate="animate"
        >
          {featuredBoats.map((boat) => (
            <motion.div
              key={boat.id}
              variants={thumbnailVariants}
              className="group relative aspect-[4/3] flex-1 overflow-hidden rounded-xl  md:aspect-auto md:h-24 md:w-32 md:flex-none md:rounded-lg xl:h-36 xl:w-44"
            >
              <Image
                src={boat.image}
                alt={boat.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 176px"
              />
              <div className="absolute -inset-px bg-gradient-to-t from-deep-navy/80 via-deep-navy/20 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 md:right-auto">
                <span className="text-xs font-medium text-warm-white">{boat.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
