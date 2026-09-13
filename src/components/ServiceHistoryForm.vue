<script setup>
import { reactive, computed, watch } from 'vue'
import TagInput from './TagInput.vue'
import JalaliDatePicker from './JalaliDatePicker.vue'

var props = defineProps({
  isOpen: { type: Boolean, default: false },
  isVehicle: { type: Boolean, default: false },
  suggestions: { type: Array, default: () => [] },
  initialRecord: { type: Object, default: null }
})
var emit = defineEmits(['save', 'close'])

function today() {
  return new Date().toISOString().slice(0, 10)
}

function emptyForm() {
  return {
    performedAt: today(),
    serviceType: '',
    cost: 0,
    partsUsed: [],
    location: '',
    nextServiceDate: '',
    serviceOdometer: null,
    nextServiceOdometer: null,
    description: ''
  }
}

var form = reactive(emptyForm())

watch(
  () => [props.isOpen, props.initialRecord],
  () => {
    if (!props.isOpen) return
    Object.assign(form, props.initialRecord ? { ...props.initialRecord } : emptyForm())
  },
  { immediate: true }
)

var isEditing = computed(() => Boolean(props.initialRecord))
var serviceTypeSuggestions = computed(() => props.suggestions.map((s) => s.title))

function pickServiceType(title) {
  form.serviceType = title
}

function submit() {
  if (!form.performedAt) return
  emit('save', { ...form })
}
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
      <form
        class="bg-white dark:bg-slate-800 rounded-2xl p-5 w-full max-w-lg shadow-xl space-y-4 max-h-[90vh] overflow-y-auto"
        @submit.prevent="submit"
      >
        <h3 class="font-semibold text-base">{{ isEditing ? 'ویرایش سرویس' : 'ثبت سرویس جدید' }}</h3>

        <div v-if="serviceTypeSuggestions.length" class="flex flex-wrap gap-1.5">
          <button
            v-for="title in serviceTypeSuggestions"
            :key="title"
            type="button"
            class="rounded-full border text-[11px] px-2.5 py-1 transition-colors"
            :class="form.serviceType === title ? 'bg-brand-500 text-white border-brand-500' : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-brand-300'"
            @click="pickServiceType(title)"
          >
            {{ title }}
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label class="block">
            <span class="text-xs text-slate-400">نوع سرویس</span>
            <input v-model="form.serviceType" type="text" placeholder="مثلاً تعویض روغن" class="mt-1 w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm" />
          </label>

          <label class="block">
            <span class="text-xs text-slate-400">تاریخ انجام</span>
            <div class="mt-1">
              <JalaliDatePicker v-model="form.performedAt" placeholder="تاریخ انجام را انتخاب کنید" />
            </div>
          </label>

          <label class="block">
            <span class="text-xs text-slate-400">هزینه (تومان)</span>
            <input v-model.number="form.cost" type="number" min="0" step="1000" inputmode="numeric" class="mt-1 w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm" />
          </label>

          <label class="block">
            <span class="text-xs text-slate-400">محل انجام (تعمیرگاه/فروشگاه)</span>
            <input v-model="form.location" type="text" class="mt-1 w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm" />
          </label>

          <label class="block">
            <span class="text-xs text-slate-400">تاریخ سرویس بعدی</span>
            <div class="mt-1">
              <JalaliDatePicker v-model="form.nextServiceDate" placeholder="تاریخ سرویس بعدی را انتخاب کنید" />
            </div>
          </label>

          <template v-if="isVehicle">
            <label class="block">
              <span class="text-xs text-slate-400">کیلومتر هنگام سرویس</span>
              <input v-model.number="form.serviceOdometer" type="number" min="0" inputmode="numeric" class="mt-1 w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm" />
            </label>

            <label class="block">
              <span class="text-xs text-slate-400">کیلومتر سرویس بعدی</span>
              <input v-model.number="form.nextServiceOdometer" type="number" min="0" inputmode="numeric" class="mt-1 w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm" />
            </label>
          </template>
        </div>

        <div>
          <span class="text-xs text-slate-400">وسایل/قطعات استفاده‌شده</span>
          <div class="mt-1">
            <TagInput v-model="form.partsUsed" :suggestions="[]" placeholder="مثلاً تسمه، روغن ایرانول... (Enter برای افزودن)" />
          </div>
        </div>

        <label class="block">
          <span class="text-xs text-slate-400">توضیحات</span>
          <textarea v-model="form.description" rows="3" class="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm resize-none"></textarea>
        </label>

        <div class="flex gap-3 pt-1">
          <button type="submit" class="flex-1 min-h-[44px] rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors">
            {{ isEditing ? 'ذخیره تغییرات' : 'ثبت سرویس' }}
          </button>
          <button type="button" class="flex-1 min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-600" @click="$emit('close')">
            انصراف
          </button>
        </div>
      </form>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>