import { getBreakpointKey, formatDisplayDate } from '../utils';
import { BREAKPOINTS } from '../constants';

describe('getBreakpointKey', () => {
  it('returns SMALL for width below BREAKPOINTS.SMALL', () => {
    expect(getBreakpointKey(0)).toBe('SMALL');
    expect(getBreakpointKey(500)).toBe('SMALL');
    expect(getBreakpointKey(BREAKPOINTS.SMALL - 1)).toBe('SMALL');
  });

  it('returns SMALL for width equal to BREAKPOINTS.SMALL', () => {
    expect(getBreakpointKey(BREAKPOINTS.SMALL)).toBe('SMALL');
  });

  it('returns MEDIUM for width between SMALL and MEDIUM', () => {
    expect(getBreakpointKey(BREAKPOINTS.SMALL + 1)).toBe('MEDIUM');
    expect(getBreakpointKey(1200)).toBe('MEDIUM');
    expect(getBreakpointKey(BREAKPOINTS.MEDIUM - 1)).toBe('MEDIUM');
  });

  it('returns MEDIUM for width equal to BREAKPOINTS.MEDIUM', () => {
    expect(getBreakpointKey(BREAKPOINTS.MEDIUM)).toBe('MEDIUM');
  });

  it('returns LARGE for width between MEDIUM and LARGE', () => {
    expect(getBreakpointKey(BREAKPOINTS.MEDIUM + 1)).toBe('LARGE');
    expect(getBreakpointKey(1500)).toBe('LARGE');
    expect(getBreakpointKey(BREAKPOINTS.LARGE - 1)).toBe('LARGE');
  });

  it('returns LARGE for width equal to or above BREAKPOINTS.LARGE', () => {
    expect(getBreakpointKey(BREAKPOINTS.LARGE)).toBe('LARGE');
    expect(getBreakpointKey(2000)).toBe('LARGE');
  });
});

describe('formatDisplayDate', () => {
  it('formats a date with weekday, month, day, and year', () => {
    const date = new Date(2024, 0, 15); // Monday, January 15, 2024
    const result = formatDisplayDate(date);
    expect(result).toMatch(/January/);
    expect(result).toMatch(/15/);
    expect(result).toMatch(/2024/);
    expect(result).toMatch(/Monday/);
  });

  it('returns a string', () => {
    const date = new Date();
    expect(typeof formatDisplayDate(date)).toBe('string');
    expect(formatDisplayDate(date).length).toBeGreaterThan(0);
  });
});
