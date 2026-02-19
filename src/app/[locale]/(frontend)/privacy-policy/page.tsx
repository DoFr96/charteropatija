import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Charter Opatija',
  description: 'Privacy Policy for Charter Opatija boat rental services.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-deep-navy">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-deep-navy/80 backdrop-blur-md md:px-10 lg:px-16">
        <Link
          href="/"
          className="flex items-center gap-2 text-warm-white hover:text-sand transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </header>

      <div className="pt-24 pb-16 px-5 md:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-warm-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-warm-white/50 mb-12">Last updated: February 2026</p>

          <div className="space-y-10 text-warm-white/70 leading-relaxed">
            {/* Intro */}
            <section>
              <p>
                Charter Opatija (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the
                website charteropatija.com. This Privacy Policy explains how we collect, use, and
                protect your personal information when you visit our website or use our boat charter
                services.
              </p>
            </section>

            {/* Data We Collect */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">
                1. Information We Collect
              </h2>
              <p className="mb-3">We may collect the following types of personal information:</p>
              <p className="mb-2">
                <span className="text-warm-white font-medium">Contact Information</span> — name,
                email address, phone number, provided when you enquire about a booking via WhatsApp,
                email, or our contact form.
              </p>
              <p className="mb-2">
                <span className="text-warm-white font-medium">Booking Information</span> — preferred
                dates, boat selection, number of guests, and any special requests related to your
                charter.
              </p>
              <p>
                <span className="text-warm-white font-medium">Technical Data</span> — IP address,
                browser type, device information, and pages visited, collected automatically through
                cookies and similar technologies.
              </p>
            </section>

            {/* How We Use */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">
                2. How We Use Your Information
              </h2>
              <p>
                We use your personal information to respond to your booking enquiries and arrange
                charters, communicate with you regarding our services, improve our website and user
                experience, comply with legal obligations, and send you promotional offers only if
                you have given explicit consent.
              </p>
            </section>

            {/* Legal Basis */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">
                3. Legal Basis for Processing (GDPR)
              </h2>
              <p>
                Under the General Data Protection Regulation (GDPR), we process your data based on
                your consent (e.g. when you submit a contact form or accept cookies), the necessity
                to perform a contract or take pre-contractual steps (e.g. processing a booking
                request), and our legitimate interest in improving our services and website
                experience.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">4. Cookies</h2>
              <p className="mb-3">
                Our website uses cookies to ensure proper functionality and improve your browsing
                experience. When you first visit our site, you will be asked to accept or decline
                non-essential cookies.
              </p>
              <p className="mb-2">
                <span className="text-warm-white font-medium">Essential Cookies</span> — required
                for the website to function properly. These cannot be disabled.
              </p>
              <p>
                <span className="text-warm-white font-medium">Analytics Cookies</span> — help us
                understand how visitors use our website. These are only activated with your consent.
              </p>
            </section>

            {/* Third Parties */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">
                5. Third-Party Services
              </h2>
              <p>
                We may use third-party services such as Google Maps (for displaying our location and
                routes), Google Analytics (for website usage statistics, only with your consent),
                and WhatsApp (for direct communication regarding bookings). These services may
                collect data according to their own privacy policies.
              </p>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">6. Data Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may
                share your data only with service providers who assist us in operating our website
                and business, and when required by law or to protect our legal rights.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">7. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfil the
                purposes for which it was collected, including to satisfy any legal, accounting, or
                reporting requirements. Booking-related data is retained for up to 5 years in
                accordance with Croatian tax regulations.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">8. Your Rights</h2>
              <p>
                Under the GDPR, you have the right to access the personal data we hold about you,
                request correction of inaccurate data, request deletion of your data, withdraw
                consent at any time, object to or restrict processing, and request data portability.
                To exercise any of these rights, please contact us using the details below.
              </p>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">9. Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your
                personal information against unauthorised access, alteration, disclosure, or
                destruction. Our website uses SSL encryption to secure data transmission.
              </p>
            </section>

            {/* Children */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">
                10. Children&apos;s Privacy
              </h2>
              <p>
                Our services are not directed to individuals under the age of 16. We do not
                knowingly collect personal information from children.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">
                11. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with an updated revision date.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-semibold text-warm-white mb-4">12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your rights,
                please contact us:
              </p>
              <div className="mt-4 p-5 rounded-2xl bg-warm-white/5 border border-warm-white/10">
                <p className="text-warm-white font-medium">Charter Opatija</p>
                <p className="mt-2">Liburnijska 7, Ičići 51414, Croatia</p>
                <p>
                  Email:{' '}
                  <a href="mailto:charter.icici@outlook.com" className="text-sand hover:underline">
                    charter.icici@outlook.com
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a href="tel:+385911507107" className="text-sand hover:underline">
                    +385 91 150 7107
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
