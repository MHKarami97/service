<script setup>
import { computed } from 'vue'
import { describeStatus } from '../services/ServiceStatusPresenter'

var props = defineProps({
  status: { type: String, required: true }
})

var meta = computed(() => describeStatus(props.status))
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] sm:text-xs font-medium whitespace-nowrap"
    :class="meta.badgeClass"
  >
    <span class="w-1.5 h-1.5 rounded-full" :class="meta.dotClass" />
    {{ meta.label }}
  </span>
</template>
