import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import transactionApi from '../api/transactionApi';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';

export default function TransactionFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    amount: '',
    type: 'EXPENSE',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      fetchTransaction();
    }
  }, [id, isEditMode]);

  const fetchTransaction = async () => {
    try {
      setIsInitialLoading(true);
      const data = await transactionApi.getById(id);
      setFormData({
        amount: data.amount,
        type: data.type,
        category: data.category,
        date: data.date,
        notes: data.notes || ''
      });
    } catch (error) {
      toast.error('Failed to load transaction details');
      navigate('/transactions');
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category || !formData.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      if (isEditMode) {
        await transactionApi.update(id, formData);
        toast.success('Transaction updated successfully');
      } else {
        await transactionApi.create(formData);
        toast.success('Transaction created successfully');
      }
      navigate('/transactions');
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update transaction' : 'Failed to create transaction');
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialLoading) {
    return <Spinner fullPage />;
  }

  return (
    <div className="flex flex-col pb-10 max-w-2xl mx-auto w-full">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm font-medium text-muted hover:text-primary transition-colors w-max mb-6 group focus:outline-none"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold font-display text-primary tracking-tight">
          {isEditMode ? 'Edit Transaction' : 'Add New Transaction'}
        </h1>
        <p className="text-sm text-secondary mt-1">
          {isEditMode ? 'Update your transaction details below.' : 'Enter the details for your new financial record.'}
        </p>
      </div>

      <Card className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-primary mb-2">Amount (₹) *</label>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                required
                className="text-lg font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Type *</label>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={[
                  { label: 'Expense', value: 'EXPENSE' },
                  { label: 'Income', value: 'INCOME' }
                ]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Date *</label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-primary mb-2">Category *</label>
              <Input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Food, Rent, Salary"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-primary mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full bg-surface2 border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all resize-none"
                placeholder="Optional description..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button 
              type="submit" 
              className="flex-1 sm:flex-none sm:min-w-[140px]" 
              isLoading={isLoading}
            >
              <Save size={18} className="mr-2" /> {isEditMode ? 'Update' : 'Create'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 sm:flex-none" 
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              <X size={18} className="mr-2" /> Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
