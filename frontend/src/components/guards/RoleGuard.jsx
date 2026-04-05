import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

/**
 * Role-based guard that redirects users without required roles to /dashboard.
 * @param {string[]} allowedRoles - Roles permitted to access the wrapped content
 */
export default function RoleGuard({ children, allowedRoles = [] }) {
  const { user } = useAuthStore();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
