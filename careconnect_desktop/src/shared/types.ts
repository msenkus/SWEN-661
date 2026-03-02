/**
 * Shared types for CareConnect Desktop.
 */

export interface WindowState {
  width: number;
  height: number;
  x: number;
  y: number;
  isMaximized: boolean;
}

export interface NotificationOptions {
  title: string;
  body: string;
}
