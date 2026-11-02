import { ServiceableItemFactory } from './ServiceableItemFactory'
import { storageService } from './StorageService'

var STORAGE_KEY = 'items'
var mutationListeners = new Set()

export function onServiceMutation(listener) {
  mutationListeners.add(listener)
  return () => mutationListeners.delete(listener)
}

export function notifyServiceMutation() {
  for (var listener of mutationListeners) {
    try {
      listener()
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * Repository Pattern: the only place that knows ServiceableItem aggregates
 * are persisted as a flat JSON array in localStorage. Callers work with
 * fully-hydrated model instances (Vehicle/Appliance), never raw JSON.
 */
export class ServiceRepository {
  constructor(storage = storageService) {
    this.storage = storage
  }

  exists() {
    return this.storage.get(STORAGE_KEY, null) !== null
  }

  getAll() {
    var raw = this.storage.get(STORAGE_KEY, [])
    return raw.map((json) => ServiceableItemFactory.createFromJSON(json))
  }

  saveAll(items) {
    var result = this.storage.set(STORAGE_KEY, items.map((item) => item.toJSON()))
    notifyServiceMutation()
    return result
  }

  getById(id) {
    return this.getAll().find((item) => item.id === id) || null
  }
}

export var serviceRepository = new ServiceRepository()
