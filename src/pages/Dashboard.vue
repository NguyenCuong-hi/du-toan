<template>
  <div class="p-6 max-w-6xl mx-auto space-y-5">
    <!-- Card 1: Onboarding Card (Solid White, No Liquid) -->
    <div
      v-if="!dismissOnboarding"
      class="bg-white rounded-xl border border-gray-200 p-6 shadow-xs transition-all"
    >
      <!-- Top Title & Dismiss -->
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 tracking-tight">
            Good morning, {{ user.name || 'Nguyen' }}
          </h2>
          <p class="text-xs text-gray-500 mt-1">
            Get to know ERPNext · {{ completedSteps }} of {{ totalSteps }} steps done
          </p>
        </div>

        <button
          type="button"
          @click="dismissOnboarding = true"
          class="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors bg-white px-2 py-1 rounded"
        >
          Dismiss
        </button>
      </div>

      <!-- 9-Segmented Step Progress Bar -->
      <div class="flex items-center space-x-1.5 mt-4">
        <div
          v-for="i in totalSteps"
          :key="i"
          :class="[
            i <= completedSteps ? 'bg-gray-900' : 'bg-gray-200',
            'h-1 flex-1 rounded-full transition-colors',
          ]"
        ></div>
      </div>

      <!-- Active Onboarding Step Card: Solid White with Radio Circle -->
      <div class="mt-5 border border-gray-200 rounded-xl p-5 bg-white shadow-xs">
        <div class="flex items-start space-x-3">
          <button
            type="button"
            @click="toggleActiveStep"
            class="w-4 h-4 rounded-full border-2 border-gray-400 hover:border-gray-900 flex items-center justify-center shrink-0 mt-0.5 transition-colors bg-white focus:outline-none"
            title="Mark as done"
          >
            <div v-if="completedSteps > 0" class="w-2 h-2 bg-gray-900 rounded-full"></div>
          </button>

          <div class="flex-1">
            <h3 class="text-sm font-semibold text-gray-900 leading-tight">
              Invite your team
            </h3>
            <p class="text-xs text-gray-500 mt-1">
              Add the people you work with and choose what they can see.
            </p>

            <!-- Action Buttons: Solid Backgrounds -->
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                @click="showAddEmpModal = true"
                class="bg-gray-900 hover:bg-black text-white text-xs font-medium px-3.5 py-1.5 rounded-lg flex items-center space-x-1 transition-colors shadow-xs"
              >
                <span>Add User</span>
                <span class="text-sm ml-1 leading-none">→</span>
              </button>

              <button
                type="button"
                @click="triggerImport"
                class="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center transition-colors shadow-xs"
              >
                <FeatherIcon name="download" class="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                <span>Import</span>
              </button>

              <button
                type="button"
                @click="completedSteps++"
                class="bg-white text-gray-600 hover:text-gray-900 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Module Links List (Exact ERPNext Setup Format) -->
      <div class="mt-5 space-y-3.5 text-xs">
        <div
          v-for="link in moduleLinks"
          :key="link.name"
          class="flex items-center space-x-2.5 text-gray-700 hover:text-gray-900 group cursor-pointer"
          @click="handleLinkClick(link)"
        >
          <FeatherIcon
            :name="link.icon"
            class="w-4 h-4 text-gray-400 group-hover:text-gray-700 shrink-0"
          />
          <span class="font-medium text-gray-900">{{ link.name }}</span>
          <span class="text-gray-500">{{ link.desc }}</span>
        </div>
      </div>
    </div>

    <!-- Card 2: Profit and Loss / Analytics (Solid White, No Liquid) -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold text-gray-900">
          Profit and Loss
        </h3>

        <!-- Action tools: Filter Funnel + More Dots -->
        <div class="flex items-center space-x-1">
          <button
            type="button"
            class="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors bg-white focus:outline-none"
            title="Filter by Period"
          >
            <FeatherIcon name="filter" class="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            class="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors bg-white focus:outline-none"
            title="Options"
          >
            <FeatherIcon name="more-horizontal" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <!-- Center Analytics Visual (Exact match with ERPNext empty chart state) -->
      <div class="py-14 flex flex-col items-center justify-center text-center">
        <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
          <FeatherIcon name="bar-chart-2" class="w-5 h-5" />
        </div>
        <p class="text-xs text-gray-500 max-w-sm">
          Your income and expenses over the year, and what's left as profit.
        </p>
      </div>
    </div>

    <!-- Bottom Row: KPI Stat Cards (Solid White, No Liquid) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
        <span class="text-xs text-gray-500 font-medium">Annual Sales</span>
        <div class="text-xl font-bold text-gray-900 mt-1">
          VND 0.00
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
        <span class="text-xs text-gray-500 font-medium">Annual Purchase</span>
        <div class="text-xl font-bold text-gray-900 mt-1">
          VND 0.00
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
        <span class="text-xs text-gray-500 font-medium">Total Stock Value</span>
        <div class="text-xl font-bold text-gray-900 mt-1">
          0
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AddEmployeeModal v-model="showAddEmpModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FeatherIcon } from 'frappe-ui'
import AddEmployeeModal from '@/components/hrm/AddEmployeeModal.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user } = useAuth()

const dismissOnboarding = ref(false)
const totalSteps = 9
const completedSteps = ref(0)
const showAddEmpModal = ref(false)

const moduleLinks = [
  { name: 'Accounts', desc: 'Get your books ready', icon: 'file-text', to: '/setup' },
  { name: 'Selling', desc: 'Make your first sale', icon: 'shopping-bag', to: '/setup' },
  { name: 'Buying', desc: 'Order from your suppliers', icon: 'shopping-cart', to: '/setup' },
  { name: 'Stock', desc: 'Keep track of your stock', icon: 'archive', to: '/setup' },
  { name: 'Manufacturing', desc: 'Plan and run production', icon: 'tool', to: '/setup' },
  { name: 'Projects', desc: 'Plan and deliver projects', icon: 'clipboard', to: '/setup' },
  { name: 'Assets', desc: 'Track what your business owns', icon: 'briefcase', to: '/setup' },
  { name: 'Quality', desc: 'Keep quality in check', icon: 'award', to: '/setup' },
]

function toggleActiveStep() {
  if (completedSteps.value === 0) {
    completedSteps.value = 1
  } else {
    completedSteps.value = 0
  }
}

function handleLinkClick(link) {
  if (link.to) {
    router.push(link.to)
  }
}

function triggerImport() {
  alert('Open ERPNext Data Import tool')
}
</script>