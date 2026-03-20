'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type UserContextType = {
  name: string
  setName: (name: string) => void
  email: string
  setEmail: (email: string) => void
  avatar: string
  setAvatar: (avatar: string) => void
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('Admin User')
  const [email, setEmail] = useState('admin@recruitiq.com')
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/150?img=11')

  // Load from session storage if exists so it persists on refresh
  useEffect(() => {
    const saved = sessionStorage.getItem('recruitiq_user')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.name) setName(parsed.name)
      if (parsed.email) setEmail(parsed.email)
      if (parsed.avatar) setAvatar(parsed.avatar)
    }
  }, [])

  // Save to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('recruitiq_user', JSON.stringify({ name, email, avatar }))
  }, [name, email, avatar])

  return (
    <UserContext.Provider value={{ name, setName, email, setEmail, avatar, setAvatar }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside UserProvider')
  return ctx
}
