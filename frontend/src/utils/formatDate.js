import { format, parseISO, isValid } from 'date-fns';

/**
 * Format a date string to "15 Jan 2025" format.
 * @param {string|Date} dateStr - ISO date string or Date object
 * @returns {string} Formatted date string
 */
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    if (!isValid(date)) return '—';
    return format(date, 'dd MMM yyyy');
  } catch {
    return '—';
  }
}

/**
 * Format a datetime string to "15 Jan 2025, 10:30 AM" format.
 * @param {string|Date} dateStr - ISO datetime string or Date object
 * @returns {string} Formatted datetime string
 */
export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    if (!isValid(date)) return '—';
    return format(date, 'dd MMM yyyy, hh:mm a');
  } catch {
    return '—';
  }
}

/**
 * Format date to "January 2025" format for month display.
 */
export function formatMonthYear(dateStr) {
  if (!dateStr) return '—';
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    if (!isValid(date)) return '—';
    return format(date, 'MMMM yyyy');
  } catch {
    return '—';
  }
}

/**
 * Get current month and year string.
 */
export function getCurrentMonthYear() {
  return format(new Date(), 'MMMM yyyy');
}
