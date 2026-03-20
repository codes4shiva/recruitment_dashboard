'use client'
import { Report } from '@/context/ReportContext'

type Props = {
  report: Report
  onClose: () => void
}

export default function ReportPreviewModal({ report, onClose }: Props) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
    }}>
      <div style={{
        background: '#151822', width: '100%', maxWidth: '700px', height: '80vh',
        borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a1f2e' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                background: report.type === 'PDF' ? '#ef4444' : report.type === 'Excel' ? '#10b981' : '#3b82f6', 
                color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' 
              }}>
                {report.type}
              </span>
              <h2 style={{ color: '#f8fafc', fontSize: '18px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
                {report.name}
              </h2>
            </div>
            <p style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>
              Generated on {report.dateGenerated} • Period: {report.period}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '20px' }}>✕</button>
        </div>

        {/* Mock Content */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: '#0f1117' }}>
          
          <div style={{ background: 'white', borderRadius: '8px', padding: '32px', minHeight: '100%', color: '#0f172a' }}>
            <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Space Grotesk, sans-serif', color: '#0f172a' }}>{report.name}</h1>
                <p style={{ color: '#64748b', marginTop: '4px' }}>RecruitIQ Executive Summary</p>
              </div>
              <div style={{ textAlign: 'right', color: '#64748b', fontSize: '12px' }}>
                <p>Period: {report.period}</p>
                <p>Date: {report.dateGenerated}</p>
              </div>
            </div>

            {report.metrics && report.metrics.length > 0 && (
               <div style={{ marginBottom: '24px' }}>
                 <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: '#475569', marginBottom: '8px' }}>Selected Metrics</h3>
                 <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                   {report.metrics.map(m => (
                     <span key={m} style={{ background: '#f1f5f9', color: '#334155', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>{m}</span>
                   ))}
                 </div>
               </div>
            )}

            {report.channels && report.channels.length > 0 && (
               <div style={{ marginBottom: '24px' }}>
                 <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: '#475569', marginBottom: '8px' }}>Target Channels</h3>
                 <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                   {report.channels.map(c => (
                     <span key={c} style={{ background: '#f1f5f9', color: '#334155', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>{c}</span>
                   ))}
                 </div>
               </div>
            )}

            {/* Mock Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <span style={{ color: '#94a3b8' }}>[Chart Graphic Placeholder]</span>
              </div>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <span style={{ color: '#94a3b8' }}>[Chart Graphic Placeholder]</span>
              </div>
            </div>

            {/* Mock Data Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '8px 4px', color: '#475569' }}>Campaign / Metric</th>
                  <th style={{ padding: '8px 4px', color: '#475569' }}>Value A</th>
                  <th style={{ padding: '8px 4px', color: '#475569' }}>Value B</th>
                  <th style={{ padding: '8px 4px', color: '#475569' }}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4,5].map(i => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 4px', fontWeight: 500 }}>Sample Data Row {i}</td>
                    <td style={{ padding: '12px 4px' }}>1,234</td>
                    <td style={{ padding: '12px 4px' }}>$4,567</td>
                    <td style={{ padding: '12px 4px', color: i%2===0 ? '#10b981' : '#ef4444' }}>{i%2===0 ? '+12%' : '-4%'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: '#1a1f2e' }}>
          <button onClick={onClose} style={{
            padding: '10px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
            color: '#f8fafc', fontSize: '13px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif'
          }}>
            Close
          </button>
          <button style={{
            padding: '10px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none',
            color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            Download {report.type}
          </button>
        </div>
      </div>
    </div>
  )
}
