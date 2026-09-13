<script setup>
import { ref, computed } from 'vue'
import { useServiceStore } from '../stores/serviceStore'
import ItemCard from '../components/ItemCard.vue'
import AddItemModal from '../components/AddItemModal.vue'

var store = useServiceStore()
var isAdding = ref(false)

var vehicleEntries = computed(() => store.itemsWithStatus.filter((entry) => entry.item.type === 'vehicle'))
var applianceEntries = computed(() => store.itemsWithStatus.filter((entry) => entry.item.type === 'appliance'))
</script>

<template>
  <section class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold">وسایل من</h1>
        <p class="text-sm text-slate-400 mt-1">{{ store.items.length }} وسیله تحت مدیریت سرویس</p>
      </div>
      <button
        type="button"
        class="min-h-[44px] px-4 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors self-start sm:self-auto"
        @click="isAdding = true"
      >
        + افزودن وسیله
      </button>
    </div>

    <div v-if="vehicleEntries.length" class="space-y-3">
      <h2 class="text-sm font-semibold text-slate-500 dark:text-slate-400">وسایل نقلیه</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ItemCard v-for="entry in vehicleEntries" :key="entry.item.id" :item="entry.item" :due="entry.due" />
      </div>
    </div>

    <div v-if="applianceEntries.length" class="space-y-3">
      <h2 class="text-sm font-semibold text-slate-500 dark:text-slate-400">لوازم خانه</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ItemCard v-for="entry in applianceEntries" :key="entry.item.id" :item="entry.item" :due="entry.due" />
      </div>
    </div>

    <p v-if="!store.items.length" class="text-center text-sm text-slate-400 py-12">
      هنوز وسیله‌ای اضافه نکرده‌اید. با دکمه «+ افزودن وسیله» شروع کنید.
    </p>
  </section>

  <AddItemModal :is-open="isAdding" @close="isAdding = false" />
</template>
