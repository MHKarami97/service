import { CLOUD_CONFIG } from '../../config/cloudConfig.js'

function openVaultDb() {
  return new Promise((resolve, reject) => {
    var req = indexedDB.open(CLOUD_CONFIG.vaultDatabaseName, 1)
    req.onupgradeneeded = (e) => {
      var db = e.target.result
      if (!db.objectStoreNames.contains('keys')) {
        db.createObjectStore('keys', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('snapshots')) {
        db.createObjectStore('snapshots', { keyPath: 'id' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export class CloudKeyVault {
  async getKey() {
    var db = await openVaultDb()
    return new Promise((resolve, reject) => {
      var tx = db.transaction('keys', 'readonly')
      var req = tx.objectStore('keys').get('backup-key')
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  }

  async saveKey(key, saltHex, iterations) {
    var db = await openVaultDb()
    return new Promise((resolve, reject) => {
      var tx = db.transaction('keys', 'readwrite')
      var req = tx.objectStore('keys').put({
        id: 'backup-key',
        key,
        saltHex,
        iterations,
        createdAt: new Date().toISOString()
      })
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  }

  async clearKey() {
    var db = await openVaultDb()
    return new Promise((resolve, reject) => {
      var tx = db.transaction('keys', 'readwrite')
      var req = tx.objectStore('keys').delete('backup-key')
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  }

  async saveSnapshot(json) {
    var db = await openVaultDb()
    return new Promise((resolve, reject) => {
      var tx = db.transaction('snapshots', 'readwrite')
      var req = tx.objectStore('snapshots').put({
        id: 'pre-restore',
        json,
        createdAt: new Date().toISOString()
      })
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  }

  async getSnapshot() {
    var db = await openVaultDb()
    return new Promise((resolve, reject) => {
      var tx = db.transaction('snapshots', 'readonly')
      var req = tx.objectStore('snapshots').get('pre-restore')
      req.onsuccess = () => resolve(req.result ? req.result.json : null)
      req.onerror = () => reject(req.error)
    })
  }

  async clearSnapshot() {
    var db = await openVaultDb()
    return new Promise((resolve, reject) => {
      var tx = db.transaction('snapshots', 'readwrite')
      var req = tx.objectStore('snapshots').delete('pre-restore')
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  }
}
