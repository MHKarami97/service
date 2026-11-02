<script setup>
import { computed, onMounted, ref } from 'vue'
import { CLOUD_CONFIG } from '../../config/cloudConfig.js'
import { toUserMessage } from '../../services/cloud/CloudSyncError.js'
import { useCloudSyncStore } from '../../stores/cloudSyncStore.js'
import { toPersianDigits } from '../../utils/cloudFormat.js'

var store = useCloudSyncStore()

var minLength = CLOUD_CONFIG.minPassphraseLength
var snapshot = computed(() => store.snapshot)
var passphrase = ref('')
var passphraseConfirm = ref('')
var isWorking = ref(false)
var feedbackMessage = ref('')
var feedbackIsError = ref(false)

onMounted(() => store.preload())

var dotClass = computed(() => {
  switch (snapshot.value.status) {
    case 'success':
    case 'idle':
      return snapshot.value.connected ? 'bg-emerald-500' : 'bg-slate-400'
    case 'syncing':
      return 'bg-brand-500 animate-pulse'
    case 'needs-reconnect':
    case 'decision-pending':
      return 'bg-amber-500'
    case 'error':
      return 'bg-rose-500'
    default:
      return 'bg-slate-400'
  }
})

async function run(action, successMsg) {
  isWorking.value = true
  feedbackMessage.value = ''
  feedbackIsError.value = false
  try {
    await action()
    if (successMsg) {
      feedbackMessage.value = successMsg
      feedbackIsError.value = false
    }
  } catch (error) {
    feedbackMessage.value = toUserMessage(error)
    feedbackIsError.value = true
  } finally {
    isWorking.value = false
  }
}

function handleConnect() {
  return run(() => store.connect(), 'اتصال به Google Drive با موفقیت برقرار شد.')
}

function handleBackupNow() {
  return run(() => store.backupNow(), 'پشتیبان‌گیری ابری با موفقیت انجام شد.')
}

async function handleDisconnect() {
  if (!confirm('اتصال به Google Drive قطع شود؟ پشتیبان‌گیری خودکار متوقف می‌شود.')) return
  var removeRemote = confirm('آیا نسخه‌های پشتیبان موجود در پوشه Google Drive هم حذف شوند؟\nتأیید (OK) = حذف شوند\nلغو (Cancel) = باقی بمانند')
  await run(() => store.disconnect(removeRemote), 'اتصال به Google Drive قطع شد.')
}

async function handleEnableEncryption() {
  await run(async () => {
    await store.enableEncryption(passphrase.value)
    passphrase.value = ''
    passphraseConfirm.value = ''
  }, 'رمزنگاری داده‌ها فعال شد.')
}

async function handleDisableEncryption() {
  if (!confirm('از این پس پشتیبان‌های ابری بدون رمزنگاری اختصاصی ذخیره می‌شوند. ادامه می‌دهید؟')) return
  await run(() => store.disableEncryption(), 'رمزنگاری ابری غیرفعال شد.')
}

async function handleRollback() {
  if (!confirm('داده‌های فعلی این دستگاه به وضعیت پیش از آخرین بازیابی ابری برگردانده خواهد شد. ادامه می‌دهید؟')) return
  await run(() => store.rollbackLastRestore(), 'داده‌ها به وضعیت پیش از بازیابی بازگشتند.')
}
</script>

