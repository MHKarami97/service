import { CLOUD_CONFIG } from '../../config/cloudConfig.js'

export var DEFAULT_CLOUD_STATE = {
  connected: false,
  encryptionEnabled: false,
  notifyFailures: true,
  lastSyncedHash: null,
  lastSuccessAt: null,
  lastRemoteModifiedTime: null,
  lastError: null,
  dirtyAt: null,
  forceUpload: false
}

export class CloudSyncStateStorage {
  load() {
    try {
      var raw = localStorage.getItem(CLOUD_CONFIG.stateStorageKey)
      return raw ? { ...DEFAULT_CLOUD_STATE, ...JSON.parse(raw) } : { ...DEFAULT_CLOUD_STATE }
    } catch {
      return { ...DEFAULT_CLOUD_STATE }
    }
  }

  save(state) {
    try {
      localStorage.setItem(CLOUD_CONFIG.stateStorageKey, JSON.stringify(state))
    } catch {
      // Best-effort in private browsing
    }
  }
}
