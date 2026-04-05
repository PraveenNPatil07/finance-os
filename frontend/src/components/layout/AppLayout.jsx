import { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import PageWrapper from '../ui/PageWrapper';
import useAuthStore from '../../store/authStore';

export default function AppLayout() {
  const { token, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close sidebar on path change (for mobile)
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden text-primary font-sans relative">
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        onCloseMobile={() => setIsMobileSidebarOpen(false)} 
      />
      
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300 lg:ml-[260px]">
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
        <main className="flex-1 overflow-auto custom-scrollbar relative">
          {/* Main content max-width wrapper */}
          <div className="mx-auto max-w-[1400px] w-full p-4 sm:p-5 lg:p-8">
            <PageWrapper key={location.pathname} className="min-h-full">
              <Outlet />
            </PageWrapper>
          </div>
        </main>
      </div>
    </div>
  );
}
