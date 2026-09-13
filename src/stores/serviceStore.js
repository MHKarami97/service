import { defineStore } from 'pinia'
import { serviceRepository } from '../services/ServiceRepository'
import { ServiceableItemFactory } from '../services/ServiceableItemFactory'
import { ServiceRecord } from '../models/ServiceRecord'
import { defaultServiceCatalog, seedItemIds } from '../data/defaultServiceCatalog'

/**
 * Central reactive store (Observer Pattern via Pinia). Every component
 * reads through this single source of truth; every mutation of a
 * ServiceableItem aggregate happens through an action here so persistence
 * stays consistent.
 */
export var useServiceStore = defineStore('service', {
  state: () => ({
    items: [],
    activeItemId: null,
    isDarkMode: false,
    saveTimeoutId: null
  }),

  getters: {
    activeItem(state) {
      return state.items.find((item) => item.id === state.activeItemId) || null
    },

    vehicles(state) {
      return state.items.filter((item) => item.type === 'vehicle')
    },

    appliances(state) {
      return state.items.filter((item) => item.type === 'appliance')
    },

    itemsWithStatus(state) {
      var today = new Date()
      return state.items.map((item) => ({ item, due: item.getDueStatus(today) }))
    },

    upcomingSorted() {
      var rank = { overdue: 3, soon: 2, ok: 1, unknown: 0 }
      return [...this.itemsWithStatus].sort((a, b) => rank[b.due.status] - rank[a.due.status])
    },

    overdueCount() {
      return this.itemsWithStatus.filter((entry) => entry.due.status === 'overdue').length
    },

    soonCount() {
      return this.itemsWithStatus.filter((entry) => entry.due.status === 'soon').length
    },

    catalog() {
      return defaultServiceCatalog
    }
  },

  actions: {
    initialize() {
      if (serviceRepository.exists()) {
        this.items = serviceRepository.getAll()
      } else {
        this.items = defaultServiceCatalog
          .filter((entry) => seedItemIds.includes(entry.id))
          .map((entry) => ServiceableItemFactory.createFromCatalog(entry))
        this.persistAll()
      }

      if (this.items.length && !this.activeItemId) {
        this.activeItemId = this.items[0].id
      }

      var darkPref = localStorage.getItem('service-management:theme')
      this.isDarkMode = darkPref === 'dark'
      this.applyTheme()
    },

    persistAll() {
      serviceRepository.saveAll(this.items)
    },

    schedulePersist() {
      clearTimeout(this.saveTimeoutId)
      this.saveTimeoutId = setTimeout(() => this.persistAll(), 400)
    },

    selectItem(itemId) {
      this.activeItemId = itemId
    },

    addItemFromCatalog(catalogId, overrides = {}) {
      var entry = defaultServiceCatalog.find((def) => def.id === catalogId)
      if (!entry) return null
      var item = ServiceableItemFactory.createFromCatalog(entry, overrides)
      this.items.push(item)
      this.activeItemId = item.id
      this.persistAll()
      return item
    },

    addCustomItem({ name, icon, type }) {
      if (!name?.trim()) return null
      var item = ServiceableItemFactory.createCustom({ name: name.trim(), icon, type })
      this.items.push(item)
      this.activeItemId = item.id
      this.persistAll()
      return item
    },

    updateItem(itemId, patch) {
      var item = this.items.find((entry) => entry.id === itemId)
      if (!item) return
      Object.assign(item, patch)
      this.schedulePersist()
    },

    updateVehicleOdometer(itemId, km) {
      var item = this.items.find((entry) => entry.id === itemId)
      if (!item || item.type !== 'vehicle') return
      item.setCurrentOdometer(km)
      this.schedulePersist()
    },

    deleteItem(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId)
      if (this.activeItemId === itemId) {
        this.activeItemId = this.items[0]?.id ?? null
      }
      this.persistAll()
    },

    addServiceRecord(itemId, data) {
      var item = this.items.find((entry) => entry.id === itemId)
      if (!item) return
      item.addRecord(new ServiceRecord({ id: `rec-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, ...data }))
      this.persistAll()
    },

    updateServiceRecord(itemId, recordId, data) {
      var item = this.items.find((entry) => entry.id === itemId)
      if (!item) return
      item.updateRecord(recordId, data)
      this.persistAll()
    },

    removeServiceRecord(itemId, recordId) {
      var item = this.items.find((entry) => entry.id === itemId)
      if (!item) return
      item.removeRecord(recordId)
      this.persistAll()
    },

    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('service-management:theme', this.isDarkMode ? 'dark' : 'light')
      this.applyTheme()
    },

    applyTheme() {
      document.documentElement.classList.toggle('dark', this.isDarkMode)
    },

    exportData() {
      var payload = {
        exportedAt: new Date().toISOString(),
        items: this.items.map((item) => item.toJSON())
      }
      var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
      var url = URL.createObjectURL(blob)
      var link = document.createElement('a')
      link.href = url
      link.download = `service-backup-${Date.now()}.json`
      link.click()
      URL.revokeObjectURL(url)
    },

    async importData(file) {
      try {
        var text = await file.text()
        var parsed = JSON.parse(text)
        if (!parsed || !Array.isArray(parsed.items)) {
          throw new Error('ساختار فایل نامعتبر است.')
        }
        this.items = parsed.items.map((json) => ServiceableItemFactory.createFromJSON(json))
        this.activeItemId = this.items[0]?.id ?? null
        this.persistAll()
      } catch (error) {
        console.error('خطا در درون‌ریزی داده‌ها:', error)
        throw error
      }
    }
  }
})
