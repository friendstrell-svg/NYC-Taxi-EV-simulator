'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import { SensitivityResult } from '@/lib/model/types'

interface TornadoChartProps {
  data: SensitivityResult[]
  viewMode: 'per_taxi' | 'fleet'
}

export default function TornadoChart({ data, viewMode }: TornadoChartProps) {
  // Transform data for tornado chart
  // Each bar shows the range from downside to upside impact
  const chartData = data.map(item => ({
    name: item.displayName,
    downside: item.impactDown / 1000, // Convert to thousands
    upside: item.impactUp / 1000,
    totalSwing: item.totalImpact / 1000,
  }))
  
  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          Sensitivity Analysis (±10% Parameter Variation)
        </h3>
        <p className="text-sm text-gray-600">
          Impact on NPV {viewMode === 'fleet' ? '(Fleet-Wide)' : '(Per Taxi)'} - sorted by total impact
        </p>
      </div>
      
      {/* Chart */}
      <div className="w-full h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            
            <XAxis 
              type="number"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickFormatter={(value) => `$${value}k`}
            />
            
            <YAxis 
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              width={50}
            />
            
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(0)}k`, '']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '8px',
                fontSize: '12px'
              }}
            />
            
            <Legend 
              wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
            />
            
            {/* Reference line at zero */}
            <ReferenceLine x={0} stroke="#374151" strokeWidth={2} />
            
            {/* Downside bars (red/left) */}
            <Bar 
              dataKey="downside" 
              fill="#ef4444"
              name="Downside (-10%)"
              radius={[0, 0, 0, 0]}
            />
            
            {/* Upside bars (green/right) */}
            <Bar 
              dataKey="upside" 
              fill="#10b981"
              name="Upside (+10%)"
              radius={[0, 0, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Interpretation Guide */}
      <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-3">
        <p className="text-sm text-blue-800">
          <strong>How to read:</strong> Longer bars = higher sensitivity. 
          Red bars (left) = worse for EVs. Green bars (right) = better for EVs. 
          Parameters at the top have the biggest impact on your decision.
        </p>
      </div>
      
      {/* Top 3 Risk Drivers */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {chartData.slice(0, 3).map((item, idx) => (
          <div key={item.name} className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              #{idx + 1} Risk Driver
            </div>
            <div className="text-sm font-bold text-gray-900">
              {item.name}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Total swing: ${item.totalSwing.toFixed(0)}k
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}