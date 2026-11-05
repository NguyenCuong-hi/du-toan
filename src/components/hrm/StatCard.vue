<template>
  <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:shadow-sm transition-shadow">
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {{ title }}
      </span>
      <div
        :class="[
          iconBg || 'bg-gray-100 text-gray-700',
          'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
        ]"
      >
        <FeatherIcon :name="icon" class="w-4 h-4" />
      </div>
    </div>

    <div class="mt-3 flex items-baseline justify-between">
      <div class="text-2xl font-bold text-gray-900 tracking-tight">
        {{ value }}
      </div>
      <div
        v-if="change"
        :class="[
          isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50',
          'inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium',
        ]"
      >
        <FeatherIcon
          :name="isPositive ? 'trending-up' : 'trending-down'"
          class="w-3 h-3 mr-1"
        />
        {{ change }}
      </div>
    </div>

    <div v-if="subtitle" class="mt-1 text-xs text-gray-400">
      {{ subtitle }}
    </div>
  </div>
</template>

<script setup>
import { FeatherIcon } from 'frappe-ui'

defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  change: {
    type: String,
    default: '',
  },
  isPositive: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: 'activity',
  },
  iconBg: {
    type: String,
    default: '',
  },
})
</script>
