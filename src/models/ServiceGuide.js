/**
 * ServiceGuide — Value Object. Immutable, read-only reference data that
 * explains what to know and what to check when a specific service is done.
 * It is never persisted per user; it is resolved from the static guide data.
 */
export class ServiceGuide {
  constructor({
    catalogId,
    itemName,
    serviceTypeId,
    title,
    summary = '',
    interval = '',
    recommendations = [],
    alsoConsider = [],
    askMechanic = [],
    warnings = [],
    sources = []
  }) {
    this.catalogId = catalogId
    this.itemName = itemName
    this.serviceTypeId = serviceTypeId
    this.title = title
    this.summary = summary
    this.interval = interval
    this.recommendations = Object.freeze([...recommendations])
    this.alsoConsider = Object.freeze([...alsoConsider])
    this.askMechanic = Object.freeze([...askMechanic])
    this.warnings = Object.freeze([...warnings])
    this.sources = Object.freeze([...sources])
    Object.freeze(this)
  }
}
