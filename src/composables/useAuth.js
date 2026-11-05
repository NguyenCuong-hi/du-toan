import { ref, computed } from 'vue'

const currentUser = ref({
  name: 'Nguyen',
  fullName: 'Nguyen Van',
  initials: 'NV',
  email: 'nguyen@company.com',
  role: 'HR Administrator',
  department: 'Human Resources',
  avatar: '',
})

export function useAuth() {
  // Sync with Frappe window session if available
  if (typeof window !== 'undefined' && window.frappe?.session?.user && window.frappe.session.user !== 'Guest') {
    const userEmail = window.frappe.session.user
    currentUser.value.email = userEmail
    const fullName = window.frappe.boot?.user_info?.[userEmail]?.fullname || userEmail
    currentUser.value.name = fullName.split(' ')[0] || fullName
    currentUser.value.fullName = fullName
    currentUser.value.initials = fullName
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  const user = computed(() => currentUser.value)
  const isAuthenticated = computed(() => Boolean(currentUser.value?.email))

  function logout() {
    if (typeof window !== 'undefined' && window.frappe?.app?.logout) {
      window.frappe.app.logout()
    } else {
      window.location.href = '/login'
    }
  }

  return {
    user,
    isAuthenticated,
    logout,
  }
}
