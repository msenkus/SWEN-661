/**
 * Integration tests: window management (create, state, save/restore).
 * Mocks Electron and electron-store so main-process code runs in Jest.
 * @jest-environment node
 */

const mockBounds = { width: 1200, height: 800, x: 0, y: 0 };
const mockIsMaximized = jest.fn(() => false);
const mockIsDestroyed = jest.fn(() => false);
const mockOnce = jest.fn((_event: string, fn: () => void) => {
  if (typeof fn === 'function') fn();
});
const mockLoadURL = jest.fn();
const mockLoadFile = jest.fn();
const mockMaximize = jest.fn();
const mockShow = jest.fn();

const MockBrowserWindow = jest.fn().mockImplementation(() => ({
  getBounds: () => mockBounds,
  isMaximized: mockIsMaximized,
  isDestroyed: mockIsDestroyed,
  once: mockOnce,
  loadURL: mockLoadURL,
  loadFile: mockLoadFile,
  maximize: mockMaximize,
  show: mockShow,
  webContents: { openDevTools: jest.fn() },
}));

const mockStoreGet = jest.fn();
const mockStoreSet = jest.fn();

jest.mock('electron', () => ({
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

import { createWindow, getMainWindow, getWindowState, saveWindowState } from '../window';

describe('Window management integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStoreGet.mockReturnValue(undefined);
    mockIsDestroyed.mockReturnValue(false);
    mockIsMaximized.mockReturnValue(false);
  });

  describe('createWindow', () => {
    it('creates a BrowserWindow with expected options', () => {
      createWindow(false);

      expect(MockBrowserWindow).toHaveBeenCalledWith(
        expect.objectContaining({
          width: 1200,
          height: 800,
          minWidth: 800,
          minHeight: 600,
          show: false,
          webPreferences: expect.objectContaining({
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
          }),
        })
      );
    });

    it('loads dev URL when isDev is true', () => {
      createWindow(true);

      expect(mockLoadURL).toHaveBeenCalledWith('http://localhost:5173');
      expect(mockLoadFile).not.toHaveBeenCalled();
    });

    it('loads file when isDev is false', () => {
      createWindow(false);

      expect(mockLoadFile).toHaveBeenCalled();
      expect(mockLoadURL).not.toHaveBeenCalled();
    });

    it('applies stored state when available', () => {
      mockStoreGet.mockReturnValue({
        width: 1000,
        height: 700,
        x: 50,
        y: 50,
        isMaximized: false,
      });

      createWindow(false);

      expect(MockBrowserWindow).toHaveBeenCalledWith(
        expect.objectContaining({
          width: 1000,
          height: 700,
          x: 50,
          y: 50,
        })
      );
    });

    it('calls maximize when stored state is maximized', () => {
      mockStoreGet.mockReturnValue({
        width: 1200,
        height: 800,
        x: 0,
        y: 0,
        isMaximized: true,
      });

      createWindow(false);

      expect(mockMaximize).toHaveBeenCalled();
    });

    it('registers ready-to-show to show window', () => {
      createWindow(false);

      expect(mockOnce).toHaveBeenCalledWith('ready-to-show', expect.any(Function));
    });
  });

  describe('getMainWindow', () => {
    it('returns the created window after createWindow', () => {
      const win = createWindow(false);

      expect(getMainWindow()).toBe(win);
    });
  });

  describe('getWindowState', () => {
    it('returns current bounds and maximized when window exists', () => {
      createWindow(false);

      const state = getWindowState();

      expect(state).toEqual({
        ...mockBounds,
        isMaximized: false,
      });
    });

    it('returns stored state when no window', () => {
      mockStoreGet.mockReturnValue({
        width: 900,
        height: 600,
        x: 100,
        y: 100,
        isMaximized: false,
      });

      createWindow(false);
      mockIsDestroyed.mockReturnValue(true);

      const state = getWindowState();

      expect(mockStoreGet).toHaveBeenCalledWith('windowState');
      expect(state.width).toBe(900);
      expect(state.height).toBe(600);
    });
  });

  describe('saveWindowState', () => {
    it('persists bounds and maximized to store when window exists', () => {
      createWindow(false);

      saveWindowState();

      expect(mockStoreSet).toHaveBeenCalledWith(
        'windowState',
        expect.objectContaining({
          width: mockBounds.width,
          height: mockBounds.height,
          isMaximized: false,
        })
      );
    });

    it('does not call store.set when window is destroyed', () => {
      createWindow(false);
      mockIsDestroyed.mockReturnValue(true);

      saveWindowState();

      mockStoreSet.mockClear();
      saveWindowState();
      expect(mockStoreSet).not.toHaveBeenCalled();
    });
  });
});
