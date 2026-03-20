// context/CampaignContext.tsx
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type CampaignStatus = 'Active' | 'Paused' | 'Completed' | 'Draft'

export type Campaign = {
  id: string
  title: string
  channel: 'LinkedIn' | 'Indeed' | 'Google' | 'ZipRecruiter'
  status: CampaignStatus
  budget: number
  spent: number
  clicks: number
  applies: number
  cpa: number
  createdAt: string
}

type CampaignContextType = {
  campaigns: Campaign[]
  addCampaign: (c: Omit<Campaign, 'id' | 'createdAt' | 'spent' | 'clicks' | 'applies' | 'cpa'>) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
}

const CampaignContext = createContext<CampaignContextType | null>(null)

const SEED: Campaign[] = [
  { id:'1', title:'Senior React Developer', channel:'LinkedIn', status:'Active', budget:80000, spent:61200, clicks:14200, applies:530, cpa:115, createdAt:'2026-04-01' },
  { id:'2', title:'Data Scientist - ML', channel:'Indeed', status:'Active', budget:60000, spent:44800, clicks:9800, applies:380, cpa:118, createdAt:'2026-04-02' },
  { id:'3', title:'Product Manager', channel:'Google', status:'Paused', budget:70000, spent:52300, clicks:11500, applies:420, cpa:124, createdAt:'2026-04-03' },
  { id:'4', title:'DevOps Engineer', channel:'ZipRecruiter', status:'Active', budget:55000, spent:38900, clicks:8600, applies:290, cpa:134, createdAt:'2026-04-04' },
  { id:'5', title:'UX Designer', channel:'LinkedIn', status:'Completed', budget:45000, spent:45000, clicks:10200, applies:410, cpa:110, createdAt:'2026-04-05' },
  { id:'6', title:'Backend Engineer - Java', channel:'Indeed', status:'Active', budget:65000, spent:49100, clicks:10800, applies:360, cpa:136, createdAt:'2026-04-06' },
  { id:'7', title:'Frontend Intern', channel:'Google', status:'Active', budget:30000, spent:18200, clicks:6400, applies:210, cpa:87, createdAt:'2026-04-07' },
  { id:'8', title:'Marketing Specialist', channel:'LinkedIn', status:'Active', budget:40000, spent:28400, clicks:5900, applies:180, cpa:158, createdAt:'2026-04-08' },
  { id:'9', title:'Sales Executive', channel:'Indeed', status:'Draft', budget:25000, spent:0, clicks:0, applies:0, cpa:0, createdAt:'2026-04-09' },
]

export function CampaignProvider({ children }: { children: ReactNode }) {
  // AFTER - server and client both start with SEED, then client syncs
const [campaigns, setCampaigns] = useState<Campaign[]>(SEED)
const [hydrated, setHydrated] = useState(false)

useEffect(() => {
  const saved = sessionStorage.getItem('recruitiq_campaigns')
  if (saved) {
    setCampaigns(JSON.parse(saved))
  }
  setHydrated(true)
}, [])

  useEffect(() => {
    sessionStorage.setItem('recruitiq_campaigns', JSON.stringify(campaigns))
  }, [campaigns])

  const addCampaign = (c: Omit<Campaign, 'id' | 'createdAt' | 'spent' | 'clicks' | 'applies' | 'cpa'>) => {
    const newC: Campaign = {
      ...c,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      spent: 0, clicks: 0, applies: 0, cpa: 0,
    }
    setCampaigns(prev => [newC, ...prev])
  }

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id))
  }

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, updateCampaign, deleteCampaign }}>
      {children}
    </CampaignContext.Provider>
  )
}

export const useCampaigns = () => {
  const ctx = useContext(CampaignContext)
  if (!ctx) throw new Error('useCampaigns must be used inside CampaignProvider')
  return ctx
}