'use client'
import { LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

export function JobCategoryChart({ range }: { range: string }) {
  const m = range === '7d' ? 0.25 : range === '30d' ? 1 : range === '90d' ? 3 : 12
  const data = [
    { name: 'Engineering', value: Math.round(400 * m * (1 + Math.random() * 0.1)) },
    { name: 'Sales', value: Math.round(300 * m * (1 + Math.random() * 0.1)) },
    { name: 'Marketing', value: Math.round(200 * m * (1 + Math.random() * 0.1)) },
    { name: 'Product', value: Math.round(278 * m * (1 + Math.random() * 0.1)) },
    { name: 'HR', value: Math.round(189 * m * (1 + Math.random() * 0.1)) },
    { name: 'Finance', value: Math.round(239 * m * (1 + Math.random() * 0.1)) },
  ]

  return (
    <div style={{ background: '#151822', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', height: '100%' }}>
      <h3 style={{ color: '#f8fafc', fontWeight: 600, fontSize: '14px', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '16px' }}>Top Job Categories</h3>
      <div style={{ height: '150px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Tooltip 
              contentStyle={{ background: '#1a1f2e', border: 'none', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
              itemStyle={{ color: '#10b981' }}
            />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function LocationChart({ range }: { range: string }) {
  const m = range === '7d' ? 0.25 : range === '30d' ? 1 : range === '90d' ? 3 : 12
  const data = [
    { name: 'New York', value: Math.round(2400 * m * (1 + Math.random() * 0.1)) },
    { name: 'San Francisco', value: Math.round(1398 * m * (1 + Math.random() * 0.1)) },
    { name: 'London', value: Math.round(9800 * m * (1 + Math.random() * 0.1)) },
    { name: 'Berlin', value: Math.round(3908 * m * (1 + Math.random() * 0.1)) },
    { name: 'Toronto', value: Math.round(4800 * m * (1 + Math.random() * 0.1)) },
    { name: 'Remote', value: Math.round(8800 * m * (1 + Math.random() * 0.1)) },
  ]

  return (
    <div style={{ background: '#151822', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', height: '100%' }}>
      <h3 style={{ color: '#f8fafc', fontWeight: 600, fontSize: '14px', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '16px' }}>Top Locations</h3>
      <div style={{ height: '150px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Tooltip 
              contentStyle={{ background: '#1a1f2e', border: 'none', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function DeviceChart({ range }: { range: string }) {
  const r = range === '7d' ? 42 : range === '30d' ? 45 : range === '90d' ? 48 : 50
  const data = [
    { name: 'Desktop', value: r },
    { name: 'Mobile', value: 100 - r },
  ]
  const COLORS = ['#f59e0b', '#3b82f6']

  return (
    <div style={{ background: '#151822', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', height: '100%' }}>
      <h3 style={{ color: '#f8fafc', fontWeight: 600, fontSize: '14px', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '16px' }}>Device Performance</h3>
      <div style={{ display: 'flex', alignItems: 'center', height: '150px' }}>
        <div style={{ width: '50%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a1f2e', border: 'none', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.map((entry, index) => (
            <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[index] }} />
              <span style={{ color: '#94a3b8', fontSize: '12px', flex: 1, fontFamily: 'Space Grotesk, sans-serif' }}>{entry.name}</span>
              <span style={{ color: '#f8fafc', fontSize: '13px', fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
