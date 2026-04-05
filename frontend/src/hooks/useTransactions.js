import { useState, useEffect, useCallback } from 'react';
import transactionApi from '../api/transactionApi';

/**
 * Custom hook for fetching transactions with filtering and pagination.
 * Re-fetches whenever filter params change.
 *
 * @param {Object} params - Query parameters for filtering
 * @returns {{ data, loading, error, refetch }}
 */
export function useTransactions(params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await transactionApi.getAll(params);
      setData(result);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { data, loading, error, refetch: fetchTransactions };
}

export default useTransactions;
