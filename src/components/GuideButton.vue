<script setup>
defineProps({
  label: { type: String, default: 'راهنما' },
  compact: { type: Boolean, default: false }
})
defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center justify-center gap-1 rounded-full border border-brand-200 dark:border-brand-700/50 text-brand-600 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-700/20 transition-colors"
    :class="compact ? 'min-h-[32px] px-2.5 text-[11px]' : 'min-h-[40px] px-3.5 text-xs'"
    @click.stop.prevent="$emit('click')"
  >
    <span aria-hidden="true">💡</span>
    <span>{{ label }}</span>
  </button>
</template>
