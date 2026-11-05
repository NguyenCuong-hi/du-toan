<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold text-[var(--ink-gray-9)] tracking-tight">Payroll & Compensation</h2>
        <p class="text-xs text-[var(--ink-gray-5)] mt-0.5">Manage salary structures, deductions, and monthly salary slips</p>
      </div>

      <button
        type="button"
        @click="showProcessNotice = true"
        class="espresso-btn-primary self-start sm:self-auto"
      >
        <FeatherIcon name="play" class="w-3.5 h-3.5 mr-1.5" />
        <span>Process Payroll Run</span>
      </button>
    </div>

    <!-- Notice -->
    <div
      v-if="showProcessNotice"
      class="bg-[var(--surface-blue-1)] border border-[var(--outline-blue-2)] text-[var(--ink-blue-8)] px-4 py-3 rounded-[var(--radius-lg)] flex items-center justify-between text-xs"
    >
      <div class="flex items-center space-x-2">
        <FeatherIcon name="info" class="w-4 h-4 text-[var(--blue-600)] shrink-0" />
        <span>Payroll for <strong>October 2026</strong> has been synchronized with ERPNext Salary Slip doctype.</span>
      </div>
      <button @click="showProcessNotice = false" class="text-[var(--blue-600)] hover:text-[var(--blue-800)]">
        <FeatherIcon name="x" class="w-4 h-4" />
      </button>
    </div>

    <!-- KPI Summary -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="espresso-card p-5">
        <span class="text-xs font-semibold uppercase tracking-wider text-[var(--ink-gray-5)] text-[11px]">Monthly Payroll Cost</span>
        <div class="text-2xl font-bold text-[var(--ink-gray-9)] mt-2">VND 785,000,000</div>
        <span class="text-xs text-[var(--green-600)] font-medium">Within budget for Q4</span>
      </div>

      <div class="espresso-card p-5">
        <span class="text-xs font-semibold uppercase tracking-wider text-[var(--ink-gray-5)] text-[11px]">Slips Generated</span>
        <div class="text-2xl font-bold text-[var(--ink-gray-9)] mt-2">42 / 42</div>
        <span class="text-xs text-[var(--ink-gray-5)]">100% processed</span>
      </div>

      <div class="espresso-card p-5">
        <span class="text-xs font-semibold uppercase tracking-wider text-[var(--ink-gray-5)] text-[11px]">Next Disbursement</span>
        <div class="text-2xl font-bold text-[var(--ink-gray-9)] mt-2">Nov 30, 2026</div>
        <span class="text-xs text-[var(--ink-gray-5)]">Automated bank transfer</span>
      </div>
    </div>

    <!-- Salary Slips Table -->
    <div class="espresso-card overflow-hidden">
      <div class="px-6 py-4 border-b border-[var(--outline-gray-1)] flex items-center justify-between">
        <h3 class="text-sm font-semibold text-[var(--ink-gray-9)]">Recent Salary Slips</h3>
        <span class="text-xs text-[var(--ink-gray-5)]">October 2026 Cycle</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-[var(--surface-gray-1)] text-[var(--ink-gray-5)] uppercase tracking-wider text-[10px] font-semibold border-b border-[var(--outline-gray-1)]">
            <tr>
              <th class="px-6 py-3">Slip ID</th>
              <th class="px-4 py-3">Employee</th>
              <th class="px-4 py-3">Month</th>
              <th class="px-4 py-3">Gross Pay</th>
              <th class="px-4 py-3">Net Pay</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--outline-gray-1)] text-[var(--ink-gray-7)]">
            <tr
              v-for="slip in salarySlips"
              :key="slip.id"
              class="hover:bg-[var(--surface-gray-1)] transition-colors"
            >
              <td class="px-6 py-3.5 font-mono text-[11px] font-semibold text-[var(--ink-gray-8)]">
                {{ slip.id }}
              </td>
              <td class="px-4 py-3.5 font-bold text-[var(--ink-gray-9)]">
                {{ slip.employeeName }}
              </td>
              <td class="px-4 py-3.5 text-[var(--ink-gray-6)]">
                {{ slip.month }}
              </td>
              <td class="px-4 py-3.5 text-[var(--ink-gray-5)]">
                {{ slip.grossPay }}
              </td>
              <td class="px-4 py-3.5 font-bold text-[var(--ink-gray-9)]">
                {{ slip.netPay }}
              </td>
              <td class="px-4 py-3.5">
                <span
                  :class="[
                    slip.status === 'Paid'
                      ? 'espresso-badge-green'
                      : 'espresso-badge-amber',
                    'espresso-badge',
                  ]"
                >
                  {{ slip.status }}
                </span>
              </td>
              <td class="px-6 py-3.5 text-right whitespace-nowrap">
                <button
                  type="button"
                  class="text-[var(--blue-600)] hover:text-[var(--blue-800)] font-medium text-xs flex items-center justify-end space-x-1 ml-auto"
                >
                  <FeatherIcon name="download" class="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FeatherIcon } from 'frappe-ui'
import { useHrmData } from '@/composables/useHrmData'

const { salarySlips } = useHrmData()
const showProcessNotice = ref(false)
</script>
