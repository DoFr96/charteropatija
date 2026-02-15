// components/LazySection.tsx
'use client'
import { useInView } from '@/app/[locale]/hooks/useInView'
import { ReactNode } from 'react'

interface LazySectionProps {
  children: ReactNode
  fallbackHeight?: string // npr. "h-96", "h-64"
}

export function LazySection({ children, fallbackHeight = 'h-96' }: LazySectionProps) {
  const { ref, isInView } = useInView()

  return <div ref={ref}>{isInView ? children : <div className={fallbackHeight} />}</div>
}
