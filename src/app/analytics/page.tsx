'use client'

import Sidebar from '@/components/Sidebar'
import PerformanceChart from '@/components/PerformanceChart'
import FunnelChart from '@/components/FunnelChart'
import { JobCategoryChart, LocationChart, DeviceChart } from '@/components/BottomCharts'
import ChannelChart from '@/components/ChannelChart'
import TopCampaigns from '@/components/TopCampaigns'
import { useState } from 'react'
import { dashboardData } from '@/data/mockData'
import { useToast } from '@/context/ToastContext'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [dateRange, setDateRange] = useState('Last 30 days')
  const [showDateMenu, setShowDateMenu] = useState(false)
  const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This Year']
  const { addToast, removeToast } = useToast()



  const rangeMap: Record<string, string> = {
    'Last 7 days': '7d',
    'Last 30 days': '30d',
    'Last 90 days': '90d',
    'This Year': 'year'
  }
  
  const dataKey = rangeMap[dateRange]
  const data = dashboardData[dataKey]

  // Extract core metrics from dashboard data for Funnel Chart
  const getVal = (label: string) => parseInt(data.kpis.find(k => k.label === label)?.value.replace(/[^0-9]/g, '') || '0', 10)
  const totalClicks = getVal('Total Clicks')
  const totalApplies = getVal('Total Applies')

  // Calculate dynamic analytics metrics for Funnel Chart
  const ctr = 0.0343 // Base CTR to approximate impressions
  const impressions = Math.round(totalClicks / ctr)
  const hires = Math.round(totalApplies * 0.04)

  const kpis = data.kpis

  const funnelData = [
    { label: 'Impressions', value: impressions, color: '#4c1d95' },
    { label: 'Clicks', value: totalClicks, color: '#34d399' },
    { label: 'Applies', value: totalApplies, color: '#10b981' },
    { label: 'Hires', value: hires, color: '#059669' },
  ]

  const handleExport = () => {
    const toastId = addToast('Generating export...', 'loading')
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += "Metric,Value,Trend,Change\n"
    kpis.forEach(kpi => {
      csvContent += `"${kpi.label}","${kpi.value}","${kpi.trend}","${kpi.change}%"\n`
    })
    csvContent += "\nFunnel Stage,Count\n"
    funnelData.forEach(stage => {
      csvContent += `"${stage.label}","${stage.value}"\n`
    })

    setTimeout(() => {
      removeToast(toastId)
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `Analytics_Export_${dateRange.replace(/ /g, '_')}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      addToast('Analytics report downloaded!', 'success')
    }, 1000)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1117' }}>
      <Sidebar />

      <main style={{ marginLeft: '200px', flex: 1, padding: '32px', minHeight: '100vh', background: '#0f1117', maxWidth: 'calc(100vw - 200px)', overflowX: 'hidden' }}>
        
        {/* Top Title Section */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ color: '#c4b5fd', fontSize: '20px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
            3. Analytics & Insights
          </h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px', fontFamily: 'DM Sans, sans-serif' }}>
            Deep dive into performance metrics and trends
          </p>
        </div>

        {/* Main Analytics Container */}
        <div style={{ background: '#151822', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255,255,255,0.03)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          
          {/* Inner Header */}
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h2 style={{ color: '#f8fafc', fontSize: '20px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>
                Analytics
              </h2>
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px', fontFamily: 'DM Sans, sans-serif' }}>
                Detailed insights into your campaign performance
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => setShowDateMenu(!showDateMenu)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px',
                    background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#cbd5e1', fontSize: '12px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif'
                  }}
                >
                  <span style={{ fontSize: '14px' }}>📅</span>
                  <span>{dateRange}</span>
                  <span style={{ fontSize: '10px' }}>▾</span>
                </button>
                {showDateMenu && (
                  <div style={{ position: 'absolute', top: '110%', right: 0, zIndex: 100, minWidth: '160px', borderRadius: '8px', overflow: 'hidden', background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {dateRanges.map(range => (
                      <button key={range} onClick={() => { setDateRange(range); setShowDateMenu(false) }} style={{ width: '100%', padding: '10px 16px', textAlign: 'left', border: 'none', cursor: 'pointer', background: dateRange === range ? 'rgba(99,102,241,0.15)' : 'transparent', color: dateRange === range ? '#818cf8' : '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button onClick={handleExport} style={{
                background: 'transparent', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                padding: '8px 16px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                fontFamily: 'Space Grotesk, sans-serif', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: '14px' }}>📥</span> Export Report
              </button>
            </div>
          </header>

          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            {kpis.map((kpi, idx) => (
              <div key={idx} style={{ background: '#1a1f2e', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>{kpi.label}</p>
                <h3 style={{ color: '#f8fafc', fontSize: '24px', fontWeight: 700, marginBottom: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>{kpi.value}</h3>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: kpi.trend === 'up' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: kpi.trend === 'up' ? '#34d399' : '#f87171', padding: '4px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>
                  {kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}% vs last month
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px', marginBottom: '24px' }}>
            {['Overview', 'Channels', 'Campaigns', 'Locations', 'Devices'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? '#1e293b' : 'transparent',
                  border: 'none', padding: '8px 20px', borderRadius: '20px',
                  color: activeTab === tab ? '#f8fafc' : '#64748b',
                  fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif', transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Charts Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '400px' }}>
            
            {activeTab === 'Overview' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '60fr 40fr', gap: '24px', height: '350px' }}>
                  <PerformanceChart data={data.performance} />
                  <FunnelChart data={funnelData} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', height: '240px' }}>
                  <JobCategoryChart range={dataKey} />
                  <LocationChart range={dataKey} />
                  <DeviceChart range={dataKey} />
                </div>
              </>
            )}

            {activeTab === 'Channels' && (
              <div style={{ height: '400px' }}>
                <ChannelChart data={data.channels} />
              </div>
            )}

            {activeTab === 'Campaigns' && (
              <div style={{ maxWidth: '600px' }}>
                <TopCampaigns campaigns={data.campaigns} />
                {data.campaigns.length === 0 && (
                  <p style={{ color: '#64748b', fontSize: '13px', padding: '16px', textAlign: 'center', background: '#151822', borderRadius: '8px', marginTop: '16px' }}>
                    No campaign data available for this date range.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'Locations' && (
              <div style={{ height: '400px' }}>
                <LocationChart range={dataKey} />
              </div>
            )}

            {activeTab === 'Devices' && (
              <div style={{ height: '400px', maxWidth: '600px' }}>
                <DeviceChart range={dataKey} />
              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  )
}