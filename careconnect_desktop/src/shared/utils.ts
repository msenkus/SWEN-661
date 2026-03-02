/**
 * Shared utility functions (main + renderer).
 */

import { BREAKPOINTS, type BreakpointKey } from './constants';

/**
 * Returns the breakpoint key for a given viewport width.
 * Used for responsive layout and testing.
 * SMALL: (0, SMALL], MEDIUM: (SMALL, MEDIUM], LARGE: (MEDIUM, ∞)
 */
export function getBreakpointKey(width: number): BreakpointKey {
  if (width > BREAKPOINTS.MEDIUM) return 'LARGE';
  if (width > BREAKPOINTS.SMALL) return 'MEDIUM';
  return 'SMALL';
}

/**
 * Formats a Date for display (e.g. "Monday, January 1, 2024").
 */
export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
