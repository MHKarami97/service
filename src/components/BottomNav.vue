<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useServiceStore } from '../stores/serviceStore'
import AppIcon from './AppIcon.vue'
import { NAV_ITEMS, isNavActive } from '../data/appNav'

var route = useRoute()
var store = useServiceStore()
var upcomingCount = computed(() => store.overdueCount + store.soonCount)

function badgeOf(item) {
  return item.id === 'upcoming' ? upcomingCount.value : 0
}
</script>

<template>
  <nav
    aria-label="منوی اصلی"
    class="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] sm:hidden"
  >
    <ul
      class="pointer-events-auto mx-auto grid max-w-md grid-cols-4 rounded-3xl bg-white/85 p-1.5 shadow-[0_8px_30px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70 backdrop-blur-xl dark:bg-slate-900/85 dark:ring-slate-700/60"
    >
      <li v-for="item in NAV_ITEMS" :key="item.id">
        <RouterLink
          :to="item.to"
          :aria-label="item.title"
          :aria-current="isNavActive(item, route.name) ? 'page' : undefined"
          class="group flex flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 text-[11px] transition-colors"
          :class="isNavActive(item, route.name) ? 'font-semibold text-brand-600 dark:text-brand-300' : 'text-slate-500 dark:text-slate-400'"
        >
          <span
            class="relative flex h-8 w-12 items-center justify-center rounded-full transition-all duration-200"
            :class="isNavActive(item, route.name)
              ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
              : 'group-active:scale-90'"
          >
            <AppIcon :name="item.icon" :size="22" />
            <span
              v-if="badgeOf(item)"
              class="absolute -top-1 -left-0.5 min-w-[18px] rounded-full bg-red-500 px-1 text-center text-[10px] font-bold leading-[18px] text-white ring-2 ring-white dark:ring-slate-900"
            >{{ badgeOf(item) > 99 ? '99+' : badgeOf(item) }}</span>
          </span>
          <span class="truncate">{{ item.shortTitle }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
