'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ReportType = 'PDF' | 'Excel' | 'CSV'

export type Report = {
  id: string
  name: string
  type: ReportType
  dateGenerated: string
  period: string
  size: string
  status: 'Ready' | 'Generating' | 'Failed'
  metrics?: string[]
  channels?: string[]
}

type ReportContextType = {
  reports: Report[]
  customReports: Report[]
  addReport: (r: Omit<Report, 'id' | 'dateGenerated' | 'status'>) => Promise<string>
  deleteReport: (id: string) => void
}

const ReportContext = createContext<ReportContextType | null>(null)

const SEED_REPORTS: Report[] = [
  { id: '1', name: 'Performance Summary', type: 'PDF', dateGenerated: 'Apr 29, 2026 10:30 AM', period: 'Last 30 days', size: '2.4 MB', status: 'Ready' },
  { id: '2', name: 'Campaign Performance', type: 'PDF', dateGenerated: 'Apr 28, 2026 09:15 AM', period: 'Last 30 days', size: '1.8 MB', status: 'Ready' },
  { id: '3', name: 'Channel Analysis', type: 'Excel', dateGenerated: 'Apr 27, 2026 04:20 PM', period: 'Last 30 days', size: '3.2 MB', status: 'Ready' },
]

export function ReportProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>(SEED_REPORTS)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('recruitiq_reports')
    if (saved) {
      setReports(JSON.parse(saved))
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      sessionStorage.setItem('recruitiq_reports', JSON.stringify(reports))
    }
  }, [reports, hydrated])

  const addReport = async (r: Omit<Report, 'id' | 'dateGenerated' | 'status'>) => {
    const tempId = Date.now().toString()
    
    const newReport: Report = {
      ...r,
      id: tempId,
      dateGenerated: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Generating'
    }
    
    setReports(prev => [newReport, ...prev])
    
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        setReports(prev => prev.map(report => 
          report.id === tempId ? { ...report, status: 'Ready' } : report
        ))
        resolve(tempId)
      }, 2500)
    })
  }

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id))
  }

  const customReports = reports.filter(r => r.metrics && r.metrics.length > 0)

  return (
    <ReportContext.Provider value={{ reports, customReports, addReport, deleteReport }}>
      {children}
    </ReportContext.Provider>
  )
}

export const useReports = () => {
  const ctx = useContext(ReportContext)
  if (!ctx) throw new Error('useReports must be used inside ReportProvider')
  return ctx
}
