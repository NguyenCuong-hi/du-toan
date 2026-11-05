<template>
  <aside
    :class="[
      isMobile
        ? 'flex w-56 sm:w-60 h-full'
        : isOpen
        ? 'w-56 hidden md:flex'
        : 'w-0 hidden md:flex',
      'bg-white border-r border-gray-200 flex-col transition-all duration-200 select-none shrink-0 overflow-hidden z-20',
    ]"
  >
    <!-- Workspace / Module Selector Dropdown Header -->
    <div class="h-11 px-3 border-b border-gray-200 flex items-center justify-between shrink-0 bg-white">
      <div class="relative flex-1 mr-1">
        <button
          type="button"
          @click="showWorkspaceMenu = !showWorkspaceMenu"
          class="w-full flex items-center justify-between px-2 py-1 text-xs font-semibold text-gray-900 hover:bg-gray-100 rounded-md transition-colors bg-white"
        >
          <div class="flex items-center space-x-2 truncate">
            <FeatherIcon
              :name="activeModule?.icon || 'grid'"
              class="w-3.5 h-3.5 text-gray-600 shrink-0"
            />
            <span class="truncate">{{ activeModule?.name || 'Workspace' }}</span>
          </div>
          <FeatherIcon name="chevron-down" class="w-3.5 h-3.5 text-gray-500 shrink-0 ml-1" />
        </button>

        <!-- Dropdown menu: List of parent modules from menu.json -->
        <div
          v-if="showWorkspaceMenu"
          class="absolute left-0 top-9 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 text-xs"
        >
          <button
            v-for="mod in modules"
            :key="mod.name"
            type="button"
            @click="selectModule(mod)"
            :class="[
              activeModuleName === mod.name
                ? 'bg-gray-100 font-semibold text-gray-900'
                : 'text-gray-700 hover:bg-gray-50 bg-white',
              'w-full text-left px-3 py-2 flex items-center justify-between transition-colors',
            ]"
          >
            <div class="flex items-center space-x-2 truncate">
              <FeatherIcon :name="mod.icon || 'grid'" class="w-3.5 h-3.5 text-gray-500" />
              <span>{{ mod.name }}</span>
            </div>
            <FeatherIcon
              v-if="activeModuleName === mod.name"
              name="check"
              class="w-3.5 h-3.5 text-blue-600"
            />
          </button>
        </div>
        <div
          v-if="showWorkspaceMenu"
          @click="showWorkspaceMenu = false"
          class="fixed inset-0 z-40 bg-transparent"
        ></div>
      </div>

      <!-- Close button on mobile -->
      <button
        v-if="isMobile"
        type="button"
        @click="$emit('close')"
        class="p-1 text-gray-400 hover:text-gray-800 rounded hover:bg-gray-100 transition-colors focus:outline-none bg-white"
        title="Close"
      >
        <FeatherIcon name="x" class="w-4 h-4" />
      </button>
    </div>

    <!-- Navigation Tree (Follows current module items from menu.json) -->
    <div class="flex-1 overflow-y-auto p-2 space-y-0.5 text-xs bg-white">
      <router-link
        v-for="item in currentModuleItems"
        :key="item.name + (item.to || item.route)"
        :to="item.to || item.route || '#'"
        @click="$emit('navigate')"
        :class="[
          'espresso-sidebar-item',
          isItemActive(item) ? 'selected' : '',
        ]"
      >
        <div class="flex items-center space-x-2.5 truncate">
          <FeatherIcon
            :name="item.icon || 'grid'"
            class="w-4 h-4 text-gray-500 group-hover:text-gray-800 shrink-0"
          />
          <span class="truncate font-normal">{{ item.name }}</span>
        </div>

        <FeatherIcon
          v-if="item.hasChildren"
          name="chevron-right"
          class="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1"
        />
        <span
          v-else-if="item.badge"
          class="espresso-badge espresso-badge-gray"
        >
          {{ item.badge }}
        </span>
      </router-link>

      <!-- Empty state if module has no items -->
      <div
        v-if="currentModuleItems.length === 0"
        class="py-6 text-center text-gray-400 text-xs"
      >
        No items in {{ activeModule?.name }}
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FeatherIcon } from 'frappe-ui'
import { useMenu } from '@/composables/useMenu'

defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['navigate', 'close'])

const route = useRoute()
const router = useRouter()
const { modules, activeModule, activeModuleName, currentModuleItems, setActiveModule } =
  useMenu()

const showWorkspaceMenu = ref(false)

function selectModule(mod) {
  setActiveModule(mod.name)
  showWorkspaceMenu.value = false
  const targetRoute = mod.to || mod.items?.[0]?.to || mod.items?.[0]?.route
  if (targetRoute) {
    router.push(targetRoute)
  }
}

function isItemActive(item) {
  const target = item.to || item.route
  if (!target) return false

  // Exact matching for full path including query params (e.g. /employees?tab=org)
  if (target.includes('?')) {
    return route.fullPath === target
  }

  // Handle /setup and /workspace specific paths
  if (target === '/setup') {
    return route.path === '/setup' || (route.path === '/' && activeModuleName.value === 'Setup')
  }

  if (target === '/workspace') {
    return route.path === '/workspace'
  }

  if (target === '/dashboard') {
    return route.path === '/dashboard'
  }

  return route.path === target
}
</script>
