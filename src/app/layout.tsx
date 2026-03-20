import type { Metadata } from 'next'

import './globals.css'

import { CampaignProvider } from '@/context/CampaignContext'
import { ReportProvider } from '@/context/ReportContext'
import { ToastProvider } from '@/context/ToastContext'
import { UserProvider } from '@/context/UserContext'

export const metadata: Metadata = {
  title: 'RecruitIQ — Campaign Dashboard',
  description: 'AI-powered recruitment marketing analytics',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="en">

      <body
        style={{
          background: '#0f1117',
          minHeight: '100vh'
        }}
      >

        <UserProvider>
          <ToastProvider>
            <ReportProvider>
              <CampaignProvider>

                {children}

              </CampaignProvider>
            </ReportProvider>
          </ToastProvider>
        </UserProvider>

      </body>

    </html>
  )
}