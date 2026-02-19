'use client'

import Link from 'next/link'
import CookieConsent from 'react-cookie-consent'

export default function CookieBanner() {
  return (
    <CookieConsent
      cookieName="cookieConsent"
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      style={{
        background: '#0a1628',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
      buttonStyle={{
        background: '#c4b59d',
        color: '#0a1628',
        borderRadius: '9999px',
        padding: '8px 24px',
        fontWeight: 500,
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#fff',
        borderRadius: '9999px',
        padding: '8px 24px',
      }}
      expires={365}
    >
      We use cookies to enhance your experience.{' '}
      <Link href="/privacy-policy" style={{ color: '#c4b59d' }}>
        Privacy Policy
      </Link>
    </CookieConsent>
  )
}
