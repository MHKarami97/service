<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  isOpen: { type: Boolean, default: false },
  label: { type: String, default: '' }
})
defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 w-full max-w-sm shadow-xl space-y-4">
        <div class="flex items-start gap-3">
          <div class="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-950/30 flex-shrink-0">
            <AppIcon name="alert" :size="20" />
          </div>
          <p class="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 pt-1.5">{{ label }}</p>
        </div>
        <div class="flex gap-3 pt-1">
          <button type="button" class="flex-1 min-h-[44px] rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors" @click="$emit('confirm')">
            حذف شود
          </button>
          <button type="button" class="flex-1 min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" @click="$emit('cancel')">
            انصراف
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
