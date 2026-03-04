/**
 * System tray integration (Windows).
 */

import { BrowserWindow, Tray, nativeImage } from 'electron';
import path from 'path';

let tray: Tray | null = null;

function getTrayIconPath(): string {
  const iconName = process.platform === 'win32' ? 'tray.ico' : 'tray.png';
  return path.join(__dirname, '..', '..', 'build', iconName);
}

export function setupTray(win: BrowserWindow | null): void {
  if (process.platform !== 'win32') return;

  try {
    const iconPath = getTrayIconPath();
    const icon = nativeImage.createFromPath(iconPath);
    if (icon.isEmpty()) {
      return;
    }
    tray = new Tray(icon.resize({ width: 16, height: 16 }));
    tray.setToolTip('CareConnect');
    tray.on('click', () => {
      if (win) {
        win.show();
        win.focus();
      }
    });
  } catch {
    // Tray optional; no icon or platform issue
  }
}

export function getTray(): Tray | null {
  return tray;
}
