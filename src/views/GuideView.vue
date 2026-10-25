<script setup>
import { computed } from 'vue'
import { useServiceStore } from '../stores/serviceStore'
import { guideRepository } from '../services/GuideRepository'
import { useGuide } from '../composables/useGuide'
import GuideModal from '../components/GuideModal.vue'
import GuideButton from '../components/GuideButton.vue'

var store = useServiceStore()
var { openGuide } = useGuide()

var GROUPS = [
  { type: 'vehicle', label: 'وسایل نقلیه' },
  { type: 'appliance', label: 'لوازم خانه' }
]

var groupedCatalog = computed(() =>
  GROUPS.map((group) => ({
    label: group.label,
    entries: store.catalog
      .filter((entry) => entry.type === group.type)
      .map((entry) => ({
        entry,
        coverage: guideRepository.coverage(entry.id),
        types: entry.serviceTypes.map((type) => ({
          ...type,
          hasGuide: guideRepository.hasGuide(entry.id, type.id)
        }))
      }))
  }))
)
</script>

<template>
  <section class="space-y-8">
    <div>
      <h1 class="text-xl sm:text-2xl font-bold">راهنمای سرویس</h1>
      <p class="text-sm text-slate-400 mt-1">برای هر سرویس بخوانید چه چیزی را بررسی، چه چیزی را هم‌زمان تعویض و چه چیزی را از تعمیرکار بخواهید.</p>
    </div>

    <div v-for="group in groupedCatalog" :key="group.label" class="space-y-3">
      <h2 class="text-sm font-semibold text-slate-500 dark:text-slate-400">{{ group.label }}</h2>

      <details
        v-for="row in group.entries"
        :key="row.entry.id"
        class="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
      >
        <summary class="flex items-center gap-3 p-4 cursor-pointer list-none min-h-[56px]">
          <span class="text-2xl">{{ row.entry.icon }}</span>
          <span class="flex-1 font-medium text-sm sm:text-base">{{ row.entry.name }}</span>
          <span class="text-[11px] text-slate-400">
            {{ row.coverage.covered.toLocaleString('fa-IR') }} از {{ row.coverage.total.toLocaleString('fa-IR') }} راهنما
          </span>
        </summary>

        <ul class="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <li
            v-for="type in row.types"
            :key="type.id"
            class="flex items-center justify-between gap-2 rounded-xl bg-slate-50 dark:bg-slate-700/40 px-3 py-2"
          >
            <span class="text-xs sm:text-sm">{{ type.title }}</span>
            <GuideButton v-if="type.hasGuide" compact @click="openGuide(row.entry.id, type.id)" />
            <span v-else class="text-[11px] text-slate-400">به‌زودی</span>
          </li>
        </ul>
      </details>
    </div>
  </section>

  <GuideModal />
</template>
