import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../ui/Card';

const COLORS = ['#7c3aed', '#10b981', '#f43f5e', '#3b82f6', '#f59e0b', '#06b6d4', '#8b5cf6', '#ec4899'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-surface2 border border-border p-3 rounded-xl shadow-modal text-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.payload.fill || data.color }} />
          <span className="text-secondary font-medium">{data.name}</span>
          <span className="font-mono font-medium text-primary ml-4">₹{(data.value || 0).toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function CategoryPieChart({ data }) {
  // Process data to calculate percentages
  const total = data.reduce((sum, item) => sum + (item.total || 0), 0);
  
  const chartData = data.map((item, index) => ({
    name: item.category,
    value: item.total,
    percent: total > 0 ? Math.round((item.total / total) * 100) : 0,
    color: COLORS[index % COLORS.length]
  })).sort((a, b) => b.value - a.value);

  // If no data
  if (!chartData || chartData.length === 0) {
    return (
      <Card className="flex flex-col h-full">
        <div>
          <h2 className="text-lg font-semibold font-display text-primary">Expense Breakdown</h2>
          <p className="text-xs text-muted mt-1">Last 30 days</p>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted text-sm pb-8">
          No expenses recorded
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <div>
        <h2 className="text-lg font-semibold font-display text-primary">Expense Breakdown</h2>
        <p className="text-xs text-muted mt-1">Last 30 days</p>
      </div>
      
      <div className="flex-1 w-full min-h-[220px] mt-4 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-muted font-medium uppercase tracking-widest">Total</span>
          <span className="text-lg font-semibold font-mono text-primary mt-1">₹{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="mt-4 pt-4 border-t border-border max-h-32 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col gap-2">
          {chartData.map((entry, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }}></div>
                <span className="text-secondary truncate">{entry.name}</span>
              </div>
              <span className="font-mono text-muted pl-4 shrink-0">{entry.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
