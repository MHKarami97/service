<script setup>
import { useRoute } from 'vue-router'
import { useServiceStore } from '../stores/serviceStore'

var route = useRoute()
var store = useServiceStore()
</script>

<template>
  <nav class="sm:hidden fixed bottom-0 inset-x-0 z-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around h-16">
    <RouterLink
      to="/"
      class="flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 text-xs"
      :class="route.name === 'home' ? 'text-brand-500 font-semibold' : 'text-slate-500 dark:text-slate-400'"
    >
      <span class="text-xl">🏠</span>
      <span>وسایل من</span>
    </RouterLink>
    <RouterLink
      to="/upcoming"
      class="relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 text-xs"
      :class="route.name === 'upcoming' ? 'text-brand-500 font-semibold' : 'text-slate-500 dark:text-slate-400'"
    >
      <span class="text-xl">⏰</span>
      <span>سرویس‌های پیش رو</span>
      <span
        v-if="store.overdueCount + store.soonCount > 0"
        class="absolute top-0 left-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center"
      >
        {{ store.overdueCount + store.soonCount }}
      </span>
    </RouterLink>
    <RouterLink
      to="/guide"
      class="flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 text-xs"
      :class="route.name === 'guide' ? 'text-brand-500 font-semibold' : 'text-slate-500 dark:text-slate-400'"
    >
      <span class="text-xl">💡</span>
      <span>راهنما</span>
    </RouterLink>
  </nav>
</template>
