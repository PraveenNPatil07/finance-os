import api from './axios';

import useAuthStore from '../store/authStore';

export const dashboardApi = {
  getSummary: async () => {
    const response = await api.get('/dashboard/summary');
    return response.data;
  },

  getCategoryBreakdown: async (params = {}) => {
    const response = await api.get('/dashboard/category-breakdown', { params });
    return response.data;
  },

  getMonthlyTrends: async (year) => {
    const response = await api.get('/dashboard/monthly-trends', {
      params: year ? { year } : {},
    });
    return response.data;
  },

  getRecentActivity: async () => {
    const response = await api.get('/dashboard/recent-activity');
    return response.data;
  },

  getDashboardData: async (year) => {
    const [summary, monthlyTrends, categoryBreakdown, recentTransactions] = await Promise.all([
      dashboardApi.getSummary(),
      dashboardApi.getMonthlyTrends(year),
      dashboardApi.getCategoryBreakdown(),
      dashboardApi.getRecentActivity()
    ]);

    return { summary, monthlyTrends, categoryBreakdown, recentTransactions };
  },
};

export default dashboardApi;
