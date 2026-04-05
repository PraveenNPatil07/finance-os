import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Users, User, LogOut, BarChart3, X } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import Badge from '../ui/Badge';

export default function Sidebar({ isMobileOpen, onCloseMobile }) {
  const { user, logout } = useAuthStore();
  
  const getInitials = (name) => name?.substring(0, 2).toUpperCase() || 'U';

  const navLinks = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/transactions', icon: ReceiptText, label: 'Transactions' },
    ...(user?.role === 'ADMIN' ? [{ to: '/users', icon: Users, label: 'Team Members' }] : []),
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 w-[260px] bg-surface border-r border-border flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      <aside className={sidebarClasses}>
        {/* Logo area */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-border shrink-0">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[10px] bg-brand-gradient flex items-center justify-center shadow-glow-sm">
              <BarChart3 size={16} className="text-white" />
            </div>
            <span className="font-display font-semibold text-primary text-lg tracking-tight">FinanceOS</span>
          </Link>
          <button 
            className="lg:hidden text-muted hover:text-primary transition-colors focus:outline-none"
            onClick={onCloseMobile}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 flex flex-col gap-6">
          <div>
            <div className="px-3 mb-3 text-xs font-medium uppercase tracking-widest text-muted">Menu</div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `
                    flex items-center h-12 px-3 rounded-[10px] text-sm font-medium transition-all duration-150 group
                    ${isActive 
                      ? 'bg-brand-dim text-brand border-l-[3px] border-l-brand' 
                      : 'text-muted hover:bg-surface2 hover:text-primary border-l-[3px] border-l-transparent'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <div className={`w-10 ${isActive ? 'text-brand' : 'text-muted group-hover:text-primary transition-colors'}`}>
                        <link.icon size={20} />
                      </div>
                      {link.label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* User area */}
        <div className="p-4 shrink-0">
          <div className="px-3 mb-2 text-xs font-medium uppercase tracking-widest text-muted">Settings</div>
          <div className="bg-surface2 rounded-xl p-3 flexItems-center relative">
            <Link to="/profile" className="flex items-center gap-3 w-full pr-8 group">
              <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-sm font-semibold text-white shrink-0">
                {getInitials(user?.username)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-primary truncate group-hover:text-brand transition-colors">{user?.username}</span>
                <span className="text-[10px] uppercase font-bold text-muted mt-0.5 max-w-min">
                   {user?.role}
                </span>
              </div>
            </Link>
            
            <button
              onClick={() => {
                logout();
                window.location.href = '/login';
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-muted hover:text-expense hover:bg-expense-dim rounded-lg transition-colors focus:outline-none"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
