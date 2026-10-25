import { ServiceGuide } from '../models/ServiceGuide'
import { guideDataByCatalogId, allGuideSources } from '../data/guides'
import { defaultServiceCatalog } from '../data/defaultServiceCatalog'

/**
 * Repository Pattern for read-only guide data. Combines the static catalog
 * (names/titles) with guide content and source registry, and returns
 * immutable ServiceGuide value objects. Results are memoized because the
 * data never changes at runtime.
 */
export class GuideRepository {
  constructor(guideData = guideDataByCatalogId, sourceRegistry = allGuideSources, catalog = defaultServiceCatalog) {
    this.guideData = guideData
    this.sourceRegistry = sourceRegistry
    this.catalog = catalog
    this.cache = new Map()
  }

  findCatalogEntry(catalogId) {
    return this.catalog.find((entry) => entry.id === catalogId) ?? null
  }

  find(catalogId, serviceTypeId) {
    var key = `${catalogId}:${serviceTypeId}`
    if (this.cache.has(key)) return this.cache.get(key)

    var guide = this.build(catalogId, serviceTypeId)
    this.cache.set(key, guide)
    return guide
  }

  findByTitle(catalogId, title) {
    var entry = this.findCatalogEntry(catalogId)
    var type = entry?.serviceTypes.find((serviceType) => serviceType.title === title)
    return type ? this.find(catalogId, type.id) : null
  }

  hasGuide(catalogId, serviceTypeId) {
    return Boolean(this.guideData[catalogId]?.[serviceTypeId])
  }

  hasGuideForTitle(catalogId, title) {
    var entry = this.findCatalogEntry(catalogId)
    var type = entry?.serviceTypes.find((serviceType) => serviceType.title === title)
    return Boolean(type && this.hasGuide(catalogId, type.id))
  }

  coverage(catalogId) {
    var entry = this.findCatalogEntry(catalogId)
    var total = entry?.serviceTypes.length ?? 0
    var covered = entry ? entry.serviceTypes.filter((type) => this.hasGuide(catalogId, type.id)).length : 0
    return { total, covered }
  }

  build(catalogId, serviceTypeId) {
    var entry = this.findCatalogEntry(catalogId)
    var raw = this.guideData[catalogId]?.[serviceTypeId]
    var type = entry?.serviceTypes.find((serviceType) => serviceType.id === serviceTypeId)
    if (!entry || !raw || !type) return null

    var sources = (raw.sourceIds ?? [])
      .map((id) => ({ id, ...this.sourceRegistry[id] }))
      .filter((source) => source.url)

    return new ServiceGuide({
      catalogId,
      itemName: entry.name,
      serviceTypeId,
      title: type.title,
      sources,
      ...raw
    })
  }
}

export var guideRepository = new GuideRepository()
