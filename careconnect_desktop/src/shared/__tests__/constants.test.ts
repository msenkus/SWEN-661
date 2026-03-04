import { IPC_CHANNELS, APP_NAME, BREAKPOINTS } from '../constants';

describe('constants', () => {
  describe('IPC_CHANNELS', () => {
    it('defines GET_APP_VERSION', () => {
      expect(IPC_CHANNELS.GET_APP_VERSION).toBe('app:get-version');
    });

    it('defines WINDOW_STATE_GET and WINDOW_STATE_SAVE', () => {
      expect(IPC_CHANNELS.WINDOW_STATE_GET).toBe('window-state:get');
      expect(IPC_CHANNELS.WINDOW_STATE_SAVE).toBe('window-state:save');
    });

    it('defines NOTIFICATION_SHOW', () => {
      expect(IPC_CHANNELS.NOTIFICATION_SHOW).toBe('notification:show');
    });

    it('defines FILE_OPEN and FILE_SAVE', () => {
      expect(IPC_CHANNELS.FILE_OPEN).toBe('file:open');
      expect(IPC_CHANNELS.FILE_SAVE).toBe('file:save');
    });
  });

  describe('APP_NAME', () => {
    it('is CareConnect', () => {
      expect(APP_NAME).toBe('CareConnect');
    });
  });

  describe('BREAKPOINTS', () => {
    it('has SMALL, MEDIUM, LARGE numeric values', () => {
      expect(BREAKPOINTS.SMALL).toBe(1024);
      expect(BREAKPOINTS.MEDIUM).toBe(1440);
      expect(BREAKPOINTS.LARGE).toBe(1920);
    });

    it('orders breakpoints from smallest to largest', () => {
      expect(BREAKPOINTS.SMALL).toBeLessThan(BREAKPOINTS.MEDIUM);
      expect(BREAKPOINTS.MEDIUM).toBeLessThan(BREAKPOINTS.LARGE);
    });
  });
});
