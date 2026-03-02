/**
 * Window creation and state management.
 * Remembers size, position, and maximized state (Windows).
 */

import { BrowserWindow, screen } from 'electron';
import Store from 'electron-store';
import type { WindowState } from '../shared/types';

// Use require so Jest can resolve path when main process runs in Node test environment
const path = require('path') as typeof import('path');

const store = new Store<{ windowState: WindowState }>({ name: 'careconnect-window-state' });

const DEFAULT_STATE: WindowState = {
  width: 1200,
  height: 800,
  x: 0,
  y: 0,
  isMaximized: false,
};

let mainWindow: BrowserWindow | null = null;

function getStoredState(): WindowState {
  const stored = store.get('windowState');
  if (!stored) return { ...DEFAULT_STATE };
  const bounds = screen.getPrimaryDisplay().bounds;
  return {
    width: Math.min(stored.width ?? DEFAULT_STATE.width, bounds.width),
    height: Math.min(stored.height ?? DEFAULT_STATE.height, bounds.height),
    x: stored.x ?? 0,
    y: stored.y ?? 0,
    isMaximized: Boolean(stored.isMaximized),
  };
}

function saveState(win: BrowserWindow): void {
  const state: WindowState = {
    ...win.getBounds(),
    isMaximized: win.isMaximized(),
  };
  store.set('windowState', state);
}

export function saveWindowState(): void {
  if (mainWindow && !mainWindow.isDestroyed()) {
    saveState(mainWindow);
  }
}

export function restoreWindowState(): void {
  // State is applied in createWindow
}

export function createWindow(isDev: boolean): BrowserWindow {
  const state = getStoredState();

  const win = new BrowserWindow({
    width: state.width,
    height: state.height,
    x: state.x,
    y: state.y,
    minWidth: 800,
    minHeight: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
    titleBarStyle: process.platform === 'win32' ? 'default' : 'hiddenInset',
  });

  if (state.isMaximized) {
    win.maximize();
  }

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../../dist-renderer/index.html'));
  }

  win.once('ready-to-show', () => {
    win.show();
  });

  mainWindow = win;
  return win;
}

export function getMainWindow(): BrowserWindow | null {
  return mainWindow;
}

export function getWindowState(): WindowState {
  if (mainWindow && !mainWindow.isDestroyed()) {
    return {
      ...mainWindow.getBounds(),
      isMaximized: mainWindow.isMaximized(),
    };
  }
  return getStoredState();
}
