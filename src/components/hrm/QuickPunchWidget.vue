<template>
  <div class="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-5 shadow-sm flex flex-col justify-between">
    <div>
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Attendance Punch
        </span>
        <span
          :class="[
            punchState.isPunchedIn ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gray-700 text-gray-300',
            'px-2 py-0.5 text-[10px] font-semibold rounded-full',
          ]"
        >
          {{ punchState.isPunchedIn ? 'Checked In' : 'Checked Out' }}
        </span>
      </div>

      <div class="text-3xl font-mono font-bold tracking-tight text-white mb-1">
        {{ currentTime }}
      </div>
      <p class="text-xs text-gray-400">
        {{ punchState.isPunchedIn ? `Punched in at ${punchState.lastPunchTime}` : 'Not punched in today' }}
      </p>
    </div>

    <div class="mt-5 pt-4 border-t border-gray-700/60 flex items-center justify-between">
      <div class="text-xs text-gray-300">
        Shift: <span class="text-white font-medium">09:00 AM - 06:00 PM</span>
      </div>

      <button
        type="button"
        @click="togglePunch"
        :class="[
          punchState.isPunchedIn
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-emerald-500 hover:bg-emerald-600 text-white',
          'px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center space-x-1.5 focus:outline-none',
        ]"
      >
        <FeatherIcon :name="punchState.isPunchedIn ? 'log-out' : 'log-in'" class="w-3.5 h-3.5" />
        <span>{{ punchState.isPunchedIn ? 'Punch Out' : 'Punch In' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FeatherIcon } from 'frappe-ui'
import { useHrmData } from '@/composables/useHrmData'

const { punchState, togglePunch } = useHrmData()

const currentTime = ref('')
let timer = null

function updateClock() {
  currentTime.value = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
