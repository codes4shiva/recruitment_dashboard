'use client'

type Props = {
  campaigns: any[]
}

export default function TopCampaigns({
  campaigns
}: Props) {

  const topCampaigns = [...campaigns]
    .sort((a, b) => b.applies - a.applies)
    .slice(0, 3)

  return (

    <div
      style={{
        background: '#151822',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '24px'
      }}
    >

      <h2
        style={{
          color: '#fff',
          fontSize: '18px',
          fontWeight: 700,
          marginBottom: '4px',
          fontFamily: 'Space Grotesk, sans-serif'
        }}
      >
        Top Campaigns
      </h2>

      <p
        style={{
          color: '#475569',
          fontSize: '13px',
          marginBottom: '24px'
        }}
      >
        Highest performing campaigns
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >

        {topCampaigns.map((campaign) => (

          <div
            key={campaign.id}
            style={{
              background: '#0f1320',
              borderRadius: '14px',
              padding: '18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >

            <div>

              <h3
                style={{
                  color: '#f8fafc',
                  fontSize: '16px',
                  marginBottom: '6px'
                }}
              >
                {campaign.title}
              </h3>

              <p
                style={{
                  color: '#64748b',
                  fontSize: '13px'
                }}
              >
                {campaign.channel}
              </p>

            </div>

            <div
              style={{
                textAlign: 'right'
              }}
            >

              <h3
                style={{
                  color: '#10b981',
                  fontSize: '16px',
                  fontWeight: 700
                }}
              >
                {campaign.applies}
              </h3>

              <p
                style={{
                  color: '#64748b',
                  fontSize: '12px'
                }}
              >
                applies
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}