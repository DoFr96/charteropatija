'use client'

import Image from 'next/image'
import { MapPin, Clock, Anchor, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function OfficeSection() {
  const t = useTranslations('Office')

  return (
    <section className="py-16 md:py-24 lg:py-32 px-5 md:px-10 lg:px-16 bg-deep-navy">
      <div className="max-w-6xl mx-auto">
        {/* Main container with overlay card design */}
        <div className="relative">
          {/* Image - full width on mobile, left side on desktop */}
          <div className="relative w-full lg:w-2/3 aspect-[4/3] lg:aspect-[16/10] rounded-2xl lg:rounded-3xl overflow-hidden">
            <Image
              src="/images/ured.jpg"
              alt={t('altText')}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-deep-navy/20 to-transparent" />

            {/* Mobile: overlay info at bottom */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 p-5">
              <span className="text-sand/80 text-xs tracking-widest uppercase">{t('label')}</span>
              <h2 className="mt-1 text-2xl font-light text-warm-white">{t('title')}</h2>
            </div>
          </div>

          {/* Info card - below image on mobile, overlapping on desktop */}
          <div className="mt-6 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%] bg-warm-white/[0.03] backdrop-blur-sm border border-warm-white/10 rounded-2xl lg:rounded-3xl p-6 md:p-8">
            {/* Desktop header */}
            <div className="hidden lg:block mb-8">
              <span className="text-sand text-xs tracking-widest uppercase">{t('label')}</span>
              <h2 className="mt-2 text-3xl xl:text-4xl font-light text-warm-white">{t('title')}</h2>
            </div>

            {/* Info items */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sand/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-sand" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-warm-white/60 uppercase tracking-wide">{t('location')}</h3>
                  <p className="mt-0.5 text-warm-white text-sm lg:text-base">Liburnijska 7</p>
                  <p className="text-warm-white/70 text-sm">Ičići, 51414</p>
                </div>
              </div>

              {/* Marina */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sand/10 flex items-center justify-center">
                  <Anchor className="w-4 h-4 text-sand" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-warm-white/60 uppercase tracking-wide">{t('marina')}</h3>
                  <p className="mt-0.5 text-warm-white text-sm lg:text-base">ACI Marina Opatija</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 col-span-2 lg:col-span-1">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sand/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-sand" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-warm-white/60 uppercase tracking-wide">{t('hours')}</h3>
                  <p className="mt-0.5 text-warm-white text-sm lg:text-base">{t('hoursValue')}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://maps.google.com/?q=ACI+Marina+Opatija"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 lg:mt-8 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sand/10 border border-sand/20 text-sand hover:bg-sand/20 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              {t('openMaps')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
