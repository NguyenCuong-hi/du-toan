<template>
  <div class="relative">
    <!-- Bell Button -->
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none bg-white"
      aria-label="Notifications"
    >
      <FeatherIcon name="bell" class="w-5 h-5" />
      <span
        v-if="unreadCount > 0"
        class="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white"
      >
        {{ unreadCount }}
      </span>
    </button>

    <!-- Dropdown: Solid White -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-84 sm:w-96 rounded-xl bg-white shadow-xl border border-gray-200 z-50 overflow-hidden divide-y divide-gray-100"
    >
      <!-- Header: Solid White -->
      <div class="px-4 py-3 bg-white flex items-center justify-between border-b border-gray-100">
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-900 text-xs">Notifications</span>
          <span
            v-if="unreadCount > 0"
            class="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full"
          >
            {{ unreadCount }} new
          </span>
        </div>
        <button
          v-if="unreadCount > 0"
          @click="markAllAsRead"
          class="text-xs font-medium text-gray-600 hover:text-gray-900 bg-white"
        >
          Mark all read
        </button>
      </div>

      <!-- Filter tabs: Solid White -->
      <div class="flex px-3 py-1.5 space-x-2 bg-white text-xs border-b border-gray-100">
        <button
          v-for="tab in ['all', 'unread', 'approvals']"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            activeTab === tab
              ? 'bg-gray-900 text-white font-medium'
              : 'text-gray-600 hover:bg-gray-100 bg-white',
            'px-2.5 py-1 rounded-md capitalize transition-colors',
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Notification List: Solid White -->
      <div class="max-h-96 overflow-y-auto divide-y divide-gray-100 bg-white">
        <div
          v-if="filteredList.length === 0"
          class="py-8 text-center text-gray-400 text-xs flex flex-col items-center bg-white"
        >
          <FeatherIcon name="check-circle" class="w-8 h-8 text-green-500 mb-1" />
          <p class="font-medium text-gray-600">You're all caught up!</p>
        </div>

        <div
          v-for="item in filteredList"
          :key="item.id"
          @click="markAsRead(item.id)"
          class="p-3 bg-white hover:bg-gray-50 cursor-pointer transition-colors relative flex space-x-3 items-start"
        >
          <div
            :class="[
              item.type === 'leave'
                ? 'bg-blue-50 text-blue-600'
                : item.type === 'payroll'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-gray-100 text-gray-600',
              'w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-gray-100',
            ]"
          >
            <FeatherIcon
              :name="item.type === 'leave' ? 'calendar' : item.type === 'payroll' ? 'dollar-sign' : 'bell'"
              class="w-4 h-4"
            />
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-baseline justify-between mb-0.5">
              <span class="text-xs font-semibold text-gray-900 truncate">
                {{ item.title }}
              </span>
              <span class="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                {{ item.time }}
              </span>
            </div>
            <p class="text-xs text-gray-600 leading-relaxed">
              {{ item.message }}
            </p>
          </div>

          <span
            v-if="!item.read"
            class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5"
          ></span>
        </div>
      </div>
    </div>

    <!-- Backdrop for closing: No blur -->
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 z-40 bg-transparent"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FeatherIcon } from 'frappe-ui'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()

const isOpen = ref(false)
const activeTab = ref('all')

const filteredList = computed(() => {
  if (activeTab.value === 'unread') {
    return notifications.value.filter((n) => !n.read)
  }
  if (activeTab.value === 'approvals') {
    return notifications.value.filter((n) => n.actionRequired)
  }
  return notifications.value
})
</script>
