import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, CheckCircle2, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import transactionApi from '../api/transactionApi';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';

export default function TransactionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';

  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchTransactionDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTransactionDetails = async () => {
    try {
      setIsLoading(true);
      const res = await transactionApi.getTransactionById(id);
      setTransaction(res);
    } catch (error) {
      toast.error('Transaction not found or unauthorized');
      navigate('/transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyId = () => {
    if (transaction?.id) {
      navigator.clipboard.writeText(transaction.id);
      setCopied(true);
      toast.success('Transaction ID copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this transaction? This action cannot be undone.')) {
      return;
    }
    
    try {
      setIsLoading(true);
      await transactionApi.deleteTransaction(id);
      toast.success('Transaction deleted successfully');
      navigate('/transactions');
    } catch (error) {
      toast.error('Failed to delete transaction');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner fullPage />;
  }

  if (!transaction) return null;

  const isIncome = transaction.type === 'INCOME';
  const bannerGradient = isIncome ? 'bg-income-gradient' : 'bg-expense-gradient';

  return (
    <div className="flex flex-col pb-10 max-w-5xl mx-auto w-full">
      <button 
        onClick={() => navigate('/transactions')} 
        className="flex items-center text-sm font-medium text-muted hover:text-primary transition-colors w-max mb-6 group focus:outline-none"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Transactions
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column (60%) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <Card className="p-0 overflow-hidden relative border-none shadow-card bg-transparent">
             {/* Colored Banner Overlap */}
             <div className={`h-28 w-full ${bannerGradient} rounded-t-2xl`} />
             
             {/* Content Area */}
             <div className="bg-surface rounded-b-2xl border border-t-0 border-border px-8 pb-8 pt-0 -mt-2 shadow-modal relative z-10">
               {/* Amount overlapping banner */}
               <div className="-mt-10 mb-6 flex flex-col items-start drop-shadow-xl">
                 <div className="text-4xl sm:text-5xl font-mono tracking-tight font-semibold text-white drop-shadow-md">
                   {isIncome ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                 </div>
               </div>

               <div className="flex items-center gap-3 mb-8">
                 <Badge variant={transaction.type.toLowerCase()}>{transaction.type}</Badge>
                 <span className="text-lg font-medium text-primary capitalize font-display tracking-tight">{transaction.category}</span>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-8">
                 <div>
                   <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">Created By</h4>
                   <p className="text-sm font-medium text-primary">{transaction.user?.username || 'System'}</p>
                 </div>
                 <div>
                   <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">Date Logged</h4>
                   <p className="text-sm font-medium text-primary">{new Date(transaction.createdAt).toLocaleString()}</p>
                 </div>
               </div>

               <div className="pt-6 border-t border-border">
                 <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Notes</h4>
                 <div className="bg-surface2 rounded-xl p-4 border border-border/50">
                    {transaction.notes ? (
                      <p className="text-sm text-secondary leading-relaxed">{transaction.notes}</p>
                    ) : (
                      <p className="text-sm text-muted italic">— No notes provided —</p>
                    )}
                 </div>
               </div>
             </div>
          </Card>
        </div>

        {/* Right Column (40%) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {isAdmin && (
            <Card>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted mb-4 border-b border-border pb-3">Administrative Actions</h3>
              <div className="flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start py-2.5" 
                  onClick={() => navigate(`/transactions/${transaction.id}/edit`)}
                >
                  <Edit size={16} className="mr-2.5" /> Edit Transaction
                </Button>
                <Button 
                  variant="danger" 
                  className="w-full justify-start py-2.5 bg-expense/10 text-expense border border-expense/20 hover:bg-expense hover:text-white"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} className="mr-2.5" /> Delete Transaction
                </Button>
              </div>
            </Card>
          )}

          <Card className="bg-surface2/50 border-dashed">
             <h3 className="text-sm font-semibold text-primary mb-3 font-display">System Information</h3>
             <div className="flex flex-col gap-1.5">
               <span className="text-xs text-muted">Transaction ID</span>
               <div className="flex items-center gap-2">
                 <code className="bg-bg border border-border px-2 py-1 rounded text-xs text-primary font-mono select-all truncate flex-1">
                   {transaction.id}
                 </code>
                 <button 
                   onClick={handleCopyId}
                   className="w-7 h-7 flex items-center justify-center rounded bg-surface border border-border text-muted hover:text-primary transition-colors focus:outline-none shrink-0"
                   title="Copy ID"
                 >
                   {copied ? <CheckCircle2 size={14} className="text-income" /> : <Copy size={14} />}
                 </button>
               </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
