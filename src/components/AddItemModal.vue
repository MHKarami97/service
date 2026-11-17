<script setup>
import { ref, computed } from 'vue'
import { useServiceStore } from '../stores/serviceStore'
import AppIcon from './AppIcon.vue'

defineProps({ isOpen: { type: Boolean, default: false } })
var emit = defineEmits(['close'])

var store = useServiceStore()
var mode = ref('catalog')
var selectedCatalogId = ref('')
var customName = ref('')
var customType = ref('appliance')
var customIcon = ref('wrench')

var ICON_PRESETS = [
  'car', 'motorcycle', 'bicycle', 'wrench', 'cooler', 'split-ac',
  'washing-machine', 'refrigerator', 'boiler', 'heater', 'box', 'bulb'
]

var vehicleCatalog = computed(() => store.catalog.filter((entry) => entry.type === 'vehicle'))
var applianceCatalog = computed(() => store.catalog.filter((entry) => entry.type === 'appliance'))

function reset() {
  mode.value = 'catalog'
  selectedCatalogId.value = ''
  customName.value = ''
  customType.value = 'appliance'
  customIcon.value = 'wrench'
}

function close() {
  reset()
  emit('close')
}

function submit() {
  if (mode.value === 'catalog') {
    if (!selectedCatalogId.value) return
    store.addItemFromCatalog(selectedCatalogId.value)
  } else {
    if (!customName.value.trim()) return
    store.addCustomItem({ name: customName.value, icon: customIcon.value, type: customType.value })
  }
  close()
}
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 w-full max-w-md shadow-xl space-y-4 max-h-[85vh] overflow-y-auto">
        <h3 class="font-semibold text-base">افزودن وسیله جدید</h3>

        <div class="flex gap-2">
          <button
            type="button"
            class="flex-1 min-h-[40px] rounded-xl text-sm"
            :class="mode === 'catalog' ? 'bg-brand-500 text-white' : 'border border-slate-200 dark:border-slate-700'"
            @click="mode = 'catalog'"
          >
            انتخاب از لیست
          </button>
          <button
            type="button"
            class="flex-1 min-h-[40px] rounded-xl text-sm"
            :class="mode === 'custom' ? 'bg-brand-500 text-white' : 'border border-slate-200 dark:border-slate-700'"
            @click="mode = 'custom'"
          >
            سفارشی
          </button>
        </div>

        <div v-if="mode === 'catalog'" class="space-y-3">
          <div>
            <p class="text-xs text-slate-400 mb-2">وسایل نقلیه</p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="entry in vehicleCatalog"
                :key="entry.id"
                type="button"
                class="rounded-xl border px-3 py-2 text-sm flex items-center gap-2 transition-colors"
                :class="selectedCatalogId === entry.id ? 'border-brand-500 bg-brand-50 dark:bg-brand-700/20 text-brand-700 dark:text-brand-300 font-medium' : 'border-slate-200 dark:border-slate-700'"
                @click="selectedCatalogId = entry.id"
              >
                <AppIcon :name="entry.icon" :size="20" class="shrink-0" />
                <span class="truncate">{{ entry.name }}</span>
              </button>
            </div>
          </div>
          <div>
            <p class="text-xs text-slate-400 mb-2">لوازم خانه</p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="entry in applianceCatalog"
                :key="entry.id"
                type="button"
                class="rounded-xl border px-3 py-2 text-sm flex items-center gap-2 transition-colors"
                :class="selectedCatalogId === entry.id ? 'border-brand-500 bg-brand-50 dark:bg-brand-700/20 text-brand-700 dark:text-brand-300 font-medium' : 'border-slate-200 dark:border-slate-700'"
                @click="selectedCatalogId = entry.id"
              >
                <AppIcon :name="entry.icon" :size="20" class="shrink-0" />
                <span class="truncate">{{ entry.name }}</span>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="space-y-3">
          <input
            v-model="customName"
            type="text"
            placeholder="نام وسیله (مثلاً کولر گازی اتاق خواب)"
            class="w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm"
          />
          <div class="space-y-1.5">
            <span class="text-xs text-slate-400">انتخاب آیکون</span>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="preset in ICON_PRESETS"
                :key="preset"
                type="button"
                class="size-10 rounded-xl border flex items-center justify-center transition-colors"
                :class="customIcon === preset ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300' : 'border-slate-200 dark:border-slate-700 text-slate-500'"
                @click="customIcon = preset"
              >
                <AppIcon :name="preset" :size="20" />
              </button>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex size-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-brand-600 dark:text-brand-400">
              <AppIcon :name="customIcon" :size="22" />
            </div>
            <select v-model="customType" class="flex-1 min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm">
              <option value="appliance">لوازم خانه</option>
              <option value="vehicle">وسیله نقلیه</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 pt-2">
          <button type="button" class="flex-1 min-h-[44px] rounded-xl bg-brand-500 text-white font-medium" @click="submit">افزودن</button>
          <button type="button" class="flex-1 min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-600" @click="close">انصراف</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
