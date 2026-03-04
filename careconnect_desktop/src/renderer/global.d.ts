/// <reference types="vite/client" />

interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  getWindowState: () => Promise<{ width: number; height: number; x: number; y: number; isMaximized: boolean }>;
  saveWindowState: () => Promise<void>;
  showNotification: (title: string, body: string) => Promise<void>;
  onMenuFileNew: (fn: () => void) => void;
  onMenuFileOpen: (fn: () => void) => void;
  onMenuFileSave: (fn: () => void) => void;
  onMenuHelpAbout: (fn: () => void) => void;
  onMenuHelpDocs: (fn: () => void) => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
