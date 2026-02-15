'use client'

import { Link } from '@/i18n/routing'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Opcionalno: logiraj error u analytics/monitoring
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#1a1a18]">
      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a25] via-[#1a1a18] to-[#0f0f0d]" />

      {/* Decorative accent circles - reddish tint for error state */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-red-400/5 to-yellow-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-yellow-300/5 to-red-400/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Error icon */}
        <div className="relative mb-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm sm:h-32 sm:w-32">
            <svg
              className="h-12 w-12 text-yellow-400/80 sm:h-16 sm:w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          {/* Subtle pulse ring */}
          <div
            className="absolute inset-0 animate-ping rounded-full border border-yellow-400/20"
            style={{ animationDuration: '2s' }}
          />
        </div>

        {/* Message */}
        <h1 className="mb-4 text-center font-playfair text-2xl font-medium tracking-wide text-white sm:text-3xl md:text-4xl">
          Something went wrong.
        </h1>

        <p className="mb-4 max-w-md text-center text-base text-white/60 sm:text-lg">
          We apologize for inconvenience. Something unexpected happened.
        </p>

        {/* Error message (optional - show only in dev or for specific errors) */}
        {error.message && (
          <div className="mb-8 max-w-lg rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
            <p className="text-center text-sm text-white/50">{error.message}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Try again button */}
          <button
            onClick={reset}
            className="group relative overflow-hidden rounded-full border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 px-8 py-4 backdrop-blur-sm transition-all duration-500 hover:border-yellow-500/50 hover:from-yellow-500/20 hover:to-yellow-600/20"
          >
            <span className="relative z-10 font-medium tracking-wide text-yellow-200 transition-colors duration-300">
              Try again
            </span>

            {/* Hover glow effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>

          {/* Back to home button */}
          <Link
            href="/"
            className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 backdrop-blur-sm transition-all duration-500 hover:border-white/30 hover:bg-white/10"
          >
            <span className="relative z-10 font-medium tracking-wide text-white transition-colors duration-300 group-hover:text-white/90">
              Back to home
            </span>

            {/* Hover glow effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>

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
