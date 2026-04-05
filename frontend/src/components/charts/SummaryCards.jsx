import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import { formatCompactCurrency, formatCurrency } from '../../utils/formatCurrency';

export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const cards = [
    {
      title: 'Total Income',
      value: summary.totalIncome,
      subtitle: 'All time income',
      icon: TrendingUp,
      iconColor: 'bg-success/20 text-success',
      valueColor: 'text-success',
    },
    {
      title: 'Total Expenses',
      value: summary.totalExpenses,
      subtitle: 'All time expenses',
      icon: TrendingDown,
      iconColor: 'bg-danger/20 text-danger',
      valueColor: 'text-danger',
    },
    {
      title: 'Net Balance',
      value: summary.netBalance,
      subtitle: 'Income minus expenses',
      icon: Wallet,
      iconColor: 'bg-accent/20 text-accent',
      valueColor: summary.netBalance >= 0 ? 'text-success' : 'text-danger',
    },
    {
      title: 'This Month Net',
      value: summary.thisMonthNet,
      subtitle: 'Current month',
      icon: Calendar,
      iconColor: 'bg-warning/20 text-warning',
      valueColor: 'text-text',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted mb-1">{card.title}</p>
              <h3 className={`text-2xl font-bold font-mono ${card.valueColor}`}>
                {formatCompactCurrency(card.value)}
              </h3>
            </div>
            <div className={`p-2 rounded-lg ${card.iconColor}`}>
              <card.icon size={20} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted tooltip-target" title={formatCurrency(card.value)}>
              {card.subtitle}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
