# FinTrack — Finance Dashboard

A clean, responsive finance dashboard built with Next.js 16, shadcn/ui, Recharts, and Zustand. Users can track financial activity, explore transactions, and understand spending patterns through interactive visualizations.

## Setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## Tech Stack

- **Next.js 16** — App Router with TypeScript
- **shadcn/ui + Radix UI** — Accessible, composable UI primitives
- **Tailwind CSS v4** — Utility-first styling
- **Recharts** — Area, bar, and donut charts
- **Zustand** — Lightweight state management with localStorage persistence
- **GSAP** — Card hover animations, particle effects, spotlight tracking
- **Lucide React** — Icon system

## Approach

The app is structured around the Next.js App Router with a `(dashboard)` route group wrapping all pages under a shared layout (sidebar + topbar + animated background).

**Component organization** is feature-based — `components/dashboard/`, `components/transactions/`, `components/insights/` — keeping related logic colocated rather than splitting by type.

**Zustand** was chosen over Context for state management because it avoids unnecessary re-renders, has a simpler API for multiple stores, and the `persist` middleware gives localStorage support with zero boilerplate. Three stores handle distinct concerns:

- `useTransactionStore` — CRUD operations, hydration, loading state
- `useRoleStore` — Admin/Viewer role with persistence
- `useFilterStore` — Search, category, type, sorting (session-only, resets on refresh)

**Mock API** routes (`/api/transactions`) simulate real REST endpoints with artificial delay, making it easy to swap in a real backend by changing fetch URLs.

## Features

### Dashboard Overview

- **4 summary cards** — Total Balance, Total Income, Total Expenses, Savings Rate
- **Balance trend chart** — Area chart showing income vs expenses over the last 6 months
- **Spending breakdown** — Donut chart with top 6 categories, percentages, and amounts
- **Interactive card effects** — GSAP-powered hover particles, mouse-tracking spotlight glow, and border gradients

### Transactions

- Responsive layout: card-based on mobile, table on desktop
- Search by description
- Filter by category (10 types) and type (income/expense)
- Combined sort dropdown — sort by date or amount, ascending or descending
- Add, edit, and delete transactions (admin only)
- CSV export of filtered transactions (admin only)

### Insights

- **Spending trend banner** — Month-over-month comparison with contextual messaging (up/down/consistent)
- **Monthly comparison chart** — Bar chart of income vs expenses for the last 6 months
- **Top 5 spending categories** — Horizontal bar chart with labels and percentages
- **Stat cards** — Biggest transaction, average daily spend, months tracked

### Role-Based UI

Switch roles via the sidebar footer dropdown or the topbar toggle. Both stay in sync via shared Zustand store.

- **Admin** — Full access: add, edit, delete transactions, export CSV
- **Viewer** — Read-only: all data visible, modification controls hidden

### Dark Mode

Theme toggle in the topbar. Uses `next-themes` with system preference detection.

### Responsive Design

All pages adapt across screen sizes. Transactions switch between card and table layouts. Sidebar collapses on mobile. Filters stack vertically on smaller screens.

### Empty States

- Transactions table shows a centered "No transactions found" message with filter adjustment hint when filters return no results
- Insight stats gracefully handle zero-data scenarios
- Skeleton loaders shown during data fetching instead of blank screens

### Animations

- **GSAP card effects** — Hover particles with theme-aware colors, cursor-tracking spotlight, border glow
- **Background** — Canvas-based twinkling stars and SVG shooting stars across the dashboard layout
- **CSS transitions** — Card lift on hover, smooth theme switching, sidebar slide animations

## Project Structure

```
app/
  (dashboard)/          Route group with shared sidebar layout
    dashboard/          Summary cards + charts
    transactions/       Transaction table + filters + CSV export
    insights/           Spending analysis + stats
  api/transactions/     Mock REST API (GET, POST, PUT, DELETE)
components/
  dashboard/            SummaryCards, BalanceTrendChart, SpendingBreakdownChart, DashboardBento
  transactions/         TransactionTable, TransactionFilters, AddTransactionModal, EditTransactionModal
  insights/             InsightsBanner, MonthlyComparisonChart, TopCategoryCard
  skeletons/            Loading skeletons for each page
  layout/               Sidebar, Topbar, RoleSwitcher
  ui/                   shadcn/ui primitives
store/                  Zustand stores (transactions, role, filters)
data/                   Mock data + category configuration
types/                  TypeScript type definitions
```

## State Management

| Store | Persisted | Purpose |
|-------|-----------|---------|
| `useTransactionStore` | Yes (localStorage) | Transaction CRUD, hydration, loading |
| `useRoleStore` | Yes (localStorage) | Admin/Viewer role |
| `useFilterStore` | No (session-only) | Search, category, type, sorting |

## Mock API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/transactions` | GET | Fetch all transactions (400ms delay) |
| `/api/transactions` | POST | Create a transaction |
| `/api/transactions/[id]` | PUT | Update a transaction |
| `/api/transactions/[id]` | DELETE | Delete a transaction |

Data lives in a module-level array seeded from mock data. State resets on server restart (intentional for demo).

## Assumptions

- Currency is Indian Rupees (INR) with Indian number formatting
- Date range is Nov 2025 – Apr 2026 for demo data
- 10 spending categories: Food, Transport, Shopping, Bills, Entertainment, Health, Travel, Salary, Freelance, Other
