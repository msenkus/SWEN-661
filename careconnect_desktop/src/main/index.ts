/**
 * CareConnect Desktop - Main Process
 * Handles window lifecycle, menu, tray, and IPC.
 * Process model: https://www.electronjs.org/docs/latest/tutorial/process-model
 */

import { app, shell } from 'electron';
import { registerIpcHandlers } from './ipc';
import { createApplicationMenu } from './menu';
import { setupTray } from './tray';
import { createWindow, getMainWindow, restoreWindowState, saveWindowState } from './window';

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function main(): void {
  if (app.isPackaged) {
    const squirrel = process.argv[1];
    if (squirrel && /^--squirrel-/.test(squirrel)) {
      app.quit();
      return;
    }
  }

  app.whenReady().then(() => {
    restoreWindowState();
    const win = createWindow(isDev);
    createApplicationMenu(win);
    setupTray(win);
    registerIpcHandlers();

    win?.on('close', () => {
      saveWindowState();
    });
  });

  app.on('window-all-closed', () => {
    saveWindowState();
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    const win = getMainWindow();
    if (win) {
      win.show();
      win.focus();
    } else {
      restoreWindowState();
      createWindow(isDev);
    }
  });

  // Security: prevent navigation to external URLs in the same window
  app.on('web-contents-created', (_, contents) => {
    contents.setWindowOpenHandler(() => ({ action: 'deny' }));
    contents.on('will-navigate', (event, url) => {
      const parsed = new URL(url);
      if (parsed.origin !== (isDev ? 'http://localhost:5173' : 'file://')) {
        event.preventDefault();
        shell.openExternal(url).catch(() => {});
      }
    });
  });
}

main();
