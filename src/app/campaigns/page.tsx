'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useCampaigns, Campaign, CampaignStatus } from '@/context/CampaignContext'

const CHANNELS = ['LinkedIn', 'Indeed', 'Google', 'ZipRecruiter'] as const
const STATUSES: CampaignStatus[] = ['Active', 'Paused', 'Completed', 'Draft']

const statusColors: Record<CampaignStatus, { bg: string; color: string; dot: string }> = {
  Active:    { bg: 'rgba(16,185,129,0.12)', color: '#10b981', dot: '#10b981' },
  Paused:    { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', dot: '#f59e0b' },
  Completed: { bg: 'rgba(100,116,139,0.12)', color: '#64748b', dot: '#64748b' },
  Draft:     { bg: 'rgba(99,102,241,0.12)',  color: '#6366f1', dot: '#6366f1' },
}

const channelColors: Record<string, string> = {
  LinkedIn: '#6366f1', Indeed: '#10b981', Google: '#f59e0b', ZipRecruiter: '#ec4899'
}

function StatusBadge({ status }: { status: CampaignStatus }) {
  const s = statusColors[status] ?? statusColors['Draft']
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:'5px', background: s.bg, color: s.color, padding:'3px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:500, fontFamily:'Space Grotesk,sans-serif' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background: s.dot, display:'inline-block' }} />
      {status}
    </span>
  )
}

