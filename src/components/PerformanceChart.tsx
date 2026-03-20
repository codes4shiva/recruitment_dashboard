'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartPoint } from '@/types'

type Props = {
  data: ChartPoint[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', minWidth: '150px' }}>
      <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
            <span style={{ color: '#cbd5e1', fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'capitalize' }}>{p.dataKey}</span>
          </div>
          <span style={{ color: 'white', fontWeight: 600, fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif' }}>
            {p.dataKey === 'spend' ? '₹' : ''}{p.value.toLocaleString('en-US')}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function PerformanceChart({ data }: Props) {
  // Normalize the data visually so they look good on the same chart, using multiple Y-axes
  return (
    <div style={{ background: '#151822', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#f8fafc', fontWeight: 600, fontSize: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>
          Performance Trend
        </h2>
        <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px', fontFamily: 'DM Sans, sans-serif' }}>Compare key metrics over time</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '3px', background: '#8b5cf6', borderRadius: '2px' }} />
          <span style={{ color: '#94a3b8', fontSize: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>Clicks</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '3px', background: '#10b981', borderRadius: '2px' }} />
          <span style={{ color: '#94a3b8', fontSize: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>Applies</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '3px', background: '#f59e0b', borderRadius: '2px' }} />
          <span style={{ color: '#94a3b8', fontSize: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>Spend</span>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Space Grotesk, sans-serif' }} axisLine={false} tickLine={false} dy={10} />
            <YAxis yAxisId="left" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Space Grotesk, sans-serif' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val >= 1000 ? (val/1000).toFixed(0) + 'K' : val}`} width={35} />
            <YAxis yAxisId="right" orientation="right" hide domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
            <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#8b5cf6', strokeWidth: 0 }} />
            <Line yAxisId="right" type="monotone" dataKey="applies" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#10b981', strokeWidth: 0 }} />
            <Line yAxisId="left" type="monotone" dataKey="spend" stroke="#f59e0b" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#f59e0b', strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