<template>
  <div class="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900 space-y-5 transition-colors">
    <div>
      <h3 class="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-5 h-5 text-brand-500">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>پشتیبان‌گیری خودکار در Google Drive</span>
      </h3>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
        نسخه‌ی پشتیبان در پوشه‌ی مخفی برنامه‌ی شما در Google Drive ذخیره می‌شود و فقط همین برنامه به آن دسترسی دارد.
        پس از هر تغییر در وسایل و سرویس‌ها، پشتیبان‌گیری به‌صورت خودکار انجام می‌شود.
      </p>
    </div>

    <!-- Status -->
    <div class="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
      <div class="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
        <span class="w-2.5 h-2.5 rounded-full shrink-0" :class="dotClass"></span>
        <span>{{ store.statusText }}</span>
      </div>
      <p v-if="store.isConnected && store.lastSuccessText" class="text-[11px] text-slate-500 dark:text-slate-400 pr-4">
        آخرین پشتیبان موفق: {{ toPersianDigits(store.lastSuccessText) }}
      </p>
      <p
        v-if="store.isConnected && snapshot.status !== 'error' && snapshot.lastError"
        class="text-[11px] text-rose-500 pr-4"
      >
        {{ snapshot.lastError }}
      </p>
    </div>

    <!-- Message Alert -->
    <div
      v-if="feedbackMessage"
      class="p-3 rounded-xl text-xs flex items-center justify-between gap-2"
      :class="feedbackIsError ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300'"
    >
      <span>{{ feedbackMessage }}</span>
      <button type="button" class="p-1 opacity-70 hover:opacity-100" @click="feedbackMessage = ''">✕</button>
    </div>

    <!-- Actions -->
    <div class="flex flex-wrap items-center gap-2">
      <button
        v-if="!store.isConnected"
        type="button"
        :disabled="isWorking"
        class="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 min-h-[44px]"
        @click="handleConnect"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-4 h-4">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>اتصال به Google Drive</span>
      </button>

      <template v-else>
        <button
          v-if="snapshot.status === 'needs-reconnect' || snapshot.status === 'error'"
          type="button"
          :disabled="isWorking"
          class="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 min-h-[44px]"
          @click="handleConnect"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-4 h-4">
            <path d="M4 4v6h6M20 20v-6h-6M4.5 15a8 8 0 0 0 13.9 3.4M19.5 9A8 8 0 0 0 5.6 5.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>اتصال دوباره</span>
        </button>
        <button
          v-if="snapshot.decision && snapshot.decision.dismissed"
          type="button"
          class="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white text-xs font-semibold shadow-sm transition-all min-h-[44px]"
          @click="store.reopenDecision()"
        >
          بررسی نسخه‌ی ابری
        </button>
        <button
          type="button"
          :disabled="isWorking || store.isBusy || !!snapshot.decision"
          class="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 min-h-[44px]"
          @click="handleBackupNow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-4 h-4" :class="store.isBusy ? 'animate-spin' : ''">
            <path d="M4 4v6h6M20 20v-6h-6M4.5 15a8 8 0 0 0 13.9 3.4M19.5 9A8 8 0 0 0 5.6 5.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>پشتیبان‌گیری همین حالا</span>
        </button>
        <button
          type="button"
          :disabled="isWorking"
          class="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50 min-h-[44px]"
          @click="handleDisconnect"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-4 h-4">
            <path d="M18.84 12.25l1.72-1.71a5 5 0 0 0-7.07-7.07l-1.72 1.71M5.16 11.75l-1.72 1.71a5 5 0 0 0 7.07 7.07l1.71-1.71M2 2l20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>قطع اتصال</span>
        </button>
      </template>
    </div>

    <!-- Encryption -->
    <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
      <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-4 h-4 text-brand-500">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="1.8"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="1.8"/>
        </svg>
        <span>رمزنگاری اختیاری با کلمه عبور (Zero-Knowledge)</span>
      </h4>

      <template v-if="snapshot.encryptionEnabled">
        <p class="text-[11px] text-emerald-600 dark:text-emerald-400 leading-relaxed">
          رمزنگاری ابری فعال است؛ داده‌ها پیش از ارسال به درایو با الگوریتم AES-256-GCM رمزگذاری می‌شوند.
        </p>
        <button
          type="button"
          :disabled="isWorking"
          class="text-[11px] text-rose-500 hover:underline font-medium disabled:opacity-50"
          @click="handleDisableEncryption"
        >
          غیرفعال‌سازی رمزنگاری
        </button>
      </template>

      <template v-else>
        <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          بدون رمزنگاری، فایل پشتیبان به‌صورت داده‌های استاندارد در Google Drive شما ذخیره می‌شود. با فعال‌سازی رمزنگاری، محتوا با رمز اختصاصی شما رمز می‌شود.
          <span class="font-bold text-rose-500">رمز عبور قابل بازیابی نیست؛ با فراموشی آن، پشتیبان ابری برای همیشه باز نمی‌شود.</span>
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            v-model="passphrase"
            type="password"
            autocomplete="new-password"
            :placeholder="`رمز (حداقل ${toPersianDigits(minLength)} نویسه)`"
            class="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none text-slate-900 dark:text-slate-100 min-h-[44px]"
          />
          <input
            v-model="passphraseConfirm"
            type="password"
            autocomplete="new-password"
            placeholder="تکرار رمز"
            class="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none text-slate-900 dark:text-slate-100 min-h-[44px]"
          />
        </div>
        <button
          type="button"
          :disabled="isWorking || passphrase.length < minLength || passphrase !== passphraseConfirm"
          class="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50 min-h-[44px]"
          @click="handleEnableEncryption"
        >
          {{ isWorking ? 'در حال آماده‌سازی کلید...' : 'فعال‌سازی رمزنگاری' }}
        </button>
      </template>
    </div>

    <!-- Preferences & Rollback -->
    <div class="space-y-3">
      <label class="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer min-h-[44px]">
        <input
          type="checkbox"
          class="h-5 w-5 rounded"
          :checked="snapshot.notifyFailures"
          @change="store.setNotifyFailures($event.target.checked)"
        />
        <span>نمایش نوار هشدار در پایین صفحه هنگام عدم موفقیت همگام‌سازی (فقط هنگام آنلاین بودن)</span>
      </label>

      <div
        v-if="snapshot.hasRollbackSnapshot"
        class="flex items-center justify-between gap-3 flex-wrap p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900"
      >
        <p class="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
          پیش از آخرین بازیابی ابری، یک نسخه‌ی پشتیبان محلی از داده‌های قبلی همین دستگاه ثبت شده است.
        </p>
        <button
          type="button"
          :disabled="isWorking"
          class="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-semibold flex items-center gap-1.5 disabled:opacity-50 min-h-[36px]"
          @click="handleRollback"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-3.5 h-3.5">
            <path d="M3 7v6h6M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>بازگرداندن به قبل از بازیابی</span>
        </button>
      </div>
    </div>
  </div>
</template>
