<template>
  <header class="h-12 border-b border-gray-200 bg-white sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
    <!-- Left Section: Mobile Menu Button & Brand -->
    <div class="flex items-center space-x-3">
      <!-- Mobile sidebar toggle -->
      <button
        type="button"
        @click="$emit('toggle-mobile-sidebar')"
        class="p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg md:hidden focus:outline-none"
        aria-label="Toggle Navigation"
      >
        <FeatherIcon name="menu" class="w-5 h-5" />
      </button>

      <!-- App Logo / Desk Brand -->
      <router-link to="/dashboard" class="flex items-center space-x-2.5 group">
        <div class="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-blue-600 transition-colors">
          HR
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-gray-900 leading-none tracking-tight">
            Frappe HRM
          </span>
          <span class="text-[10px] text-gray-400 font-medium">ERPNext Workspace</span>
        </div>
      </router-link>
    </div>

    <!-- Center Section: Awesomebar Search -->
    <div class="flex-1 max-w-md mx-4 hidden md:block">
      <button
        type="button"
        @click="showSearchModal = true"
        class="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-gray-600 border border-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <div class="flex items-center space-x-2">
          <FeatherIcon name="search" class="w-4 h-4 text-gray-400" />
          <span>Search or jump to...</span>
        </div>
        <kbd class="px-1.5 py-0.5 text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 rounded shadow-xs">
          ⌘K
        </kbd>
      </button>
    </div>

    <!-- Right Section: Actions, Punch, Notifications, User Profile -->
    <div class="flex items-center space-x-2 sm:space-x-3">
      <!-- Mobile Search Icon -->
      <button
        type="button"
        @click="showSearchModal = true"
        class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg md:hidden focus:outline-none"
        aria-label="Search"
      >
        <FeatherIcon name="search" class="w-5 h-5" />
      </button>

      <!-- Quick Punch Status Pill -->
      <button
        type="button"
        @click="togglePunch"
        :class="[
          punchState.isPunchedIn
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
          'hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium border rounded-full transition-colors',
        ]"
        :title="punchState.isPunchedIn ? 'Click to punch out' : 'Click to punch in'"
      >
        <span
          :class="[
            punchState.isPunchedIn ? 'bg-emerald-500' : 'bg-amber-500',
            'w-2 h-2 rounded-full animate-pulse',
          ]"
        ></span>
        <span>{{ punchState.isPunchedIn ? 'In: ' + punchState.lastPunchTime : 'Out' }}</span>
      </button>

      <!-- Quick Create Dropdown -->
      <div class="relative">
        <button
          type="button"
          @click="showCreateMenu = !showCreateMenu"
          class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none"
          title="Create New"
        >
          <FeatherIcon name="plus" class="w-5 h-5" />
        </button>

        <!-- Create Dropdown Popover -->
        <div
          v-if="showCreateMenu"
          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/10 py-1 z-50 text-xs"
        >
          <router-link
            to="/employees?action=new"
            @click="showCreateMenu = false"
            class="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <FeatherIcon name="user-plus" class="w-4 h-4 mr-2 text-gray-500" />
            New Employee
          </router-link>
          <router-link
            to="/leaves?action=new"
            @click="showCreateMenu = false"
            class="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <FeatherIcon name="calendar" class="w-4 h-4 mr-2 text-gray-500" />
            Apply for Leave
          </router-link>
          <router-link
            to="/payroll"
            @click="showCreateMenu = false"
            class="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <FeatherIcon name="dollar-sign" class="w-4 h-4 mr-2 text-gray-500" />
            Run Payroll
          </router-link>
        </div>
        <div
          v-if="showCreateMenu"
          @click="showCreateMenu = false"
          class="fixed inset-0 z-40"
        ></div>
      </div>

      <!-- Notifications -->
      <NotificationDrawer />

      <!-- Vertical divider -->
      <div class="h-6 w-px bg-gray-200"></div>

      <!-- User Profile Dropdown -->
      <div class="relative">
        <button
          type="button"
          @click="showUserMenu = !showUserMenu"
          class="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors"
          aria-label="User menu"
        >
          <img
            :src="user.avatar"
            :alt="user.name"
            class="w-7 h-7 rounded-full object-cover ring-1 ring-gray-200"
          />
          <div class="hidden lg:flex flex-col text-left">
            <span class="text-xs font-semibold text-gray-800 leading-tight">
              {{ user.name }}
            </span>
            <span class="text-[10px] text-gray-500 leading-none">
              {{ user.role }}
            </span>
          </div>
          <FeatherIcon name="chevron-down" class="w-3.5 h-3.5 text-gray-400 hidden lg:block" />
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="showUserMenu"
          class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black/10 py-1.5 z-50 divide-y divide-gray-100"
        >
          <!-- User info header -->
          <div class="px-4 py-2.5">
            <p class="text-xs font-semibold text-gray-900">{{ user.name }}</p>
            <p class="text-[11px] text-gray-500 truncate">{{ user.email }}</p>
          </div>

          <div class="py-1 text-xs">
            <router-link
              to="/settings"
              @click="showUserMenu = false"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              <FeatherIcon name="user" class="w-4 h-4 mr-2.5 text-gray-500" />
              My Profile
            </router-link>
            <router-link
              to="/settings"
              @click="showUserMenu = false"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              <FeatherIcon name="settings" class="w-4 h-4 mr-2.5 text-gray-500" />
              HR Settings
            </router-link>
            <a
              href="/app"
              target="_blank"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              <FeatherIcon name="external-link" class="w-4 h-4 mr-2.5 text-gray-500" />
              ERPNext Desk
            </a>
          </div>

          <div class="py-1 text-xs">
            <button
              type="button"
              @click="logout"
              class="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 text-left"
            >
              <FeatherIcon name="log-out" class="w-4 h-4 mr-2.5 text-red-500" />
              Log Out
            </button>
          </div>
        </div>

        <div
          v-if="showUserMenu"
          @click="showUserMenu = false"
          class="fixed inset-0 z-40"
        ></div>
      </div>
    </div>

    <!-- Awesomebar Search Dialog -->
    <GlobalSearchModal v-model="showSearchModal" />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { FeatherIcon } from 'frappe-ui'
import NotificationDrawer from '@/components/notifications/NotificationDrawer.vue'
import GlobalSearchModal from '@/components/search/GlobalSearchModal.vue'
import { useAuth } from '@/composables/useAuth'
import { useHrmData } from '@/composables/useHrmData'

defineEmits(['toggle-mobile-sidebar'])

const { user, logout } = useAuth()
const { punchState, togglePunch } = useHrmData()

const showSearchModal = ref(false)
const showCreateMenu = ref(false)
const showUserMenu = ref(false)
</script>
