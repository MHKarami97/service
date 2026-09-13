/**
 * ServiceRecord — Entity (not an aggregate root on its own; it only makes
 * sense in the context of a ServiceableItem). Represents one historical
 * maintenance event: what was done, when, for how much, and when the
 * *next* one is due.
 */
export class ServiceRecord {
  constructor({
    id,
    performedAt,
    serviceType = '',
    cost = 0,
    description = '',
    partsUsed = [],
    location = '',
    nextServiceDate = null,
    serviceOdometer = null,
    nextServiceOdometer = null,
    createdAt = Date.now()
  }) {
    this.id = id
    this.performedAt = performedAt
    this.serviceType = serviceType
    this.cost = ServiceRecord.normalizeNumber(cost)
    this.description = description
    this.partsUsed = Array.isArray(partsUsed) ? [...partsUsed] : []
    this.location = location
    this.nextServiceDate = nextServiceDate || null
    this.serviceOdometer = ServiceRecord.normalizeNullableNumber(serviceOdometer)
    this.nextServiceOdometer = ServiceRecord.normalizeNullableNumber(nextServiceOdometer)
    this.createdAt = createdAt
  }

  static normalizeNumber(value) {
    return Math.max(0, Number(value) || 0)
  }

  static normalizeNullableNumber(value) {
    if (value === null || value === undefined || value === '') return null
    var numeric = Number(value)
    return Number.isFinite(numeric) ? Math.max(0, numeric) : null
  }

  toJSON() {
    return {
      id: this.id,
      performedAt: this.performedAt,
      serviceType: this.serviceType,
      cost: this.cost,
      description: this.description,
      partsUsed: this.partsUsed,
      location: this.location,
      nextServiceDate: this.nextServiceDate,
      serviceOdometer: this.serviceOdometer,
      nextServiceOdometer: this.nextServiceOdometer,
      createdAt: this.createdAt
    }
  }

  static fromJSON(json) {
    return new ServiceRecord(json)
  }
}
