import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/setup',
  },
  {
    path: '/setup',
    name: 'Home',
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    path: '/hrm',
    name: 'HRM',
    component: () => import('@/pages/Employees.vue'),
  },
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('@/pages/Employees.vue'),
  },
  {
    path: '/leaves',
    name: 'Leaves & Attendance',
    component: () => import('@/pages/Leaves.vue'),
  },
  {
    path: '/payroll',
    name: 'Payroll',
    component: () => import('@/pages/Payroll.vue'),
  },
  {
    path: '/recruitment',
    name: 'Recruitment',
    component: () => import('@/pages/Recruitment.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/pages/Settings.vue'),
  },
]

// Support both standalone Vite dev mode (/) and Frappe production (/frontend)
const historyBase =
  typeof window !== 'undefined' && window.location.pathname.startsWith('/frontend')
    ? '/frontend'
    : '/'

const router = createRouter({
  history: createWebHistory(historyBase),
  routes,
})

export default router
