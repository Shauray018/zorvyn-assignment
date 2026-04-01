'use client'

import React, { useRef, useEffect, useCallback, useState } from 'react'
import { useTheme } from 'next-themes'
import { gsap } from 'gsap'

const PARTICLE_COUNT = 10
const SPOTLIGHT_RADIUS = 350

function useGlowColor() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return '255, 255, 255'
  return resolvedTheme === 'dark' ? '255, 255, 255' : '0, 0, 0'
}

const createParticleElement = (x: number, y: number, glowColor: string): HTMLDivElement => {
  const el = document.createElement('div')
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${glowColor}, 1);
    box-shadow: 0 0 6px rgba(${glowColor}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

export function BentoCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const isHoveredRef = useRef(false)
  const memoizedParticles = useRef<HTMLDivElement[]>([])
  const particlesInitialized = useRef(false)
  const glowColor = useGlowColor()

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return
    const { width, height } = cardRef.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    )
    particlesInitialized.current = true
  }, [glowColor])

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => { particle.parentNode?.removeChild(particle) },
      })
    })
    particlesRef.current = []
  }, [])

  // Reset particles when theme changes
  useEffect(() => {
    particlesInitialized.current = false
    memoizedParticles.current = []
  }, [glowColor])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return
    if (!particlesInitialized.current) initializeParticles()

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return
        const clone = particle.cloneNode(true) as HTMLDivElement
        cardRef.current.appendChild(clone)
        particlesRef.current.push(clone)

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
        gsap.to(clone, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true })
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true })
      }, index * 100)
      timeoutsRef.current.push(timeoutId)
    })
  }, [initializeParticles])

  useEffect(() => {
    const element = cardRef.current
    if (!element) return

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      animateParticles()
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      clearAllParticles()
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      isHoveredRef.current = false
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles])

  return (
    <div
      ref={cardRef}
      className={`bento-card relative overflow-hidden border border-border transition-transform duration-300 ease-in-out hover:-translate-y-0.5 ${className}`}
      style={{ '--glow-x': '50%', '--glow-y': '50%', '--glow-intensity': '0', '--glow-radius': '200px' } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

export function DashboardBento({ children }: { children: React.ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const glowColor = useGlowColor()

  useEffect(() => {
    if (!gridRef.current) return

    const spotlight = document.createElement('div')
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.08) 0%,
        rgba(${glowColor}, 0.04) 15%,
        rgba(${glowColor}, 0.02) 25%,
        rgba(${glowColor}, 0.01) 40%,
        transparent 65%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: ${glowColor === '255, 255, 255' ? 'screen' : 'multiply'};
    `
    document.body.appendChild(spotlight)
    spotlightRef.current = spotlight

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return

      const rect = gridRef.current.getBoundingClientRect()
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 })
        gridRef.current.querySelectorAll('.bento-card').forEach((card) => {
          ;(card as HTMLElement).style.setProperty('--glow-intensity', '0')
        })
        return
      }

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' })

      const proximity = SPOTLIGHT_RADIUS * 0.5
      const fadeDistance = SPOTLIGHT_RADIUS * 0.75
      let minDistance = Infinity

      gridRef.current.querySelectorAll('.bento-card').forEach((card) => {
        const el = card as HTMLElement
        const cardRect = el.getBoundingClientRect()
        const centerX = cardRect.left + cardRect.width / 2
        const centerY = cardRect.top + cardRect.height / 2
        const distance = Math.max(0, Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2)

        minDistance = Math.min(minDistance, distance)

        let glow = 0
        if (distance <= proximity) glow = 1
        else if (distance <= fadeDistance) glow = (fadeDistance - distance) / (fadeDistance - proximity)

        const relX = ((e.clientX - cardRect.left) / cardRect.width) * 100
        const relY = ((e.clientY - cardRect.top) / cardRect.height) * 100
        el.style.setProperty('--glow-x', `${relX}%`)
        el.style.setProperty('--glow-y', `${relY}%`)
        el.style.setProperty('--glow-intensity', glow.toString())
        el.style.setProperty('--glow-radius', `${SPOTLIGHT_RADIUS}px`)
      })

      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5 })
    }

    const handleMouseLeave = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 })
      gridRef.current?.querySelectorAll('.bento-card').forEach((card) => {
        ;(card as HTMLElement).style.setProperty('--glow-intensity', '0')
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current)
    }
  }, [glowColor])

  return (
    <>
      <style>{`
        .bento-card::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.3)) 30%,
            transparent 60%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.3s ease;
        }
        .bento-card:hover {
          box-shadow: 0 4px 20px rgba(${glowColor}, 0.1), 0 0 30px rgba(${glowColor}, 0.05);
        }
      `}</style>
      <div ref={gridRef} className="space-y-4">
        {children}
      </div>
    </>
  )
}
