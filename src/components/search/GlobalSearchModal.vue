<template>
  <div v-if="isOpen">
    <!-- Solid dim overlay (No liquid blur) -->
    <div
      class="fixed inset-0 bg-black/30 z-50 transition-opacity"
      @click="close"
    ></div>

    <!-- Modal Dialog (Solid White Background) -->
    <div class="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 pointer-events-none">
      <div
        class="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]"
      >
        <!-- Search Input Bar: Solid White -->
        <div class="relative flex items-center px-4 py-3 bg-white border-b border-gray-200">
          <FeatherIcon name="search" class="w-4 h-4 text-gray-400 mr-3 shrink-0" />
          <input
            ref="inputRef"
            v-model="searchQuery"
            type="text"
            placeholder="Search pages, employees, documents, or actions... (Esc to close)"
            class="w-full bg-white border-0 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 p-0"
            @keydown.esc="close"
            @keydown.down.prevent="navigateDown"
            @keydown.up.prevent="navigateUp"
            @keydown.enter.prevent="selectCurrent"
          />
          <kbd
            class="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded"
          >
            ESC
          </kbd>
        </div>

        <!-- Results List: Solid White -->
        <div class="overflow-y-auto p-2 space-y-1 bg-white">
          <div
            v-if="results.length === 0"
            class="py-10 text-center text-xs text-gray-400 bg-white"
          >
            No matches found for "{{ searchQuery }}"
          </div>

          <div
            v-for="(item, index) in results"
            :key="item.id"
            @click="handleSelect(item)"
            :class="[
              selectedIndex === index ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-50 bg-white',
              'flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-xs transition-colors',
            ]"
          >
            <div class="flex items-center space-x-3">
              <div
                :class="[
                  item.category === 'Module'
                    ? 'bg-blue-50 text-blue-700'
                    : item.category === 'Employee'
                    ? 'bg-purple-50 text-purple-700'
                    : 'bg-green-50 text-green-700',
                  'w-7 h-7 rounded-md flex items-center justify-center shrink-0 border border-gray-100',
                ]"
              >
                <FeatherIcon :name="item.icon" class="w-4 h-4" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ item.title }}</p>
                <p class="text-[11px] text-gray-500">{{ item.subtitle }}</p>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <span class="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                {{ item.category }}
              </span>
              <FeatherIcon name="chevron-right" class="w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>
        </div>

        <!-- Footer Shortcuts: Solid White -->
        <div class="px-4 py-2.5 bg-white border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
          <div class="flex items-center space-x-3">
            <span><kbd class="font-mono bg-gray-50 px-1 py-0.5 rounded border border-gray-200">↑↓</kbd> to navigate</span>
            <span><kbd class="font-mono bg-gray-50 px-1 py-0.5 rounded border border-gray-200">↵</kbd> to select</span>
          </div>
          <span class="font-medium text-gray-400">ERPNext Awesomebar</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { FeatherIcon } from 'frappe-ui'
import { useHrmData } from '@/composables/useHrmData'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const { employees } = useHrmData()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const searchQuery = ref('')
const selectedIndex = ref(0)
const inputRef = ref(null)

const staticActions = [
  { id: 'mod-dash', title: 'Dashboard', subtitle: 'HRM overview & metrics', category: 'Module', icon: 'grid', route: '/dashboard' },
  { id: 'mod-emp', title: 'Employees Directory', subtitle: 'Manage staff, departments, roles', category: 'Module', icon: 'users', route: '/employees' },
  { id: 'mod-leaves', title: 'Leaves & Attendance', subtitle: 'Leave applications & time tracking', category: 'Module', icon: 'calendar', route: '/leaves' },
  { id: 'mod-pay', title: 'Payroll', subtitle: 'Salary slips and payouts', category: 'Module', icon: 'dollar-sign', route: '/payroll' },
  { id: 'mod-rec', title: 'Recruitment', subtitle: 'Job openings and pipeline', category: 'Module', icon: 'user-plus', route: '/recruitment' },
  { id: 'mod-set', title: 'HRM Settings', subtitle: 'Company policy & configuration', category: 'Module', icon: 'settings', route: '/settings' },
  { id: 'act-new-emp', title: 'New Employee', subtitle: 'Register a new employee', category: 'Action', icon: 'plus', route: '/employees?action=new' },
  { id: 'act-leave-apply', title: 'Apply for Leave', subtitle: 'Submit a new leave application', category: 'Action', icon: 'plus', route: '/leaves?action=new' },
]

const results = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return staticActions

  const empResults = employees.value
    .filter(
      (e) =>
        e.name.toLowerCase().includes(query) ||
        e.department.toLowerCase().includes(query) ||
        e.designation.toLowerCase().includes(query) ||
        e.id.toLowerCase().includes(query)
    )
    .map((e) => ({
      id: e.id,
      title: e.name,
      subtitle: `${e.designation} • ${e.department} (${e.id})`,
      category: 'Employee',
      icon: 'user',
      route: '/employees',
    }))

  const staticFiltered = staticActions.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query)
  )

  return [...staticFiltered, ...empResults]
})

watch(isOpen, async (val) => {
  if (val) {
    searchQuery.value = ''
    selectedIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
  }
})

function close() {
  isOpen.value = false
}

function navigateDown() {
  if (selectedIndex.value < results.value.length - 1) {
    selectedIndex.value++
  }
}

function navigateUp() {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

function selectCurrent() {
  const current = results.value[selectedIndex.value]
  if (current) {
    handleSelect(current)
  }
}

function handleSelect(item) {
  close()
  if (item.route) {
    router.push(item.route)
  }
}

function handleGlobalKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    isOpen.value = !isOpen.value
  } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
    e.preventDefault()
    isOpen.value = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>
