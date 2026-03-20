'use client'
import { useState } from 'react'

const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This Year']

type Props = {
  dateRange: string
  setDateRange: (value: string) => void
}

export default function Header({ dateRange, setDateRange }: Props) {
  const [showDateMenu, setShowDateMenu] = useState(false)

  const getDateLabel = () => {
    if (dateRange === '7d') return 'Last 7 days'
    if (dateRange === '30d') return 'Last 30 days'
    if (dateRange === '90d') return 'Last 90 days'
    return 'This Year'
  }

  const handleDateSelect = (label: string) => {
    const value =
      label === 'Last 7 days' ? '7d' :
      label === 'Last 30 days' ? '30d' :
      label === 'Last 90 days' ? '90d' : 'year'
    setDateRange(value)
    setShowDateMenu(false)
  }

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '16px', marginBottom: '24px',
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
          <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif' }}>
            Live Dashboard
          </span>
        </div>
        <h1 style={{ color: '#f1f5f9', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'Space Grotesk, sans-serif' }}>
          Campaign Overview
        </h1>
        <p style={{ color: '#475569', fontSize: '14px', marginTop: '4px', fontFamily: 'DM Sans, sans-serif' }}>
          Tracking performance across all active job campaigns · {getDateLabel()}
        </p>
      </div>

      {/* Date Dropdown only */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowDateMenu(!showDateMenu)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 16px', borderRadius: '12px',
            background: '#151822', border: '1px solid rgba(255,255,255,0.08)',
            color: '#94a3b8', fontSize: '13px', cursor: 'pointer',
            fontFamily: 'Space Grotesk, sans-serif'
          }}
        >
          <span style={{ fontSize: '14px' }}>📅</span>
          <span>{getDateLabel()}</span>
          <span style={{ fontSize: '10px', transform: showDateMenu ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>▾</span>
        </button>

        {showDateMenu && (
          <div style={{
            position: 'absolute', top: '110%', right: 0, zIndex: 100,
            minWidth: '180px', borderRadius: '12px', overflow: 'hidden',
            background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {dateRanges.map(range => {
              const active = range === getDateLabel()
              return (
                <button key={range} onClick={() => handleDateSelect(range)} style={{
                  width: '100%', padding: '10px 16px', textAlign: 'left',
                  border: 'none', cursor: 'pointer',
                  background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: active ? '#818cf8' : '#94a3b8',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif'
                }}>
                  {range}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}