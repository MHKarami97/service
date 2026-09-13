<script setup>
import { formatDate, formatToman } from '../services/ServiceStatusPresenter'

defineProps({
  records: { type: Array, required: true },
  isVehicle: { type: Boolean, default: false }
})
defineEmits(['edit', 'remove'])
</script>

<template>
  <div class="space-y-3">
    <article
      v-for="record in records"
      :key="record.id"
      class="rounded-xl border border-slate-100 dark:border-slate-700/60 bg-white dark:bg-slate-800 p-4"
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="font-medium text-sm sm:text-base">{{ record.serviceType || 'سرویس بدون عنوان' }}</p>
          <p class="text-xs text-slate-400 mt-0.5">{{ formatDate(record.performedAt) }}</p>
        </div>
        <div class="flex items-center gap-1">
          <button type="button" class="min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-400 hover:text-brand-500 transition-colors" aria-label="ویرایش" @click="$emit('edit', record)">
            ✏️
          </button>
          <button type="button" class="min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors" aria-label="حذف" @click="$emit('remove', record.id)">
            🗑️
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
        <div class="rounded-lg bg-slate-50 dark:bg-slate-700/40 px-2.5 py-1.5">
          <p class="text-[10px] text-slate-400">هزینه</p>
          <p class="font-medium mt-0.5">{{ formatToman(record.cost) }}</p>
        </div>
        <div class="rounded-lg bg-slate-50 dark:bg-slate-700/40 px-2.5 py-1.5">
          <p class="text-[10px] text-slate-400">سرویس بعدی</p>
          <p class="font-medium mt-0.5">{{ formatDate(record.nextServiceDate) }}</p>
        </div>
        <div v-if="isVehicle" class="rounded-lg bg-slate-50 dark:bg-slate-700/40 px-2.5 py-1.5">
          <p class="text-[10px] text-slate-400">کیلومتر سرویس</p>
          <p class="font-medium mt-0.5">{{ record.serviceOdometer != null ? record.serviceOdometer.toLocaleString('fa-IR') : '—' }}</p>
        </div>
        <div v-if="isVehicle" class="rounded-lg bg-slate-50 dark:bg-slate-700/40 px-2.5 py-1.5">
          <p class="text-[10px] text-slate-400">کیلومتر بعدی</p>
          <p class="font-medium mt-0.5">{{ record.nextServiceOdometer != null ? record.nextServiceOdometer.toLocaleString('fa-IR') : '—' }}</p>
        </div>
        <div v-if="record.location" class="rounded-lg bg-slate-50 dark:bg-slate-700/40 px-2.5 py-1.5 col-span-2">
          <p class="text-[10px] text-slate-400">محل انجام</p>
          <p class="font-medium mt-0.5">{{ record.location }}</p>
        </div>
      </div>

      <div v-if="record.partsUsed.length" class="flex flex-wrap gap-1.5 mt-3">
        <span v-for="part in record.partsUsed" :key="part" class="rounded-full bg-brand-50 dark:bg-brand-700/20 text-brand-700 dark:text-brand-200 text-[11px] px-2.5 py-1">
          {{ part }}
        </span>
      </div>

      <p v-if="record.description" class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{{ record.description }}</p>
    </article>

    <p v-if="!records.length" class="text-center text-sm text-slate-400 py-8">هنوز سرویسی ثبت نشده است</p>
  </div>
</template>
