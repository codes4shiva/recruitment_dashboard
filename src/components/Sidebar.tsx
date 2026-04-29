'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@/context/UserContext'

const links = [
  { href: '/', label: 'Dashboard', icon: '⊞' },
  { href: '/campaigns', label: 'Campaigns', icon: '◈' },
  { href: '/analytics', label: 'Analytics', icon: '◎' },
  { href: '/reports', label: 'Reports', icon: '▤' },
  { href: '/candidates', label: 'Candidates', icon: '◫' },
  { href: '/settings', label: 'Settings', icon: '⊙' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { name, email, avatar } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="mobile-nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>

      {/* Mobile Overlay */}
      <div className={`mobile-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />

      <aside className={`sidebar-container ${isOpen ? 'open' : ''}`} style={{
        position: 'fixed', left: 0, top: 0, height: '100vh', width: '200px',
        background: '#0d1018', borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column', zIndex: 50,
      }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '14px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif',
          }}>R</div>
          <span style={{ color: 'white', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '15px' }}>
            RecruitIQ
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{ color: '#334155', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', padding: '8px 8px 4px', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase' }}>
          Main Menu
        </p>
        {links.map(link => {
          const active = pathname === link.href
          return (
            <Link key={link.href} href={link.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px', textDecoration: 'none',
              fontSize: '14px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
              transition: 'all 0.15s ease',
              background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
              color: active ? '#818cf8' : '#64748b',
              border: active ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
            }}>
              <span style={{ fontSize: '16px', width: '20px', display: 'flex', justifyContent: 'center' }}>{link.icon}</span>
              <span>{link.label}</span>
              {active && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1' }} />}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src={avatar} 
            alt="User" 
            style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
          />
          <div style={{ overflow: 'hidden' }}>
            <p style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 500, fontFamily: 'Space Grotesk, sans-serif', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{name}</p>
            <p style={{ color: '#475569', fontSize: '11px', fontFamily: 'Space Grotesk, sans-serif', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{email}</p>
          </div>
        </div>
      </div>
    </aside>
    </>
  )
}

