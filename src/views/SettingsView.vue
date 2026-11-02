<script setup>
import { ref } from 'vue'
import { useServiceStore } from '../stores/serviceStore.js'
import CloudBackupCard from '../components/settings/CloudBackupCard.vue'

var store = useServiceStore()
var importInput = ref(null)
var manualMsg = ref('')

function triggerImport() {
  importInput.value?.click()
}

async function handleImport(event) {
  var file = event.target.files?.[0]
  if (file) {
    try {
      await store.importData(file)
      manualMsg.value = 'اطلاعات با موفقیت از فایل بازیابی شد.'
    } catch (error) {
      manualMsg.value = 'خطا در بارگذاری فایل: ' + (error.message || '')
    }
  }
  event.target.value = ''
}
</script>

<template>
  <div class="space-y-6 pb-12">
    <div>
      <h1 class="text-xl font-bold text-slate-800 dark:text-slate-100">تنظیمات</h1>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">مدیریت پشتیبان‌گیری ابری و داده‌های محلی برنامه</p>
    </div>

    <!-- Google Drive Cloud Backup -->
    <CloudBackupCard />

    <!-- Manual Backup (JSON) -->
    <div class="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900 space-y-4">
      <div>
        <h3 class="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-5 h-5 text-slate-500">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>پشتیبان‌گیری دستی (فایل JSON)</span>
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          می‌توانید در هر زمان یک فایل متنی JSON از کلیه وسایل و سوابق سرویس‌ها دانلود کرده یا فایل قبلی را درون‌ریزی نمایید.
        </p>
      </div>

      <div v-if="manualMsg" class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
        <span>{{ manualMsg }}</span>
        <button type="button" class="p-1 opacity-70 hover:opacity-100" @click="manualMsg = ''">✕</button>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="min-h-[44px] px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-xs font-semibold flex items-center gap-2 transition-colors"
          @click="store.exportData"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-4 h-4 text-brand-500">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>دانلود فایل پشتیبان (خروجی)</span>
        </button>

        <input ref="importInput" type="file" accept="application/json" class="hidden" @change="handleImport" />

        <button
          type="button"
          class="min-h-[44px] px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-xs font-semibold flex items-center gap-2 transition-colors"
          @click="triggerImport"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-4 h-4 text-brand-500">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>بازگردانی از فایل (ورودی)</span>
        </button>
      </div>
    </div>
  </div>
</template>
