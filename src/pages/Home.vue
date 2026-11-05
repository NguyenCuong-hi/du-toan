<template>
  <div class="p-6">
    <router-link to="/dashboard" class="text-blue-600 underline">Go to HRM Dashboard</router-link>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
onMounted(() => {
  router.replace('/dashboard')
})
</script>
