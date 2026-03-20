'use client'

type FunnelStep = {
  label: string
  value: number
  color: string
}

type Props = {
  data: FunnelStep[]
}

export default function FunnelChart({ data }: Props) {
  if (!data || data.length === 0) return null
  
  const maxVal = data[0].value

  return (
    <div style={{ background: '#151822', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#f8fafc', fontWeight: 600, fontSize: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>
          Conversion Funnel
        </h2>
        <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px', fontFamily: 'DM Sans, sans-serif' }}>30-day conversion breakdown</p>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
        {data.map((step, i) => {
          // Decreasing width for each step to create funnel effect
          const widthPercent = 100 - (i * 18) // 100%, 82%, 64%, 46%
          const pct = i === 0 ? '' : `(${(step.value / maxVal * 100).toFixed(1)}%)`
          
          return (
            <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div 
                style={{
                  width: `${widthPercent}%`,
                  height: '46px',
                  background: step.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 24px',
                  clipPath: i === data.length - 1 
                    ? 'polygon(5% 0, 95% 0, 100% 100%, 0 100%)' 
                    : 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)', // Simulating trapezoid
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 500, fontFamily: 'Space Grotesk, sans-serif' }}>{step.label}</span>
                <span style={{ color: 'white', fontSize: '13px', fontFamily: 'DM Sans, sans-serif' }}>
                  {step.value.toLocaleString('en-US')} <span style={{ opacity: 0.7, fontSize: '12px' }}>{pct}</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
