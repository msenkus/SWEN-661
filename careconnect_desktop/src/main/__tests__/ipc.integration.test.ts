/**
 * Integration tests: IPC communication between main and renderer.
 * Mocks Electron so main-process handlers can run in Jest.
 * @jest-environment node
 */

const mockHandle = jest.fn();
const mockAppGetVersion = jest.fn(() => '1.0.0');
const mockShow = jest.fn();
const mockBounds = { width: 1200, height: 800, x: 10, y: 20 };
const mockIsMaximized = jest.fn(() => false);
const mockIsDestroyed = jest.fn(() => false);
const mockOnce = jest.fn();
const mockLoadURL = jest.fn();
const mockLoadFile = jest.fn();
const mockMaximize = jest.fn();

const MockBrowserWindow = jest.fn().mockImplementation(() => ({
  getBounds: () => mockBounds,
  isMaximized: mockIsMaximized,
  isDestroyed: mockIsDestroyed,
  once: mockOnce,
  loadURL: mockLoadURL,
  loadFile: mockLoadFile,
  maximize: mockMaximize,
  webContents: { openDevTools: jest.fn() },
}));

const mockStoreGet = jest.fn();
const mockStoreSet = jest.fn();

jest.mock('electron', () => ({
  ipcMain: { handle: mockHandle },
  app: { getVersion: mockAppGetVersion },
  Notification: jest.fn().mockImplementation(() => ({ show: mockShow })),
  BrowserWindow: MockBrowserWindow,
  screen: {
    getPrimaryDisplay: () => ({ bounds: { width: 1920, height: 1080 } }),
  },
}));

jest.mock('electron-store', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    get: mockStoreGet,
    set: mockStoreSet,
  })),
}));

import { IPC_CHANNELS } from '../../shared/constants';
import { registerIpcHandlers } from '../ipc';
import { createWindow } from '../window';

describe('IPC integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStoreGet.mockReturnValue(undefined);
    mockIsDestroyed.mockReturnValue(false);
    mockIsMaximized.mockReturnValue(false);
  });

  describe('handler registration', () => {
    it('registers GET_APP_VERSION handler', () => {
      createWindow(true);
      registerIpcHandlers();

      const channels = mockHandle.mock.calls.map((c: [string]) => c[0]);
      expect(channels).toContain(IPC_CHANNELS.GET_APP_VERSION);
    });

    it('registers WINDOW_STATE_GET and WINDOW_STATE_SAVE handlers', () => {
      createWindow(true);
      registerIpcHandlers();

      const channels = mockHandle.mock.calls.map((c: [string]) => c[0]);
      expect(channels).toContain(IPC_CHANNELS.WINDOW_STATE_GET);
      expect(channels).toContain(IPC_CHANNELS.WINDOW_STATE_SAVE);
    });

    it('registers NOTIFICATION_SHOW handler', () => {
      createWindow(true);
      registerIpcHandlers();

      const channels = mockHandle.mock.calls.map((c: [string]) => c[0]);
      expect(channels).toContain(IPC_CHANNELS.NOTIFICATION_SHOW);
    });
  });

  describe('GET_APP_VERSION', () => {
    it('returns app version from main process', async () => {
      mockAppGetVersion.mockReturnValue('2.0.0');
      createWindow(true);
      registerIpcHandlers();

      const call = mockHandle.mock.calls.find(
        (c: [string, () => unknown]) => c[0] === IPC_CHANNELS.GET_APP_VERSION
      );
      const handler = call[1];
      const result = await handler();

      expect(result).toBe('2.0.0');
      expect(mockAppGetVersion).toHaveBeenCalled();
    });
  });

  describe('WINDOW_STATE_GET', () => {
    it('returns current window state from main process', async () => {
      createWindow(true);
      registerIpcHandlers();

      const call = mockHandle.mock.calls.find(
        (c: [string, () => unknown]) => c[0] === IPC_CHANNELS.WINDOW_STATE_GET
      );
      const handler = call[1];
      const result = await handler();

      expect(result).toEqual({
        ...mockBounds,
        isMaximized: false,
      });
    });
  });

  describe('WINDOW_STATE_SAVE', () => {
    it('invokes saveWindowState when renderer requests save', async () => {
      createWindow(true);
      registerIpcHandlers();

      const call = mockHandle.mock.calls.find(
        (c: [string, () => unknown]) => c[0] === IPC_CHANNELS.WINDOW_STATE_SAVE
      );
      const handler = call[1];
      await handler();

      expect(mockStoreSet).toHaveBeenCalledWith('windowState', expect.any(Object));
    });
  });

  describe('NOTIFICATION_SHOW', () => {
    it('shows notification when valid payload is sent', async () => {
      createWindow(true);
      registerIpcHandlers();

      const call = mockHandle.mock.calls.find(
        (c: [string]) => c[0] === IPC_CHANNELS.NOTIFICATION_SHOW
      );
      const handler = call[1];
      await handler(undefined, { title: 'Reminder', body: 'Take medication' });

      expect(mockShow).toHaveBeenCalled();
    });

    it('throws when payload is invalid', async () => {
      createWindow(true);
      registerIpcHandlers();

      const call = mockHandle.mock.calls.find(
        (c: [string]) => c[0] === IPC_CHANNELS.NOTIFICATION_SHOW
      );
      const handler = call[1];

      expect(() =>
        handler(undefined, { title: 123, body: 'x' } as unknown as { title: string; body: string })
      ).toThrow('Invalid notification payload');

      expect(() =>
        handler(undefined, { title: 'x', body: null } as unknown as { title: string; body: string })
      ).toThrow('Invalid notification payload');
    });
  });
});
