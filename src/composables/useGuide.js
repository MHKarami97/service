import { ref } from 'vue'
import { guideRepository } from '../services/GuideRepository'

var activeGuide = ref(null)

/**
 * Shared popup state. The ref lives at module level so any component can
 * open the guide while a single <GuideModal /> instance renders it.
 */
export function useGuide() {
  function openGuide(catalogId, serviceTypeId) {
    activeGuide.value = guideRepository.find(catalogId, serviceTypeId)
  }

  function openGuideByTitle(catalogId, title) {
    activeGuide.value = guideRepository.findByTitle(catalogId, title)
  }

  function closeGuide() {
    activeGuide.value = null
  }

  return { activeGuide, openGuide, openGuideByTitle, closeGuide }
}
