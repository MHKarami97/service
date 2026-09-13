import { ServiceRecord } from './ServiceRecord'

/**
 * ServiceableItem — Aggregate Root (DDD). Root of consistency for a
 * physical item (appliance or vehicle) and its full ServiceRecord history.
 * All mutation of history entries MUST go through this aggregate so the
 * derived fields (lastRecord, nextServiceDate, totalSpent, due-status)
 * stay consistent — never mutate `history` from outside this class.
 *
 * This class is abstract; use Vehicle / Appliance. The Template Method
 * pattern is used for due-status calculation: the date-based rule lives
 * here, subclasses plug in an additional signal (e.g. odometer) via
 * `extraDueSignal()` without duplicating the date logic.
 */
export class ServiceableItem {
  constructor({
    id,
    name,
    icon = '🔧',
    type,
    catalogId = null,
    notes = '',
    history = [],
    isCustom = false,
    createdAt = Date.now(),
    version = 1
  }) {
    if (this.constructor === ServiceableItem) {
      throw new TypeError('ServiceableItem abstract است؛ از Vehicle یا Appliance استفاده کنید.')
    }
    this.id = id
    this.name = name
    this.icon = icon
    this.type = type
    this.catalogId = catalogId
    this.notes = notes
    this.isCustom = isCustom
    this.createdAt = createdAt
    this.version = version
    this.history = history.map((rec) => (rec instanceof ServiceRecord ? rec : new ServiceRecord(rec)))
  }

  get sortedHistory() {
    return [...this.history].sort((a, b) => new Date(b.performedAt) - new Date(a.performedAt))
  }

  get lastRecord() {
    return this.sortedHistory[0] ?? null
  }

  get nextServiceDate() {
    return this.lastRecord?.nextServiceDate ?? null
  }

  get totalSpent() {
    return this.history.reduce((sum, record) => sum + record.cost, 0)
  }

  get historyCount() {
    return this.history.length
  }

  addRecord(record) {
    this.history.push(record instanceof ServiceRecord ? record : new ServiceRecord(record))
  }

  updateRecord(recordId, patch) {
    var record = this.findRecord(recordId)
    if (!record) return false
    var merged = new ServiceRecord({ ...record.toJSON(), ...patch, id: recordId })
    this.history = this.history.map((entry) => (entry.id === recordId ? merged : entry))
    return true
  }

  removeRecord(recordId) {
    this.history = this.history.filter((record) => record.id !== recordId)
  }

  findRecord(recordId) {
    return this.history.find((record) => record.id === recordId) ?? null
  }

  /**
   * Template Method: combines the date-based rule with a subclass-specific
   * extra signal (odometer for vehicles) to produce a single status.
   * Status rank: overdue > soon > ok > unknown.
   */
  getDueStatus(referenceDate = new Date()) {
    var nextDate = this.nextServiceDate
    if (!nextDate) return { status: 'unknown', daysRemaining: null, extra: this.extraDueSignal() }

    var daysRemaining = Math.ceil((new Date(nextDate) - referenceDate) / 86400000)
    var dateStatus = daysRemaining < 0 ? 'overdue' : daysRemaining <= 14 ? 'soon' : 'ok'
    var extra = this.extraDueSignal()
    var status = this.combineStatus(dateStatus, extra?.status)

    return { status, daysRemaining, extra }
  }

  // Hook for subclasses (Vehicle overrides this). Default: no extra signal.
  extraDueSignal() {
    return null
  }

  combineStatus(primary, secondary) {
    var rank = { overdue: 3, soon: 2, ok: 1, unknown: 0 }
    if (!secondary) return primary
    return rank[primary] >= rank[secondary] ? primary : secondary
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon,
      type: this.type,
      catalogId: this.catalogId,
      notes: this.notes,
      isCustom: this.isCustom,
      createdAt: this.createdAt,
      version: this.version,
      history: this.history.map((record) => record.toJSON())
    }
  }
}
