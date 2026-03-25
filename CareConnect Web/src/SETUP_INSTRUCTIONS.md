# Setup Instructions for CareConnect

## Quick Start

Follow these steps to set up and run your CareConnect application locally:

### Step 1: Organize Files (IMPORTANT!)

The project currently has files in both `/` and `/src/` directories. You need to organize them properly:

**Move these directories into `/src/`:**
- `/components/` → `/src/components/`
- `/hooks/` → `/src/hooks/`
- `/store/` → `/src/store/`
- `/styles/` → `/src/styles/`

**Keep these files in the root (`/`):**
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `index.html`
- `.gitignore`
- `.eslintrc.cjs`
- `README.md`

**Delete these old files (after moving to `/src/`):**
- `/App.tsx` (use `/src/App.tsx` instead)
- `/routes.tsx` (use `/src/routes.tsx` instead)

### Step 2: Install Dependencies

Open your terminal in the project root directory and run:

```bash
npm install
```

This will install all required dependencies including React, React Router, Zustand, Tailwind CSS, and more.

### Step 3: Start Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

### Step 4: Test the Application

Default login credentials:
- **Email**: demo@careconnect.com
- **Password**: demo123

## File Structure (After Organization)

```
careconnect/
├── src/
│   ├── components/
│   │   ├── screens/           # All 14 screen components
│   │   ├── figma/            # ImageWithFallback component
│   │   ├── ui/               # UI components
│   │   ├── RootLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── DashboardLayout.tsx
│   ├── hooks/
│   │   └── useMediaQuery.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   └── taskStore.ts
│   ├── styles/
│   │   └── globals.css
│   ├── routes.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Build for Production

```bash
npm run build
```

Production files will be in the `dist/` folder.

## Troubleshooting

### Module not found errors
- Make sure all files are moved to `/src/` directory
- Check that import paths use `./` for relative imports

### Port already in use
- Change the port in `vite.config.ts` (line 13)
- Or kill the process using port 3000

### Styling not working
- Ensure `/src/styles/globals.css` exists
- Check that `@import 'tailwindcss'` is at the top of globals.css

## Next Steps

1. Customize the branding and colors in `/src/styles/globals.css`
2. Add real API endpoints (currently using mock data)
3. Deploy to Vercel, Netlify, or your hosting provider
4. Set up environment variables for production

## Need Help?

Refer to the main `README.md` for detailed documentation about features, components, and architecture.
