'use client'

import { Ship, Calendar, Users, Anchor } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function InfoSection() {
  const t = useTranslations('Info')

  const stats = [
    {
      icon: Ship,
      value: '7',
      label: t('stats.vessels'),
    },
    {
      icon: Calendar,
      value: '10+',
      label: t('stats.experience'),
    },
    {
      icon: Users,
      value: '500+',
      label: t('stats.guests'),
    },
  ]

  return (
    <section className="bg-deep-navy px-5 pb-16 pt-40 md:px-10 md:pb-24 md:pt-32 lg:px-16 lg:pb-32 lg:pt-40">
      <div className="mx-auto max-w-5xl">
        {/* Large Text */}
        <h2 className="text-[7vw] font-medium leading-[1.1] tracking-[-0.02em] text-warm-white md:text-4xl lg:text-5xl">
          {t('headline1')} <span className="text-sand">{t('headlineHighlight1')}</span> {t('headline2')} <span className="text-sand">{t('headlineHighlight2')}</span>
        </h2>

        {/* About Us + Stats */}
        <div className="mt-12 md:mt-16 lg:mt-20 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand/10">
                <Anchor className="h-5 w-5 text-sand" />
              </div>
              <span className="text-sand text-sm font-medium tracking-wide uppercase">{t('aboutUs')}</span>
            </div>
            <div className="space-y-4 text-warm-white/70 leading-relaxed">
              <p>
                <span className="text-warm-white font-medium">{t('aboutText1a')}</span> {t('aboutText1b')}
              </p>
              <p>
                {t('aboutText2')}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl border border-warm-white/10 bg-warm-white/5 px-3 py-5 text-center md:px-5 md:py-6 lg:px-6 lg:py-8"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-sand/10 md:mb-3 md:h-10 md:w-10">
                  <stat.icon className="h-4 w-4 text-sand md:h-5 md:w-5" />
                </div>
                <span className="text-xl font-semibold text-warm-white md:text-2xl lg:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-[10px] text-warm-white/50 md:text-xs">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
