'use client'
import { KpiData } from '@/types'

export default function KpiCard({ card }: { card: KpiData }) {
  const isUp = card.trend === 'up'
  return (
    <div style={{
      background: '#151822',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '20px',
      transition: 'border-color 0.2s, transform 0.2s',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,0.4)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
      }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute',  top: 0, left: '24px', right: '24px', height: '2px',
        background: isUp ? 'linear-gradient(90deg, #10b981, transparent)' : 'linear-gradient(90deg, #f43f5e, transparent)',
        borderRadius: '0 0 4px 4px',
      }} />

      <p style={{
        color: '#64748b', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em',
        textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '10px',
      }}>
        {card.label}
      </p>

      <p style={{
        color: '#f1f5f9', fontSize: '24px', fontWeight: 700,
        fontFamily: 'Space Grotesk, sans-serif', marginBottom: '8px', letterSpacing: '-0.02em',
      }}>
        {card.value}
      </p>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '4px 10px', borderRadius: '20px',
        background: isUp ? 'rgba(16,185,129,0.12)' : 'rgba(244,63,94,0.12)',
        border: `1px solid ${isUp ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}`,
      }}>
        <span style={{ color: isUp ? '#10b981' : '#f43f5e', fontSize: '12px' }}>{isUp ? '↑' : '↓'}</span>
        <span style={{ color: isUp ? '#10b981' : '#f43f5e', fontSize: '12px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
          {Math.abs(card.change)}% vs last month
        </span>
      </div>
    </div>
  )
}

