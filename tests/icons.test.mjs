import test from 'node:test'
import assert from 'node:assert/strict'
import { ICON_PATHS, EMOJI_TO_ICON } from '../src/data/iconPaths.js'
import { defaultServiceCatalog } from '../src/data/defaultServiceCatalog.js'

test('every catalog item has a valid SVG icon in ICON_PATHS', () => {
  assert.ok(defaultServiceCatalog.length > 0)
  defaultServiceCatalog.forEach((item) => {
    assert.ok(item.icon, `Catalog item ${item.id} is missing icon`)
    assert.ok(
      ICON_PATHS[item.icon],
      `Catalog item ${item.id} specifies unknown icon "${item.icon}"`
    )
  })
})

test('every emoji in EMOJI_TO_ICON maps to an existing SVG key in ICON_PATHS', () => {
  for (var [emoji, iconKey] of Object.entries(EMOJI_TO_ICON)) {
    assert.ok(
      ICON_PATHS[iconKey],
      `EMOJI_TO_ICON maps "${emoji}" to missing icon "${iconKey}"`
    )
  }
})

test('every SVG path in ICON_PATHS is a non-empty string with valid SVG fragments', () => {
  for (var [key, pathStr] of Object.entries(ICON_PATHS)) {
    assert.equal(typeof pathStr, 'string', `${key} must be a string`)
    assert.ok(pathStr.length > 0, `${key} must not be empty`)
    assert.match(
      pathStr,
      /^<(?:path|circle|rect|line|polyline|g)/,
      `${key} must start with an svg element tag`
    )
  }
})
