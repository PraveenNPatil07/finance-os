import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';

const COLORS = ['#6366f1', '#22c55e', '#ef4444', '#f59e0b', '#06b6d4', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function CategoryPieChart({ data = [] }) {
  const total = data.reduce((sum, item) => sum + item.total, 0);

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border p-3 rounded-lg shadow-xl">
          <p className="text-text font-medium mb-1">{data.category}</p>
          <p className="text-sm font-mono text-muted">{formatCurrency(data.total)}</p>
          <p className="text-xs text-muted mt-1">{data.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold text-text mb-6">Expense Breakdown</h3>
      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-muted">
          No data available
        </div>
      ) : (
        <div className="flex-1 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="total"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={customTooltip} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry, index) => (
                  <span className="text-sm text-text ml-1">
                    {data[index].category} <span className="text-muted ml-1 font-mono">{data[index].percentage.toFixed(1)}%</span>
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p className="text-xs text-muted mb-1">Total</p>
            <p className="text-sm font-bold text-text font-mono">
              {formatCurrency(total)}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
