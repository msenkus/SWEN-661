/**
 * Native application menu (File, Edit, View, Help) and keyboard shortcuts.
 * Windows: native menus; shortcuts implemented per design.
 */

import { BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import { getMainWindow } from './window';

const isWindows = process.platform === 'win32';

function createFileMenu(): MenuItemConstructorOptions {
  return {
    label: '&File',
    submenu: [
      {
        label: '&New',
        accelerator: 'Ctrl+N',
        click: () => {
          getMainWindow()?.webContents.send('menu:file-new');
        },
      },
      { type: 'separator' },
      {
        label: '&Open...',
        accelerator: 'Ctrl+O',
        click: () => {
          getMainWindow()?.webContents.send('menu:file-open');
        },
      },
      {
        label: '&Save',
        accelerator: 'Ctrl+S',
        click: () => {
          getMainWindow()?.webContents.send('menu:file-save');
        },
      },
      { type: 'separator' },
      {
        label: 'E&xit',
        accelerator: isWindows ? 'Alt+F4' : 'Cmd+Q',
        role: 'quit',
      },
    ],
  };
}

function createEditMenu(): MenuItemConstructorOptions {
  return {
    label: '&Edit',
    submenu: [
      { label: '&Undo', accelerator: 'Ctrl+Z', role: 'undo' },
      { label: '&Redo', accelerator: 'Ctrl+Y', role: 'redo' },
      { type: 'separator' },
      { label: 'Cu&t', accelerator: 'Ctrl+X', role: 'cut' },
      { label: '&Copy', accelerator: 'Ctrl+C', role: 'copy' },
      { label: '&Paste', accelerator: 'Ctrl+V', role: 'paste' },
      { label: 'Select &All', accelerator: 'Ctrl+A', role: 'selectAll' },
    ],
  };
}

function createViewMenu(win: BrowserWindow | null): MenuItemConstructorOptions {
  return {
    label: '&View',
    submenu: [
      {
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click: () => win?.reload(),
      },
      {
        label: '&Toggle Full Screen',
        accelerator: 'F11',
        click: () => win?.setFullScreen(!win?.isFullScreen()),
      },
      {
        label: '&Toggle Developer Tools',
        accelerator: 'Ctrl+Shift+I',
        click: () => win?.webContents.toggleDevTools(),
      },
      { type: 'separator' },
      {
        label: '&Zoom In',
        accelerator: 'Ctrl+Plus',
        click: () => {
          const wc = win?.webContents;
          if (wc) {
            const level = wc.getZoomLevel();
            wc.setZoomLevel(level + 1);
          }
        },
      },
      {
        label: '&Zoom Out',
        accelerator: 'Ctrl+-',
        click: () => {
          const wc = win?.webContents;
          if (wc) {
            const level = wc.getZoomLevel();
            wc.setZoomLevel(level - 1);
          }
        },
      },
      {
        label: '&Reset Zoom',
        accelerator: 'Ctrl+0',
        click: () => win?.webContents.setZoomLevel(0),
      },
    ],
  };
}

function createHelpMenu(): MenuItemConstructorOptions {
  return {
    label: '&Help',
    submenu: [
      {
        label: '&About CareConnect',
        click: () => {
          getMainWindow()?.webContents.send('menu:help-about');
        },
      },
      {
        label: '&Documentation',
        click: () => {
          getMainWindow()?.webContents.send('menu:help-docs');
        },
      },
    ],
  };
}

export function createApplicationMenu(win: BrowserWindow | null): void {
  const template: MenuItemConstructorOptions[] = [
    createFileMenu(),
    createEditMenu(),
    createViewMenu(win),
    createHelpMenu(),
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
