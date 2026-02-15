'use client'

import { useState } from 'react'
import { X, Phone, MessageCircle, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

const PHONE_NUMBER = '+385911507107'
const EMAIL_ADDRESS = 'charter.icici@outlook.com'

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, staggerDirection: -1 }
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: 1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' as const }
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.8,
    transition: { duration: 0.2, ease: 'easeIn' as const }
  }
}

const fabVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { delay: 1, duration: 0.4, ease: 'backOut' as const }
  }
}

const pulseVariants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut' as const
    }
  }
}

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('Contact')

  const phoneLink = `tel:${PHONE_NUMBER}`
  const whatsappLink = `https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(t('defaultMessage'))}`
  const emailLink = `mailto:${EMAIL_ADDRESS}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col gap-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* WhatsApp */}
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3"
              variants={itemVariants}
            >
              <span className="px-3 py-1.5 rounded-lg bg-deep-navy text-warm-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {t('whatsapp')}
              </span>
              <motion.div
                className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5 text-white" fill="white" />
              </motion.div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href={phoneLink}
              className="group flex items-center gap-3"
              variants={itemVariants}
            >
              <span className="px-3 py-1.5 rounded-lg bg-deep-navy text-warm-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {t('call')}
              </span>
              <motion.div
                className="w-12 h-12 rounded-full bg-sand flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5 text-deep-navy" />
              </motion.div>
            </motion.a>

            {/* Email */}
            <motion.a
              href={emailLink}
              className="group flex items-center gap-3"
              variants={itemVariants}
            >
              <span className="px-3 py-1.5 rounded-lg bg-deep-navy text-warm-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {t('email')}
              </span>
              <motion.div
                className="w-12 h-12 rounded-full bg-[#0078D4] flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5 text-white" />
              </motion.div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <div className="relative">
        {/* Pulse ring when closed */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-sand"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          />
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
            isOpen ? 'bg-deep-navy' : 'bg-sand'
          }`}
          variants={fabVariants}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-warm-white" />
            ) : (
              <MessageCircle className="w-6 h-6 text-deep-navy" />
            )}
          </motion.div>
        </motion.button>
      </div>
    </div>
  )
}
