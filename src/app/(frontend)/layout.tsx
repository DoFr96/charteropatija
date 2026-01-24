import React from 'react'
import './styles.css'
import localFont from 'next/font/local'
import FloatingContact from './components/FloatingContact'

export const metadata = {
  description: 'Rent a boat in Opatija. A variety of choices.',
  title: 'Charter Opatija',
}

const satoshi = localFont({
  src: [
    {
      path: '../../../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={satoshi.variable}>
        <main>
          {children}
          <FloatingContact />
        </main>
      </body>
    </html>
  )
}
