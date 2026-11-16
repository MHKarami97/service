<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useServiceStore } from '../stores/serviceStore'
import AppIcon from './AppIcon.vue'
import { NAV_ITEMS, isNavActive } from '../data/appNav'

var route = useRoute()
var store = useServiceStore()
var upcomingCount = computed(() => store.overdueCount + store.soonCount)
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

      <nav class="hidden sm:flex items-center gap-1" aria-label="منوی اصلی">
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.id"
          :to="item.to"
          class="relative px-3 py-2 rounded-xl text-sm transition-colors"
          :class="isNavActive(item, route.name) ? 'bg-brand-50 text-brand-600 dark:bg-brand-700/20 dark:text-brand-300 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-brand-500'"
        >
          {{ item.title }}
          <span
            v-if="item.id === 'upcoming' && upcomingCount > 0"
            class="mr-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px]"
          >
            {{ upcomingCount }}
          </span>
        </RouterLink>
      </nav>

      <button
        type="button"
        class="w-11 h-11 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
        :aria-label="store.isDarkMode ? 'حالت روشن' : 'حالت تاریک'"
        @click="store.toggleTheme"
      >
        <AppIcon :name="store.isDarkMode ? 'sun' : 'moon'" />
      </button>
    </div>
  </header>
</template>
