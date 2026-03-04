import { useState, useEffect } from 'react';
import { BREAKPOINTS, type BreakpointKey } from '@shared/constants';

export type Breakpoint = BreakpointKey | 'xlarge';

/**
 * Returns the current breakpoint based on window width.
 * Layouts target: 1024px (small), 1440px (medium), 1920px (large), and above (xlarge).
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS.LARGE) return 'xlarge';
  if (width >= BREAKPOINTS.MEDIUM) return 'LARGE';
  if (width >= BREAKPOINTS.SMALL) return 'MEDIUM';
  return 'SMALL';
}

/** Current width in px; updates on resize. */
export function useWindowWidth(): number {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

/** Max content width at each breakpoint for centered layouts. */
export const CONTENT_MAX_WIDTH: Record<Breakpoint, number> = {
  SMALL: 1024,
  MEDIUM: 1280,
  LARGE: 1600,
  xlarge: 1920,
};
