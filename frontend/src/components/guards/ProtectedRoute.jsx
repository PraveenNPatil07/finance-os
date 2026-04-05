import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

/**
 * Protected route wrapper that redirects unauthenticated users to /login.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
