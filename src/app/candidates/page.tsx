'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useToast } from '@/context/ToastContext'

type Stage = 'New' | 'Screened' | 'Interview' | 'Offered' | 'Hired' | 'Rejected'

type Candidate = {
  id: string
  name: string
  role: string
  email: string
  avatar: string
  appliedDate: string
  matchScore: number
  stage: Stage
}

const initialCandidates: Candidate[] = [
  { id: '1', name: 'Eleanor Pena', role: 'Senior React Developer', email: 'eleanor@example.com', avatar: 'https://i.pravatar.cc/150?img=1', appliedDate: '2 hours ago', matchScore: 94, stage: 'New' },
  { id: '2', name: 'Albert Flores', role: 'Data Scientist - ML', email: 'albert.f@example.com', avatar: 'https://i.pravatar.cc/150?img=11', appliedDate: '5 hours ago', matchScore: 88, stage: 'Interview' },
  { id: '3', name: 'Wade Warren', role: 'Product Manager', email: 'wade.w@example.com', avatar: 'https://i.pravatar.cc/150?img=3', appliedDate: '1 day ago', matchScore: 76, stage: 'Screened' },
  { id: '4', name: 'Bessie Cooper', role: 'UX Designer', email: 'bessie@example.com', avatar: 'https://i.pravatar.cc/150?img=5', appliedDate: '2 days ago', matchScore: 98, stage: 'Offered' },
  { id: '5', name: 'Ralph Edwards', role: 'DevOps Engineer', email: 'ralph@example.com', avatar: 'https://i.pravatar.cc/150?img=8', appliedDate: '3 days ago', matchScore: 82, stage: 'Hired' },
  { id: '6', name: 'Courtney Henry', role: 'Backend Engineer - Java', email: 'courtney@example.com', avatar: 'https://i.pravatar.cc/150?img=9', appliedDate: '4 days ago', matchScore: 65, stage: 'Rejected' },
  { id: '7', name: 'Jerome Bell', role: 'Senior React Developer', email: 'jerome.b@example.com', avatar: 'https://i.pravatar.cc/150?img=12', appliedDate: '5 days ago', matchScore: 91, stage: 'Interview' },
]

