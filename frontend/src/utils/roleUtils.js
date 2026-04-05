import { ROLES } from '../constants/roles';

/**
 * Check if a user has the required role.
 * @param {string} userRole - Current user's role
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {boolean}
 */
export function hasRole(userRole, allowedRoles) {
  return allowedRoles.includes(userRole);
}

/**
 * Check if the user is an admin.
 */
export function isAdmin(userRole) {
  return userRole === ROLES.ADMIN;
}

/**
 * Check if the user is an analyst or above.
 */
export function isAnalystOrAbove(userRole) {
  return userRole === ROLES.ADMIN || userRole === ROLES.ANALYST;
}

/**
 * Get user initials from username.
 * @param {string} username
 * @returns {string} First two characters uppercase
 */
export function getInitials(username) {
  if (!username) return '??';
  return username.substring(0, 2).toUpperCase();
}
