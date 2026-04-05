/**
 * Role constants and permission mappings.
 */
export const ROLES = {
  ADMIN: 'ADMIN',
  ANALYST: 'ANALYST',
  VIEWER: 'VIEWER',
};

/**
 * Badge color mapping for each role.
 */
export const ROLE_COLORS = {
  ADMIN: 'bg-accent/20 text-accent',
  ANALYST: 'bg-blue-500/20 text-blue-400',
  VIEWER: 'bg-zinc-500/20 text-zinc-400',
};

/**
 * Status badge color mapping.
 */
export const STATUS_COLORS = {
  ACTIVE: 'bg-success/20 text-success',
  INACTIVE: 'bg-danger/20 text-danger',
};
