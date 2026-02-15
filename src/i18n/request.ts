import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// Podržani jezici
export const locales = ['en', 'de'] as const
export type Locale = (typeof locales)[number]

// Zadani jezik
export const defaultLocale: Locale = 'en'

// Nazivi jezika za prikaz
export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
}

// Zastave za vizualni prikaz (emoji)
export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
}

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
