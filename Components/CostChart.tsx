'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AnnualData } from '@/lib/model/types'

interface CostChartProps {
  data: AnnualData[]
}

export default function CostChart({ data }: CostChartProps) {
  // Transform data for Recharts
  const chartData = data.map(d => ({
    year: d.year,
    ICE: Math.round(d.cumCostIce),
    EV: Math.round(d.cumCostEv),
  }))
  
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        {/* Y-axis label - vertical on the left, centered with Y-axis */}
        <div className="flex-shrink-0">
          <div 
            className="font-semibold text-gray-700 h-96 flex items-center justify-center"
            style={{ 
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize: '18px'
            }}
          >
            Cumulative Cost ($)
          </div>
        </div>
        
        {/* Chart */}
        <div className="flex-1 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              
              <XAxis 
                dataKey="year"
                tick={{ fontSize: 14, fill: '#6b7280' }}
              />
              
              <YAxis 
                tick={{ fontSize: 14, fill: '#6b7280' }}
                tickFormatter={(value) => {
                  if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(0)}M`
                  } else if (value >= 1000) {
                    return `${(value / 1000).toFixed(0)}k`
                  }
                  return `${value}`
                }}
                width={65}
              />
              
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Year ${label}`}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  padding: '8px',
                  fontSize: '12px'
                }}
              />
              
              <Line 
                type="monotone" 
                dataKey="ICE" 
                stroke="#ef4444" 
                strokeWidth={2.5}
                name="ICE Vehicle"
                dot={false}
                activeDot={{ r: 5 }}
              />
              
              <Line 
                type="monotone" 
                dataKey="EV" 
                stroke="#10b981" 
                strokeWidth={2.5}
                name="EV Vehicle"
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* X-axis labels - centered below chart */}
      <div className="text-center ml-16 mt-2">
        <div className="text-lg font-semibold text-gray-700 mb-1">
          Year
        </div>
        <div className="text-xs text-gray-600">
          <span className="text-emerald-600 font-medium">◆ EV Vehicle</span>
          <span className="mx-3 text-gray-400">•</span>
          <span className="text-red-600 font-medium">◆ ICE Vehicle</span>
        </div>
      </div>
    </div>
  )
}