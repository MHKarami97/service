import { ServiceableItem } from './ServiceableItem'

/**
 * Vehicle — concrete ServiceableItem for cars/motorcycles. Adds mileage
 * tracking: the user updates `currentOdometer` periodically, and the
 * aggregate compares it against the last record's nextServiceOdometer to
 * produce an extra due-signal (Liskov-substitutable with ServiceableItem).
 */
export class Vehicle extends ServiceableItem {
  constructor(config) {
    super({ ...config, type: 'vehicle' })
    this.currentOdometer = Math.max(0, Number(config.currentOdometer) || 0)
    this.plateNumber = config.plateNumber || ''
  }

  get nextServiceOdometer() {
    return this.lastRecord?.nextServiceOdometer ?? null
  }

  setCurrentOdometer(value) {
    this.currentOdometer = Math.max(0, Number(value) || 0)
  }

  extraDueSignal() {
    var target = this.nextServiceOdometer
    if (target === null || target === undefined) return null
    var remainingKm = target - this.currentOdometer
    var status = remainingKm < 0 ? 'overdue' : remainingKm <= 500 ? 'soon' : 'ok'
    return { status, remainingKm }
  }

  toJSON() {
    return { ...super.toJSON(), currentOdometer: this.currentOdometer, plateNumber: this.plateNumber }
  }

  static fromJSON(json) {
    return new Vehicle(json)
  }
}
