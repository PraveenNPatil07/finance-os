import axios from 'axios';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

/**
 * Configured Axios instance with interceptors for:
 * - Automatic Bearer token attachment
 * - 401 auto-logout with redirect
 * - 429 rate limit warning
 * - 500 generic error toast
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      useAuthStore.getState().logout();
      toast.error('Session expired. Please log in again.');
      window.location.href = '/login';
    } else if (status === 429) {
      toast.error('Too many requests. Please wait a moment before trying again.', {
        icon: '⚠️',
      });
    } else if (status === 500) {
      toast.error('An unexpected server error occurred.');
    }

    return Promise.reject(error);
  }
);

export default api;
