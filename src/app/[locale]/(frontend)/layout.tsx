import React from 'react'
import './styles.css'
import localFont from 'next/font/local'
import FloatingContact from './components/FloatingContact'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import CookieBanner from './components/CookieBanner'

export const metadata = {
  description: 'Rent a boat in Opatija. A variety of choices.',
  title: 'Charter Opatija',
}

const satoshi = localFont({
  src: [
    {
      path: '../../../../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages({ locale })
  return (
    <html lang="en">
      <body className={satoshi.variable}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <main>
            {children}
            <FloatingContact />
            <CookieBanner />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
