import { useState, useCallback } from 'react'

interface Piece {
  id: number
  x: number
  y: number
  color: string
  size: number
  duration: number
  delay: number
  drift: number
  fallDistance: number
  endRot: number
  type: 'rect' | 'circle' | 'serpentina'
}

const COLORS = [
  '#74ACDF', '#74ACDF',
  '#FFFFFF', '#FFFFFF',
  '#FFD700', '#FFD700',
  '#003870',
  '#1e8a5e',
]

let pid = 0

export function useConfetti() {
  const [pieces, setPieces] = useState<Piece[]>([])

  const spawn = useCallback((clientX: number, clientY: number) => {
    const count = 55
    const batch: Piece[] = Array.from({ length: count }, () => {
      const type: Piece['type'] =
        Math.random() < 0.35 ? 'serpentina' : Math.random() < 0.5 ? 'circle' : 'rect'
      return {
        id: ++pid,
        x: clientX + (Math.random() - 0.5) * 60,
        y: clientY + (Math.random() - 0.5) * 20,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: type === 'serpentina' ? Math.random() * 14 + 8 : Math.random() * 10 + 5,
        duration: Math.random() * 900 + 1400,
        delay: Math.random() * 350,
        drift: (Math.random() - 0.5) * 180,
        fallDistance: Math.random() * 500 + 500,
        endRot: Math.random() * 720 - 360,
        type,
      }
    })
    setPieces(prev => [...prev, ...batch])
    const ids = new Set(batch.map(p => p.id))
    setTimeout(() => setPieces(prev => prev.filter(p => !ids.has(p.id))), 2800)
  }, [])

  return { pieces, spawn }
}

export function ConfettiOverlay({ pieces }: { pieces: Piece[] }) {
  return (
    <>
      {pieces.map(p => {
        const style: React.CSSProperties = {
          left: p.x,
          top: p.y,
          '--duration': `${p.duration}ms`,
          '--delay': `${p.delay}ms`,
          '--drift': `${p.drift}px`,
          '--fall-distance': `${p.fallDistance}px`,
          '--end-rot': `${p.endRot}deg`,
        } as React.CSSProperties

        if (p.type === 'serpentina') {
          return (
            <div
              key={p.id}
              className="serpentina-piece"
              style={{
                ...style,
                width: p.size * 4,
                height: p.size * 0.6,
                backgroundColor: p.color,
                borderRadius: 2,
                opacity: 0.9,
              }}
            />
          )
        }
        if (p.type === 'circle') {
          return (
            <div
              key={p.id}
              className="confetti-piece"
              style={{
                ...style,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: '50%',
              }}
            />
          )
        }
        return (
          <div
            key={p.id}
            className="confetti-piece"
            style={{
              ...style,
              width: p.size,
              height: p.size * 0.5,
              backgroundColor: p.color,
              borderRadius: 1,
            }}
          />
        )
      })}
    </>
  )
}
