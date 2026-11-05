<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <!-- Top Tabs (Organization, Employees, Departments matching menu.json) -->
    <div class="flex items-center justify-between border-b border-gray-200 pb-3">
      <div class="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          type="button"
          @click="setTab('org')"
          :class="[
            currentTab === 'org'
              ? 'bg-white text-gray-900 font-semibold shadow-xs'
              : 'text-gray-600 hover:text-gray-900',
            'px-3.5 py-1.5 text-xs rounded-md transition-all focus:outline-none',
          ]"
        >
          Organization
        </button>
        <button
          type="button"
          @click="setTab('emp')"
          :class="[
            currentTab === 'emp'
              ? 'bg-white text-gray-900 font-semibold shadow-xs'
              : 'text-gray-600 hover:text-gray-900',
            'px-3.5 py-1.5 text-xs rounded-md transition-all focus:outline-none',
          ]"
        >
          Employees Directory
        </button>
        <button
          type="button"
          @click="setTab('dep')"
          :class="[
            currentTab === 'dep'
              ? 'bg-white text-gray-900 font-semibold shadow-xs'
              : 'text-gray-600 hover:text-gray-900',
            'px-3.5 py-1.5 text-xs rounded-md transition-all focus:outline-none',
          ]"
        >
          Departments
        </button>
      </div>

      <!-- Add Employee button on top -->
      <button
        type="button"
        @click="showAddModal = true"
        class="bg-gray-900 hover:bg-black text-white text-xs font-medium px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors shadow-xs"
      >
        <FeatherIcon name="plus" class="w-3.5 h-3.5" />
        <span>Add Employee</span>
      </button>
    </div>

    <!-- TAB 1: ORGANIZATION TREE / HIERARCHY -->
    <div v-if="currentTab === 'org'" class="space-y-6">
      <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
        <h3 class="text-sm font-semibold text-gray-900 mb-1">Company Organization Chart</h3>
        <p class="text-xs text-gray-500 mb-6">ERPNext HRM Corporate Structure and Reporting Lines</p>

        <!-- Hierarchy tree simulation -->
        <div class="flex flex-col items-center space-y-6">
          <!-- Level 1: CEO / MD -->
          <div class="bg-white border-2 border-gray-900 rounded-xl p-4 w-72 text-center shadow-xs">
            <span class="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Executive Management</span>
            <h4 class="text-sm font-bold text-gray-900 mt-1">Nguyen Van C</h4>
            <p class="text-xs text-gray-500">Chief Executive Officer</p>
            <span class="inline-block px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-700 rounded-full mt-2">
              HR-EMP-001
            </span>
          </div>

          <!-- Connector line -->
          <div class="w-0.5 h-6 bg-gray-300"></div>

          <!-- Level 2: Department Heads Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div
              v-for="dept in departmentDetails"
              :key="dept.name"
              class="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-xs hover:border-gray-300 transition-colors"
            >
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                {{ dept.name.slice(0, 2).toUpperCase() }}
              </div>
              <h5 class="text-xs font-bold text-gray-900">{{ dept.name }}</h5>
              <p class="text-[11px] text-gray-500 mt-0.5">Head: {{ dept.lead }}</p>
              <div class="mt-3 pt-2.5 border-t border-gray-100 flex justify-between text-[11px] text-gray-600">
                <span>{{ dept.headcount }} Members</span>
                <span class="text-blue-600 font-medium cursor-pointer" @click="filterByDepartment(dept.name)">
                  View Team →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: EMPLOYEES DIRECTORY -->
    <div v-else-if="currentTab === 'emp'" class="space-y-6">
      <!-- Filter Toolbar (Solid White) -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <!-- Search bar -->
        <div class="relative flex-1 max-w-md">
          <FeatherIcon
            name="search"
            class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, ID, role or email..."
            class="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors text-gray-900"
          />
        </div>

        <!-- Filters & View Mode -->
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <select
            v-model="selectedDepartment"
            class="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option v-for="dept in departments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>

          <select
            v-model="selectedStatus"
            class="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Probation">Probation</option>
          </select>

          <!-- View Mode Toggle -->
          <div class="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
            <button
              type="button"
              @click="viewMode = 'grid'"
              :class="[
                viewMode === 'grid' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900',
                'p-1.5 rounded transition-colors',
              ]"
              title="Grid View"
            >
              <FeatherIcon name="grid" class="w-4 h-4" />
            </button>
            <button
              type="button"
              @click="viewMode = 'table'"
              :class="[
                viewMode === 'table' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900',
                'p-1.5 rounded transition-colors',
              ]"
              title="Table View"
            >
              <FeatherIcon name="menu" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredEmployees.length === 0"
        class="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-xs"
      >
        <FeatherIcon name="users" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h4 class="text-sm font-bold text-gray-900">No employees found</h4>
        <p class="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-4">
          No employee matches your current search filters.
        </p>
        <button
          type="button"
          @click="resetFilters"
          class="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors shadow-xs"
        >
          Reset Filters
        </button>
      </div>

      <!-- Grid View -->
      <div
        v-else-if="viewMode === 'grid'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          v-for="emp in filteredEmployees"
          :key="emp.id"
          class="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between"
        >
          <div>
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <img
                  :src="emp.avatar"
                  :alt="emp.name"
                  class="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div>
                  <h4 class="text-sm font-bold text-gray-900 leading-snug">
                    {{ emp.name }}
                  </h4>
                  <p class="text-xs text-gray-500">{{ emp.designation }}</p>
                  <span class="inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-700 rounded mt-1">
                    {{ emp.id }}
                  </span>
                </div>
              </div>

              <span
                :class="[
                  emp.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : emp.status === 'On Leave'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200',
                  'px-2 py-0.5 text-[10px] font-semibold rounded-full border',
                ]"
              >
                {{ emp.status }}
              </span>
            </div>

            <div class="space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-3">
              <div class="flex items-center space-x-2">
                <FeatherIcon name="briefcase" class="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span class="truncate">{{ emp.department }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <FeatherIcon name="mail" class="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span class="truncate">{{ emp.email }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <FeatherIcon name="map-pin" class="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span class="truncate">{{ emp.location }}</span>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
            <span class="text-gray-400">Joined: {{ emp.joinDate }}</span>
            <a
              :href="`mailto:${emp.email}`"
              class="font-medium text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>Contact</span>
              <FeatherIcon name="chevron-right" class="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <!-- Table View -->
      <div
        v-else
        class="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-semibold border-b border-gray-200">
              <tr>
                <th class="px-5 py-3">Employee</th>
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">Department</th>
                <th class="px-4 py-3">Contact</th>
                <th class="px-4 py-3">Joined Date</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-700">
              <tr
                v-for="emp in filteredEmployees"
                :key="emp.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-5 py-3.5 flex items-center space-x-3">
                  <img
                    :src="emp.avatar"
                    :alt="emp.name"
                    class="w-8 h-8 rounded-full object-cover ring-1 ring-gray-100"
                  />
                  <div>
                    <div class="font-bold text-gray-900">{{ emp.name }}</div>
                    <div class="text-[11px] text-gray-500">{{ emp.designation }}</div>
                  </div>
                </td>
                <td class="px-4 py-3.5 font-mono text-[11px] text-gray-600">
                  {{ emp.id }}
                </td>
                <td class="px-4 py-3.5 font-medium text-gray-800">
                  {{ emp.department }}
                </td>
                <td class="px-4 py-3.5">
                  <div class="text-gray-900">{{ emp.email }}</div>
                  <div class="text-[11px] text-gray-400">{{ emp.phone }}</div>
                </td>
                <td class="px-4 py-3.5 text-gray-500 whitespace-nowrap">
                  {{ emp.joinDate }}
                </td>
                <td class="px-4 py-3.5">
                  <span
                    :class="[
                      emp.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : emp.status === 'On Leave'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200',
                      'px-2 py-0.5 text-[10px] font-semibold rounded-full border',
                    ]"
                  >
                    {{ emp.status }}
                  </span>
                </td>
                <td class="px-5 py-3.5 text-right whitespace-nowrap">
                  <a
                    :href="`mailto:${emp.email}`"
                    class="text-blue-600 hover:text-blue-800 font-medium text-xs"
                  >
                    Contact
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 3: DEPARTMENTS VIEW -->
    <div v-else-if="currentTab === 'dep'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="dept in departmentDetails"
          :key="dept.name"
          class="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-gray-900">{{ dept.name }}</span>
              <span class="px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-700 rounded-full">
                {{ dept.headcount }} Employees
              </span>
            </div>

            <p class="text-xs text-gray-500 mb-4">{{ dept.desc }}</p>

            <div class="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
              <div class="flex justify-between">
                <span class="text-gray-400">Department Lead:</span>
                <span class="font-medium text-gray-800">{{ dept.lead }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Annual Budget:</span>
                <span class="font-medium text-gray-800">{{ dept.budget }}</span>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end">
            <button
              type="button"
              @click="filterByDepartment(dept.name)"
              class="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
            >
              <span>View Department Staff</span>
              <FeatherIcon name="arrow-right" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Employee Modal -->
    <AddEmployeeModal v-model="showAddModal" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FeatherIcon } from 'frappe-ui'
