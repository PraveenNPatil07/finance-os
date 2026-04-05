/**
 * Format a number as Indian Rupee currency.
 * @param {number|string} amount - The amount to format
 * @returns {string} Formatted currency string (e.g., "₹80,000.00")
 */
export function formatCurrency(amount) {
  if (amount == null) return '₹0.00';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Format a number as compact currency (e.g., "₹80K").
 */
export function formatCompactCurrency(amount) {
  if (amount == null) return '₹0';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (Math.abs(num) >= 10000000) {
    return `₹${(num / 10000000).toFixed(1)}Cr`;
  }
  if (Math.abs(num) >= 100000) {
    return `₹${(num / 100000).toFixed(1)}L`;
  }
  if (Math.abs(num) >= 1000) {
    return `₹${(num / 1000).toFixed(1)}K`;
  }
  return formatCurrency(num);
}
