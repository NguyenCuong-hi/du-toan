<template>
  <Dialog
    v-model="isOpen"
    :options="{
      title: 'Apply for Leave',
      size: 'md',
      actions: [
        {
          label: 'Submit Application',
          variant: 'solid',
          appearance: 'primary',
          handler: handleSave,
        },
        {
          label: 'Cancel',
          handler: () => (isOpen = false),
        },
      ],
    }"
  >
    <template #body-content>
      <form @submit.prevent="handleSave" class="mt-4 space-y-4">
        <div>
          <label class="block text-xs font-semibold text-[var(--ink-gray-8)] mb-1">
            Leave Type *
          </label>
          <select
            v-model="form.leaveType"
            required
            class="w-full px-3 py-2 text-xs border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
          >
            <option value="Casual Leave">Casual Leave (Balance: 8 days)</option>
            <option value="Sick Leave">Sick Leave (Balance: 12 days)</option>
            <option value="Annual Leave">Annual Leave (Balance: 15 days)</option>
            <option value="Privilege Leave">Privilege Leave (Balance: 5 days)</option>
            <option value="Unpaid Leave">Leave Without Pay (LWP)</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-[var(--ink-gray-8)] mb-1">
              From Date *
            </label>
            <input
              v-model="form.fromDate"
              type="date"
              required
              class="w-full px-3 py-2 text-xs border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-[var(--ink-gray-8)] mb-1">
              To Date *
            </label>
            <input
              v-model="form.toDate"
              type="date"
              required
              class="w-full px-3 py-2 text-xs border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-[var(--ink-gray-8)] mb-1">
            Reason / Notes *
          </label>
          <textarea
            v-model="form.reason"
            rows="3"
            required
            placeholder="Please state the purpose for leave..."
            class="w-full px-3 py-2 text-xs border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
          ></textarea>
        </div>

        <p v-if="errorMessage" class="text-xs text-[var(--red-600)] font-medium">
          {{ errorMessage }}
        </p>
      </form>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { Dialog } from 'frappe-ui'
import { useHrmData } from '@/composables/useHrmData'
import { useAuth } from '@/composables/useAuth'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'submitted'])

const { applyLeave } = useHrmData()
const { user } = useAuth()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const form = reactive({
  leaveType: 'Casual Leave',
  fromDate: new Date().toISOString().slice(0, 10),
  toDate: new Date().toISOString().slice(0, 10),
  reason: '',
})

const errorMessage = ref('')

function handleSave({ close }) {
  if (!form.reason || !form.fromDate || !form.toDate) {
    errorMessage.value = 'Please complete all required fields.'
    return
  }

  const d1 = new Date(form.fromDate)
  const d2 = new Date(form.toDate)
  const diffTime = Math.abs(d2 - d1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

  const newApp = applyLeave({
    employeeName: user.value.name,
    department: user.value.department || 'Human Resources',
    leaveType: form.leaveType,
    fromDate: form.fromDate,
    toDate: form.toDate,
    days: diffDays,
    reason: form.reason,
  })

  form.reason = ''
  errorMessage.value = ''

  emit('submitted', newApp)
  if (close) close()
  else isOpen.value = false
}
</script>
