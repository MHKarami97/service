<script setup>
import { ref } from 'vue'
import { useServiceStore } from '../stores/serviceStore'
import AppIcon from './AppIcon.vue'

var currentYear = new Date().getFullYear()
var store = useServiceStore()
var importInput = ref(null)

function triggerImport() {
  importInput.value?.click()
}

async function handleImport(event) {
  var file = event.target.files?.[0]
  if (file) {
    try {
      await store.importData(file)
    } catch (error) {
      console.error('خطا در وارد کردن فایل:', error)
    }
  }
  event.target.value = ''
}
</script>

<template>
  <footer class="border-t border-slate-200 dark:border-slate-800 mt-auto">
    <div dir="ltr" class="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800 pt-3 pb-3 max-w-4xl mx-auto px-4 sm:px-6">
      <button
        type="button"
        class="min-h-[32px] px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] hover:border-brand-300 hover:text-brand-500 transition-colors inline-flex items-center gap-1.5"
        @click="store.exportData"
      >
        <AppIcon name="download" :size="13" />
        <span>خروجی</span>
      </button>
      <input ref="importInput" type="file" accept="application/json" class="hidden" @change="handleImport" />
      <button
        type="button"
        class="min-h-[32px] px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] hover:border-brand-300 hover:text-brand-500 transition-colors inline-flex items-center gap-1.5"
        @click="triggerImport"
      >
        <AppIcon name="upload" :size="13" />
        <span>ورودی</span>
      </button>
      <span class="ml-1 mr-5 text-[11px] text-slate-400">مدیریت داده</span>
    </div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-5 space-y-3 text-xs sm:text-sm text-slate-400 border-t border-slate-200 dark:border-slate-800">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {{ currentYear }} مدیریت سرویس</span>
        <a
          href="https://mhkarami97.ir"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
        >
          <span>ساخته شده توسط</span>
          <span class="font-medium underline underline-offset-4">mhkarami97.ir</span>
          <AppIcon name="external-link" :size="12" />
        </a>
      </div>
    </div>
  </footer>
</template>
