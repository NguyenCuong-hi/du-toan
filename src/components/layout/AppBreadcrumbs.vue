<template>
  <div class="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <!-- Breadcrumb & Title Section -->
    <div class="space-y-0.5">
      <nav class="flex items-center space-x-1.5 text-xs text-gray-500">
        <router-link to="/dashboard" class="hover:text-gray-900 transition-colors">
          HRM
        </router-link>
        <span class="text-gray-300">/</span>
        <span class="text-gray-900 font-medium capitalize">{{ currentTitle }}</span>
      </nav>
      <div class="flex items-center space-x-2">
        <h1 class="text-lg font-bold text-gray-900 tracking-tight leading-snug">
          {{ title || currentTitle }}
        </h1>
        <slot name="badge" />
      </div>
    </div>

    <!-- Actions bar slot -->
    <div class="flex items-center space-x-2.5">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const route = useRoute()

const currentTitle = computed(() => {
  if (route.name) return String(route.name)
  const segment = route.path.split('/')[1]
  return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : 'Dashboard'
})
</script>
