/**
 * Shared constants for CareConnect Desktop (main + renderer).
 */

export const IPC_CHANNELS = {
  GET_APP_VERSION: 'app:get-version',
  WINDOW_STATE_GET: 'window-state:get',
  WINDOW_STATE_SAVE: 'window-state:save',
  NOTIFICATION_SHOW: 'notification:show',
  TRAY_CLICK: 'tray:click',
  FILE_OPEN: 'file:open',
  FILE_SAVE: 'file:save',
} as const;

export const APP_NAME = 'CareConnect';

/** Window layout breakpoints (px) – design targets for 1024, 1440, 1920 wide. */
export const BREAKPOINTS = {
  SMALL: 1024,
  MEDIUM: 1440,
  LARGE: 1920,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;
