import test from 'node:test'
import assert from 'node:assert/strict'
import { NAV_ITEMS, isNavActive } from '../src/data/appNav.js'
import { ICON_PATHS } from '../src/data/iconPaths.js'

test('nav items are unique and each has an existing icon', () => {
  assert.equal(new Set(NAV_ITEMS.map((item) => item.id)).size, NAV_ITEMS.length)
  assert.equal(new Set(NAV_ITEMS.map((item) => item.to)).size, NAV_ITEMS.length)
  NAV_ITEMS.forEach((item) => assert.ok(ICON_PATHS[item.icon], `missing icon ${item.icon}`))
})

test('bottom bar keeps four destinations (grid-cols-4)', () => {
  assert.equal(NAV_ITEMS.length, 4)
})

test('item detail keeps the home tab active, other routes do not leak', () => {
  var byId = Object.fromEntries(NAV_ITEMS.map((item) => [item.id, item]))
  assert.equal(isNavActive(byId.home, 'item-detail'), true)
  assert.equal(isNavActive(byId.home, 'upcoming'), false)
  assert.equal(isNavActive(byId.upcoming, 'upcoming'), true)
  assert.equal(isNavActive(byId.guide, undefined), false)
})
