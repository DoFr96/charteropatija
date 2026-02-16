'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { motion, AnimatePresence } from 'framer-motion'

// Animation variants
const menuContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const menuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations('Navbar')
  const locale = useLocale()
  const pathname = usePathname()

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
      <header className="absolute top-0 left-0 right-0 z-[60] flex items-center justify-between px-5 pt-4 md:px-10 md:pt-6 lg:px-16">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-sm font-semibold tracking-tight text-warm-white md:text-base">
            {t('brand')}
          </span>
          <span className="text-sm font-light text-warm-white/60 md:text-base">{t('charter')}</span>
        </motion.div>

        {/* Nav Links - desktop */}
        <motion.nav
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="#fleet" className="text-sm text-warm-white/70 hover:text-warm-white transition">
            {t('fleet')}
          </a>
          <a
            href="#explore"
            className="text-sm text-warm-white/70 hover:text-warm-white transition"
          >
            {t('explore')}
          </a>
          <a
            href="#reviews"
            className="text-sm text-warm-white/70 hover:text-warm-white transition"
          >
            {t('reviews')}
          </a>

          {/* Language Switcher - Desktop */}
          <div className="flex items-center gap-1 ml-4 p-1 rounded-full border border-warm-white/20">
            <Link
              href={pathname}
              locale="en"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition ${
                locale === 'en'
                  ? 'bg-warm-white/10 text-warm-white'
                  : 'text-warm-white/50 hover:text-warm-white'
              }`}
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </Link>
            <Link
              href={pathname}
              locale="de"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition ${
                locale === 'de'
                  ? 'bg-warm-white/10 text-warm-white'
                  : 'text-warm-white/50 hover:text-warm-white'
              }`}
            >
              <span>🇩🇪</span>
              <span>DE</span>
            </Link>
          </div>
        </motion.nav>

        {/* Menu button - mobile */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full border border-warm-white/20 md:hidden"
          aria-label={t('menu')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="h-[1.5px] w-3.5 bg-warm-white"
            animate={{
              rotate: mobileMenuOpen ? 45 : 0,
              y: mobileMenuOpen ? 3 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="h-[1.5px] w-3.5 bg-warm-white"
            animate={{
              rotate: mobileMenuOpen ? -45 : 0,
              y: mobileMenuOpen ? -2 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-1/2 z-50 bg-deep-navy/95 backdrop-blur-sm md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.nav
              className="flex flex-col items-center justify-center h-full gap-6"
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.a
                href="#fleet"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl text-warm-white/70 hover:text-warm-white "
                variants={menuItemVariants}
              >
                {t('fleet')}
              </motion.a>
              <motion.a
                href="#explore"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl text-warm-white/70 hover:text-warm-white "
                variants={menuItemVariants}
              >
                {t('explore')}
              </motion.a>
              <motion.a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl text-warm-white/70 hover:text-warm-white "
                variants={menuItemVariants}
              >
                {t('reviews')}
              </motion.a>

              {/* Language Switcher - Mobile */}
              <motion.div
                className="flex items-center gap-2 mt-4 p-1 rounded-full border border-warm-white/20"
                variants={menuItemVariants}
              >
                <Link
                  href={pathname}
                  locale="en"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
                    locale === 'en'
                      ? 'bg-warm-white/10 text-warm-white'
                      : 'text-warm-white/50 hover:text-warm-white'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </Link>
                <Link
                  href={pathname}
                  locale="de"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
                    locale === 'de'
                      ? 'bg-warm-white/10 text-warm-white'
                      : 'text-warm-white/50 hover:text-warm-white'
                  }`}
                >
                  <span>🇩🇪</span>
                  <span>Deutsch</span>
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
