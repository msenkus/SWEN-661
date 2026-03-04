# CareConnect Desktop (Windows)

Electron + React desktop app for CareConnect. Target platform: **Windows** (native menus, notifications, NSIS installer).

---

## Quick start

### 1. Run the application

From the project root (`careconnect_desktop`):

```bash
npm install
npm run dev
```

The CareConnect window will open. For a production-style run (no dev tools, no hot reload), use:

```bash
npm start
```

### 2. Log in

- On the **Welcome** screen, click **Login** (or go directly to the login screen).
- Use these credentials (shown on the login page):

  | Field    | Value                     |
  |----------|---------------------------|
  | Email    | `Patient@careconnect.com` |
  | Password | `Password1234`            |

- Click **Sign In** to open the dashboard. From there you can use the sidebar to open Medications, Appointments, Task History, ASL Help, Settings, and Profile.

---

## Requirements

- **Node.js 20+**
- Windows for building the installer (or cross-compile from macOS/Linux).

If `npm install` fails when downloading Electron, try:

```bash
npm install --no-optional
```

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Run with hot reload and dev tools (recommended for development). |
| `npm start` | Build and run the app (production build, no dev tools). |
| `npm run build` | Build main process + React app for production. |
| `npm run build:main` | Compile main process TypeScript only. |
| `npm run build:renderer` | Build React app with Vite. |
| `npm run lint` | Run ESLint on `src`. |
| `npm run lint:fix` | ESLint with auto-fix. |
| `npm run pack` | Build unpacked app in `release/`. |
| `npm run dist` | Build Windows NSIS installer in `release/`. |

---

## Accessibility

- **Focus indicators** – Visible focus on all interactive elements via `:focus-visible` (default and dark themes). High-contrast mode uses a stronger 3px outline. Login inputs use a custom focus ring (border + box-shadow).
- **Screen reader support** – Interactive elements use `aria-label`, `aria-checked`, `aria-pressed`, `role="switch"` / `role="button"` where appropriate; decorative content uses `aria-hidden`. Test with **NVDA** (Windows) or **VoiceOver** (Mac: Cmd+F5).
- **Keyboard navigation** – Every feature is usable with keyboard only:
  - **Dashboard:** Tab to “Skip to main content” first (then Enter) to jump past the sidebar, or Tab through sidebar links → main content. Task rows are focusable (`role="button"`, `tabIndex={0}`); use **Enter** or **Space** to toggle. Buttons and links use default activation (Enter).
  - **Login / Register:** Tab through inputs and buttons; **Enter** submits forms or activates buttons/links.
  - **Medications, Appointments, Task History, Settings, Accessibility, ASL Help, Profile:** All controls are `<button>` or `<Link>`; Tab to focus, **Enter** to activate. Filter and toggle buttons behave as native controls.
  - **Testing:** Use **Tab** / **Shift+Tab** to move focus and **Enter** / **Space** to activate. Ensure no feature requires a mouse (e.g. hover-only actions).

---

## Assignment-related (Part 1 checklist)

- **Main / renderer separation** – Main in `src/main/`, renderer in `src/renderer/`, shared in `src/shared/`.
- **Native menu bar** – File, Edit, View, Help (see `src/main/menu.ts`).
- **Keyboard shortcuts** – File: Ctrl+N, Ctrl+O, Ctrl+S, Alt+F4; Edit: Undo/Redo/Cut/Copy/Paste/Select All; View: Reload, F11, Zoom, DevTools.
- **Window state** – Size, position, and maximized state saved/restored via `electron-store` (`src/main/window.ts`).
- **System tray** – Windows tray icon; click to show/focus window (`src/main/tray.ts`). Optional: add `build/tray.ico` for icon.
- **React in renderer** – Vite + React + React Router in `src/renderer/`.
- **Security** – `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`, preload exposes a minimal API via `contextBridge`.
- **ESLint** – Config in `.eslintrc.cjs`; run `npm run lint`.
- **Windows** – Native menus, notifications (via Electron’s `Notification`), NSIS installer (`npm run dist`).

---

## Folder structure

- **`src/main/`** – Main process (Electron): window, menu, tray, IPC, preload.
- **`src/renderer/`** – Renderer process: React app (screens, components).
- **`src/shared/`** – Shared types and constants used by both processes.
- **`build/`** – Build assets (e.g. `icon.ico`, `tray.ico` for Windows).

---

## Adding screens

Screens go in `src/renderer/screens/`. Add routes in `src/renderer/App.tsx` and navigation in your layout.

---

## Window layouts (1024px, 1440px, 1920px)

Layouts are designed for three window widths:

| Width        | Breakpoint | Content max-width | Use in code |
|-------------|------------|-------------------|-------------|
| 1024px      | `SMALL`    | 1024px            | `BREAKPOINTS.SMALL` |
| 1440px      | `MEDIUM`   | 1280px            | `BREAKPOINTS.MEDIUM` |
| 1920px+     | `LARGE` / `xlarge` | 1600px / 1920px | `BREAKPOINTS.LARGE` |

- **CSS:** Use `var(--content-max-width)` and `var(--content-padding)`; they update at 1024px, 1440px, and 1920px. The `.content-width` class centers content and applies padding.
- **React:** Use `useBreakpoint()` or `useWindowWidth()` from `src/renderer/hooks/useBreakpoint.ts` to branch layout or show/hide elements per width.
- **Constants:** `src/shared/constants.ts` exports `BREAKPOINTS` (1024, 1440, 1920) for use in main or renderer.

---

## Optional: app icon

Add `build/icon.ico` (e.g. 256×256 or multi-size) and set `"icon": "build/icon.ico"` under `build.win` in `package.json` for the installer icon.
