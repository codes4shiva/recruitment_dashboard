import { Campaign, KpiData, ChartPoint } from '@/types'

type DashboardRangeData = {
  kpis: KpiData[]
  campaigns: Campaign[]
  performance: ChartPoint[]
  channels: {
    channel: string
    clicks: number
    applies: number
    spend: number
  }[]
}

export const dashboardData: Record<string, DashboardRangeData> = {

  '7d': {

    kpis: [
      { label: 'Total Clicks', value: '18,420', change: 6.2, trend: 'up' },
      { label: 'Total Applies', value: '740', change: 4.1, trend: 'up' },
      { label: 'Total Spend', value: '₹92,400', change: 3.2, trend: 'up' },
      { label: 'Cost per Apply', value: '₹124', change: -2.1, trend: 'down' },
    ],

    campaigns: [
  {
    id: '1',
    title: 'Senior React Developer',
    channel: 'LinkedIn',
    status: 'active',
    budget: 80000,
    spent: 61200,
    clicks: 14200,
    applies: 530,
    cpc: 43,
    cpa: 115,
  },

  {
    id: '2',
    title: 'Data Scientist - ML',
    channel: 'Indeed',
    status: 'active',
    budget: 60000,
    spent: 44800,
    clicks: 9800,
    applies: 380,
    cpc: 46,
    cpa: 118,
  },
],

    performance: [
      { date: 'Mon', clicks: 1800, applies: 72, spend: 8400 },
      { date: 'Tue', clicks: 2200, applies: 88, spend: 10200 },
      { date: 'Wed', clicks: 2000, applies: 80, spend: 9500 },
      { date: 'Thu', clicks: 2600, applies: 104, spend: 12100 },
      { date: 'Fri', clicks: 2400, applies: 96, spend: 11300 },
      { date: 'Sat', clicks: 2800, applies: 112, spend: 13200 },
      { date: 'Sun', clicks: 2600, applies: 108, spend: 12400 },
    ],

    channels: [
      { channel: 'LinkedIn', clicks: 6200, applies: 240, spend: 31200 },
      { channel: 'Indeed', clicks: 5400, applies: 210, spend: 28400 },
      { channel: 'Google', clicks: 3900, applies: 150, spend: 18600 },
      { channel: 'ZipRecruiter', clicks: 2920, applies: 140, spend: 14200 },
    ],
  },

  '30d': {

    kpis: [
      { label: 'Total Clicks', value: '84,320', change: 12.4, trend: 'up' },
      { label: 'Total Applies', value: '3,210', change: 8.1, trend: 'up' },
      { label: 'Total Spend', value: '₹4,12,500', change: 5.3, trend: 'up' },
      { label: 'Cost per Apply', value: '₹128.5', change: -3.2, trend: 'down' },
    ],

    campaigns: [
  {
    id: '1',
    title: 'Senior React Developer',
    channel: 'LinkedIn',
    status: 'active',
    budget: 80000,
    spent: 61200,
    clicks: 14200,
    applies: 530,
    cpc: 43,
    cpa: 115,
  },

  {
    id: '2',
    title: 'Data Scientist - ML',
    channel: 'Indeed',
    status: 'active',
    budget: 60000,
    spent: 44800,
    clicks: 9800,
    applies: 380,
    cpc: 46,
    cpa: 118,
  },

  {
    id: '3',
    title: 'Product Manager',
    channel: 'Google',
    status: 'paused',
    budget: 70000,
    spent: 52300,
    clicks: 11500,
    applies: 420,
    cpc: 45,
    cpa: 124,
  },

  {
    id: '4',
    title: 'DevOps Engineer',
    channel: 'ZipRecruiter',
    status: 'active',
    budget: 55000,
    spent: 38900,
    clicks: 8600,
    applies: 290,
    cpc: 45,
    cpa: 134,
  },

  {
    id: '5',
    title: 'UX Designer',
    channel: 'LinkedIn',
    status: 'completed',
    budget: 45000,
    spent: 45000,
    clicks: 10200,
    applies: 410,
    cpc: 44,
    cpa: 110,
  },

  {
    id: '6',
    title: 'Backend Engineer - Java',
    channel: 'Indeed',
    status: 'active',
    budget: 65000,
    spent: 49100,
    clicks: 10800,
    applies: 360,
    cpc: 45,
    cpa: 136,
  },

  {
    id: '7',
    title: 'Frontend Intern',
    channel: 'Google',
    status: 'active',
    budget: 30000,
    spent: 18200,
    clicks: 6400,
    applies: 210,
    cpc: 28,
    cpa: 87,
  },

  {
    id: '8',
    title: 'HR Business Partner',
    channel: 'ZipRecruiter',
    status: 'paused',
    budget: 40000,
    spent: 29100,
    clicks: 6800,
    applies: 240,
    cpc: 43,
    cpa: 121,
  },
],

    performance: [
      { date: 'Apr 1', clicks: 2100, applies: 82, spend: 9800 },
      { date: 'Apr 5', clicks: 2200, applies: 88, spend: 10400 },
      { date: 'Apr 10', clicks: 3100, applies: 124, spend: 14500 },
      { date: 'Apr 15', clicks: 3400, applies: 136, spend: 15900 },
      { date: 'Apr 20', clicks: 3600, applies: 144, spend: 16800 },
      { date: 'Apr 25', clicks: 3500, applies: 140, spend: 16300 },
      { date: 'Apr 29', clicks: 3900, applies: 156, spend: 18200 },
    ],

    channels: [
      { channel: 'LinkedIn', clicks: 24400, applies: 940, spend: 106200 },
      { channel: 'Indeed', clicks: 20600, applies: 740, spend: 93900 },
      { channel: 'Google', clicks: 17900, applies: 630, spend: 70500 },
      { channel: 'ZipRecruiter', clicks: 15400, applies: 530, spend: 68000 },
    ],
  },

  '90d': {

    kpis: [
      { label: 'Total Clicks', value: '2,48,000', change: 18.2, trend: 'up' },
      { label: 'Total Applies', value: '9,420', change: 12.3, trend: 'up' },
      { label: 'Total Spend', value: '₹11,82,000', change: 9.4, trend: 'up' },
      { label: 'Cost per Apply', value: '₹125.4', change: -4.8, trend: 'down' },
    ],

    campaigns: [],

    performance: [
  { date: 'Week 1', clicks: 12000, applies: 420, spend: 58000 },
  { date: 'Week 2', clicks: 14800, applies: 560, spend: 71000 },
  { date: 'Week 3', clicks: 17200, applies: 640, spend: 84000 },
  { date: 'Week 4', clicks: 19400, applies: 720, spend: 96000 },
  { date: 'Week 5', clicks: 22100, applies: 810, spend: 108000 },
  { date: 'Week 6', clicks: 24800, applies: 930, spend: 121000 },
],

channels: [
  { channel: 'LinkedIn', clicks: 72000, applies: 2800, spend: 312000 },
  { channel: 'Indeed', clicks: 64000, applies: 2400, spend: 284000 },
  { channel: 'Google', clicks: 58000, applies: 2100, spend: 246000 },
  { channel: 'ZipRecruiter', clicks: 54000, applies: 1900, spend: 218000 },
],
  },

  'year': {

    kpis: [
      { label: 'Total Clicks', value: '9,84,000', change: 28.2, trend: 'up' },
      { label: 'Total Applies', value: '38,240', change: 19.1, trend: 'up' },
      { label: 'Total Spend', value: '₹48,40,000', change: 14.8, trend: 'up' },
      { label: 'Cost per Apply', value: '₹121', change: -8.2, trend: 'down' },
    ],

    campaigns: [],

    performance: [
  { date: 'Jan', clicks: 62000, applies: 2400, spend: 282000 },
  { date: 'Mar', clicks: 71000, applies: 2800, spend: 341000 },
  { date: 'May', clicks: 82000, applies: 3200, spend: 402000 },
  { date: 'Jul', clicks: 91000, applies: 3600, spend: 458000 },
  { date: 'Sep', clicks: 104000, applies: 4100, spend: 520000 },
  { date: 'Dec', clicks: 118000, applies: 4800, spend: 610000 },
],

channels: [
  { channel: 'LinkedIn', clicks: 284000, applies: 11200, spend: 1240000 },
  { channel: 'Indeed', clicks: 241000, applies: 9300, spend: 1080000 },
  { channel: 'Google', clicks: 212000, applies: 8400, spend: 920000 },
  { channel: 'ZipRecruiter', clicks: 186000, applies: 7100, spend: 810000 },
],
  },
}