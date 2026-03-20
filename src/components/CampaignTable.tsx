'use client'
import { useState, useMemo } from 'react'
import { Campaign } from '@/types'


const statusStyles: Record<Campaign['status'], { bg: string; color: string; dot: string }> = {
  active:    { bg: 'rgba(16,185,129,0.1)',  color: '#10b981', dot: '#10b981' },
  paused:    { bg: 'rgba(245,158,11,0.1)',  color: '#f59e0b', dot: '#f59e0b' },
  completed: { bg: 'rgba(148,163,184,0.1)', color: '#94a3b8', dot: '#94a3b8' },
}

const channelColors: Record<Campaign['channel'], string> = {
  LinkedIn:     '#60a5fa',
  Indeed:       '#a78bfa',
  Google:       '#fb923c',
  ZipRecruiter: '#34d399',
}

const channelBg: Record<Campaign['channel'], string> = {
  LinkedIn:     'rgba(96,165,250,0.08)',
  Indeed:       'rgba(167,139,250,0.08)',
  Google:       'rgba(251,146,60,0.08)',
  ZipRecruiter: 'rgba(52,211,153,0.08)',
}

type Props = {
  campaigns: Campaign[]
}

export default function CampaignTable({ campaigns }: Props) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<Campaign['status'] | 'all'>('all')
  const [channelFilter, setChannelFilter] = useState<Campaign['channel'] | 'all'>('all')

  const filtered = useMemo(() => campaigns.filter(c => (
    c.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'all' || c.status === statusFilter) &&
    (channelFilter === 'all' || c.channel === channelFilter)
  )), [campaigns, search, statusFilter, channelFilter])
  const selectStyle: React.CSSProperties = {
    padding: '8px 28px 8px 12px',
    borderRadius: '10px',
    background: '#1a1f2e',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#94a3b8',
    fontSize: '12px',
    fontFamily: 'Space Grotesk, sans-serif',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
  }

  return (
    <div style={{
      background: '#151822',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px',
      overflow: 'hidden',
      width: '100%',
      minWidth: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div>
          <h2 style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
           Your Campaigns
          </h2>
          <p style={{ color: '#475569', fontSize: '12px', marginTop: '2px', fontFamily: 'DM Sans, sans-serif' }}>
            {filtered.length} of {campaigns.length} campaigns
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍  Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search campaigns"
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              width: '180px',
              background: '#1a1f2e',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#e2e8f0',
              fontSize: '12px',
              fontFamily: 'Space Grotesk, sans-serif',
              outline: 'none',
            }}
          />
          <div style={{ position: 'relative' }}>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}
              aria-label="Filter by status" style={selectStyle}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
            <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: '10px', pointerEvents: 'none' }}>▾</span>
          </div>
          <div style={{ position: 'relative' }}>
            <select value={channelFilter} onChange={e => setChannelFilter(e.target.value as any)}
              aria-label="Filter by channel" style={selectStyle}>
              <option value="all">All Channels</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Indeed">Indeed</option>
              <option value="Google">Google</option>
              <option value="ZipRecruiter">ZipRecruiter</option>
            </select>
            <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: '10px', pointerEvents: 'none' }}>▾</span>
          </div>
        </div>
      </div>

      {/* Scrollable table wrapper */}
      <div style={{ width: '100%' }}>
      <table style={{
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
}}>
          <thead>
            <tr style={{ background: '#0f1117' }}>
              {[
                { label: 'Job Title', width: '22%' },
                { label: 'Channel',   width: '12%' },
                { label: 'Status',    width: '11%' },
                { label: 'Budget',    width: '9%'  },
                { label: 'Spent',     width: '11%' },
                { label: 'Clicks',    width: '9%'  },
                { label: 'Applies',   width: '9%'  },
                { label: 'CPC',       width: '8%'  },
                { label: 'CPA',       width: '9%'  },
              ].map(h => (
                <th key={h.label} style={{
                  padding: '10px 10px',
                  textAlign: 'left',
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#475569',
                  fontFamily: 'Space Grotesk, sans-serif',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  width: h.width,
                  whiteSpace: 'nowrap',
                }}>
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: '48px', textAlign: 'center', color: '#334155', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px' }}>
                  No campaigns match your filters
                </td>
              </tr>
            ) : filtered.map((c, i) => (
              <tr key={c.id}
                style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  transition: 'background 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
              >
                <td style={{ padding: '12px 10px' }}>
                  <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 500, fontFamily: 'Space Grotesk, sans-serif', whiteSpace: 'nowrap' }}>
                    {c.title}
                  </span>
                </td>

                <td style={{ padding: '10px 8px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '3px 10px', borderRadius: '6px',
                    background: channelBg[c.channel],
                    color: channelColors[c.channel],
                    fontSize: '12px', fontWeight: 600,
                    fontFamily: 'Space Grotesk, sans-serif',
                    whiteSpace: 'nowrap',
                  }}>
                    {c.channel}
                  </span>
                </td>

                <td style={{ padding: '10px 8px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '4px 10px', borderRadius: '20px',
                    background: statusStyles[c.status].bg,
                    color: statusStyles[c.status].color,
                    fontSize: '11px', fontWeight: 600,
                    fontFamily: 'Space Grotesk, sans-serif',
                    textTransform: 'capitalize', whiteSpace: 'nowrap',
                  }}>
                    <div style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: statusStyles[c.status].dot,
                      boxShadow: c.status === 'active' ? `0 0 5px ${statusStyles[c.status].dot}` : 'none',
                    }} />
                    {c.status}
                  </span>
                </td>

                <td style={{ padding: '10px 8px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif' }}>
                    ₹{(c.budget / 1000).toFixed(0)}k
                  </span>
                </td>

                <td style={{ padding: '10px 8px' }}>
                  <span style={{ color: c.spent / c.budget > 0.85 ? '#f87171' : '#94a3b8', fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif', display: 'block' }}>
                    ₹{(c.spent / 1000).toFixed(1)}k
                  </span>
                  <div style={{ width: '50px', height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '4px' }}>
                    <div style={{
                      height: '100%', borderRadius: '2px',
                      width: `${Math.min((c.spent / c.budget) * 100, 100)}%`,
                      background: c.spent / c.budget > 0.85 ? '#f87171' : '#6366f1',
                    }} />
                  </div>
                </td>

                <td style={{ padding: '14px 16px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {c.clicks.toLocaleString()}
                  </span>
                </td>

                <td style={{ padding: '14px 16px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {c.applies.toLocaleString()}
                  </span>
                </td>

                <td style={{ padding: '14px 16px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif' }}>
                    ₹{c.cpc}
                  </span>
                </td>

                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    color: c.cpa < 100 ? '#10b981' : '#94a3b8',
                    fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: c.cpa < 100 ? 600 : 400,
                  }}>
                    ₹{c.cpa}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        padding: '12px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <p style={{ color: '#334155', fontSize: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>
          Showing {filtered.length} results
        </p>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['←', '1', '2', '→'].map(p => (
            <button key={p} style={{
              width: '28px', height: '28px', borderRadius: '7px',
              background: p === '1' ? 'rgba(99,102,241,0.2)' : 'transparent',
              border: p === '1' ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.06)',
              color: p === '1' ? '#818cf8' : '#475569',
              fontSize: '12px', cursor: 'pointer',
              fontFamily: 'Space Grotesk, sans-serif',
            }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  )
}