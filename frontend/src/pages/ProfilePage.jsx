import useAuthStore from '../store/authStore';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => name?.substring(0, 2).toUpperCase() || 'U';

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 w-full h-full min-h-[calc(100vh-160px)]">
      <div className="w-full max-w-[680px]">
        <div className="w-full rounded-[2rem] overflow-hidden bg-surface border border-border shadow-modal relative">

          {/* Banner Overlap Area */}
          <div className="h-[120px] w-full bg-brand-gradient"></div>

          <div className="flex flex-col items-center px-8 pb-10 relative">
            {/* Profile Avatar overlapping banner */}
            <div className="w-24 h-24 rounded-full bg-surface2 border-4 border-surface shadow-lg flex items-center justify-center -mt-12 mb-4 bg-brand-gradient text-3xl font-bold text-white z-10 shrink-0">
              {getInitials(user?.username)}
            </div>

            {/* User Details */}
            <div className="flex flex-col items-center text-center mb-8">
              <h1 className="text-3xl font-semibold font-display tracking-tight text-primary mb-1">{user?.username}</h1>
              <p className="text-secondary text-sm">{user?.email}</p>

              <div className="flex items-center gap-3 mt-4">
                <Badge variant={user?.role?.toLowerCase() || 'viewer'} className="uppercase">
                  {user?.role}
                </Badge>
                <Badge variant="active" className="uppercase">
                  Active
                </Badge>
              </div>
            </div>

            {/* Info Grid */}
            <div className="w-full grid grid-cols-1 gap-4 mb-8">
              <div className="bg-surface2 rounded-xl p-4 border border-border flex flex-col items-center justify-center text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">Security</p>
                <p className="text-sm text-primary flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-income filter blur-[1px]"></span>
                  Secured by JWT Token
                </p>
              </div>
            </div>

            <div className="w-full pt-6 border-t border-border flex justify-center">
              <Button onClick={handleLogout} variant="ghost" className="text-expense hover:text-expense hover:bg-expense-dim group">
                <LogOut size={16} className="mr-2 group-hover:-translate-x-0.5 transition-transform" />
                Sign out of FinanceOS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
