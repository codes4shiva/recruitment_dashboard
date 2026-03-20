export interface Campaign {
  id: string
  title: string
  channel: 'LinkedIn' | 'Indeed' | 'Google' | 'ZipRecruiter'
  status: 'active' | 'paused' | 'completed'
  budget: number
  spent: number
  clicks: number
  applies: number
  cpc: number
  cpa: number
}

export interface KpiData {
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
}

export interface ChartPoint {
  date: string
  clicks: number
  applies: number
  spend: number
}