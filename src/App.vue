<script setup>
import { onMounted } from 'vue'
import { useServiceStore } from './stores/serviceStore'
import { useCloudSyncStore } from './stores/cloudSyncStore'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import BottomNav from './components/BottomNav.vue'
import UpdatePrompt from './components/UpdatePrompt.vue'
import SyncFailedBar from './components/common/SyncFailedBar.vue'
import CloudConflictModal from './components/cloud/CloudConflictModal.vue'

var store = useServiceStore()
var cloudSyncStore = useCloudSyncStore()

onMounted(() => {
  store.initialize()
  cloudSyncStore.start()
})
</script>

<template>
  <div class="min-h-screen flex flex-col text-slate-800 dark:text-slate-100">
    <AppHeader />
    <main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 sm:pb-6">
      <RouterView />
    </main>
    <SyncFailedBar />
    <CloudConflictModal />
    <AppFooter />
    <BottomNav />
    <UpdatePrompt />
  </div>
</template>