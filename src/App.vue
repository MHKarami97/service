<script setup>
import { onMounted } from 'vue'
import { useServiceStore } from './stores/serviceStore'
import { useCloudSyncStore } from './stores/cloudSyncStore'
import AppHeader from './components/AppHeader.vue'
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
    <main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <RouterView />
    </main>
    <div class="bottom-nav-spacer sm:hidden" aria-hidden="true"></div>
    <SyncFailedBar />
    <CloudConflictModal />
    <BottomNav />
    <UpdatePrompt />
  </div>
</template>

<style scoped>
/* Reserves room under the content for the floating bottom bar (bar ~5rem + gap + safe area). */
.bottom-nav-spacer {
  flex: none;
  height: calc(6.5rem + env(safe-area-inset-bottom, 0px));
}
</style>
