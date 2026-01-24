'use client'

import { useState } from 'react'
import { X, Phone, MessageCircle } from 'lucide-react'

const PHONE_NUMBER = '+385911234567' // Zamijeni s pravim brojem
const WHATSAPP_MESSAGE = "Hi! I'm interested in booking a boat charter." // Opcijski default message

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  const phoneLink = `tel:${PHONE_NUMBER}`
  const whatsappLink = `https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded buttons */}
      <div
        className={`flex flex-col gap-2 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* WhatsApp */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="px-3 py-1.5 rounded-lg bg-deep-navy text-warm-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp
          </span>
          <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <MessageCircle className="w-5 h-5 text-white" fill="white" />
          </div>
        </a>

        {/* Phone */}
        <a href={phoneLink} className="group flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-deep-navy text-warm-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Call us
          </span>
          <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Phone className="w-5 h-5 text-deep-navy" />
          </div>
        </a>
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-deep-navy rotate-0' : 'bg-sand hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-warm-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-deep-navy" />
        )}
      </button>
    </div>
  )
}
