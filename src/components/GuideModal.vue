<script setup>
import { watch, onUnmounted } from 'vue'
import { useGuide } from '../composables/useGuide'

var { activeGuide, closeGuide } = useGuide()

var SECTIONS = [
  { key: 'recommendations', label: 'نکات انتخاب و خرید', icon: '✅' },
  { key: 'alsoConsider', label: 'بهتر است هم‌زمان بررسی/تعویض شود', icon: '🔁' },
  { key: 'askMechanic', label: 'از تعمیرکار بخواهید', icon: '🔧' },
  { key: 'warnings', label: 'هشدارها', icon: '⚠️' }
]

var TRUST_LABELS = {
  authoritative: 'مرجع رسمی',
  trusted: 'معتبر',
  credible: 'قابل اتکا',
  unrated: 'منبع تکمیلی'
}

function handleKeydown(event) {
  if (event.key === 'Escape') closeGuide()
}

watch(activeGuide, (guide) => {
  if (guide) {
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="activeGuide"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 sm:px-4"
        role="dialog"
        aria-modal="true"
        :aria-label="`راهنمای ${activeGuide.title}`"
        @click.self="closeGuide"
      >
        <div class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
          <header class="flex items-start justify-between gap-3 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-700">
            <div class="min-w-0">
              <p class="text-[11px] text-slate-400">راهنما · {{ activeGuide.itemName }}</p>
              <h3 class="font-semibold text-base sm:text-lg leading-snug">{{ activeGuide.title }}</h3>
            </div>
            <button
              type="button"
              class="min-w-[44px] min-h-[44px] -mt-2 -ml-2 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="بستن"
              @click="closeGuide"
            >
              ✕
            </button>
          </header>

          <div class="overflow-y-auto p-4 sm:p-5 space-y-5 text-sm leading-7">
            <p v-if="activeGuide.summary">{{ activeGuide.summary }}</p>

            <div v-if="activeGuide.interval" class="rounded-xl bg-brand-50 dark:bg-brand-700/20 px-3 py-2.5">
              <p class="text-[11px] text-brand-700 dark:text-brand-200 mb-1">⏱️ زمان/کیلومتر معمول</p>
              <p class="text-xs sm:text-sm">{{ activeGuide.interval }}</p>
            </div>

            <template v-for="section in SECTIONS" :key="section.key">
              <section v-if="activeGuide[section.key].length" class="space-y-2">
                <h4 class="font-semibold text-sm">{{ section.icon }} {{ section.label }}</h4>
                <ul class="space-y-1.5 list-disc pr-5 marker:text-brand-400">
                  <li v-for="line in activeGuide[section.key]" :key="line">{{ line }}</li>
                </ul>
              </section>
            </template>

            <section v-if="activeGuide.sources.length" class="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-700">
              <h4 class="font-semibold text-xs text-slate-500 dark:text-slate-400">📚 منابع</h4>
              <ul class="space-y-1.5">
                <li v-for="source in activeGuide.sources" :key="source.id" class="text-xs flex flex-wrap items-center gap-2" dir="ltr">
                  <p class="text-brand-600 dark:text-brand-300 underline underline-offset-2 break-words">
                    {{ source.title }}
                  </p>
                  <span class="rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-2 py-0.5 text-[10px]" dir="rtl">
                    {{ TRUST_LABELS[source.trust] }}
                  </span>
                </li>
              </ul>
            </section>

            <p class="text-[11px] text-slate-400 leading-5">
              این راهنما جنبه‌ی آموزشی دارد. مرجع نهایی، دفترچه‌ی راهنما و دستور سازنده‌ی وسیله شماست.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
