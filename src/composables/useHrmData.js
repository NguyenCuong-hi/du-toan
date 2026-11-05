import { ref, computed } from 'vue'

const employees = ref([
  {
    id: 'EMP-001',
    name: 'Sarah Lin',
    designation: 'Senior Frontend Engineer',
    department: 'Engineering',
    status: 'Active',
    email: 'sarah.lin@company.com',
    phone: '+1 (555) 234-5678',
    joinDate: '2023-03-15',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA',
  },
  {
    id: 'EMP-002',
    name: 'David Kim',
    designation: 'Staff Product Designer',
    department: 'Design',
    status: 'Active',
    email: 'david.kim@company.com',
    phone: '+1 (555) 345-6789',
    joinDate: '2022-08-01',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    location: 'Remote (Seattle, WA)',
  },
  {
    id: 'EMP-003',
    name: 'Amara Okafor',
    designation: 'HR Business Partner',
    department: 'Human Resources',
    status: 'Active',
    email: 'amara.okafor@company.com',
    phone: '+1 (555) 456-7890',
    joinDate: '2021-11-10',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    location: 'New York, NY',
  },
  {
    id: 'EMP-004',
    name: 'James Wilson',
    designation: 'DevOps & Infrastructure Lead',
    department: 'Engineering',
    status: 'On Leave',
    email: 'james.wilson@company.com',
    phone: '+1 (555) 567-8901',
    joinDate: '2022-01-20',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    location: 'Austin, TX',
  },
  {
    id: 'EMP-005',
    name: 'Priya Sharma',
    designation: 'Finance & Payroll Specialist',
    department: 'Finance',
    status: 'Active',
    email: 'priya.sharma@company.com',
    phone: '+1 (555) 678-9012',
    joinDate: '2024-02-01',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    location: 'Chicago, IL',
  },
  {
    id: 'EMP-006',
    name: 'Marcus Chen',
    designation: 'Fullstack Developer',
    department: 'Engineering',
    status: 'Probation',
    email: 'marcus.chen@company.com',
    phone: '+1 (555) 789-0123',
    joinDate: '2026-09-01',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA',
  },
])

const leaveRequests = ref([
  {
    id: 'LV-2026-089',
    employeeId: 'EMP-001',
    employeeName: 'Sarah Lin',
    department: 'Engineering',
    leaveType: 'Casual Leave',
    fromDate: '2026-11-10',
    toDate: '2026-11-12',
    days: 3,
    reason: 'Family gathering out of town',
    status: 'Pending',
    appliedOn: '2026-11-04',
  },
  {
    id: 'LV-2026-088',
    employeeId: 'EMP-004',
    employeeName: 'James Wilson',
    department: 'Engineering',
    leaveType: 'Annual Leave',
    fromDate: '2026-11-03',
    toDate: '2026-11-07',
    days: 5,
    reason: 'Personal vacation',
    status: 'Approved',
    appliedOn: '2026-10-25',
  },
  {
    id: 'LV-2026-087',
    employeeId: 'EMP-002',
    employeeName: 'David Kim',
    department: 'Design',
    leaveType: 'Sick Leave',
    fromDate: '2026-10-28',
    toDate: '2026-10-29',
    days: 2,
    reason: 'Flu symptoms and medical rest',
    status: 'Approved',
    appliedOn: '2026-10-28',
  },
  {
    id: 'LV-2026-086',
    employeeId: 'EMP-006',
    employeeName: 'Marcus Chen',
    department: 'Engineering',
    leaveType: 'Privilege Leave',
    fromDate: '2026-10-15',
    toDate: '2026-10-16',
    days: 2,
    reason: 'Relocation assistance',
    status: 'Rejected',
    appliedOn: '2026-10-10',
  },
])

const punchState = ref({
  isPunchedIn: true,
  lastPunchTime: '08:45 AM',
  punchDate: 'Today',
  workingHours: '2h 15m',
})

const attendanceSummary = ref({
  present: 38,
  absent: 2,
  onLeave: 2,
  lateArrivals: 3,
  totalEmployees: 42,
})

const salarySlips = ref([
  {
    id: 'SAL-2026-10-001',
    employeeName: 'Sarah Lin',
    month: 'October 2026',
    netPay: '$8,450.00',
    grossPay: '$10,200.00',
    status: 'Paid',
    paymentDate: '2026-10-31',
  },
  {
    id: 'SAL-2026-10-002',
    employeeName: 'David Kim',
    month: 'October 2026',
    netPay: '$7,800.00',
    grossPay: '$9,500.00',
    status: 'Paid',
    paymentDate: '2026-10-31',
  },
  {
    id: 'SAL-2026-10-003',
    employeeName: 'Amara Okafor',
    month: 'October 2026',
    netPay: '$6,900.00',
    grossPay: '$8,300.00',
    status: 'Paid',
    paymentDate: '2026-10-31',
  },
  {
    id: 'SAL-2026-10-004',
    employeeName: 'James Wilson',
    month: 'October 2026',
    netPay: '$8,900.00',
    grossPay: '$10,800.00',
    status: 'Draft',
    paymentDate: 'Pending',
  },
])

export function useHrmData() {
  const departments = computed(() => {
    const set = new Set(employees.value.map((e) => e.department))
    return ['All Departments', ...Array.from(set)]
  })

  function addEmployee(employeeData) {
    const newId = `EMP-00${employees.value.length + 1}`
    const newEmp = {
      id: newId,
      status: 'Active',
      joinDate: new Date().toISOString().slice(0, 10),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(employeeData.name)}`,
      ...employeeData,
    }
    employees.value.unshift(newEmp)
    attendanceSummary.value.totalEmployees++
    attendanceSummary.value.present++
    return newEmp
  }

  function applyLeave(leaveData) {
    const newLeave = {
      id: `LV-2026-0${leaveRequests.value.length + 90}`,
      status: 'Pending',
      appliedOn: new Date().toISOString().slice(0, 10),
      ...leaveData,
    }
    leaveRequests.value.unshift(newLeave)
    return newLeave
  }

  function updateLeaveStatus(leaveId, newStatus) {
    const leave = leaveRequests.value.find((l) => l.id === leaveId)
    if (leave) {
      leave.status = newStatus
      if (newStatus === 'Approved') {
        const emp = employees.value.find((e) => e.name === leave.employeeName)
        if (emp) emp.status = 'On Leave'
      }
    }
  }

  function togglePunch() {
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    if (punchState.value.isPunchedIn) {
      punchState.value.isPunchedIn = false
      punchState.value.lastPunchTime = timeStr
    } else {
      punchState.value.isPunchedIn = true
      punchState.value.lastPunchTime = timeStr
    }
  }

  return {
    employees,
    departments,
    leaveRequests,
    attendanceSummary,
    punchState,
    salarySlips,
    addEmployee,
    applyLeave,
    updateLeaveStatus,
    togglePunch,
  }
}
