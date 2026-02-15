'use client'

import Image from 'next/image'
import { MapPin, Clock, Anchor, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

// Animation variants
const imageVariants = {
  initial: { opacity: 0, scale: 1.05 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const }
  }
}

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' as const }
  }
}

const infoContainerVariants = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
}

const infoItemVariants = {
  initial: { opacity: 0, x: -20 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
}

const ctaVariants = {
  initial: { opacity: 0, y: 10 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.6, ease: 'easeOut' as const }
  }
}

export default function OfficeSection() {
  const t = useTranslations('Office')

  return (
    <section className="py-16 md:py-24 lg:py-32 px-5 md:px-10 lg:px-16 bg-deep-navy">
      <div className="max-w-6xl mx-auto">
        {/* Main container with overlay card design */}
        <div className="relative">
          {/* Image - full width on mobile, left side on desktop */}
          <motion.div
            className="relative w-full lg:w-2/3 aspect-[4/3] lg:aspect-[16/10] rounded-2xl lg:rounded-3xl overflow-hidden"
            variants={imageVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Image
              src="/images/ured.jpg"
              alt={t('altText')}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-deep-navy/20 to-transparent" />

            {/* Mobile: overlay info at bottom */}
            <motion.div
              className="lg:hidden absolute bottom-0 left-0 right-0 p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              <span className="text-sand/80 text-xs tracking-widest uppercase">{t('label')}</span>
              <h2 className="mt-1 text-2xl font-light text-warm-white">{t('title')}</h2>
            </motion.div>
          </motion.div>

          {/* Info card - below image on mobile, overlapping on desktop */}
          <motion.div
            className="mt-6 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%] bg-warm-white/[0.03] backdrop-blur-sm border border-warm-white/10 rounded-2xl lg:rounded-3xl p-6 md:p-8"
            variants={cardVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Desktop header */}
            <motion.div
              className="hidden lg:block mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              <span className="text-sand text-xs tracking-widest uppercase">{t('label')}</span>
              <h2 className="mt-2 text-3xl xl:text-4xl font-light text-warm-white">{t('title')}</h2>
            </motion.div>

            {/* Info items */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6"
              variants={infoContainerVariants}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: '-50px' }}
            >
              {/* Location */}
              <motion.div className="flex items-start gap-3" variants={infoItemVariants}>
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sand/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-sand" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-warm-white/60 uppercase tracking-wide">{t('location')}</h3>
                  <p className="mt-0.5 text-warm-white text-sm lg:text-base">Liburnijska 7</p>
                  <p className="text-warm-white/70 text-sm">Ičići, 51414</p>
                </div>
              </motion.div>

              {/* Marina */}
              <motion.div className="flex items-start gap-3" variants={infoItemVariants}>
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sand/10 flex items-center justify-center">
                  <Anchor className="w-4 h-4 text-sand" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-warm-white/60 uppercase tracking-wide">{t('marina')}</h3>
                  <p className="mt-0.5 text-warm-white text-sm lg:text-base">ACI Marina Opatija</p>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div className="flex items-start gap-3 col-span-2 lg:col-span-1" variants={infoItemVariants}>
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sand/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-sand" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-warm-white/60 uppercase tracking-wide">{t('hours')}</h3>
                  <p className="mt-0.5 text-warm-white text-sm lg:text-base">{t('hoursValue')}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="https://maps.google.com/?q=ACI+Marina+Opatija"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 lg:mt-8 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sand/10 border border-sand/20 text-sand hover:bg-sand/20 transition-colors text-sm font-medium"
              variants={ctaVariants}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              {t('openMaps')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
