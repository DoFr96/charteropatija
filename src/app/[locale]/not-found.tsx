import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#1a1a18]">
      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a25] via-[#1a1a18] to-[#0f0f0d]" />

      {/* Decorative gold accent circles */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-yellow-200/5 to-yellow-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-yellow-300/5 to-yellow-600/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* 404 Number */}
        <div className="relative mb-6">
          <span className="font-playfair text-[150px] font-medium leading-none tracking-tight text-white/5 sm:text-[200px] md:text-[280px]">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text font-playfair text-6xl font-medium tracking-wide text-transparent sm:text-7xl md:text-8xl">
              404
            </span>
          </div>
        </div>

        {/* Message */}
        <h1 className="mb-4 text-center font-playfair text-2xl font-medium tracking-wide text-white sm:text-3xl md:text-4xl">
          {t('title')}
        </h1>

        <p className="mb-10 max-w-md text-center text-base text-white/60 sm:text-lg">
          {t('description')}
        </p>

        {/* Back to home button */}
        <Link
          href="/"
          className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 backdrop-blur-sm transition-all duration-500 hover:border-yellow-500/50 hover:bg-white/10"
        >
          <span className="relative z-10 font-medium tracking-wide text-white transition-colors duration-300 group-hover:text-yellow-200">
            {t('backHome')}
          </span>

          {/* Hover glow effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </Link>

        {/* Decorative line */}
        <div className="mt-16 flex items-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-sm tracking-widest text-white/30">ALL IN ONE</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
        </div>
      </div>

      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </main>
  )
}
