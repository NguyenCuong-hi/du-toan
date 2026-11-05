import { ref, computed } from 'vue'

const notifications = ref([
  {
    id: 1,
    title: 'New Leave Request',
    message: 'Sarah Lin applied for 3 days Casual Leave.',
    type: 'leave',
    time: '10m ago',
    read: false,
    actionRequired: true,
    actionId: 'LV-2026-089',
  },
  {
    id: 2,
    title: 'Attendance Anomaly',
    message: 'David Kim clocked in 45 minutes late today.',
    type: 'attendance',
    time: '1h ago',
    read: false,
    actionRequired: false,
  },
  {
    id: 3,
    title: 'Payroll Generated',
    message: 'Salary slips for October 2026 have been drafted for 42 employees.',
    type: 'payroll',
    time: '3h ago',
    read: false,
    actionRequired: true,
    actionId: 'PR-2026-10',
  },
  {
    id: 4,
    title: 'New Candidate Applied',
    message: 'Elena Rostova submitted resume for Senior Vue.js Engineer.',
    type: 'recruitment',
    time: 'Yesterday',
    read: true,
    actionRequired: false,
  },
  {
    id: 5,
    title: 'Holiday Reminder',
    message: 'Office will be closed this Friday for Public Holiday.',
    type: 'system',
    time: '2 days ago',
    read: true,
    actionRequired: false,
  },
])

export function useNotifications() {
  const unreadCount = computed(
    () => notifications.value.filter((n) => !n.read).length
  )

  function markAsRead(id) {
    const item = notifications.value.find((n) => n.id === id)
    if (item) item.read = true
  }

  function markAllAsRead() {
    notifications.value.forEach((n) => (n.read = true))
  }

  function removeNotification(id) {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
  }
}
