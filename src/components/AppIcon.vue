<script setup>
import { computed } from 'vue'
import { ICON_PATHS, EMOJI_TO_ICON } from '../data/iconPaths'

var props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 24 },
  strokeWidth: { type: [Number, String], default: 1.8 }
})

var resolvedKey = computed(() => {
  if (!props.name) return ''
  return EMOJI_TO_ICON[props.name] || props.name
})

var paths = computed(() => ICON_PATHS[resolvedKey.value] ?? null)
</script>

<template>
  <svg
    v-if="paths"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
    :width="size"
    :height="size"
    v-html="paths"
  />
  <span
    v-else
    class="inline-flex items-center justify-center shrink-0 leading-none select-none"
    :style="{ width: size + 'px', height: size + 'px', fontSize: Math.round(size * 0.75) + 'px' }"
    aria-hidden="true"
  >
    {{ name }}
  </span>
</template>
