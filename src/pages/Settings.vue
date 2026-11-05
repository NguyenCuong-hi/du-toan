<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-semibold text-[var(--ink-gray-9)] tracking-tight">Setup & Settings</h2>
      <p class="text-xs text-[var(--ink-gray-5)] mt-0.5">Configure shifts, company details, biometric tracking, and Frappe integration</p>
    </div>

    <!-- Profile Card -->
    <div class="espresso-card p-6 space-y-4">
      <h3 class="text-sm font-semibold text-[var(--ink-gray-9)] border-b border-[var(--outline-gray-1)] pb-3">
        Administrator & Workspace Account
      </h3>

      <div class="flex items-center space-x-4">
        <div class="w-14 h-14 rounded-[var(--radius-xl)] bg-[var(--surface-purple-1)] text-[var(--ink-purple-8)] flex items-center justify-center font-bold text-lg border border-[var(--outline-gray-1)]">
          {{ user.initials || 'NV' }}
        </div>
        <div>
          <h4 class="text-base font-bold text-[var(--ink-gray-9)]">{{ user.fullName || user.name }}</h4>
          <p class="text-xs text-[var(--ink-gray-5)]">{{ user.role }} • {{ user.email }}</p>
          <p class="text-xs text-[var(--ink-gray-4)] mt-0.5">ERPNext v15 Production Desk</p>
        </div>
      </div>
    </div>

    <!-- General Policy Settings Form -->
    <div class="espresso-card p-6 space-y-5">
      <h3 class="text-sm font-semibold text-[var(--ink-gray-9)] border-b border-[var(--outline-gray-1)] pb-3">
        Working Hours & Shifts
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label class="block font-semibold text-[var(--ink-gray-8)] mb-1">Standard Shift Starts</label>
          <input
            type="time"
            value="09:00"
            class="w-full px-3 py-2 border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
          />
        </div>

        <div>
          <label class="block font-semibold text-[var(--ink-gray-8)] mb-1">Standard Shift Ends</label>
          <input
            type="time"
            value="18:00"
            class="w-full px-3 py-2 border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
          />
        </div>

        <div>
          <label class="block font-semibold text-[var(--ink-gray-8)] mb-1">Default Leave Approver</label>
          <input
            type="text"
            :value="user.fullName || user.name"
            disabled
            class="w-full px-3 py-2 border border-[var(--outline-gray-1)] bg-[var(--surface-gray-1)] rounded-[var(--radius-4)] text-[var(--ink-gray-5)]"
          />
        </div>

        <div>
          <label class="block font-semibold text-[var(--ink-gray-8)] mb-1">Biometric / Web Check-In</label>
          <select class="w-full px-3 py-2 border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]">
            <option>Web Punch & Geolocation Enabled</option>
            <option>Biometric Only</option>
            <option>Manual Attendance Entry</option>
          </select>
        </div>
      </div>

      <div class="pt-4 border-t border-[var(--outline-gray-1)] flex justify-end">
        <button
          type="button"
          @click="savedMessage = 'Settings saved successfully!'"
          class="espresso-btn-primary"
        >
          Save Changes
        </button>
      </div>

      <p v-if="savedMessage" class="text-xs font-medium text-[var(--green-600)]">
        {{ savedMessage }}
      </p>
    </div>

    <!-- Frappe Integration Status -->
    <div class="bg-[var(--surface-gray-1)] rounded-[var(--radius-xl)] border border-[var(--outline-gray-1)] p-5 text-xs space-y-2">
      <div class="flex items-center space-x-2 font-semibold text-[var(--ink-gray-8)]">
        <FeatherIcon name="check-circle" class="w-4 h-4 text-[var(--green-600)]" />
        <span>Frappe UI Resource Integration Ready</span>
      </div>
      <p class="text-[var(--ink-gray-5)] leading-relaxed">
        This frontend base connects out-of-the-box with standard ERPNext Human Resources DocTypes:
        <code class="px-1 py-0.5 bg-[var(--surface-gray-2)] rounded-[var(--radius-sm)] font-mono">Employee</code>,
        <code class="px-1 py-0.5 bg-[var(--surface-gray-2)] rounded-[var(--radius-sm)] font-mono">Leave Application</code>,
        <code class="px-1 py-0.5 bg-[var(--surface-gray-2)] rounded-[var(--radius-sm)] font-mono">Attendance</code>, and
        <code class="px-1 py-0.5 bg-[var(--surface-gray-2)] rounded-[var(--radius-sm)] font-mono">Salary Slip</code>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FeatherIcon } from 'frappe-ui'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
const savedMessage = ref('')
</script>
