import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from '../ui/Card';
import Select from '../ui/Select';
import { useState } from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface2 border border-border p-3 rounded-xl shadow-modal text-sm">
        <p className="font-semibold text-primary mb-2 font-display">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color === 'url(#brandGradient)' ? '#7c3aed' : entry.color }} 
              />
              <span className="text-secondary capitalize">{entry.name}</span>
            </div>
            <span className="font-mono font-medium text-primary">₹{(entry.value || 0).toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function MonthlyTrendsChart({ data, year, onYearChange }) {
  const currentYear = new Date().getFullYear();
  const years = [
    { value: currentYear, label: currentYear.toString() },
    { value: currentYear - 1, label: (currentYear - 1).toString() }
  ];

  // Default empty data if not provided
  const chartData = data && data.length > 0 ? data : Array.from({length: 12}, (_, i) => ({
    month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
    income: 0,
    expense: 0
  }));

  const formatYAxis = (tickItem) => {
    if (tickItem >= 10000000) return `₹${(tickItem / 10000000).toFixed(1)}Cr`;
    if (tickItem >= 100000) return `₹${(tickItem / 100000).toFixed(1)}L`;
    if (tickItem >= 1000) return `₹${(tickItem / 1000).toFixed(0)}K`;
    return `₹${tickItem}`;
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold font-display text-primary">Revenue Overview</h2>
        <div className="w-28">
           <Select 
             options={years} 
             value={year} 
             onChange={(e) => onYearChange(parseInt(e.target.value))} 
           />
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            barGap={4}
          >
            <defs>
              <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2a35" opacity={0.5} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b6b80', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b6b80', fontSize: 12 }} 
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1c1c21', opacity: 0.5 }} />
            <Bar dataKey="income" name="Income" fill="url(#brandGradient)" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="expenses" name="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand"></div>
          <span className="text-xs text-secondary">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-expense"></div>
          <span className="text-xs text-secondary">Expense</span>
        </div>
      </div>
    </Card>
  );
}
