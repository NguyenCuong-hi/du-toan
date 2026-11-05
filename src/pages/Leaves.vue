<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div class="flex items-center space-x-2">
        <h2 class="text-xl font-semibold text-[var(--ink-gray-9)] tracking-tight">Leaves & Attendance</h2>
        <span class="espresso-badge espresso-badge-gray">
          {{ filteredLeaves.length }} applications
        </span>
      </div>

      <button
        type="button"
        @click="showApplyModal = true"
        class="espresso-btn-primary self-start sm:self-auto"
      >
        <FeatherIcon name="plus" class="w-3.5 h-3.5 mr-1.5" />
        <span>Apply for Leave</span>
      </button>
    </div>

    <!-- Leave Balance Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="espresso-card p-5">
        <div class="flex items-center justify-between text-xs text-[var(--ink-gray-5)] mb-2">
          <span class="font-semibold uppercase tracking-wider text-[11px]">Casual Leave</span>
          <span class="espresso-badge espresso-badge-blue">8 Left</span>
        </div>
        <div class="text-2xl font-bold text-[var(--ink-gray-9)]">8 <span class="text-xs text-[var(--ink-gray-4)] font-normal">/ 12 days</span></div>
        <div class="w-full bg-[var(--surface-gray-2)] rounded-full h-1.5 mt-3">
          <div class="bg-[var(--blue-600)] h-1.5 rounded-full" style="width: 66%"></div>
        </div>
      </div>

      <div class="espresso-card p-5">
        <div class="flex items-center justify-between text-xs text-[var(--ink-gray-5)] mb-2">
          <span class="font-semibold uppercase tracking-wider text-[11px]">Sick Leave</span>
          <span class="espresso-badge espresso-badge-green">12 Left</span>
        </div>
        <div class="text-2xl font-bold text-[var(--ink-gray-9)]">12 <span class="text-xs text-[var(--ink-gray-4)] font-normal">/ 14 days</span></div>
        <div class="w-full bg-[var(--surface-gray-2)] rounded-full h-1.5 mt-3">
          <div class="bg-[var(--green-600)] h-1.5 rounded-full" style="width: 85%"></div>
        </div>
      </div>

      <div class="espresso-card p-5">
        <div class="flex items-center justify-between text-xs text-[var(--ink-gray-5)] mb-2">
          <span class="font-semibold uppercase tracking-wider text-[11px]">Annual Leave</span>
          <span class="espresso-badge espresso-badge-purple">15 Left</span>
        </div>
        <div class="text-2xl font-bold text-[var(--ink-gray-9)]">15 <span class="text-xs text-[var(--ink-gray-4)] font-normal">/ 20 days</span></div>
        <div class="w-full bg-[var(--surface-gray-2)] rounded-full h-1.5 mt-3">
          <div class="bg-[var(--purple-600)] h-1.5 rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <div class="espresso-card p-5">
        <div class="flex items-center justify-between text-xs text-[var(--ink-gray-5)] mb-2">
          <span class="font-semibold uppercase tracking-wider text-[11px]">Compensatory</span>
          <span class="espresso-badge espresso-badge-amber">3 Left</span>
        </div>
        <div class="text-2xl font-bold text-[var(--ink-gray-9)]">3 <span class="text-xs text-[var(--ink-gray-4)] font-normal">/ 5 days</span></div>
        <div class="w-full bg-[var(--surface-gray-2)] rounded-full h-1.5 mt-3">
          <div class="bg-[var(--amber-600)] h-1.5 rounded-full" style="width: 60%"></div>
        </div>
      </div>
    </div>

    <!-- Main Leaves Table Card -->
    <div class="espresso-card overflow-hidden">
      <!-- Toolbar -->
      <div class="px-6 py-4 border-b border-[var(--outline-gray-1)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 class="text-sm font-semibold text-[var(--ink-gray-9)]">All Applications</h3>

        <!-- Status Filters -->
        <div class="flex items-center space-x-1.5 text-xs">
          <button
            v-for="st in ['All', 'Pending', 'Approved', 'Rejected']"
            :key="st"
            type="button"
            @click="statusFilter = st"
            :class="[
              statusFilter === st
                ? 'bg-[var(--gray-900)] text-[var(--white)] font-semibold'
                : 'text-[var(--ink-gray-6)] hover:bg-[var(--surface-gray-2)]',
              'px-3 py-1.5 rounded-[var(--radius-4)] transition-colors',
            ]"
          >
            {{ st }}
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-[var(--surface-gray-1)] text-[var(--ink-gray-5)] uppercase tracking-wider text-[10px] font-semibold border-b border-[var(--outline-gray-1)]">
            <tr>
              <th class="px-6 py-3">Doc ID</th>
              <th class="px-4 py-3">Employee</th>
              <th class="px-4 py-3">Type</th>
              <th class="px-4 py-3">Dates</th>
              <th class="px-4 py-3">Days</th>
              <th class="px-4 py-3">Reason</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--outline-gray-1)] text-[var(--ink-gray-7)]">
            <tr
              v-for="leave in filteredLeaves"
              :key="leave.id"
              class="hover:bg-[var(--surface-gray-1)] transition-colors"
            >
              <td class="px-6 py-3.5 font-mono text-[11px] font-semibold text-[var(--ink-gray-8)]">
                {{ leave.id }}
              </td>
              <td class="px-4 py-3.5 font-bold text-[var(--ink-gray-9)]">
                {{ leave.employeeName }}
                <div class="text-[10px] font-normal text-[var(--ink-gray-4)]">{{ leave.department }}</div>
              </td>
              <td class="px-4 py-3.5 font-medium text-[var(--ink-gray-8)]">
                {{ leave.leaveType }}
              </td>
              <td class="px-4 py-3.5 text-[var(--ink-gray-6)] whitespace-nowrap">
                {{ leave.fromDate }} → {{ leave.toDate }}
              </td>
              <td class="px-4 py-3.5 font-semibold text-[var(--ink-gray-9)]">
                {{ leave.days }}d
              </td>
              <td class="px-4 py-3.5 text-[var(--ink-gray-6)] max-w-xs truncate" :title="leave.reason">
                {{ leave.reason }}
              </td>
              <td class="px-4 py-3.5">
                <span
                  :class="[
                    leave.status === 'Approved'
                      ? 'espresso-badge-green'
                      : leave.status === 'Pending'
                      ? 'espresso-badge-amber'
                      : 'espresso-badge-red',
                    'espresso-badge',
                  ]"
                >
                  {{ leave.status }}
                </span>
              </td>
              <td class="px-6 py-3.5 text-right whitespace-nowrap">
                <div v-if="leave.status === 'Pending'" class="flex items-center justify-end space-x-1.5">
                  <button
                    type="button"
                    @click="updateLeaveStatus(leave.id, 'Approved')"
                    class="px-2 py-1 text-[11px] font-semibold bg-[var(--green-600)] hover:bg-[var(--green-700)] text-[var(--white)] rounded-[var(--radius-sm)] transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    @click="updateLeaveStatus(leave.id, 'Rejected')"
                    class="px-2 py-1 text-[11px] font-semibold bg-[var(--surface-red-1)] hover:bg-[var(--surface-red-2)] text-[var(--ink-red-8)] rounded-[var(--radius-sm)] transition-colors"
                  >
                    Reject
                  </button>
                </div>
                <span v-else class="text-[11px] text-[var(--ink-gray-4)] font-medium">
                  Processed
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <LeaveApplyModal v-model="showApplyModal" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FeatherIcon } from 'frappe-ui'
import LeaveApplyModal from '@/components/hrm/LeaveApplyModal.vue'
import { useHrmData } from '@/composables/useHrmData'

const { leaveRequests, updateLeaveStatus } = useHrmData()

const statusFilter = ref('All')
const showApplyModal = ref(false)

const filteredLeaves = computed(() => {
  if (statusFilter.value === 'All') return leaveRequests.value
  return leaveRequests.value.filter((l) => l.status === statusFilter.value)
})
</script>
