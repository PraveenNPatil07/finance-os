import { useState, useEffect, useCallback } from 'react';
import dashboardApi from '../api/dashboardApi';

/**
 * Custom hook for fetching all dashboard data.
 * Returns summary, category breakdown, monthly trends, and recent activity.
 */
export function useDashboard(trendYear) {
  const [summary, setSummary] = useState(null);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [summaryRes, categoryRes, trendsRes, activityRes] =
        await Promise.allSettled([
          dashboardApi.getSummary(),
          dashboardApi.getCategoryBreakdown(),
          dashboardApi.getMonthlyTrends(trendYear),
          dashboardApi.getRecentActivity(),
        ]);

      if (summaryRes.status === 'fulfilled') setSummary(summaryRes.value);
      if (categoryRes.status === 'fulfilled') setCategoryBreakdown(categoryRes.value);
      if (trendsRes.status === 'fulfilled') setMonthlyTrends(trendsRes.value);
      if (activityRes.status === 'fulfilled') setRecentActivity(activityRes.value);

      // Check if summary (required) failed
      if (summaryRes.status === 'rejected') {
        throw new Error(summaryRes.reason?.response?.data?.message || 'Failed to load dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [trendYear]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    summary,
    categoryBreakdown,
    monthlyTrends,
    recentActivity,
    loading,
    error,
    refetch: fetchDashboard,
  };
}

export default useDashboard;
