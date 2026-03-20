'use client'

const activities = [
  {
    title: 'New campaign created',
    time: '2 min ago',
    color: '#10b981'
  },

  {
    title: 'Google campaign paused',
    time: '12 min ago',
    color: '#f59e0b'
  },

  {
    title: '12 new applies received',
    time: '28 min ago',
    color: '#6366f1'
  },

  {
    title: 'Budget increased',
    time: '1 hour ago',
    color: '#ec4899'
  }
]

export default function RecentActivity() {

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
        Recent Activity
      </h2>

      <p
        style={{
          color: '#475569',
          fontSize: '13px',
          marginBottom: '24px'
        }}
      >
        Live recruitment updates
      </p>


      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >

        {activities.map((item, i) => (

          <div
            key={i}
            style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start'
            }}
          >

            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: item.color,
                marginTop: '6px',
                flexShrink: 0
              }}
            />

            <div>

              <p
                style={{
                  color: '#e2e8f0',
                  fontSize: '14px',
                  marginBottom: '4px'
                }}
              >
                {item.title}
              </p>

              <span
                style={{
                  color: '#64748b',
                  fontSize: '12px'
                }}
              >
                {item.time}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}