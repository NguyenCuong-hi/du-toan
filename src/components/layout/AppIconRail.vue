<template>
  <aside
    :class="[
      isMobile ? 'flex' : 'hidden md:flex',
      'w-14 bg-white border-r border-gray-200 flex-col items-center py-3 select-none shrink-0 z-30 h-full scrollbar-none',
    ]"
  >
    <!-- ERPNext Blue Squircle Logo -->
    <router-link
      to="/dashboard"
      @click="$emit('navigate')"
      class="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-xs transition-colors mb-4 shrink-0"
      title="ERPNext HRM"
    >
      <span class="tracking-tight">E</span>
    </router-link>

    <!-- Global Search (Awesomebar) Trigger -->
    <button
      type="button"
      @click="$emit('open-search')"
      class="w-9 h-9 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 flex items-center justify-center transition-colors mb-1 focus:outline-none shrink-0 bg-white"
      title="Search (Ctrl + K)"
    >
      <FeatherIcon name="search" class="w-4 h-4" />
    </button>

    <!-- Notifications Bell Trigger -->
    <div class="relative mb-2 shrink-0">
      <button
        type="button"
        @click="$emit('toggle-notifications')"
        class="w-9 h-9 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 flex items-center justify-center transition-colors focus:outline-none bg-white"
        title="Notifications"
      >
        <FeatherIcon name="bell" class="w-4 h-4" />
        <span
          v-if="unreadCount > 0"
          class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"
        ></span>
      </button>
    </div>

    <!-- Divider -->
    <div class="w-6 h-px bg-gray-200 my-1 shrink-0"></div>

    <!-- Module Parent Icons Rail (from menu.json) -->
    <div class="flex-1 flex flex-col items-center space-y-1.5 overflow-y-auto py-1 scrollbar-none w-full bg-white">
      <button
        v-for="mod in modules"
        :key="mod.name"
        type="button"
        :title="mod.name"
        @click="handleSelectModule(mod)"
        :class="[
          activeModuleName === mod.name
            ? 'bg-gray-100 text-gray-900 font-semibold shadow-xs ring-1 ring-gray-200'
            : 'text-gray-400 hover:text-gray-800 hover:bg-gray-50',
          'w-9 h-9 rounded-lg flex items-center justify-center transition-all mx-auto bg-white relative focus:outline-none group',
        ]"
      >
        <FeatherIcon :name="mod.icon || 'grid'" class="w-4 h-4" />

        <!-- Tooltip on hover -->
        <!-- <span
          class="absolute left-12 px-2 py-1 text-[11px] font-medium bg-gray-900 text-white rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 hidden md:block"
        >
          {{ mod.name }}
        </span> -->
      </button>
    </div>

    <!-- Bottom User Avatar (NV) -->
    <div class="pt-2 relative shrink-0">
      <button
        type="button"
        @click="showUserMenu = !showUserMenu"
        class="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 flex items-center justify-center text-xs font-bold transition-colors focus:outline-none border border-purple-200"
        title="User Account"
      >
        {{ user.initials || 'NV' }}
      </button>

      <!-- User Popover: Solid White -->
      <div
        v-if="showUserMenu"
        class="absolute bottom-10 left-10 w-52 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 text-xs divide-y divide-gray-100"
      >
        <div class="px-3.5 py-2.5 bg-white">
          <p class="font-bold text-gray-900">{{ user.fullName || user.name }}</p>
          <p class="text-[11px] text-gray-500 truncate">{{ user.email }}</p>
        </div>
        <div class="py-1 bg-white">
          <router-link
            to="/settings"
            @click="showUserMenu = false; $emit('navigate')"
            class="flex items-center px-3.5 py-2 text-gray-800 hover:bg-gray-50 bg-white"
          >
            <FeatherIcon name="settings" class="w-3.5 h-3.5 mr-2 text-gray-400" />
            My Settings
          </router-link>
          <a
            href="/app"
            target="_blank"
            class="flex items-center px-3.5 py-2 text-gray-800 hover:bg-gray-50 bg-white"
          >
            <FeatherIcon name="external-link" class="w-3.5 h-3.5 mr-2 text-gray-400" />
            ERPNext Desk
          </a>
        </div>
        <div class="py-1 bg-white">
          <button
            type="button"
            @click="logout"
            class="w-full flex items-center px-3.5 py-2 text-red-600 hover:bg-red-50 text-left bg-white"
          >
            <FeatherIcon name="log-out" class="w-3.5 h-3.5 mr-2 text-red-500" />
            Log Out
          </button>
        </div>
      </div>
      <div
        v-if="showUserMenu"
        @click="showUserMenu = false"
        class="fixed inset-0 z-40 bg-transparent"
      ></div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FeatherIcon } from 'frappe-ui'
import { useAuth } from '@/composables/useAuth'
import { useNotifications } from '@/composables/useNotifications'
import { useMenu } from '@/composables/useMenu'

defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'open-search',
  'toggle-notifications',
  'navigate',
  'select-module',
])

const router = useRouter()
const { user, logout } = useAuth()
const { unreadCount } = useNotifications()
const { modules, activeModuleName, setActiveModule } = useMenu()

const showUserMenu = ref(false)

function handleSelectModule(mod) {
  setActiveModule(mod.name)
  emit('select-module', mod)

  // Navigate to module target or first item if available
  const targetRoute = mod.to || mod.items?.[0]?.to || mod.items?.[0]?.route
  if (targetRoute) {
    router.push(targetRoute)
  }
}
</script>
