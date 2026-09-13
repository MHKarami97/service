<script setup>
import { onMounted } from 'vue'
import { useServiceStore } from './stores/serviceStore'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import BottomNav from './components/BottomNav.vue'

var store = useServiceStore()
onMounted(() => store.initialize())
</script>

<template>
  <div class="min-h-screen flex flex-col text-slate-800 dark:text-slate-100">
    <AppHeader />
    <main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <RouterView />
    </main>
    <AppFooter />
    <BottomNav />
  </div>
</template>