const stageColors: Record<Stage, { bg: string, text: string }> = {
  New: { bg: 'rgba(59,130,246,0.15)', text: '#60a5fa' }, // Blue
  Screened: { bg: 'rgba(139,92,246,0.15)', text: '#a78bfa' }, // Purple
  Interview: { bg: 'rgba(245,158,11,0.15)', text: '#fbbf24' }, // Yellow
  Offered: { bg: 'rgba(16,185,129,0.15)', text: '#34d399' }, // Green
  Hired: { bg: 'rgba(5,150,105,0.2)', text: '#10b981' }, // Dark Green
  Rejected: { bg: 'rgba(239,68,68,0.15)', text: '#f87171' }, // Red
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [search, setSearch] = useState('')
  const [filterStage, setFilterStage] = useState<Stage | 'All'>('All')
  const { addToast } = useToast()

  const handleStageChange = (id: string, newStage: Stage) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, stage: newStage } : c))
    const cand = candidates.find(c => c.id === id)
    if (cand) {
      addToast(`Moved ${cand.name} to ${newStage}`, 'success')
    }
  }

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase())
    const matchesStage = filterStage === 'All' || c.stage === filterStage
    return matchesSearch && matchesStage
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1117' }}>
      <Sidebar />

      <main style={{ marginLeft: '200px', flex: 1, padding: '32px', minHeight: '100vh', maxWidth: 'calc(100vw - 200px)', overflowX: 'hidden' }}>
        
        {/* Top Title Section */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ color: '#c4b5fd', fontSize: '20px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
            5. Candidates
          </h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px', fontFamily: 'DM Sans, sans-serif' }}>
            Manage and track applicants through your hiring pipeline
          </p>
        </div>

        {/* Main Container */}
        <div style={{ background: '#151822', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255,255,255,0.03)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', minHeight: '700px' }}>
          
          {/* Controls Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h2 style={{ color: '#f8fafc', fontSize: '20px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>
                Applicant Tracking
              </h2>
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px', fontFamily: 'DM Sans, sans-serif' }}>
                {filteredCandidates.length} total candidates
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px' }}>🔍</span>
                <input 
                  type="text" 
                  placeholder="Search name or role..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    background: '#0f1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px',
                    padding: '10px 16px 10px 36px', color: '#f8fafc', fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
                    width: '240px', outline: 'none'
                  }}
                />
              </div>

              <select 
                value={filterStage} 
                onChange={e => setFilterStage(e.target.value as Stage | 'All')}
                style={{
                  background: '#0f1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px',
                  padding: '10px 16px', color: '#cbd5e1', fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
                  outline: 'none', cursor: 'pointer'
                }}
              >
                <option value="All">All Stages</option>
                <option value="New">New</option>
                <option value="Screened">Screened</option>
                <option value="Interview">Interview</option>
                <option value="Offered">Offered</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Data Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: '16px', color: '#64748b', fontSize: '12px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>CANDIDATE</th>
                  <th style={{ padding: '16px', color: '#64748b', fontSize: '12px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>APPLIED FOR</th>
                  <th style={{ padding: '16px', color: '#64748b', fontSize: '12px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>AI MATCH</th>
                  <th style={{ padding: '16px', color: '#64748b', fontSize: '12px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>APPLIED</th>
                  <th style={{ padding: '16px', color: '#64748b', fontSize: '12px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>STAGE</th>
                  <th style={{ padding: '16px', color: '#64748b', fontSize: '12px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#64748b', fontSize: '14px', fontFamily: 'DM Sans, sans-serif' }}>
                      No candidates found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      
                      {/* Candidate Profile */}
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={c.avatar} alt={c.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <p style={{ color: '#f8fafc', fontSize: '14px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '2px' }}>{c.name}</p>
                            <p style={{ color: '#64748b', fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}>{c.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Applied Role */}
                      <td style={{ padding: '16px' }}>
                        <p style={{ color: '#cbd5e1', fontSize: '13px', fontFamily: 'DM Sans, sans-serif' }}>{c.role}</p>
                      </td>

                      {/* AI Match Score */}
                      <td style={{ padding: '16px', width: '200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ flex: 1, background: '#0f1117', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ 
                              width: `${c.matchScore}%`, 
                              height: '100%', 
                              background: c.matchScore >= 90 ? '#10b981' : c.matchScore >= 80 ? '#3b82f6' : c.matchScore >= 70 ? '#f59e0b' : '#ef4444',
                              borderRadius: '3px'
                            }} />
                          </div>
                          <span style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', minWidth: '32px' }}>
                            {c.matchScore}%
                          </span>
                        </div>
                      </td>

                      {/* Applied Date */}
                      <td style={{ padding: '16px' }}>
                        <p style={{ color: '#64748b', fontSize: '13px', fontFamily: 'DM Sans, sans-serif' }}>{c.appliedDate}</p>
                      </td>

                      {/* Stage Dropdown */}
                      <td style={{ padding: '16px' }}>
                        <select 
                          value={c.stage}
                          onChange={e => handleStageChange(c.id, e.target.value as Stage)}
                          style={{
                            background: stageColors[c.stage].bg,
                            color: stageColors[c.stage].text,
                            border: `1px solid ${stageColors[c.stage].text}40`,
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600,
                            fontFamily: 'Space Grotesk, sans-serif',
                            outline: 'none',
                            cursor: 'pointer',
                            appearance: 'none',
                            minWidth: '100px',
                            textAlign: 'center'
                          }}
                        >
                          <option value="New">New</option>
                          <option value="Screened">Screened</option>
                          <option value="Interview">Interview</option>
                          <option value="Offered">Offered</option>
                          <option value="Hired">Hired</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      {/* Action */}
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <button 
                          onClick={() => addToast(`Opening profile for ${c.name}...`, 'info')}
                          style={{
                            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1',
                            padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  )
}
