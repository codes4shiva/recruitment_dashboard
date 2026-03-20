'use client'
import { useState } from 'react'
import { useReports, ReportType } from '@/context/ReportContext'
import { useToast } from '@/context/ToastContext'

type Props = {
  onClose: () => void
}

export default function ReportModal({ onClose }: Props) {
  const { addReport } = useReports()
  const { addToast, removeToast } = useToast()

  const [name, setName] = useState('')
  const [format, setFormat] = useState<ReportType>('PDF')
  const [dateRange, setDateRange] = useState('Last 30 days')
  
  const [metrics, setMetrics] = useState<string[]>([])
  const [channels, setChannels] = useState<string[]>([])

  const toggleMetric = (m: string) => {
    setMetrics(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }

  const toggleChannel = (c: string) => {
    setChannels(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  const handleGenerate = async () => {
    if (!name) {
      addToast('Please enter a report name', 'error')
      return
    }
    if (metrics.length === 0) {
      addToast('Select at least one metric', 'error')
      return
    }

    const toastId = addToast(`Initializing custom report...`, 'loading')
    onClose()
    
    await addReport({
      name,
      type: format,
      period: dateRange,
      size: 'Generating...',
      metrics,
      channels
    })
    
    removeToast(toastId)
    addToast(`"${name}" report generated successfully!`, 'success')
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
    }}>
      <div style={{
        background: '#151822', width: '100%', maxWidth: '500px',
        borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
        padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#f8fafc', fontSize: '18px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
            Create Custom Report
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '20px' }}>✕</button>
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>Report Name</label>
          <input 
            value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Q1 Marketing Overview"
            style={{
              width: '100%', padding: '12px', background: '#0f1117', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', color: '#f8fafc', fontSize: '14px', fontFamily: 'DM Sans, sans-serif'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>Select Metrics</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Clicks', 'Applies', 'Spend', 'CPA', 'CPC', 'Conversion Rate'].map(m => (
              <label key={m} style={{ 
                display: 'flex', alignItems: 'center', gap: '6px', 
                background: metrics.includes(m) ? 'rgba(99,102,241,0.15)' : '#0f1117', 
                border: metrics.includes(m) ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.1)',
                color: metrics.includes(m) ? '#818cf8' : '#cbd5e1',
                padding: '6px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <input type="checkbox" checked={metrics.includes(m)} onChange={() => toggleMetric(m)} style={{ display: 'none' }} />
                {m}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>Select Channels</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['LinkedIn', 'Indeed', 'Google', 'ZipRecruiter'].map(c => (
              <label key={c} style={{ 
                display: 'flex', alignItems: 'center', gap: '6px', 
                background: channels.includes(c) ? 'rgba(16,185,129,0.15)' : '#0f1117', 
                border: channels.includes(c) ? '1px solid rgba(16,185,129,0.5)' : '1px solid rgba(255,255,255,0.1)',
                color: channels.includes(c) ? '#34d399' : '#cbd5e1',
                padding: '6px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <input type="checkbox" checked={channels.includes(c)} onChange={() => toggleChannel(c)} style={{ display: 'none' }} />
                {c}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>Date Range</label>
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} style={{
              width: '100%', padding: '12px', background: '#0f1117', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', color: '#f8fafc', fontSize: '14px', fontFamily: 'DM Sans, sans-serif'
            }}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>Export Format</label>
            <select value={format} onChange={e => setFormat(e.target.value as ReportType)} style={{
              width: '100%', padding: '12px', background: '#0f1117', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', color: '#f8fafc', fontSize: '14px', fontFamily: 'DM Sans, sans-serif'
            }}>
              <option value="PDF">PDF Document</option>
              <option value="Excel">Excel Spreadsheet</option>
              <option value="CSV">CSV Data</option>
            </select>
          </div>
        </div>

        <button onClick={handleGenerate} style={{
          width: '100%', padding: '14px', borderRadius: '12px', marginTop: '8px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white',
          border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif'
        }}>
          Generate Custom Report
        </button>
      </div>
    </div>
  )
}
