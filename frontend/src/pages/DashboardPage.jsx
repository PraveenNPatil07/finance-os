import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import dashboardApi from '../api/dashboardApi';
import SummaryCards from '../components/dashboard/SummaryCards';
import MonthlyTrendsChart from '../components/dashboard/MonthlyTrendsChart';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [data, setData] = useState({
    summary: {},
    monthlyTrends: [],
    categoryBreakdown: [],
    recentTransactions: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const res = await dashboardApi.getDashboardData(year);
      setData(res);
    } catch (error) {
      console.error('Failed to load dashboard data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const recentColumns = [
    { 
      header: 'Date', 
      accessorKey: 'date',
      cell: (row) => <span className="text-secondary">{new Date(row.date).toLocaleDateString()}</span>
    },
    { 
      header: 'Description', 
      accessorKey: 'category',
      cell: (row) => <span className="font-medium capitalize">{row.category}</span>
    },
    { 
      header: 'Type', 
      accessorKey: 'type',
      cell: (row) => <Badge variant={row.type.toLowerCase()}>{row.type}</Badge>
    },
    { 
      header: 'Amount', 
      className: 'text-right',
      cell: (row) => (
        <span className={`font-mono font-medium ${row.type === 'INCOME' ? 'text-income' : 'text-expense'}`}>
          {row.type === 'INCOME' ? '+' : '-'}₹{row.amount.toLocaleString()}
        </span>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold font-display text-primary tracking-tight">Good morning, {user?.username} 👋</h1>
        <p className="text-sm text-secondary mt-1">Here's what's happening with your finances today.</p>
      </div>

      {/* Summary Cards */}
      <SummaryCards data={data.summary || {}} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
         <div className="lg:col-span-2">
            <MonthlyTrendsChart data={data.monthlyTrends} year={year} onYearChange={setYear} />
         </div>
         <div className="lg:col-span-1">
            <CategoryPieChart data={data.categoryBreakdown} />
         </div>
      </div>

      {/* Recent Activity */}
      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold font-display text-primary">Recent Activity</h2>
          <Link to="/transactions" className="text-sm font-medium text-brand hover:text-brand-light transition-colors flex items-center group">
            View all <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="border-t-0 rounded-none bg-transparent shadow-none w-full">
           <Table 
             columns={recentColumns} 
             data={data.recentTransactions.slice(0, 8)} 
             isLoading={isLoading} 
             emptyStateMessage="No recent activity"
             emptyStateSubMessage="Check back later."
           />
        </div>
      </Card>
    </div>
  );
}
