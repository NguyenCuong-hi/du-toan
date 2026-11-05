<template>
  <Dialog
    v-model="isOpen"
    :options="{
      title: 'New Employee Registration',
      size: 'lg',
      actions: [
        {
          label: 'Create Employee',
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
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-[var(--ink-gray-8)] mb-1">
              Full Name *
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="e.g. Jane Doe"
              class="w-full px-3 py-2 text-xs border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[var(--ink-gray-8)] mb-1">
              Work Email *
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="jane.doe@company.com"
              class="w-full px-3 py-2 text-xs border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[var(--ink-gray-8)] mb-1">
              Designation *
            </label>
            <input
              v-model="form.designation"
              type="text"
              required
              placeholder="e.g. Frontend Engineer"
              class="w-full px-3 py-2 text-xs border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[var(--ink-gray-8)] mb-1">
              Department *
            </label>
            <select
              v-model="form.department"
              required
              class="w-full px-3 py-2 text-xs border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
            >
              <option value="" disabled>Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[var(--ink-gray-8)] mb-1">
              Phone Number
            </label>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              class="w-full px-3 py-2 text-xs border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[var(--ink-gray-8)] mb-1">
              Location / Office
            </label>
            <input
              v-model="form.location"
              type="text"
              placeholder="e.g. San Francisco, CA / Remote"
              class="w-full px-3 py-2 text-xs border border-[var(--outline-gray-2)] rounded-[var(--radius-4)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] bg-[var(--surface-base)] text-[var(--ink-gray-9)]"
            />
          </div>
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

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'created'])

const { addEmployee } = useHrmData()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const form = reactive({
  name: '',
  email: '',
  designation: '',
  department: 'Engineering',
  phone: '',
  location: 'San Francisco, CA',
})

const errorMessage = ref('')

function handleSave({ close }) {
  if (!form.name || !form.email || !form.designation) {
    errorMessage.value = 'Please fill all required fields.'
    return
  }

  const newEmp = addEmployee({
    name: form.name,
    email: form.email,
    designation: form.designation,
    department: form.department,
    phone: form.phone || '+1 (555) 123-4567',
    location: form.location,
  })

  // Reset
  form.name = ''
  form.email = ''
  form.designation = ''
  form.phone = ''
  errorMessage.value = ''

  emit('created', newEmp)
  if (close) close()
  else isOpen.value = false
}
</script>