import AddEmployeeModal from '@/components/hrm/AddEmployeeModal.vue'
import { useHrmData } from '@/composables/useHrmData'

const route = useRoute()
const router = useRouter()
const { employees, departments } = useHrmData()

const searchQuery = ref('')
const selectedDepartment = ref('All Departments')
const selectedStatus = ref('All')
const viewMode = ref('grid')
const showAddModal = ref(false)

const currentTab = computed(() => {
  return route.query.tab || 'emp'
})

function setTab(tab) {
  router.replace({ query: { ...route.query, tab } })
}

function filterByDepartment(deptName) {
  selectedDepartment.value = deptName
  setTab('emp')
}

const departmentDetails = [
  {
    name: 'Engineering',
    lead: 'Le Van C',
    headcount: 24,
    budget: 'VND 1,200,000,000',
    desc: 'Software development, DevOps, quality assurance, and architecture.',
  },
  {
    name: 'Human Resources',
    lead: 'Nguyen Van A',
    headcount: 6,
    budget: 'VND 320,000,000',
    desc: 'Talent acquisition, employee welfare, performance, and payroll.',
  },
  {
    name: 'Sales & Marketing',
    lead: 'Tran Thi B',
    headcount: 14,
    budget: 'VND 780,000,000',
    desc: 'Enterprise accounts, inbound marketing, customer success, and branding.',
  },
  {
    name: 'Finance',
    lead: 'Pham Minh D',
    headcount: 5,
    budget: 'VND 290,000,000',
    desc: 'Accounting, auditing, financial planning, taxation, and billing.',
  },
]

const filteredEmployees = computed(() => {
  return employees.value.filter((emp) => {
    const q = searchQuery.value.trim().toLowerCase()
    const matchesSearch =
      !q ||
      emp.name.toLowerCase().includes(q) ||
      emp.id.toLowerCase().includes(q) ||
      emp.designation.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q)

    const matchesDept =
      selectedDepartment.value === 'All Departments' ||
      emp.department === selectedDepartment.value

    const matchesStatus =
      selectedStatus.value === 'All' || emp.status === selectedStatus.value

    return matchesSearch && matchesDept && matchesStatus
  })
})

function resetFilters() {
  searchQuery.value = ''
  selectedDepartment.value = 'All Departments'
  selectedStatus.value = 'All'
}
</script>