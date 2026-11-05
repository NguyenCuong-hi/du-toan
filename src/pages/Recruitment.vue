<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold text-[var(--ink-gray-9)] tracking-tight">Recruitment & Pipeline</h2>
        <p class="text-xs text-[var(--ink-gray-5)] mt-0.5">3 active job vacancies • 29 candidates in pipeline</p>
      </div>

      <button
        type="button"
        class="espresso-btn-primary self-start sm:self-auto"
      >
        <FeatherIcon name="plus" class="w-3.5 h-3.5 mr-1.5" />
        <span>Post Job Opening</span>
      </button>
    </div>

    <!-- Active Job Openings Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="job in jobs"
        :key="job.id"
        class="espresso-card p-5 hover:shadow-md transition-shadow flex flex-col justify-between"
      >
        <div>
          <div class="flex items-start justify-between">
            <span class="espresso-badge espresso-badge-blue">
              {{ job.department }}
            </span>
            <span class="text-[11px] text-[var(--ink-gray-4)]">{{ job.postedDate }}</span>
          </div>
          <h4 class="text-base font-bold text-[var(--ink-gray-9)] mt-2">{{ job.title }}</h4>
          <p class="text-xs text-[var(--ink-gray-5)] mt-1">{{ job.location }} • {{ job.type }}</p>

          <div class="mt-4 pt-3 border-t border-[var(--outline-gray-1)] flex items-center justify-between text-xs">
            <span class="text-[var(--ink-gray-5)]">Applicants:</span>
            <span class="font-bold text-[var(--ink-gray-9)]">{{ job.applicants }} candidates</span>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-[var(--outline-gray-1)] flex items-center justify-between">
          <span class="espresso-badge espresso-badge-green">
            {{ job.status }}
          </span>
          <button class="text-xs font-semibold text-[var(--ink-gray-9)] hover:text-[var(--blue-600)]">
            View Pipeline →
          </button>
        </div>
      </div>
    </div>

    <!-- Candidate Pipeline Table -->
    <div class="espresso-card overflow-hidden">
      <div class="px-6 py-4 border-b border-[var(--outline-gray-1)] flex items-center justify-between">
        <h3 class="text-sm font-semibold text-[var(--ink-gray-9)]">Recent Candidate Applications</h3>
        <span class="text-xs text-[var(--ink-gray-5)]">Active screening</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-[var(--surface-gray-1)] text-[var(--ink-gray-5)] uppercase tracking-wider text-[10px] font-semibold border-b border-[var(--outline-gray-1)]">
            <tr>
              <th class="px-6 py-3">Candidate</th>
              <th class="px-4 py-3">Position</th>
              <th class="px-4 py-3">Stage</th>
              <th class="px-4 py-3">Applied On</th>
              <th class="px-4 py-3">Rating</th>
              <th class="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--outline-gray-1)] text-[var(--ink-gray-7)]">
            <tr v-for="cand in candidates" :key="cand.id" class="hover:bg-[var(--surface-gray-1)]">
              <td class="px-6 py-3.5 font-bold text-[var(--ink-gray-9)]">
                {{ cand.name }}
                <div class="text-[10px] font-normal text-[var(--ink-gray-4)]">{{ cand.email }}</div>
              </td>
              <td class="px-4 py-3.5 font-medium text-[var(--ink-gray-8)]">
                {{ cand.position }}
              </td>
              <td class="px-4 py-3.5">
                <span class="espresso-badge espresso-badge-blue">
                  {{ cand.stage }}
                </span>
              </td>
              <td class="px-4 py-3.5 text-[var(--ink-gray-5)]">
                {{ cand.date }}
              </td>
              <td class="px-4 py-3.5 font-semibold text-[var(--amber-500)]">
                ★ {{ cand.rating }} / 5
              </td>
              <td class="px-6 py-3.5 text-right whitespace-nowrap">
                <button class="text-[var(--blue-600)] hover:text-[var(--blue-800)] font-medium">
                  Schedule Interview
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

const jobs = ref([
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote / US',
    type: 'Full-time',
    applicants: 14,
    status: 'Active',
    postedDate: 'Oct 28',
  },
  {
    id: 2,
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    applicants: 9,
    status: 'Active',
    postedDate: 'Nov 01',
  },
  {
    id: 3,
    title: 'DevOps / SRE Specialist',
    department: 'Infrastructure',
    location: 'Austin, TX',
    type: 'Full-time',
    applicants: 6,
    status: 'Interviewing',
    postedDate: 'Oct 15',
  },
])

const candidates = ref([
  { id: 1, name: 'Elena Rostova', email: 'elena.rostova@gmail.com', position: 'Senior Frontend Engineer', stage: 'Technical Interview', date: 'Yesterday', rating: 4.8 },
  { id: 2, name: 'Lucas Martin', email: 'lucas.martin@outlook.com', position: 'Senior Product Designer', stage: 'Portfolio Review', date: '2 days ago', rating: 4.5 },
  { id: 3, name: 'Kenji Sato', email: 'kenji.sato@tech.io', position: 'DevOps / SRE Specialist', stage: 'Final Round', date: '3 days ago', rating: 4.9 },
])
</script>
