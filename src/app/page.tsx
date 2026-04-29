'use client'
import TopCampaigns from '@/components/TopCampaigns'
import RecentActivity from '@/components/RecentActivity'
import { useState } from 'react'
import { useCampaigns } from '@/context/CampaignContext'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import KpiCard from '@/components/KpiCard'
import PerformanceChart from '@/components/PerformanceChart'
import ChannelChart from '@/components/ChannelChart'

import { dashboardData } from '@/data/mockData'

export default function Dashboard() {

  const [dateRange, setDateRange] = useState('30d')

  const currentData = dashboardData[dateRange]

const {
  campaigns,
  addCampaign
} = useCampaigns()

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0f1117'
      }}
    >

      <Sidebar />

      <main className="main-content">

        <Header
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        {/* KPI Cards */}
        <div className="grid-4" style={{ marginBottom: '16px' }}>
          {currentData.kpis.map(card => (
            <KpiCard
              key={card.label}
              card={card}
            />
          ))}
        </div>

 {/* Charts */}
<div className="grid-60-40" style={{ marginBottom: '16px' }}>
  <PerformanceChart data={currentData.performance} />
  <ChannelChart data={currentData.channels} />
</div>

{/* Bottom Cards */}
<div className="grid-60-40" style={{ marginBottom: '16px' }}>
  <TopCampaigns campaigns={campaigns} />
  <RecentActivity />
</div>

        {/* Campaign Table */}
        

        <div
          style={{
            marginTop: '24px',
            paddingBottom: '8px',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              color: '#1e293b',
              fontSize: '12px',
              fontFamily: 'Space Grotesk, sans-serif'
            }}
          >
            RecruitIQ · Next.js · TypeScript · Tailwind · Recharts
          </p>
        </div>

      </main>
    </div>
  )
}

