<template>
  <header class="h-11 bg-white border-b border-gray-200 px-4 flex items-center justify-between shrink-0 select-none sticky top-0 z-10">
    <!-- Left: Hamburger toggle + Current Workspace Title -->
    <div class="flex items-center space-x-3">
      <button
        type="button"
        @click="$emit('toggle-sidebar')"
        class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors focus:outline-none bg-white"
        title="Toggle sidebar"
      >
        <FeatherIcon name="menu" class="w-4 h-4" />
      </button>

      <div class="flex items-center space-x-2">
        <h1 class="text-sm font-semibold text-gray-900 leading-none tracking-tight">
          {{ title || pageTitle }}
        </h1>
        <slot name="badge" />
      </div>
    </div>

    <!-- Right: Three Dots Action Menu & Actions slot -->
    <div class="flex items-center space-x-2">
      <slot name="actions" />

      <!-- Three Dots (...) Menu -->
      <div class="relative">
        <button
          type="button"
          @click="showMoreMenu = !showMoreMenu"
          class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors focus:outline-none bg-white"
          title="More options"
        >
          <FeatherIcon name="more-horizontal" class="w-4 h-4" />
        </button>

        <div
          v-if="showMoreMenu"
          class="absolute right-0 mt-1.5 w-44 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 text-xs divide-y divide-gray-100"
        >
          <div class="py-0.5">
            <button
              type="button"
              @click="reloadPage"
              class="w-full text-left px-3 py-2 text-gray-800 hover:bg-gray-50 flex items-center bg-white"
            >
              <FeatherIcon name="refresh-cw" class="w-3.5 h-3.5 mr-2 text-gray-400" />
              Reload Workspace
            </button>
            <button
              type="button"
              @click="showMoreMenu = false"
              class="w-full text-left px-3 py-2 text-gray-800 hover:bg-gray-50 flex items-center bg-white"
            >
              <FeatherIcon name="edit-2" class="w-3.5 h-3.5 mr-2 text-gray-400" />
              Edit Workspace
            </button>
          </div>
        </div>
        <div
          v-if="showMoreMenu"
          @click="showMoreMenu = false"
          class="fixed inset-0 z-40 bg-transparent"
        ></div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { FeatherIcon } from 'frappe-ui'
import { useMenu } from '@/composables/useMenu'

defineProps({
  title: {
    type: String,
    default: '',
  },
})

defineEmits(['toggle-sidebar'])

const route = useRoute()
const { activeModule } = useMenu()
const showMoreMenu = ref(false)

const pageTitle = computed(() => {
  if (
    route.name === 'Home' ||
    route.name === 'Dashboard' ||
    route.name === 'Workspace' ||
    route.path === '/setup' ||
    route.path === '/workspace' ||
    route.path === '/dashboard' ||
    route.path === '/'
  ) {
    return 'Home'
  }
  if (route.query.tab === 'org') return 'Organization'
  if (route.query.tab === 'emp') return 'Employees'
  if (route.query.tab === 'dep') return 'Departments'
  return route.name || activeModule.value?.name || 'Home'
})

function reloadPage() {
  showMoreMenu.value = false
  window.location.reload()
}
</script>
