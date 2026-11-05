<template>
  <nav
    class="md:hidden fixed bottom-0 inset-x-0 h-14 bg-white border-t border-gray-200 z-30 flex items-center justify-around px-2 select-none shadow-md"
    aria-label="Bottom Navigation"
  >
    <!-- Dynamic Module Tabs from menu.json -->
    <button
      v-for="mod in modules"
      :key="mod.name"
      type="button"
      @click="handleSelectModule(mod)"
      :class="[
        activeModuleName === mod.name
          ? 'text-gray-900 font-semibold'
          : 'text-gray-400 hover:text-gray-700',
        'flex flex-col items-center justify-center flex-1 py-1 relative transition-colors text-center group bg-white focus:outline-none',
      ]"
    >
      <div class="relative">
        <FeatherIcon
          :name="mod.icon || 'grid'"
          :class="[
            activeModuleName === mod.name ? 'text-blue-600' : 'text-gray-500',
            'w-5 h-5 transition-colors',
          ]"
        />
      </div>
      <span class="text-[10px] mt-0.5 leading-tight tracking-tight">
        {{ mod.name }}
      </span>
      <span
        v-if="activeModuleName === mod.name"
        class="w-4 h-0.5 bg-blue-600 rounded-full mt-0.5"
      ></span>
      <span v-else class="w-4 h-0.5 bg-transparent mt-0.5"></span>
    </button>

    <!-- Additional Quick Shortcuts: Leaves & Payroll -->
    <router-link
      to="/leaves"
      :class="[
        route.path === '/leaves'
          ? 'text-gray-900 font-semibold'
          : 'text-gray-400 hover:text-gray-700',
        'flex flex-col items-center justify-center flex-1 py-1 relative transition-colors text-center group bg-white',
      ]"
    >
      <FeatherIcon
        name="calendar"
        :class="[
          route.path === '/leaves' ? 'text-blue-600' : 'text-gray-500',
          'w-5 h-5 transition-colors',
        ]"
      />
      <span class="text-[10px] mt-0.5 leading-tight tracking-tight">
        Leaves
      </span>
      <span
        v-if="route.path === '/leaves'"
        class="w-4 h-0.5 bg-blue-600 rounded-full mt-0.5"
      ></span>
      <span v-else class="w-4 h-0.5 bg-transparent mt-0.5"></span>
    </router-link>

    <!-- Menu / Sidebar Drawer Trigger Tab: Solid White -->
    <button
      type="button"
      @click="$emit('toggle-drawer')"
      class="flex flex-col items-center justify-center flex-1 py-1 text-gray-500 hover:text-gray-900 transition-colors text-center focus:outline-none bg-white"
    >
      <FeatherIcon name="menu" class="w-5 h-5" />
      <span class="text-[10px] mt-0.5 leading-tight tracking-tight">
        Menu
      </span>
      <span class="w-4 h-0.5 bg-transparent mt-0.5"></span>
    </button>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { FeatherIcon } from 'frappe-ui'
import { useMenu } from '@/composables/useMenu'

defineEmits(['toggle-drawer'])

const route = useRoute()
const router = useRouter()
const { modules, activeModuleName, setActiveModule } = useMenu()

function handleSelectModule(mod) {
  setActiveModule(mod.name)
  const targetRoute = mod.to || mod.items?.[0]?.to || mod.items?.[0]?.route
  if (targetRoute) {
    router.push(targetRoute)
  }
}
</script>
