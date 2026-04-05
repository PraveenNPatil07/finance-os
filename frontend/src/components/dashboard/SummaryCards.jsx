import { ArrowUpRight, ArrowDownRight, Activity, Wallet, CreditCard, PiggyBank } from 'lucide-react';
import Card from '../ui/Card';
import useCountUp from '../../hooks/useCountUp';

const StatValue = ({ value }) => {
  const animatedValue = useCountUp(value, 1500);
  return `₹${animatedValue.toLocaleString()}`;
};

export default function SummaryCards({ data }) {
  const formatTrend = (trend) => {
    if (trend == null) return 'No data';
    const sign = trend > 0 ? '+' : '';
    return `${sign}${trend.toFixed(1)}% from last month`;
  };

  const cards = [
    {
      title: 'Current Balance',
      value: data.netBalance || 0,
      icon: Activity,
      trend: formatTrend(data.balanceTrend),
      trendUp: data.balanceTrend >= 0,
      accent: 'brand',
      iconTheme: 'text-brand bg-brand-dim',
    },
    {
      title: 'Total Income',
      value: data.totalIncome || 0,
      icon: Wallet,
      trend: formatTrend(data.incomeTrend),
      trendUp: data.incomeTrend >= 0,
      accent: 'income',
      iconTheme: 'text-income bg-income-dim',
    },
    {
      title: 'Total Expenses',
      value: data.totalExpenses || 0,
      icon: CreditCard,
      trend: formatTrend(data.expenseTrend),
      trendUp: data.expenseTrend <= 0, // Lower expenses is usually good
      accent: 'expense',
      iconTheme: 'text-expense bg-expense-dim',
    },
    {
      title: 'Monthly Savings',
      value: data.thisMonthNet || 0,
      icon: PiggyBank,
      trend: 'Current month net',
      trendUp: null,
      accent: 'warning',
      iconTheme: 'text-warning bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {cards.map((card, index) => (
        <Card key={index} variant="stat" accentColor={card.accent}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.iconTheme}`}>
              <card.icon size={20} />
            </div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-muted">{card.title}</h3>
          </div>
          <div className={`text-3xl font-semibold font-mono tracking-tight mb-2 ${
            card.accent === 'expense' ? 'text-expense' : card.accent === 'income' ? 'text-income' : 'text-primary'
          }`}>
            <StatValue value={card.value} />
          </div>
          {card.trendUp !== null ? (
            <div className={`flex items-center text-xs font-medium ${card.trendUp ? 'text-income' : 'text-expense'}`}>
              {card.trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
              {card.trend}
            </div>
          ) : (
            <div className="text-xs font-medium text-muted">
              {card.trend}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
