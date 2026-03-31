# CareConnect - Care Management Application

A comprehensive care management application designed for individuals who need assistance with daily tasks, medications, and appointments. Built with accessibility as a priority, featuring high contrast options, large text, multiple notification methods, and ASL video support.

## Features

### 14 Complete Screens
- **Authentication Flow**: Login, Register, Welcome
- **Dashboard**: Today's tasks, progress tracking, quick actions
- **Medication Management**: List view, reminders
- **Task Management**: Task guidance, missed task alerts, task history
- **Appointments**: Upcoming appointments, calendar view
- **Accessibility**: ASL help videos, accessibility settings, high contrast mode
- **Profile**: User profile management
- **Emergency**: SOS confirmation flow

### Accessibility Features
- High contrast mode toggle
- Large text option
- Multiple notification methods (visual, audio, vibration)
- ASL video support for task guidance
- Keyboard navigation support
- Screen reader optimized

### Responsive Design
- **Mobile (320px-767px)**: Single column layout, hamburger menu
- **Tablet (768px-1023px)**: Two column layout, collapsible sidebar
- **Desktop (1024px+)**: Multi-column layout, full navigation

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router 7** - Client-side routing with Data mode
- **Zustand** - State management (auth & tasks)
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Icon library
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. **Clone or download this repository**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
careconnect/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx          # Main app shell with navigation
│   │   │   ├── MobileNav.tsx          # Mobile hamburger navigation
│   │   │   ├── TabletNav.tsx          # Tablet collapsible sidebar
│   │   │   └── DesktopNav.tsx         # Desktop full sidebar
│   │   ├── screens/
│   │   │   ├── TodayDashboard.tsx     # Main dashboard
│   │   │   ├── MedicationList.tsx     # Medication management
│   │   │   ├── TaskGuidance.tsx       # Step-by-step task guidance
│   │   │   ├── MissedTaskAlert.tsx    # Missed tasks overview
│   │   │   ├── ASLHelp.tsx            # ASL video help
│   │   │   ├── AccessibilitySettings.tsx
│   │   │   ├── AppointmentList.tsx
│   │   │   ├── AppointmentDetail.tsx
│   │   │   ├── SOSConfirmation.tsx
│   │   │   ├── TaskHistory.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Welcome.tsx
│   │   └── ProtectedRoute.tsx         # Route protection
│   ├── store/
│   │   ├── authStore.ts               # Authentication state
│   │   └── taskStore.ts               # Task management state
│   ├── hooks/
│   │   └── useMediaQuery.ts           # Responsive breakpoint hooks
│   ├── styles/
│   │   └── globals.css                # Global styles + Tailwind
│   ├── routes.ts                      # React Router configuration
│   ├── App.tsx                        # Root component
│   └── main.tsx                       # Application entry point
├── index.html                         # HTML entry point
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript configuration
├── vite.config.ts                     # Vite configuration
└── README.md                          # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## State Management

### Auth Store (Zustand)
- User authentication state
- Login/logout functionality
- User profile data
- High contrast mode preference

### Task Store (Zustand)
- Daily task list
- Task completion tracking
- Missed task alerts
- Task history

## Default Login Credentials

For testing purposes, use:
- **Email**: demo@careconnect.com
- **Password**: demo123

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is for demonstration purposes.

## Support

For questions or issues, please contact the development team.
