import { useState } from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function Topbar({ onMenuClick }) {
  const { user } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const getPageContext = () => {
    const path = location.pathname;
    if (path === '/') return { title: 'Dashboard', crumb: 'Finance / Overview' };
    if (path.startsWith('/transactions/')) return { title: 'Transaction Details', crumb: 'Finance / Transactions / Detail' };
    if (path === '/transactions') return { title: 'Transactions', crumb: 'Finance / Transactions' };
    if (path === '/users') return { title: 'Team Members', crumb: 'Settings / Team' };
    if (path === '/profile') return { title: 'Profile', crumb: 'Settings / Profile' };
    return { title: 'FinanceOS', crumb: '' };
  };

  const { title, crumb } = getPageContext();
  const getInitials = (name) => name?.substring(0, 2).toUpperCase() || 'U';

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/transactions');
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleNotificationsClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen) {
      setHasUnread(false);
    }
  };

  return (
    <header className="sticky top-0 z-10 h-16 bg-[#0f0f12d9] backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden text-muted hover:text-primary transition-colors focus:outline-none"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
        
        {!isSearchOpen && (
          <div>
            <h1 className="text-xl font-semibold font-display text-primary tracking-tight leading-tight">{title}</h1>
            {crumb && <p className="hidden sm:block text-xs text-muted mt-0.5">{crumb}</p>}
          </div>
        )}

        {isSearchOpen && (
          <form onSubmit={handleSearch} className="flex-1 min-w-[200px] max-w-md animate-fade-in">
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3 text-muted" />
              <input
                autoFocus
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setIsSearchOpen(false)}
                className="w-full h-10 bg-surface2 border border-border rounded-xl pl-10 pr-4 text-sm text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand placeholder:text-muted transition-all shadow-inner-sm"
              />
            </div>
          </form>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 sm:gap-4 relative">
        {!isSearchOpen && (
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-[10px] border border-border text-muted hover:border-brand hover:text-brand hover:bg-brand-dim transition-colors hidden sm:flex focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-bg"
          >
            <Search size={18} />
          </button>
        )}
        
        <button 
          onClick={handleNotificationsClick}
          onBlur={() => setTimeout(() => setIsNotificationsOpen(false), 200)}
          className="w-9 h-9 flex items-center justify-center rounded-[10px] text-muted hover:bg-surface2 hover:text-primary transition-colors focus:outline-none relative"
        >
          <div className="relative">
            <Bell size={18} />
            {hasUnread && <span className="absolute top-0 right-0 w-2 h-2 bg-brand rounded-full border-2 border-bg"></span>}
          </div>
        </button>

        {isNotificationsOpen && (
          <div className="absolute top-12 right-12 w-64 bg-surface2 border border-border rounded-xl shadow-modal overflow-hidden animate-fade-in z-50">
            <div className="p-3 border-b border-border bg-[#141419]">
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">Notifications</h3>
            </div>
            <div className="flex flex-col max-h-[300px] overflow-y-auto">
              <div className="p-4 border-b border-border hover:bg-bg/50 transition-colors cursor-pointer">
                <p className="text-sm text-primary mb-1">New login detected</p>
                <p className="text-xs text-muted">A new login from Chrome on Windows.</p>
                <p className="text-[10px] text-secondary mt-2">Just now</p>
              </div>
              <div className="p-4 hover:bg-bg/50 transition-colors cursor-pointer">
                <p className="text-sm text-primary mb-1">System Updated</p>
                <p className="text-xs text-muted">FinanceOS has been updated to v1.0.0.</p>
                <p className="text-[10px] text-secondary mt-2">1 hour ago</p>
              </div>
            </div>
          </div>
        )}

        <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>

        <button 
          onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-sm font-semibold text-white shadow-glow-sm hover:brightness-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-bg shrink-0 z-10"
        >
          {getInitials(user?.username)}
        </button>
      </div>
    </header>
  );
}
