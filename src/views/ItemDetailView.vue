<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useServiceStore } from '../stores/serviceStore'
import { useConfirm } from '../composables/useConfirm'
import { useGuide } from '../composables/useGuide'
import { guideRepository } from '../services/GuideRepository'
import StatusBadge from '../components/StatusBadge.vue'
import ServiceHistoryForm from '../components/ServiceHistoryForm.vue'
import ServiceHistoryList from '../components/ServiceHistoryList.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import GuideModal from '../components/GuideModal.vue'
import GuideButton from '../components/GuideButton.vue'
import { formatDate } from '../services/ServiceStatusPresenter'

var props = defineProps({ id: { type: String, required: true } })
var store = useServiceStore()
var router = useRouter()
var { isPending, pendingLabel, requestConfirm, confirmAction, cancelAction } = useConfirm()
var { openGuide, openGuideByTitle } = useGuide()

if (store.activeItemId !== props.id) {
  store.selectItem(props.id)
}

var item = computed(() => store.activeItem)
var due = computed(() => item.value?.getDueStatus() ?? { status: 'unknown' })
var isVehicle = computed(() => item.value?.type === 'vehicle')

var catalogSuggestions = computed(() => {
  var entry = store.catalog.find((def) => def.id === item.value?.catalogId)
  return entry?.serviceTypes ?? []
})

var guidedServiceTypes = computed(() =>
  catalogSuggestions.value.filter((type) => guideRepository.hasGuide(item.value.catalogId, type.id))
)

var isFormOpen = ref(false)
var editingRecord = ref(null)
var odometerDraft = ref(item.value?.currentOdometer ?? 0)

function hasGuideForTitle(title) {
  return Boolean(item.value?.catalogId) && guideRepository.hasGuideForTitle(item.value.catalogId, title)
}

function showGuideByTitle(title) {
  openGuideByTitle(item.value.catalogId, title)
}

function openCreateForm() {
  editingRecord.value = null
  isFormOpen.value = true
}

function openEditForm(record) {
  editingRecord.value = record.toJSON ? record.toJSON() : record
  isFormOpen.value = true
}

function closeForm() {
  isFormOpen.value = false
  editingRecord.value = null
}

function saveRecord(data) {
  if (editingRecord.value?.id) {
    store.updateServiceRecord(item.value.id, editingRecord.value.id, data)
  } else {
    store.addServiceRecord(item.value.id, data)
  }
  closeForm()
}

function handleRemoveRecord(recordId) {
  requestConfirm('این تاریخچه سرویس حذف شود؟', () => store.removeServiceRecord(item.value.id, recordId))
}

function handleDeleteItem() {
  requestConfirm('این وسیله و کل تاریخچه سرویس آن حذف شود؟', () => {
    store.deleteItem(item.value.id)
    router.push('/')
  })
}

function saveOdometer() {
  store.updateVehicleOdometer(item.value.id, odometerDraft.value)
}
</script>

<template>
  <section v-if="item" class="space-y-6">
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="text-3xl">{{ item.icon }}</span>
        <div>
          <h1 class="text-xl sm:text-2xl font-bold">{{ item.name }}</h1>
          <StatusBadge :status="due.status" />
        </div>
      </div>
      <button
        type="button"
        class="min-h-[44px] px-3 rounded-xl border border-red-300 text-red-500 text-xs sm:text-sm flex-shrink-0"
        @click="handleDeleteItem"
      >
        حذف وسیله
      </button>
    </div>

    <!-- کارت وضعیت فعلی: آخرین اطلاعات سرویس بعدی از تازه‌ترین تاریخچه -->
    <div class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:p-5 space-y-4">
      <h2 class="text-sm font-semibold text-slate-500 dark:text-slate-400">وضعیت سرویس بعدی</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
        <div class="rounded-xl bg-slate-50 dark:bg-slate-700/40 px-3 py-2.5">
          <p class="text-[11px] text-slate-400">تاریخ سرویس بعدی</p>
          <p class="font-semibold mt-1">{{ formatDate(item.nextServiceDate) }}</p>
        </div>
        <div v-if="isVehicle" class="rounded-xl bg-slate-50 dark:bg-slate-700/40 px-3 py-2.5">
          <p class="text-[11px] text-slate-400">کیلومتر سرویس بعدی</p>
          <p class="font-semibold mt-1">{{ item.nextServiceOdometer != null ? item.nextServiceOdometer.toLocaleString('fa-IR') + ' km' : '—' }}</p>
        </div>
        <div class="rounded-xl bg-slate-50 dark:bg-slate-700/40 px-3 py-2.5">
          <p class="text-[11px] text-slate-400">هزینه کل تا کنون</p>
          <p class="font-semibold mt-1">{{ item.totalSpent.toLocaleString('fa-IR') }} تومان</p>
        </div>
      </div>

      <div v-if="isVehicle" class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
        <label class="text-xs text-slate-400 flex-shrink-0">کیلومتر فعلی خودرو</label>
        <div class="flex items-center gap-2 min-w-0">
          <input
            v-model.number="odometerDraft"
            type="number"
            min="0"
            inputmode="numeric"
            class="flex-1 min-w-0 min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm"
          />
          <button type="button" class="flex-shrink-0 min-h-[40px] px-3 rounded-xl bg-brand-500 text-white text-xs" @click="saveOdometer">ذخیره</button>
        </div>
      </div>
    </div>

    <div v-if="guidedServiceTypes.length" class="rounded-2xl border border-brand-100 dark:border-brand-700/40 bg-brand-50/50 dark:bg-brand-700/10 p-4 sm:p-5 space-y-3">
      <h2 class="text-sm font-semibold text-brand-700 dark:text-brand-200">💡 راهنمای سرویس‌ها</h2>
      <p class="text-xs text-slate-500 dark:text-slate-400">روی هر سرویس بزنید تا نکات انتخاب، موارد هم‌زمان و پیشنهادهای بازرسی را ببینید.</p>
      <div class="flex flex-wrap gap-2">
        <GuideButton
          v-for="type in guidedServiceTypes"
          :key="type.id"
          compact
          :label="type.title"
          @click="openGuide(item.catalogId, type.id)"
        />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold text-slate-500 dark:text-slate-400">تاریخچه سرویس‌ها</h2>
      <button type="button" class="min-h-[40px] px-3 rounded-xl bg-brand-500 text-white text-xs sm:text-sm hover:bg-brand-600 transition-colors" @click="openCreateForm">
        + سرویس جدید
      </button>
    </div>

    <ServiceHistoryList
      :records="item.sortedHistory"
      :is-vehicle="isVehicle"
      :has-guide="hasGuideForTitle"
      @edit="openEditForm"
      @remove="handleRemoveRecord"
      @guide="showGuideByTitle"
    />
  </section>

  <ServiceHistoryForm
    :is-open="isFormOpen"
    :is-vehicle="isVehicle"
    :suggestions="catalogSuggestions"
    :initial-record="editingRecord"
    :has-guide="hasGuideForTitle"
    @save="saveRecord"
    @close="closeForm"
    @guide="showGuideByTitle"
  />

  <ConfirmDialog :is-open="isPending" :label="pendingLabel" @confirm="confirmAction" @cancel="cancelAction" />
  <GuideModal />
</template>
