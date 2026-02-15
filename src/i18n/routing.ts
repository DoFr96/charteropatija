import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // Lista podržanih jezika
  locales: ['en', 'de'],

  // Zadani jezik (bez prefiksa u URL-u)
  defaultLocale: 'en',

  // Strategija: prefix "as-needed" znači da hr neće imati /hr prefiks
  // ali /en i /de hoće
  localePrefix: 'as-needed',

  // Ne detektiraj jezik iz browsera - uvijek koristi defaultLocale (hr)
  localeDetection: false,
})

// Eksportiraj navigation helpere
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
