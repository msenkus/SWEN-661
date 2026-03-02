/**
 * IPC handlers - main process only. Validate all input from renderer.
 */

import { ipcMain, Notification } from 'electron';
import { app } from 'electron';
import { IPC_CHANNELS } from '../shared/constants';
import { getMainWindow, getWindowState, saveWindowState } from './window';

export function registerIpcHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.GET_APP_VERSION, () => {
    return app.getVersion();
  });

  ipcMain.handle(IPC_CHANNELS.WINDOW_STATE_GET, () => {
    return getWindowState();
  });

  ipcMain.handle(IPC_CHANNELS.WINDOW_STATE_SAVE, () => {
    saveWindowState();
  });

  ipcMain.handle(IPC_CHANNELS.NOTIFICATION_SHOW, (_event, payload: { title: string; body: string }) => {
    if (typeof payload?.title !== 'string' || typeof payload?.body !== 'string') {
      throw new Error('Invalid notification payload');
    }
    const win = getMainWindow();
    if (!win || win.isDestroyed()) return;
    const n = new Notification({
      title: payload.title,
      body: payload.body,
    });
    n.show();
  });
}
