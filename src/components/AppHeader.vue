<script setup>
import { useRoute } from 'vue-router'
import { useServiceStore } from '../stores/serviceStore'

var route = useRoute()
var store = useServiceStore()
</script>

<template>
  <header class="sticky top-0 z-20 backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
      <RouterLink to="/" class="flex items-center gap-2 font-bold text-lg flex-shrink-0">
        <img
          src="/icons/icon-144.png"
          alt="سرویس یار"
          class="w-8 h-8 object-contain"
          width="32"
          height="32"
        />
        <span>مدیریت سرویس</span>
      </RouterLink>

      <nav class="hidden sm:flex items-center gap-1">
        <RouterLink
          to="/"
          class="px-3 py-2 rounded-xl text-sm transition-colors"
          :class="route.name === 'home' ? 'bg-brand-50 text-brand-600 dark:bg-brand-700/20 dark:text-brand-300 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-brand-500'"
        >
          وسایل من
        </RouterLink>
        <RouterLink
          to="/upcoming"
          class="relative px-3 py-2 rounded-xl text-sm transition-colors"
          :class="route.name === 'upcoming' ? 'bg-brand-50 text-brand-600 dark:bg-brand-700/20 dark:text-brand-300 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-brand-500'"
        >
          سرویس‌های پیش رو
          <span
            v-if="store.overdueCount + store.soonCount > 0"
            class="mr-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px]"
          >
            {{ store.overdueCount + store.soonCount }}
          </span>
        </RouterLink>
      </nav>

      <button
        type="button"
        class="w-11 h-11 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
        :aria-label="store.isDarkMode ? 'حالت روشن' : 'حالت تاریک'"
        @click="store.toggleTheme"
      >
        <span class="text-xl">{{ store.isDarkMode ? '☀️' : '🌙' }}</span>
      </button>
    </div>
  </header>
</template>