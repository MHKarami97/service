<script setup>
import { computed } from 'vue'
import { useServiceStore } from '../stores/serviceStore'
import StatusBadge from '../components/StatusBadge.vue'
import { formatDate } from '../services/ServiceStatusPresenter'

var store = useServiceStore()

var sortedEntries = computed(() => store.upcomingSorted.filter((entry) => entry.due.status !== 'unknown'))
var unknownEntries = computed(() => store.upcomingSorted.filter((entry) => entry.due.status === 'unknown'))
</script>

<template>
  <section class="space-y-6">
    <div>
      <h1 class="text-xl sm:text-2xl font-bold">سرویس‌های پیش رو</h1>
      <p class="text-sm text-slate-400 mt-1">وضعیت به ترتیب فوریت (گذشته از موعد → رو به اتمام → به‌موقع)</p>
    </div>

    <div v-if="sortedEntries.length" class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 sm:p-3 space-y-2">
      <RouterLink
        v-for="entry in sortedEntries"
        :key="entry.item.id"
        :to="`/item/${entry.item.id}`"
        class="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
      >
        <span class="text-2xl flex-shrink-0">{{ entry.item.icon }}</span>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">{{ entry.item.name }}</p>
          <p class="text-xs text-slate-400 mt-0.5 truncate">
            سرویس بعدی: {{ formatDate(entry.item.nextServiceDate) }}
            <template v-if="entry.item.type === 'vehicle' && entry.due.extra">
              — {{ entry.due.extra.remainingKm >= 0 ? entry.due.extra.remainingKm.toLocaleString('fa-IR') + ' کیلومتر باقی‌مانده' : 'کیلومتر گذشته از موعد' }}
            </template>
          </p>
        </div>
        <StatusBadge :status="entry.due.status" class="flex-shrink-0" />
      </RouterLink>
    </div>

    <div v-if="unknownEntries.length" class="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-4 space-y-2">
      <h2 class="text-xs font-semibold text-slate-400 mb-1">بدون سرویس ثبت‌شده</h2>
      <RouterLink
        v-for="entry in unknownEntries"
        :key="entry.item.id"
        :to="`/item/${entry.item.id}`"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
      >
        <span class="text-2xl flex-shrink-0">{{ entry.item.icon }}</span>
        <span class="text-sm truncate">{{ entry.item.name }}</span>
      </RouterLink>
    </div>

    <p v-if="!store.items.length" class="text-center text-sm text-slate-400 py-12">وسیله‌ای ثبت نشده است.</p>
  </section>
</template>