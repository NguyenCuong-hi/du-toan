# Frappe HRM Frontend Base

An enterprise-grade Human Resource Management (HRM) frontend base built with **Vue 3 (Composition API)**, **Frappe UI**, **Tailwind CSS**, and **Vite**, powered by the authentic **Frappe Espresso Design System** (the design system behind ERPNext v15/v16 Desk).

---

## 🎨 Design System: Espresso Tokens

The project converts and implements the official **Espresso Design Tokens** natively in [src/index.css](file:///c:/WorkSpaces/frappe-ui-starter/frontend/src/index.css) and [tailwind.config.js](file:///c:/WorkSpaces/frappe-ui-starter/frontend/tailwind.config.js) without external template dependencies:

- **Surface Tokens**: `--surface-base` (#ffffff), `--surface-gray-1` through `--surface-gray-10`, `--surface-sidebar` (#f8f8f8), `--surface-elevation-1/2/3`.
- **Ink Tokens (Text & Icons)**: `--ink-gray-1` through `--ink-gray-9` (#0f0f0f), `--ink-blue-*`, `--ink-green-*`, `--ink-red-*`.
- **Outline Tokens (Borders)**: `--outline-gray-1` (#ededed), `--outline-gray-2` (#e2e2e2), `--outline-gray-3` (#c7c7c7).
- **Radius Scale**: `--radius-sm` (4px), `--radius` (8px), `--radius-md` (10px), `--radius-lg` (12px), `--radius-xl` (16px), `--radius-2xl` (20px).
- **Elevation Shadows**: `--elevation-sm`, `--elevation-base`, `--elevation-md`, `--elevation-lg`.
- **Typography**: Inter font scale, `--font-weight-regular` (420), `--font-weight-medium` (500), `--font-weight-semibold` (600), `--font-weight-bold` (700).

---

## 🏛️ Workspace Layout Structure

- **Tier 1: Narrow Icon Rail (`AppIconRail.vue`)**:
  - Blue squircle logo (`E`)
  - Awesomebar search button (`Ctrl + K`)
  - Notifications bell with live indicator
  - Stacked module icon rail (`sliders`, `users`, `calendar`, `dollar-sign`, `user-plus`, `settings`)
  - Bottom `NV` avatar with account popover
- **Tier 2: Workspace Navigation Sidebar (`AppWorkspaceSidebar.vue`)**:
  - Workspace selector dropdown (`Setup` / `Human Resources`)
  - Standard sidebar navigation items with `.espresso-sidebar-item` states
- **Top Content Bar (`AppTopBar.vue`)**:
  - Hamburger toggle (`[≡]`) to collapse/expand sidebar
  - Workspace Title (`Home`)
  - More actions button (`...`)
- **Workspace Dashboard (`Dashboard.vue`)**:
  - Onboarding card (`Good morning, Nguyen` with segmented step progress, active `Invite your team` action, and quick guide links)
  - Analytics card (`Attendance & Headcount` with filter funnel and more actions)
  - Bottom KPI cards (Total Employees, On Leave Today, Monthly Payroll)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
yarn install
```

### 2. Start development server
```bash
yarn dev
```
Open `http://localhost:8080/`.

### 3. Production build
```bash
yarn build
```
