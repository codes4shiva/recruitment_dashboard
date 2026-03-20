'use client'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'

type Props = {
  data: {
    channel: string
    spend: number
  }[]
}

const COLORS = [
  '#6366f1',
  '#10b981',
  '#f59e0b',
  '#ec4899'
]

export default function ChannelChart({
  data
}: Props) {

  const total = data.reduce(
    (sum, item) => sum + item.spend,
    0
  )

  return (

    <div
      style={{
        background: '#151822',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '24px',
        width: '100%',
        overflow: 'hidden'
      }}
    >

      <h2
        style={{
          color: '#fff',
          fontSize: 'clamp(18px, 2vw, 24px)',
          fontWeight: 700,
          marginBottom: '8px',
          fontFamily: 'Space Grotesk, sans-serif'
        }}
      >
        Spend by Channel
      </h2>

      <p
        style={{
          color: '#475569',
          fontSize: 'clamp(12px, 1vw, 14px)',
          marginBottom: '28px'
        }}
      >
        Budget distribution
      </p>


      {/* MAIN FLEX */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >

        {/* DONUT */}

        <div
          style={{
            width: '180px',
            height: '180px',
            position: 'relative',
            flexShrink: 0,
            margin: '0 auto'
          }}
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="spend"
                innerRadius={55}
                outerRadius={78}
                paddingAngle={3}
                stroke="none"
              >

                {data.map((_, i) => (

                  <Cell
                    key={i}
                    fill={COLORS[i]}
                  />

                ))}

              </Pie>

            </PieChart>

          </ResponsiveContainer>


          {/* CENTER */}

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >

            <span
              style={{
                color: '#64748b',
                fontSize: '14px'
              }}
            >
              Total
            </span>

            <h3
              style={{
                color: '#fff',
                fontSize: 'clamp(22px, 2vw, 10px)',
                fontWeight: 700
              }}
            >
              ₹{Math.round(total / 1000)}k
            </h3>

          </div>

        </div>


        {/* LEGEND */}

        <div
          style={{
            flex: 1,
            minWidth: '220px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >

          {data.map((item, i) => {

            const pct = Math.round(
              (item.spend / total) * 100
            )

            return (

              <div
                key={item.channel}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >

                {/* LEFT */}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    minWidth: 0
                  }}
                >

                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: COLORS[i],
                      flexShrink: 0
                    }}
                  />

                  <span
                    style={{
                      color: '#cbd5e1',
                      fontSize: 'clamp(13px, 1vw, 18px)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.channel}
                  </span>

                </div>


                {/* RIGHT */}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    flexShrink: 0
                  }}
                >

                  <span
                    style={{
                      color: '#64748b',
                      fontSize: 'clamp(12px, 1vw, 15px)'
                    }}
                  >
                    {pct}%
                  </span>

                  <span
                    style={{
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 'clamp(13px, 1vw, 18px)'
                    }}
                  >
                    ₹{Math.round(item.spend / 1000)}k
                  </span>

                </div>

              </div>

            )
          })}

        </div>

      </div>

    </div>
  )
}

