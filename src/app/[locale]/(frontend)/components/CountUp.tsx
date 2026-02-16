'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, motion, useMotionValue, useTransform, animate } from 'framer-motion'

type Props = {
  to: number
  duration?: number
  suffix?: string
  className?: string
}

export default function CountUp({ to, duration = 2, suffix = '', className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: 'easeOut',
      })

      const unsubscribe = rounded.on('change', (latest) => {
        setDisplayValue(latest)
      })

      return () => {
        controls.stop()
        unsubscribe()
      }
    }
  }, [isInView, to, duration, count, rounded])

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </motion.span>
  )
}
