<script setup>
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'
import AppIcon from './AppIcon.vue'
import { formatDate } from '../services/ServiceStatusPresenter'

var props = defineProps({
  item: { type: Object, required: true },
  due: { type: Object, required: true }
})

var lastRecord = computed(() => props.item.lastRecord)
</script>

<template>
  <RouterLink
    :to="`/item/${item.id}`"
    class="block rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
  >
    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
      <div class="flex items-center gap-3 min-w-0">
        <div class="flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/25 dark:text-brand-300 flex-shrink-0">
          <AppIcon :name="item.icon" :size="24" />
        </div>
        <div class="min-w-0">
          <h3 class="font-semibold text-sm sm:text-base leading-tight truncate">{{ item.name }}</h3>
          <p class="text-xs text-slate-400 mt-0.5">{{ item.historyCount }} سرویس ثبت‌شده</p>
        </div>
      </div>
      <StatusBadge :status="due.status" class="flex-shrink-0" />
    </div>

    <div class="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
      <div class="rounded-xl bg-slate-50 dark:bg-slate-700/40 px-3 py-2">
        <p class="text-[10px] text-slate-400">سرویس بعدی</p>
        <p class="font-medium text-slate-700 dark:text-slate-200 mt-0.5">{{ formatDate(item.nextServiceDate) }}</p>
      </div>
      <div v-if="item.type === 'vehicle'" class="rounded-xl bg-slate-50 dark:bg-slate-700/40 px-3 py-2">
        <p class="text-[10px] text-slate-400">کیلومتر سرویس بعدی</p>
        <p class="font-medium text-slate-700 dark:text-slate-200 mt-0.5">
          {{ item.nextServiceOdometer ? item.nextServiceOdometer.toLocaleString('fa-IR') + ' km' : '—' }}
        </p>
      </div>
      <div v-else class="rounded-xl bg-slate-50 dark:bg-slate-700/40 px-3 py-2">
        <p class="text-[10px] text-slate-400">آخرین سرویس</p>
        <p class="font-medium text-slate-700 dark:text-slate-200 mt-0.5">{{ formatDate(lastRecord?.performedAt) }}</p>
      </div>
    </div>
  </RouterLink>
</template>