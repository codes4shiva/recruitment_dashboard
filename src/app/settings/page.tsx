'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { useToast } from '@/context/ToastContext'
import { useUser } from '@/context/UserContext'

type Tab = 'Profile' | 'Preferences' | 'Integrations' | 'Billing'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Profile')
  const { addToast } = useToast()
  const { name: globalName, email: globalEmail, avatar: globalAvatar, setName: setGlobalName, setEmail: setGlobalEmail, setAvatar: setGlobalAvatar } = useUser()

  // Profile State
  const [name, setName] = useState(globalName)
  const [email, setEmail] = useState(globalEmail)
  const [title, setTitle] = useState('Head of Talent Acquisition')
  const [avatarPreview, setAvatarPreview] = useState(globalAvatar)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    setName(globalName)
    setEmail(globalEmail)
    setAvatarPreview(globalAvatar)
  }, [globalName, globalEmail, globalAvatar])

  useEffect(() => {
    if (name !== globalName || email !== globalEmail || avatarPreview !== globalAvatar) {
      setIsSaved(false)
    }
  }, [name, email, avatarPreview, globalName, globalEmail, globalAvatar])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setAvatarPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    setGlobalName(name)
    setGlobalEmail(email)
    setGlobalAvatar(avatarPreview)
    setIsSaved(true)
    addToast('Profile saved successfully', 'success')
  }

  // Preferences State
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(false)
  const [weeklyReports, setWeeklyReports] = useState(true)

  // Integrations State
  const [integrations, setIntegrations] = useState({
    linkedin: true,
    indeed: true,
    greenhouse: false,
    slack: true
  })

  const handleSave = () => {
    addToast('Settings saved successfully', 'success')
  }

  const toggleIntegration = (platform: keyof typeof integrations) => {
    const newState = !integrations[platform]
    setIntegrations(prev => ({ ...prev, [platform]: newState }))
    addToast(`${platform} integration ${newState ? 'connected' : 'disconnected'}`, newState ? 'success' : 'info')
  }

  const fieldStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    background: '#0f1117', border: '1px solid rgba(255,255,255,0.08)',
    color: '#f8fafc', fontSize: '14px', fontFamily: 'DM Sans, sans-serif', outline: 'none',
    transition: 'border 0.2s'
  }
  
  const labelStyle = {
    color: '#94a3b8', fontSize: '12px', fontWeight: 500,
    fontFamily: 'Space Grotesk, sans-serif', display: 'block', marginBottom: '8px',
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1117' }}>
      <Sidebar />
      
      <main className="main-content" style={{ maxWidth: '1200px' }}>
        
        {/* Top Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#c4b5fd', fontSize: '20px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
            6. Settings
          </h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px', fontFamily: 'DM Sans, sans-serif' }}>
            Manage your account, preferences, and platform integrations
          </p>
        </div>

        <div className="flex-responsive">
          
          {/* Settings Sidebar (Tabs) */}
          <div className="settings-sidebar" style={{ 
            width: '240px', background: '#151822', borderRadius: '16px', 
            padding: '16px', border: '1px solid rgba(255,255,255,0.03)',
            flexShrink: 0
          }}>
            {(['Profile', 'Preferences', 'Integrations', 'Billing'] as Tab[]).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  width: '100%', padding: '12px 16px', textAlign: 'left', borderRadius: '10px',
                  background: activeTab === tab ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: activeTab === tab ? '#818cf8' : '#94a3b8',
                  border: 'none', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif', transition: 'all 0.2s',
                  marginBottom: '4px'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div style={{ flex: 1, background: '#151822', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.03)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            
            {/* PROFILE TAB */}
            {activeTab === 'Profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
                <h2 style={{ color: '#f8fafc', fontSize: '20px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>Personal Profile</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '8px' }}>
                  <img src={avatarPreview} alt="Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(99,102,241,0.5)', objectFit: 'cover' }} />
                  <div>
                    <label style={{ background: '#1e293b', border: 'none', color: '#f8fafc', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '8px', display: 'inline-block' }}>
                      Change Avatar
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                    </label>
                    <p style={{ color: '#64748b', fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}>JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} style={fieldStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} style={fieldStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Job Title</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} style={fieldStyle} />
                </div>

                <div style={{ marginTop: '16px' }}>
                  <button onClick={handleSaveProfile} style={{
                    padding: '12px 24px', borderRadius: '10px', border: 'none',
                    background: isSaved ? '#10b981' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'Space Grotesk, sans-serif', transition: 'all 0.2s',
                  }}>
                    {isSaved ? '✓ Saved!' : 'Save Profile'}
                  </button>
                </div>
              </div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === 'Preferences' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '600px' }}>
                <h2 style={{ color: '#f8fafc', fontSize: '20px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>System Preferences</h2>
                
                <div>
                  <h3 style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>Notifications</h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#0f1117', borderRadius: '12px', marginBottom: '12px' }}>
                    <div>
                      <p style={{ color: '#f8fafc', fontSize: '14px', fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>Email Notifications</p>
                      <p style={{ color: '#64748b', fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}>Receive updates about candidate activity</p>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <div style={{ position: 'relative' }}>
                        <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} style={{ opacity: 0, width: 0, height: 0 }} />
                        <div style={{ width: '44px', height: '24px', background: emailNotifs ? '#10b981' : '#334155', borderRadius: '12px', transition: '0.3s' }}>
                          <div style={{ position: 'absolute', top: '2px', left: emailNotifs ? '22px' : '2px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: '0.3s' }} />
                        </div>
                      </div>
                    </label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#0f1117', borderRadius: '12px', marginBottom: '12px' }}>
                    <div>
                      <p style={{ color: '#f8fafc', fontSize: '14px', fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>Push Notifications</p>
                      <p style={{ color: '#64748b', fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}>Get alerts in your browser</p>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <div style={{ position: 'relative' }}>
                        <input type="checkbox" checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} style={{ opacity: 0, width: 0, height: 0 }} />
                        <div style={{ width: '44px', height: '24px', background: pushNotifs ? '#10b981' : '#334155', borderRadius: '12px', transition: '0.3s' }}>
                          <div style={{ position: 'absolute', top: '2px', left: pushNotifs ? '22px' : '2px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: '0.3s' }} />
                        </div>
                      </div>
                    </label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#0f1117', borderRadius: '12px' }}>
                    <div>
                      <p style={{ color: '#f8fafc', fontSize: '14px', fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>Weekly Analytics Report</p>
                      <p style={{ color: '#64748b', fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}>Receive a summary of campaign performance</p>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <div style={{ position: 'relative' }}>
                        <input type="checkbox" checked={weeklyReports} onChange={() => setWeeklyReports(!weeklyReports)} style={{ opacity: 0, width: 0, height: 0 }} />
                        <div style={{ width: '44px', height: '24px', background: weeklyReports ? '#10b981' : '#334155', borderRadius: '12px', transition: '0.3s' }}>
                          <div style={{ position: 'absolute', top: '2px', left: weeklyReports ? '22px' : '2px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: '0.3s' }} />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <button onClick={handleSave} style={{
                    padding: '12px 24px', borderRadius: '10px', border: 'none',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'Space Grotesk, sans-serif', transition: 'all 0.2s',
                  }}>
                    Save Preferences
                  </button>
                </div>

              </div>
            )}

            {/* INTEGRATIONS TAB */}
            {activeTab === 'Integrations' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ color: '#f8fafc', fontSize: '20px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>Connected Platforms</h2>
                <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'DM Sans, sans-serif', marginTop: '-8px' }}>Link your recruitment platforms to sync campaigns and candidates automatically.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '8px' }}>
                  
                  {/* LinkedIn */}
                  <div style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ width: '48px', height: '48px', background: '#0077b5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '20px' }}>in</div>
                      <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '20px', background: integrations.linkedin ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', color: integrations.linkedin ? '#34d399' : '#94a3b8', fontWeight: 600 }}>{integrations.linkedin ? 'Connected' : 'Disconnected'}</span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '4px' }}>LinkedIn Recruiter</h3>
                    <p style={{ color: '#64748b', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', marginBottom: '20px' }}>Sync candidates and job postings directly.</p>
                    <button onClick={() => toggleIntegration('linkedin')} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: integrations.linkedin ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(99,102,241,0.5)', background: integrations.linkedin ? 'transparent' : 'rgba(99,102,241,0.1)', color: integrations.linkedin ? '#ef4444' : '#818cf8', cursor: 'pointer', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
                      {integrations.linkedin ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>

                  {/* Indeed */}
                  <div style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ width: '48px', height: '48px', background: '#003A9B', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px', fontFamily: 'Arial' }}>Indeed</div>
                      <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '20px', background: integrations.indeed ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', color: integrations.indeed ? '#34d399' : '#94a3b8', fontWeight: 600 }}>{integrations.indeed ? 'Connected' : 'Disconnected'}</span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '4px' }}>Indeed Employer</h3>
                    <p style={{ color: '#64748b', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', marginBottom: '20px' }}>Track sponsored campaign performance.</p>
                    <button onClick={() => toggleIntegration('indeed')} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: integrations.indeed ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(99,102,241,0.5)', background: integrations.indeed ? 'transparent' : 'rgba(99,102,241,0.1)', color: integrations.indeed ? '#ef4444' : '#818cf8', cursor: 'pointer', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
                      {integrations.indeed ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>

                  {/* Greenhouse */}
                  <div style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ width: '48px', height: '48px', background: '#097a5b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '18px' }}>G</div>
                      <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '20px', background: integrations.greenhouse ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', color: integrations.greenhouse ? '#34d399' : '#94a3b8', fontWeight: 600 }}>{integrations.greenhouse ? 'Connected' : 'Disconnected'}</span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '4px' }}>Greenhouse ATS</h3>
                    <p style={{ color: '#64748b', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', marginBottom: '20px' }}>Export hired candidates directly to ATS.</p>
                    <button onClick={() => toggleIntegration('greenhouse')} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: integrations.greenhouse ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(99,102,241,0.5)', background: integrations.greenhouse ? 'transparent' : 'rgba(99,102,241,0.1)', color: integrations.greenhouse ? '#ef4444' : '#818cf8', cursor: 'pointer', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
                      {integrations.greenhouse ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>

                  {/* Slack */}
                  <div style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ width: '48px', height: '48px', background: '#4A154B', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '18px' }}>#</div>
                      <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '20px', background: integrations.slack ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', color: integrations.slack ? '#34d399' : '#94a3b8', fontWeight: 600 }}>{integrations.slack ? 'Connected' : 'Disconnected'}</span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '4px' }}>Slack Alerts</h3>
                    <p style={{ color: '#64748b', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', marginBottom: '20px' }}>Receive notifications in designated channels.</p>
                    <button onClick={() => toggleIntegration('slack')} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: integrations.slack ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(99,102,241,0.5)', background: integrations.slack ? 'transparent' : 'rgba(99,102,241,0.1)', color: integrations.slack ? '#ef4444' : '#818cf8', cursor: 'pointer', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
                      {integrations.slack ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* BILLING TAB */}
            {activeTab === 'Billing' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
                <h2 style={{ color: '#f8fafc', fontSize: '20px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>Billing & Plan</h2>
                
                <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ background: '#6366f1', color: 'white', fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Current Plan</span>
                    <h3 style={{ color: '#f8fafc', fontSize: '24px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', marginTop: '8px', marginBottom: '4px' }}>RecruitIQ Enterprise</h3>
                    <p style={{ color: '#818cf8', fontSize: '14px', fontFamily: 'DM Sans, sans-serif' }}>Billed $499/month. Next cycle: May 15, 2026</p>
                  </div>
                  <button style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif' }}>Upgrade Plan</button>
                </div>

                <div>
                  <h3 style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>Usage Limits</h3>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#94a3b8', fontSize: '13px', fontFamily: 'DM Sans, sans-serif' }}>Active Campaigns</span>
                      <span style={{ color: '#f8fafc', fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>8 / 20</span>
                    </div>
                    <div style={{ width: '100%', background: '#0f1117', height: '6px', borderRadius: '3px' }}>
                      <div style={{ width: '40%', height: '100%', background: '#10b981', borderRadius: '3px' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#94a3b8', fontSize: '13px', fontFamily: 'DM Sans, sans-serif' }}>Team Members</span>
                      <span style={{ color: '#f8fafc', fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>4 / 10</span>
                    </div>
                    <div style={{ width: '100%', background: '#0f1117', height: '6px', borderRadius: '3px' }}>
                      <div style={{ width: '40%', height: '100%', background: '#3b82f6', borderRadius: '3px' }} />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                  <button onClick={() => addToast('Downloading invoice...', 'info')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif' }}>Download Invoices</button>
                  <button onClick={() => addToast('Redirecting to payment portal...', 'loading')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif' }}>Manage Payment Method</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}