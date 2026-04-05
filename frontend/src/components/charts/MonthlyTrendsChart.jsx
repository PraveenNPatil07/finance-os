import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Card from '../ui/Card';
import { formatCurrency, formatCompactCurrency } from '../../utils/formatCurrency';

export default function MonthlyTrendsChart({ data = [], onYearChange }) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setYear(newYear);
    if (onYearChange) onYearChange(newYear);
  };

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border p-4 rounded-xl shadow-xl min-w-[200px]">
          <p className="text-text font-semibold mb-3 border-b border-border pb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted capitalize flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </span>
              <span className="text-sm font-mono font-medium text-text">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
          {payload.length >= 2 && (
            <div className="flex justify-between items-center mt-3 pt-2 border-t border-border">
              <span className="text-sm text-muted font-medium">Net</span>
              <span className={`text-sm font-mono font-medium ${
                payload[0].value - payload[1].value >= 0 ? 'text-success' : 'text-danger'
              }`}>
                {formatCurrency(payload[0].value - payload[1].value)}
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-text">Monthly Overview</h3>
        <select
          value={year}
          onChange={handleYearChange}
          className="bg-background border border-border text-sm text-text rounded-md px-2 py-1 focus:ring-1 focus:ring-accent outline-none"
        >
          {[currentYear + 1, currentYear, currentYear - 1, currentYear - 2].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => value.substring(0, 3)}
              stroke="#71717a"
              tick={{ fill: '#71717a', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#1f1f1f' }}
            />
            <YAxis
              tickFormatter={(value) => formatCompactCurrency(value)}
              stroke="#71717a"
              tick={{ fill: '#71717a', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={customTooltip}
              cursor={{ fill: '#1f1f1f', opacity: 0.4 }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-sm text-muted ml-1 capitalize">{value}</span>}
            />
            <Bar dataKey="income" name="Income" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
