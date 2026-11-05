<template>
  <div class="h-screen w-screen overflow-hidden bg-gray-50 flex font-sans text-gray-900 antialiased">
    <!-- Desktop Tier 1: Leftmost Icon Rail (Hidden on mobile) -->
    <AppIconRail
      :is-mobile="false"
      @open-search="showSearchModal = true"
      @toggle-notifications="showNotifications = !showNotifications"
      @select-module="onModuleSelected"
    />

    <!-- Desktop Tier 2: Workspace Navigation Sidebar (Hidden on mobile) -->
    <AppWorkspaceSidebar
      :is-open="sidebarOpen"
      :is-mobile="false"
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-gray-50">
      <!-- Top Content Bar -->
      <AppTopBar @toggle-sidebar="handleToggleSidebar" />

      <!-- Scrollable Main Viewport (pb-16 on mobile for bottom tab bar clearance) -->
      <main class="flex-1 overflow-y-auto pb-16 md:pb-0">
        <slot />
      </main>
    </div>

    <!-- Mobile Tab Bar (Bottom Navigator - Solid White) -->
    <AppBottomBar @toggle-drawer="mobileDrawerOpen = !mobileDrawerOpen" />

    <!-- Mobile Slide-Over Drawer: Reveals Rail + Workspace Sidebar with Solid White Background -->
    <transition
      enter-active-class="transition-opacity ease-linear duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileDrawerOpen"
        class="fixed inset-0 z-40 bg-black/30 md:hidden"
        @click="mobileDrawerOpen = false"
      ></div>
    </transition>

    <transition
      enter-active-class="transition ease-in-out duration-200 transform"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition ease-in-out duration-200 transform"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div
        v-if="mobileDrawerOpen"
        class="fixed inset-y-0 left-0 z-50 flex shadow-2xl md:hidden bg-white border-r border-gray-200"
      >
        <!-- Rail inside Mobile Drawer (Solid White) -->
        <AppIconRail
          :is-mobile="true"
          @open-search="showSearchModal = true; mobileDrawerOpen = false"
          @toggle-notifications="showNotifications = !showNotifications; mobileDrawerOpen = false"
          @navigate="mobileDrawerOpen = false"
        />

        <!-- Workspace Sidebar inside Mobile Drawer (Solid White) -->
        <AppWorkspaceSidebar
          :is-mobile="true"
          @navigate="mobileDrawerOpen = false"
          @close="mobileDrawerOpen = false"
        />
      </div>
    </transition>

    <!-- Awesomebar Global Search Dialog (Ctrl + K) -->
    <GlobalSearchModal v-model="showSearchModal" />

    <!-- Notifications Drawer / Popover (Solid White Background, No Liquid/Blur) -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform -translate-x-4 opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform -translate-x-4 opacity-0"
    >
      <div
        v-if="showNotifications"
        class="fixed top-12 left-4 sm:left-16 right-4 sm:right-auto sm:w-96 rounded-xl bg-white shadow-xl border border-gray-200 z-50 overflow-hidden divide-y divide-gray-100"
      >
        <!-- Header: Solid White -->
        <div class="px-4 py-3 bg-white flex items-center justify-between border-b border-gray-100">
          <div class="flex items-center space-x-2">
            <span class="font-semibold text-gray-900 text-xs">Notifications</span>
            <span
              v-if="unreadCount > 0"
              class="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-700 rounded-full"
            >
              {{ unreadCount }} new
            </span>
          </div>
          <button
            v-if="unreadCount > 0"
            @click="markAllAsRead"
            class="text-[11px] font-medium text-gray-600 hover:text-gray-900 bg-white"
          >
            Mark all read
          </button>
        </div>

        <!-- Filter tabs: Solid White -->
        <div class="flex px-3 py-1.5 space-x-2 bg-white text-xs border-b border-gray-100">
          <button
            v-for="tab in ['all', 'unread', 'approvals']"
            :key="tab"
            @click="activeNotificationTab = tab"
            :class="[
              activeNotificationTab === tab
                ? 'bg-gray-900 text-white font-medium'
                : 'text-gray-600 hover:bg-gray-100 bg-white',
              'px-2.5 py-0.5 rounded-md capitalize transition-colors text-[11px]',
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <!-- List: Solid White items -->
        <div class="max-h-80 overflow-y-auto divide-y divide-gray-100 text-xs bg-white">
          <div
            v-if="filteredNotifications.length === 0"
            class="py-8 text-center text-gray-400 text-xs flex flex-col items-center bg-white"
          >
            <FeatherIcon name="check-circle" class="w-6 h-6 text-green-600 mb-1" />
            <p class="font-medium text-gray-800">All caught up!</p>
          </div>

          <div
            v-for="item in filteredNotifications"
            :key="item.id"
            @click="markAsRead(item.id)"
            class="p-3 bg-white hover:bg-gray-50 cursor-pointer transition-colors relative flex space-x-2.5 items-start"
          >
            <FeatherIcon
              :name="item.type === 'leave' ? 'calendar' : item.type === 'payroll' ? 'dollar-sign' : 'bell'"
              class="w-4 h-4 text-blue-600 shrink-0 mt-0.5"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <span class="font-semibold text-gray-900 truncate">{{ item.title }}</span>
                <span class="text-[10px] text-gray-400 ml-1 shrink-0">{{ item.time }}</span>
              </div>
              <p class="text-[11px] text-gray-600 mt-0.5">{{ item.message }}</p>
            </div>
            <span
              v-if="!item.read"
              class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5"
            ></span>
          </div>
        </div>
      </div>
    </transition>

    <div
      v-if="showNotifications"
      @click="showNotifications = false"
      class="fixed inset-0 z-40 bg-transparent"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { FeatherIcon } from 'frappe-ui'
import AppIconRail from '@/components/layout/AppIconRail.vue'
import AppWorkspaceSidebar from '@/components/layout/AppWorkspaceSidebar.vue'
import AppTopBar from '@/components/layout/AppTopBar.vue'
import AppBottomBar from '@/components/layout/AppBottomBar.vue'
import GlobalSearchModal from '@/components/search/GlobalSearchModal.vue'
import { useNotifications } from '@/composables/useNotifications'
import { useMenu } from '@/composables/useMenu'

const route = useRoute()
const { syncWithRoute } = useMenu()

const sidebarOpen = ref(true)
const mobileDrawerOpen = ref(false)
const showSearchModal = ref(false)
const showNotifications = ref(false)
const activeNotificationTab = ref('all')

const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()

// Sync active module with current route automatically
watch(
  () => route.fullPath,
  () => {
    syncWithRoute(route)
  },
  { immediate: true }
)

function onModuleSelected() {
  sidebarOpen.value = true
}

function handleToggleSidebar() {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    mobileDrawerOpen.value = !mobileDrawerOpen.value
  } else {
    sidebarOpen.value = !sidebarOpen.value
  }
}

const filteredNotifications = computed(() => {
  if (activeNotificationTab.value === 'unread') {
    return notifications.value.filter((n) => !n.read)
  }
  if (activeNotificationTab.value === 'approvals') {
    return notifications.value.filter((n) => n.actionRequired)
  }
  return notifications.value
})
</script>
