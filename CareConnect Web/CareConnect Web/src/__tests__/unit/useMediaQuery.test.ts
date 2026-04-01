import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaQuery, useBreakpoint } from '../../hooks/useMediaQuery';

describe('useMediaQuery', () => {
  let listeners: Record<string, (e: MediaQueryListEvent) => void>;

  function createMatchMedia(matches: boolean) {
    return (query: string) => {
      const mql = {
        matches,
        media: query,
        addEventListener: vi.fn((event: string, cb: (e: MediaQueryListEvent) => void) => {
          listeners[event] = cb;
        }),
        removeEventListener: vi.fn((event: string) => {
          delete listeners[event];
        }),
        dispatchEvent: vi.fn(),
      };
      return mql;
    };
  }

  beforeEach(() => {
    listeners = {};
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('syncs to true when query initially matches (branch: media.matches !== matches)', () => {
    window.matchMedia = createMatchMedia(true) as typeof window.matchMedia;
    const { result } = renderHook(() => useMediaQuery('(min-width: 1px)'));
    expect(result.current).toBe(true);
  });

  it('stays false when query does not match (branch: media.matches === matches)', () => {
    window.matchMedia = createMatchMedia(false) as typeof window.matchMedia;
    const { result } = renderHook(() => useMediaQuery('(min-width: 99999px)'));
    expect(result.current).toBe(false);
  });

  it('updates when the change listener fires (reads media.matches)', () => {
    const mql = {
      matches: false,
      media: '',
      addEventListener: vi.fn((event: string, cb: () => void) => {
        listeners[event] = cb;
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
    window.matchMedia = vi.fn().mockReturnValue(mql) as typeof window.matchMedia;

    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'));
    expect(result.current).toBe(false);

    act(() => {
      mql.matches = true;
      listeners.change?.({} as MediaQueryListEvent);
    });
    expect(result.current).toBe(true);

    act(() => {
      mql.matches = false;
      listeners.change?.({} as MediaQueryListEvent);
    });
    expect(result.current).toBe(false);
  });

  it('removes the listener on unmount', () => {
    const remove = vi.fn();
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      addEventListener: vi.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
        listeners.change = cb;
      }),
      removeEventListener: remove,
      dispatchEvent: vi.fn(),
    })) as typeof window.matchMedia;

    const { unmount } = renderHook(() => useMediaQuery('(orientation: portrait)'));
    unmount();
    expect(remove).toHaveBeenCalledWith('change', expect.any(Function));
  });
});

describe('useBreakpoint', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns mobile when only max-width mobile matches', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('max-width: 767px'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as typeof window.matchMedia;

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.breakpoint).toBe('mobile');
  });

  it('returns tablet when tablet query matches', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches:
        query.includes('min-width: 768px') && query.includes('max-width: 1023px'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as typeof window.matchMedia;

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.breakpoint).toBe('tablet');
  });

  it('returns desktop when min-width 1024 matches', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('min-width: 1024px'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as typeof window.matchMedia;

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.breakpoint).toBe('desktop');
  });
});
