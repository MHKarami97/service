import { Vehicle } from '../models/Vehicle'
import { Appliance } from '../models/Appliance'

var uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

/**
 * Factory Pattern (+ Factory Method for polymorphic deserialization):
 * centralizes every place a concrete ServiceableItem subclass gets
 * instantiated, so the store/views never need an if/else on `type`.
 */
export class ServiceableItemFactory {
  static createFromJSON(json) {
    return json.type === 'vehicle' ? Vehicle.fromJSON(json) : Appliance.fromJSON(json)
  }

  static createFromCatalog(catalogEntry, overrides = {}) {
    var base = {
      id: uid(),
      name: catalogEntry.name,
      icon: catalogEntry.icon,
      catalogId: catalogEntry.id,
      isCustom: false,
      version: catalogEntry.version ?? 1,
      history: [],
      ...overrides
    }
    return catalogEntry.type === 'vehicle' ? new Vehicle(base) : new Appliance(base)
  }

  static createCustom({ name, icon, type }) {
    var base = {
      id: uid(),
      name,
      icon: icon || (type === 'vehicle' ? '🚗' : '🔧'),
      catalogId: null,
      isCustom: true,
      history: []
    }
    return type === 'vehicle' ? new Vehicle(base) : new Appliance(base)
  }
}

export function generateId() {
  return uid()
}
