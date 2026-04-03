# FinTrack — Finance Dashboard

A clean, responsive finance dashboard built with Next.js 16, shadcn/ui, Recharts, and Zustand.

## Setup
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:3000

## Tech Stack
- Next.js 16 (App Router)
- shadcn/ui (all UI components)
- Tailwind CSS v4
- Recharts (data visualization)
- Zustand (state management with localStorage persistence)
- Lucide React (icons)

## Features
- Dashboard overview with summary cards and charts
- Transaction management with filtering, sorting, search
- Role-based UI (Admin/Viewer) switchable via dropdown
- Insights page with spending analysis
- Dark mode support
- CSV export (admin only)
- Mock API via Next.js Route Handlers

## Role Switching
Use the role switcher dropdown in the sidebar footer or the topbar.
- Admin: can add, edit, delete transactions and export CSV
- Viewer: read-only access to all data

## State Management
Zustand stores handle all app state. Transactions and role persist to localStorage. Filters are session-only (reset on refresh).

## Mock API
Next.js Route Handlers at /api/transactions simulate a real REST API with artificial delay. Data lives in a module-level array seeded from mock data. Swapping to a real backend only requires changing the fetch URLs.

## Assumptions
- Currency is Indian Rupees (INR) with Indian number formatting
- Date range is Nov 2025 – Apr 2026 for demo data
- Module-level API state resets on server restart (intentional for demo)
