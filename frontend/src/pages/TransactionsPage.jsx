import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, X, Filter } from 'lucide-react';
import transactionApi from '../api/transactionApi';
import useAuthStore from '../store/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Pagination from '../components/ui/Pagination';

export default function TransactionsPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'ADMIN';

  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    type: '',
    startDate: '',
    endDate: '',
    category: '',
  });

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      
      // Clean empty filters to prevent backend parsing errors (e.g., empty string to LocalDate)
      const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
         if (value !== '') acc[key] = value;
         return acc;
      }, {});

      const res = await transactionApi.getAll({
        ...activeFilters,
        page: filters.page - 1 // backend is 0-indexed
      });
      setData(res);
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      size: 10,
      type: '',
      startDate: '',
      endDate: '',
      category: '',
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.type) count++;
    if (filters.category) count++;
    if (filters.startDate) count++;
    if (filters.endDate) count++;
    return count;
  };

  const columns = [
    { 
      header: 'ID', 
      className: 'w-[100px] hidden lg:table-cell',
      cell: (row) => <span className="text-secondary font-mono text-xs">{row.id.substring(0, 8)}...</span>
    },
    { 
      header: 'Date', 
      accessorKey: 'date',
      cell: (row) => <span className="text-primary">{new Date(row.date).toLocaleDateString()}</span>
    },
    { 
      header: 'Category', 
      accessorKey: 'category',
      cell: (row) => <span className="font-medium capitalize">{row.category}</span>
    },
    { 
      header: 'Type', 
      className: 'hidden sm:table-cell',
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
    },
    { 
      header: 'Notes', 
      className: 'hidden md:table-cell max-w-[200px]',
      cell: (row) => <span className="text-muted italic truncate block">{row.notes || '—'}</span>
    }
  ];

  // Mobile layout adjustment: add left border color to row indicator based on type
  const getRowClassName = (row) => {
    return `relative sm:border-l-0 ${row.type === 'INCOME' ? 'border-l-4 border-l-income' : 'border-l-4 border-l-expense'}`;
  };

  return (
    <div className="flex flex-col pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-semibold font-display text-primary tracking-tight">Transactions</h1>
          <p className="text-sm text-secondary mt-1">Manage and view your financial records.</p>
        </div>
        {isAdmin && (
           <Button onClick={() => navigate('/transactions/new')} className="shrink-0 group">
             <Plus size={18} className="mr-2 group-hover:scale-110 transition-transform" /> Add Transaction
           </Button>
        )}
      </div>

      {/* Filters Area */}
      <Card className="mb-6 p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input 
            placeholder="Search category..." 
            name="category"
            icon={Search}
            value={filters.category}
            onChange={handleFilterChange}
          />
          <Select 
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            options={[
              { label: 'All Types', value: '' },
              { label: 'Income', value: 'INCOME' },
              { label: 'Expense', value: 'EXPENSE' },
            ]}
          />
          <Input 
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
          <div className="flex gap-2">
            <Input 
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="flex-1"
            />
            {getActiveFilterCount() > 0 && (
              <Button variant="outline" className="px-3" onClick={clearFilters} title="Clear Filters">
                <X size={18} />
              </Button>
            )}
          </div>
        </div>

        {/* Active Filter Pills */}
        {getActiveFilterCount() > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
             <span className="text-xs font-medium text-muted flex items-center gap-1.5 mr-2">
               <Filter size={14} /> Active Filters:
             </span>
             {filters.type && (
               <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-brand-dim text-brand border border-brand/20">
                 Type: {filters.type} <X size={12} className="cursor-pointer hover:text-brand-light" onClick={() => setFilters(f => ({...f, type: ''}))} />
               </span>
             )}
             {filters.category && (
               <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-brand-dim text-brand border border-brand/20">
                 Category: {filters.category} <X size={12} className="cursor-pointer hover:text-brand-light" onClick={() => setFilters(f => ({...f, category: ''}))} />
               </span>
             )}
          </div>
        )}
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-4 text-sm px-1">
         <span className="text-secondary">Showing <strong className="text-primary">{data.totalElements}</strong> transactions</span>
      </div>

      {/* Table */}
      <div className="shadow-sm">
        <Table 
          columns={columns}
          data={data.content}
          isLoading={isLoading}
          onRowClick={(row) => navigate(`/transactions/${row.id}`)}
          className={getRowClassName}
        />
      </div>

      <Pagination 
        currentPage={filters.page}
        totalPages={data.totalPages}
        totalItems={data.totalElements}
        itemsPerPage={filters.size}
        onPageChange={(page) => setFilters(prev => ({ ...prev, page }))}
      />
    </div>
  );
}
