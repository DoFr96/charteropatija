'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-4 md:px-10 md:pt-6 lg:px-16">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-warm-white md:text-base">
            Kvarner
          </span>
          <span className="text-sm font-light text-warm-white/60 md:text-base">Charter</span>
        </div>

        {/* Nav Links - desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#fleet" className="text-sm text-warm-white/70 hover:text-warm-white transition">
            Fleet
          </a>
          <a href="#explore" className="text-sm text-warm-white/70 hover:text-warm-white transition">
            Explore
          </a>
          <a href="#reviews" className="text-sm text-warm-white/70 hover:text-warm-white transition">
            Reviews
          </a>
        </nav>

        {/* Menu button - mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full border border-warm-white/20 md:hidden"
          aria-label="Menu"
        >
          <span className={`h-[1.5px] w-3.5 bg-warm-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`h-[1.5px] w-3.5 bg-warm-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-[2px]' : ''}`} />
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 right-0 h-1/2 z-10 bg-deep-navy/95 backdrop-blur-sm md:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-6">
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl text-warm-white/70 hover:text-warm-white transition"
            >
              Fleet
            </a>
            <a
              href="#explore"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl text-warm-white/70 hover:text-warm-white transition"
            >
              Explore
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl text-warm-white/70 hover:text-warm-white transition"
            >
              Reviews
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
