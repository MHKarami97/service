<script setup>
import { ref } from 'vue'

/**
 * Reusable chip-list input: user types a value and presses Enter or the
 * "افزودن" button to commit it as a tag; optional suggestion chips (from
 * the service catalog) can be clicked to add instantly. Used for
 * «وسایل/قطعات استفاده شده» in ServiceHistoryForm.
 */
var props = defineProps({
  modelValue: { type: Array, default: () => [] },
  suggestions: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'مثلاً تسمه، روغن ایرانول...' }
})
var emit = defineEmits(['update:modelValue'])

var draft = ref('')

function commit(value) {
  var trimmed = (value ?? draft.value).trim()
  if (!trimmed) return
  if (props.modelValue.includes(trimmed)) {
    draft.value = ''
    return
  }
  emit('update:modelValue', [...props.modelValue, trimmed])
  draft.value = ''
}

function removeTag(tag) {
  emit('update:modelValue', props.modelValue.filter((entry) => entry !== tag))
}

function availableSuggestions() {
  return props.suggestions.filter((s) => !props.modelValue.includes(s))
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center gap-2">
      <input
        v-model="draft"
        type="text"
        :placeholder="placeholder"
        class="flex-1 min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        @keydown.enter.prevent="commit()"
      />
      <button
        type="button"
        class="min-w-[44px] min-h-[44px] rounded-xl bg-brand-500 text-white text-sm px-4 hover:bg-brand-600 transition-colors"
        @click="commit()"
      >
        افزودن
      </button>
    </div>

    <div v-if="modelValue.length" class="flex flex-wrap gap-2">
      <span
        v-for="tag in modelValue"
        :key="tag"
        class="inline-flex items-center gap-1.5 rounded-full bg-brand-50 dark:bg-brand-700/20 text-brand-700 dark:text-brand-200 text-xs px-3 py-1.5"
      >
        {{ tag }}
        <button type="button" class="text-brand-500 hover:text-red-500" :aria-label="`حذف ${tag}`" @click="removeTag(tag)">✕</button>
      </span>
    </div>

    <div v-if="availableSuggestions().length" class="flex flex-wrap gap-1.5 pt-1">
      <button
        v-for="suggestion in availableSuggestions()"
        :key="suggestion"
        type="button"
        class="rounded-full border border-slate-200 dark:border-slate-700 text-[11px] px-2.5 py-1 text-slate-500 dark:text-slate-400 hover:border-brand-300 hover:text-brand-500 transition-colors"
        @click="commit(suggestion)"
      >
        + {{ suggestion }}
      </button>
    </div>
  </div>
</template>
