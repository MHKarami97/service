<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'
import AppIcon from './AppIcon.vue'

var UPDATE_CHECK_INTERVAL_MS = 60 * 60 * 1000

var { needRefresh, updateServiceWorker } = useRegisterSW({
  onRegisteredSW(registration) {
    if (!registration) return
    setInterval(() => {
      registration.update()
    }, UPDATE_CHECK_INTERVAL_MS)
  }
})

function reload() {
  updateServiceWorker(true)
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="needRefresh"
      class="fixed bottom-28 sm:bottom-6 inset-x-0 z-40 flex justify-center px-4"
    >
      <div class="bg-slate-900 dark:bg-slate-800 text-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 max-w-sm w-full">
        <div class="flex size-9 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400 flex-shrink-0">
          <AppIcon name="repeat" :size="18" />
        </div>
        <span class="text-sm flex-1">نسخه جدید اپلیکیشن آماده است</span>
        <button
          type="button"
          class="min-h-[44px] px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-sm font-medium transition-colors"
          @click="reload"
        >
          به‌روزرسانی
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