export default function CampaignsPage() {
  const { campaigns, addCampaign, updateCampaign, deleteCampaign } = useCampaigns()
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All Status')
  const [filterChannel, setFilterChannel] = useState('All Channels')
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  // New campaign form state
  const [form, setForm] = useState({ title: '', channel: 'LinkedIn' as typeof CHANNELS[number], budget: '', status: 'Active' as CampaignStatus })

  const filtered = campaigns.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'All Status' || c.status === filterStatus
    const matchChannel = filterChannel === 'All Channels' || c.channel === filterChannel
    return matchSearch && matchStatus && matchChannel
  })

  const handleAdd = () => {
    if (!form.title || !form.budget) return
    addCampaign({ title: form.title, channel: form.channel, budget: Number(form.budget), status: form.status })
    setForm({ title: '', channel: 'LinkedIn', budget: '', status: 'Active' })
    setShowModal(false)
  }

  const inp = { background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '9px 12px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'Space Grotesk,sans-serif', width: '100%', outline: 'none' }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0f1117' }}>
      <Sidebar />
      <main style={{ marginLeft:'200px', flex:1, padding:'24px', background:'#0f1117' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px' }}>
          <div>
            <h1 style={{ color:'#f1f5f9', fontSize:'22px', fontWeight:600, fontFamily:'Space Grotesk,sans-serif' }}>Your Campaigns</h1>
            <p style={{ color:'#475569', fontSize:'13px', fontFamily:'DM Sans,sans-serif', marginTop:'2px' }}>{campaigns.length} of {campaigns.length} campaigns</p>
          </div>
          <button onClick={() => setShowModal(true)} style={{ background:'#6366f1', color:'white', border:'none', borderRadius:'10px', padding:'10px 18px', fontSize:'13px', fontWeight:600, fontFamily:'Space Grotesk,sans-serif', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}>
            + New Campaign
          </button>
        </div>

        {/* Filters */}
        <div style={{ display:'flex', gap:'12px', marginBottom:'16px' }}>
          <input placeholder="Search campaigns..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ ...inp, flex:1, maxWidth:'280px' }} />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ ...inp, width:'auto', cursor:'pointer' }}>
            <option>All Status</option>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filterChannel} onChange={e => setFilterChannel(e.target.value)} style={{ ...inp, width:'auto', cursor:'pointer' }}>
            <option>All Channels</option>
            {CHANNELS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background:'#151822', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                {['Campaign','Channel','Status','Budget','Spent','Clicks','Applies','CPA','Actions'].map(h => (
                  <th key={h} style={{ padding:'12px 16px', textAlign:'left', color:'#475569', fontSize:'11px', fontWeight:500, fontFamily:'Space Grotesk,sans-serif', textTransform:'uppercase', letterSpacing:'0.05em', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: i < filtered.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <td style={{ padding:'14px 16px', color:'#f1f5f9', fontSize:'13px', fontFamily:'Space Grotesk,sans-serif', fontWeight:500 }}>{c.title}</td>
                  <td style={{ padding:'14px 16px' }}>
                    <span style={{ color: channelColors[c.channel], fontSize:'13px', fontFamily:'Space Grotesk,sans-serif', fontWeight:500 }}>{c.channel}</span>
                  </td>
                  <td style={{ padding:'14px 16px' }}><StatusBadge status={c.status} /></td>
                  <td style={{ padding:'14px 16px', color:'#94a3b8', fontSize:'13px', fontFamily:'Space Grotesk,sans-serif' }}>₹{(c.budget/1000).toFixed(0)}k</td>
                  <td style={{ padding:'14px 16px', fontSize:'13px', fontFamily:'Space Grotesk,sans-serif', color: c.spent >= c.budget ? '#ef4444' : '#10b981', fontWeight:600 }}>₹{(c.spent/1000).toFixed(1)}k</td>
                  <td style={{ padding:'14px 16px', color:'#94a3b8', fontSize:'13px', fontFamily:'Space Grotesk,sans-serif' }}>{c.clicks.toLocaleString()}</td>
                  <td style={{ padding:'14px 16px', color:'#94a3b8', fontSize:'13px', fontFamily:'Space Grotesk,sans-serif' }}>{c.applies}</td>
                  <td style={{ padding:'14px 16px', color:'#94a3b8', fontSize:'13px', fontFamily:'Space Grotesk,sans-serif' }}>₹{c.cpa}</td>
                  <td style={{ padding:'14px 16px', position:'relative' }}>
                    <button onClick={() => setMenuOpen(menuOpen === c.id ? null : c.id)}
                      style={{ background:'none', border:'none', color:'#64748b', cursor:'pointer', fontSize:'18px', padding:'0 6px' }}>···</button>
                    {menuOpen === c.id && (
                      <div style={{ position:'absolute', right:16, top:40, background:'#1a1f2e', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', zIndex:10, minWidth:'140px', overflow:'hidden' }}>
                        {c.status !== 'Active' && <div onClick={() => { updateCampaign(c.id, { status:'Active' }); setMenuOpen(null) }} style={{ padding:'10px 14px', color:'#10b981', fontSize:'13px', cursor:'pointer', fontFamily:'Space Grotesk,sans-serif' }}>Resume</div>}
                        {c.status === 'Active' && <div onClick={() => { updateCampaign(c.id, { status:'Paused' }); setMenuOpen(null) }} style={{ padding:'10px 14px', color:'#f59e0b', fontSize:'13px', cursor:'pointer', fontFamily:'Space Grotesk,sans-serif' }}>Pause</div>}
                        <div onClick={() => { deleteCampaign(c.id); setMenuOpen(null) }} style={{ padding:'10px 14px', color:'#ef4444', fontSize:'13px', cursor:'pointer', fontFamily:'Space Grotesk,sans-serif', borderTop:'1px solid rgba(255,255,255,0.06)' }}>Delete</div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(255,255,255,0.06)', color:'#475569', fontSize:'12px', fontFamily:'Space Grotesk,sans-serif' }}>
            Showing 1 to {filtered.length} of {filtered.length} campaigns
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div onClick={() => setShowModal(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100 }}>
            <div onClick={e => e.stopPropagation()} style={{ background:'#151822', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'20px', padding:'28px', width:'440px' }}>
              <h2 style={{ color:'#f1f5f9', fontSize:'18px', fontWeight:600, fontFamily:'Space Grotesk,sans-serif', marginBottom:'20px' }}>New Campaign</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                <div>
                  <label style={{ color:'#64748b', fontSize:'12px', fontFamily:'Space Grotesk,sans-serif', display:'block', marginBottom:'6px' }}>Campaign Title</label>
                  <input style={inp} placeholder="e.g. Senior React Developer" value={form.title} onChange={e => setForm({...form, title:e.target.value})} />
                </div>
                <div>
                  <label style={{ color:'#64748b', fontSize:'12px', fontFamily:'Space Grotesk,sans-serif', display:'block', marginBottom:'6px' }}>Channel</label>
                  <select style={inp} value={form.channel} onChange={e => setForm({...form, channel: e.target.value as typeof CHANNELS[number]})}>
                    {CHANNELS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color:'#64748b', fontSize:'12px', fontFamily:'Space Grotesk,sans-serif', display:'block', marginBottom:'6px' }}>Budget (₹)</label>
                  <input style={inp} placeholder="e.g. 50000" type="number" value={form.budget} onChange={e => setForm({...form, budget:e.target.value})} />
                </div>
                <div>
                  <label style={{ color:'#64748b', fontSize:'12px', fontFamily:'Space Grotesk,sans-serif', display:'block', marginBottom:'6px' }}>Status</label>
                  <select style={inp} value={form.status} onChange={e => setForm({...form, status:e.target.value as CampaignStatus})}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display:'flex', gap:'10px', marginTop:'24px' }}>
                <button onClick={() => setShowModal(false)} style={{ flex:1, padding:'11px', background:'transparent', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', color:'#64748b', fontSize:'13px', fontFamily:'Space Grotesk,sans-serif', cursor:'pointer' }}>Cancel</button>
                <button onClick={handleAdd} style={{ flex:1, padding:'11px', background:'#6366f1', border:'none', borderRadius:'10px', color:'white', fontSize:'13px', fontWeight:600, fontFamily:'Space Grotesk,sans-serif', cursor:'pointer' }}>Create Campaign</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}