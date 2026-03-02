/**
 * Preload script - runs in isolated context; exposes safe API to renderer.
 * Security: https://www.electronjs.org/docs/latest/tutorial/context-isolation
 * Uses inline channel names so preload has no runtime dependency on shared/
 * (avoids module resolution issues in the preload sandbox).
 */

import { contextBridge, ipcRenderer } from 'electron';

const IPC_CHANNELS = {
  GET_APP_VERSION: 'app:get-version',
  WINDOW_STATE_GET: 'window-state:get',
  WINDOW_STATE_SAVE: 'window-state:save',
  NOTIFICATION_SHOW: 'notification:show',
} as const;

const electronAPI = {
  getAppVersion: () => ipcRenderer.invoke(IPC_CHANNELS.GET_APP_VERSION),
  getWindowState: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW_STATE_GET),
  saveWindowState: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW_STATE_SAVE),
  showNotification: (title: string, body: string) =>
    ipcRenderer.invoke(IPC_CHANNELS.NOTIFICATION_SHOW, { title, body }),
  onMenuFileNew: (fn: () => void) => {
    ipcRenderer.on('menu:file-new', () => fn());
  },
  onMenuFileOpen: (fn: () => void) => {
    ipcRenderer.on('menu:file-open', () => fn());
  },
  onMenuFileSave: (fn: () => void) => {
    ipcRenderer.on('menu:file-save', () => fn());
  },
  onMenuHelpAbout: (fn: () => void) => {
    ipcRenderer.on('menu:help-about', () => fn());
  },
  onMenuHelpDocs: (fn: () => void) => {
    ipcRenderer.on('menu:help-docs', () => fn());
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
