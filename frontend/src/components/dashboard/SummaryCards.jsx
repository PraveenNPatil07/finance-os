import { ArrowUpRight, ArrowDownRight, Activity, Wallet, CreditCard, PiggyBank } from 'lucide-react';
import Card from '../ui/Card';
import useCountUp from '../../hooks/useCountUp';

const StatValue = ({ value }) => {
  const animatedValue = useCountUp(value, 1500);
  return `₹${animatedValue.toLocaleString()}`;
};

export default function SummaryCards({ data }) {
  const cards = [
    {
      title: 'Current Balance',
      value: data.netBalance || 0,
      icon: Activity,
      trend: '+12.5% from last month',
      trendUp: true,
      accent: 'brand',
      iconTheme: 'text-brand bg-brand-dim',
    },
    {
      title: 'Total Income',
      value: data.totalIncome || 0,
      icon: Wallet,
      trend: '+8.2% from last month',
      trendUp: true,
      accent: 'income',
      iconTheme: 'text-income bg-income-dim',
    },
    {
      title: 'Total Expenses',
      value: data.totalExpenses || 0,
      icon: CreditCard,
      trend: '-4.1% from last month',
      trendUp: false,
      accent: 'expense',
      iconTheme: 'text-expense bg-expense-dim',
    },
    {
      title: 'Monthly Savings',
      value: (data.totalIncome || 0) - (data.totalExpenses || 0),
      icon: PiggyBank,
      trend: 'All time total',
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
