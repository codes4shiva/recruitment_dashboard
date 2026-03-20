'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'loading'

export type Toast = {
  id: string
  message: string
  type: ToastType
}

type ToastContextType = {
  toasts: Toast[]
  addToast: (message: string, type: ToastType) => string
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: ToastType) => {
    const id = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, message, type }])
    
    if (type !== 'loading') {
      setTimeout(() => {
        removeToast(id)
      }, 3000)
    }
    return id
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 9999 }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{
            background: toast.type === 'error' ? '#ef4444' : toast.type === 'success' ? '#10b981' : toast.type === 'loading' ? '#3b82f6' : '#1e293b',
            color: 'white', padding: '12px 20px', borderRadius: '8px',
            fontSize: '14px', fontFamily: 'Space Grotesk, sans-serif',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.3s ease-in-out'
          }}>
            {toast.type === 'loading' ? '⏳' : toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
