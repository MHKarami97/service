import { ServiceableItem } from './ServiceableItem'

/**
 * Appliance — concrete ServiceableItem for home devices (fridge, AC,
 * washing machine, ...). Due-status relies purely on the date signal
 * inherited from ServiceableItem; no extra signal is needed.
 */
export class Appliance extends ServiceableItem {
  constructor(config) {
    super({ ...config, type: 'appliance' })
    this.location = config.location || ''
  }

  toJSON() {
    return { ...super.toJSON(), location: this.location }
  }

  static fromJSON(json) {
    return new Appliance(json)
  }
}
