import { carGuides } from './car'
import { carGuidesPart2 } from './carPart2'
import { motorcycleGuides } from './motorcycle'
import { bicycleGuides } from './bicycle'
import { bicycleGuidesPart2 } from './bicyclePart2'
import { applianceGuidesPart1 } from './appliancesPart1'
import { applianceGuidesPart2 } from './appliancesPart2'
import { applianceGuidesPart3 } from './appliancesPart3'
import { applianceGuidesPart4 } from './appliancesPart4'
import { GUIDE_SOURCES } from './sources'
import { GUIDE_SOURCES_PART2 } from './sources.part2'
import { GUIDE_SOURCES_PART3 } from './sources.part3'
import { GUIDE_SOURCES_PART4 } from './sources.part4'
import { GUIDE_SOURCES_PART5 } from './sources.part5'
import { GUIDE_SOURCES_PART6 } from './sources.part6'
import { GUIDE_SOURCES_PART7 } from './sources.part7'

/**
 * Deep-merges datasets shaped as { catalogId: { serviceTypeId: guide } } so
 * several files can contribute to the same catalog item.
 */
function mergeCatalogDatasets(...datasets) {
  var merged = {}
  datasets.forEach((dataset) => {
    Object.keys(dataset).forEach((catalogId) => {
      merged[catalogId] = { ...(merged[catalogId] ?? {}), ...dataset[catalogId] }
    })
  })
  return merged
}

export var guideDataByCatalogId = mergeCatalogDatasets(
  { car: carGuides },
  { car: carGuidesPart2 },
  { motorcycle: motorcycleGuides },
  { bicycle: bicycleGuides },
  { bicycle: bicycleGuidesPart2 },
  applianceGuidesPart1,
  applianceGuidesPart2,
  applianceGuidesPart3,
  applianceGuidesPart4
)

export var allGuideSources = {
  ...GUIDE_SOURCES,
  ...GUIDE_SOURCES_PART2,
  ...GUIDE_SOURCES_PART3,
  ...GUIDE_SOURCES_PART4,
  ...GUIDE_SOURCES_PART5,
  ...GUIDE_SOURCES_PART6,
  ...GUIDE_SOURCES_PART7
}
