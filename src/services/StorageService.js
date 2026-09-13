/**
 * Abstraction over the persistence mechanism (Repository Pattern support).
 * Swappable with IndexedDB later without touching any consumer code.
 */
export class StorageService {
  constructor(namespace = 'service-management') {
    this.namespace = namespace
  }

  _key(key) {
    return `${this.namespace}:${key}`
  }

  get(key, fallback = null) {
    try {
      var raw = localStorage.getItem(this._key(key))
      return raw ? JSON.parse(raw) : fallback
    } catch (error) {
      console.error('StorageService.get failed', error)
      return fallback
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(this._key(key), JSON.stringify(value))
      return true
    } catch (error) {
      console.error('StorageService.set failed', error)
      return false
    }
  }

  remove(key) {
    localStorage.removeItem(this._key(key))
  }
}

export var storageService = new StorageService()
