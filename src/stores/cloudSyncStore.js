import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getCloudSyncService } from '../services/cloud/index.js'
import { useServiceStore } from './serviceStore.js'
import { formatDateTimeFa } from '../utils/cloudFormat.js'

export var useCloudSyncStore = defineStore('cloudSync', () => {
  var serviceStore = useServiceStore()
  var service = getCloudSyncService(serviceStore)

  var snapshot = ref(service.getSnapshot())
  var isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)

  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      isOnline.value = true
    })
    window.addEventListener('offline', () => {
      isOnline.value = false
    })
  }

  service.subscribe((next) => {
    snapshot.value = next
  })

  service.setDataRestoredHandler(async () => {
    // Re-initialize from storage
    serviceStore.initialize()
  })

  var isConnected = computed(() => snapshot.value.connected)
  var isBusy = computed(() => snapshot.value.status === 'syncing')
  var lastSuccessText = computed(() => formatDateTimeFa(snapshot.value.lastSuccessAt))

  var statusText = computed(() => {
    switch (snapshot.value.status) {
      case 'disconnected':
        return 'متصل نیست'
      case 'syncing':
        return 'در حال همگام‌سازی...'
      case 'needs-reconnect':
        return 'اتصال به Google نیاز به تأیید دوباره دارد'
      case 'error':
        return snapshot.value.lastError || 'همگام‌سازی ناموفق بود'
      case 'decision-pending':
        return 'نسخه‌ی ابری منتظر تصمیم شماست'
      case 'success':
        return 'همگام و به‌روز است'
      default:
        return snapshot.value.lastSuccessAt ? 'همگام و به‌روز است' : 'متصل است؛ هنوز پشتیبانی گرفته نشده'
    }
  })

  // Failures are only surfaced while online: offline is a normal state for this app.
  var showFailureBar = computed(() => {
    var status = snapshot.value.status
    return (
      snapshot.value.connected &&
      snapshot.value.notifyFailures &&
      (status === 'error' || status === 'needs-reconnect') &&
      isOnline.value
    )
  })

  var failureBarMessage = computed(() =>
    snapshot.value.status === 'needs-reconnect'
      ? 'دیتا همگام‌سازی نشد؛ اتصال به Google Drive نیاز به تأیید دوباره دارد.'
      : `دیتا همگام‌سازی نشد. ${snapshot.value.lastError || ''}`.trim()
  )

  return {
    snapshot,
    isConnected,
    isBusy,
    isOnline,
    statusText,
    lastSuccessText,
    showFailureBar,
    failureBarMessage,
    start: () => service.start(),
    preload: () => service.preload(),
    connect: () => service.connect(),
    disconnect: (deleteRemote) => service.disconnect(deleteRemote),
    backupNow: () => service.backupNow('manual'),
    resolveRestore: (mode, passphrase) => service.resolveRestore(mode, passphrase),
    resolveKeepLocal: () => service.resolveKeepLocal(),
    dismissDecision: () => service.dismissDecision(),
    reopenDecision: () => service.reopenDecision(),
    rollbackLastRestore: () => service.rollbackLastRestore(),
    enableEncryption: (passphrase) => service.enableEncryption(passphrase),
    disableEncryption: () => service.disableEncryption(),
    setNotifyFailures: (value) => service.setNotifyFailures(value)
  }
})
