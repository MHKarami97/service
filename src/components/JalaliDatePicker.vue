<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { toJalali, toGregorian, jalaaliMonthLength, JALALI_MONTH_NAMES, JALALI_WEEKDAY_LETTERS } from '../utils/jalaliCalendar'

/**
 * انتخاب‌گر تاریخ شمسی با باکس تقویم بازشو. v-model روی رشته ISO میلادی
 * ('YYYY-MM-DD') کار می‌کند تا مقایسه‌های getDueStatus در ServiceableItem
 * بدون تغییر باقی بماند؛ فقط لایه نمایش/تعامل کاربر شمسی است.
 */
var props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'انتخاب تاریخ' }
})
var emit = defineEmits(['update:modelValue'])

var rootEl = ref(null)
var isOpen = ref(false)

function todayJalali() {
  var now = new Date()
  return toJalali(now.getFullYear(), now.getMonth() + 1, now.getDate())
}

function selectedJalali() {
  if (!props.modelValue) return null
  var d = new Date(props.modelValue)
  if (Number.isNaN(d.getTime())) return null
  return toJalali(d.getFullYear(), d.getMonth() + 1, d.getDate())
}

var viewYear = ref(todayJalali().jy)
var viewMonth = ref(todayJalali().jm)

function syncViewToSelected() {
  var sel = selectedJalali()
  if (sel) {
    viewYear.value = sel.jy
    viewMonth.value = sel.jm
  }
}

var displayText = computed(() => {
  if (!props.modelValue) return ''
  var d = new Date(props.modelValue)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('fa-IR')
})

var weeksGrid = computed(() => {
  var firstOfMonth = toGregorian(viewYear.value, viewMonth.value, 1)
  var firstDate = new Date(firstOfMonth.gy, firstOfMonth.gm - 1, firstOfMonth.gd)
  var jsWeekday = firstDate.getDay()
  var leadingBlanks = (jsWeekday + 1) % 7
  var totalDays = jalaaliMonthLength(viewYear.value, viewMonth.value)

  var cells = []
  for (var i = 0; i < leadingBlanks; i += 1) cells.push(null)
  for (var day = 1; day <= totalDays; day += 1) cells.push(day)
  while (cells.length % 7 !== 0) cells.push(null)

  var rows = []
  for (var r = 0; r < cells.length; r += 7) rows.push(cells.slice(r, r + 7))
  return rows
})

function open() {
  syncViewToSelected()
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function toggle() {
  if (isOpen.value) close()
  else open()
}

function isSelectedDay(day) {
  var sel = selectedJalali()
  return Boolean(sel && sel.jy === viewYear.value && sel.jm === viewMonth.value && sel.jd === day)
}

function isToday(day) {
  var t = todayJalali()
  return t.jy === viewYear.value && t.jm === viewMonth.value && t.jd === day
}

function toIso(jy, jm, jd) {
  var g = toGregorian(jy, jm, jd)
  return `${g.gy}-${String(g.gm).padStart(2, '0')}-${String(g.gd).padStart(2, '0')}`
}

function pickDay(day) {
  if (!day) return
  emit('update:modelValue', toIso(viewYear.value, viewMonth.value, day))
  close()
}

function prevMonth() {
  if (viewMonth.value === 1) {
    viewMonth.value = 12
    viewYear.value -= 1
  } else {
    viewMonth.value -= 1
  }
}

function nextMonth() {
  if (viewMonth.value === 12) {
    viewMonth.value = 1
    viewYear.value += 1
  } else {
    viewMonth.value += 1
  }
}

function prevYear() {
  viewYear.value -= 1
}

function nextYear() {
  viewYear.value += 1
}

function pickToday() {
  var t = todayJalali()
  viewYear.value = t.jy
  viewMonth.value = t.jm
  emit('update:modelValue', toIso(t.jy, t.jm, t.jd))
  close()
}

function clearDate() {
  emit('update:modelValue', '')
  close()
}

function handleOutsideClick(event) {
  if (rootEl.value && !rootEl.value.contains(event.target)) close()
}

onMounted(() => document.addEventListener('mousedown', handleOutsideClick))
onUnmounted(() => document.removeEventListener('mousedown', handleOutsideClick))
</script>

<template>
  <div ref="rootEl" class="relative">
    <button
      type="button"
      class="w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm text-right flex items-center justify-between gap-2"
      @click="toggle"
    >
      <span :class="displayText ? '' : 'text-slate-400'">{{ displayText || placeholder }}</span>
      <span class="text-slate-400 flex-shrink-0">📅</span>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-40 mt-2 w-72 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl p-3 right-0"
    >
      <div class="flex items-center justify-between mb-2">
        <button type="button" class="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="سال قبل" @click="prevYear">«</button>
        <button type="button" class="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="ماه قبل" @click="prevMonth">‹</button>
        <span class="text-sm font-medium">{{ JALALI_MONTH_NAMES[viewMonth - 1] }} {{ viewYear.toLocaleString('fa-IR') }}</span>
        <button type="button" class="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="ماه بعد" @click="nextMonth">›</button>
        <button type="button" class="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="سال بعد" @click="nextYear">»</button>
      </div>

      <div class="grid grid-cols-7 gap-1 text-center text-[11px] text-slate-400 mb-1">
        <span v-for="wd in JALALI_WEEKDAY_LETTERS" :key="wd">{{ wd }}</span>
      </div>

      <div class="space-y-1">
        <div v-for="(row, ri) in weeksGrid" :key="ri" class="grid grid-cols-7 gap-1">
          <button
            v-for="(day, ci) in row"
            :key="ci"
            type="button"
            class="h-8 rounded-lg text-xs flex items-center justify-center transition-colors"
            :class="[
              !day ? 'invisible' : '',
              isSelectedDay(day) ? 'bg-brand-500 text-white' : (isToday(day) ? 'border border-brand-400 text-brand-600 dark:text-brand-300' : 'hover:bg-slate-100 dark:hover:bg-slate-700')
            ]"
            :disabled="!day"
            @click="pickDay(day)"
          >
            {{ day ? day.toLocaleString('fa-IR') : '' }}
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
        <button type="button" class="text-xs text-brand-500 hover:underline" @click="pickToday">امروز</button>
        <button type="button" class="text-xs text-slate-400 hover:text-red-500" @click="clearDate">پاک کردن</button>
      </div>
    </div>
  </div>
</template>