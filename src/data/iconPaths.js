/**
 * Inline stroke icons (24x24 grid, drawn with currentColor).
 * Plain data keeps them cacheable, tree-shakeable, and easily testable.
 */
export var ICON_PATHS = Object.freeze({
  // Navigation & Core UI
  box: '<path d="M12 3 3.5 7.5v9L12 21l8.5-4.5v-9L12 3Z"/><path d="M3.5 7.5 12 12l8.5-4.5"/><path d="M12 12v9"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
  sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
  download: '<path d="M12 4v11M7.5 11 12 15.5 16.5 11M5 20h14"/>',
  upload: '<path d="M12 16V5M7.5 9 12 4.5 16.5 9M5 20h14"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.8v.1"/>',

  // Actions & Buttons
  plus: '<path d="M12 5v14M5 12h14"/>',
  pencil: '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/>',
  trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
  'external-link': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',

  // Chevrons
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevrons-right': '<path d="m6 17 5-5-5-5M13 17l5-5-5-5"/>',
  'chevrons-left': '<path d="m18 17-5-5 5-5M11 17l-5-5 5-5"/>',

  // App Brand Logo
  logo: '<path d="M12 2 4 5v6.5C4 17 7.5 21 12 22c4.5-1 8-5 8-10.5V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>',

  // Vehicles Catalog
  car: '<path d="M4 16h16M3 11l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v5a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H4a1 1 0 0 1-1-1v-5Z"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/><path d="M5 11h14"/>',
  motorcycle: '<circle cx="5" cy="16" r="3"/><circle cx="19" cy="16" r="3"/><path d="M5 16h3.5l3-6 4 2.5h3.5M11.5 10l-3-4H5M15.5 12.5 19 16"/>',
  bicycle: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M12 17.5V14l-3.5-5H14l2 4M12 14l5-6.5h2.5M10 5.5h3"/>',

  // Home & Climate Appliances Catalog
  cooler: '<path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07M12 5l-2-2m4 0-2 2M12 19l-2 2m4 0-2-2M5 12l-2-2m0 4 2-2M19 12l2-2m0 4-2-2"/>',
  'split-ac': '<rect x="2" y="4" width="20" height="9" rx="2"/><path d="M2 10h20M17 7h1M6 17c1.5-1 2.5-1 4 0s2.5 1 4 0M6 20c1.5-1 2.5-1 4 0s2.5 1 4 0"/>',
  'washing-machine': '<rect x="3" y="2" width="18" height="20" rx="3"/><circle cx="12" cy="13" r="5"/><circle cx="12" cy="13" r="2"/><circle cx="7" cy="5.5" r="1" fill="currentColor"/><circle cx="10" cy="5.5" r="1" fill="currentColor"/><path d="M14 5.5h3"/>',
  dishwasher: '<rect x="3" y="2" width="18" height="20" rx="3"/><path d="M3 7h18M7 4.5h2M12 4.5h1"/><circle cx="12" cy="14" r="4"/><path d="M10 14h4M12 12v4"/>',
  refrigerator: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M4 10h16M8 5v3M8 13v4"/>',
  'water-heater': '<path d="M12 2c-4 5-7 7.5-7 12a7 7 0 0 0 14 0c0-4.5-3-7-7-12Z"/><path d="M12 12c-1.5 2-2.5 3-2.5 4.5a2.5 2.5 0 0 0 5 0c0-1.5-1-2.5-2.5-4.5Z"/>',
  boiler: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="9" r="3"/><path d="M12 8v1.5l1 1M8 17h8M8 14h8"/>',
  heater: '<path d="M4 4h16v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4ZM7 20v2M17 20v2M8 8h8M8 12h8M8 16h8"/>',
  'water-purifier': '<path d="M12 2.7 6.3 8.4a8 8 0 1 0 11.4 0L12 2.7Z"/><path d="M12 12a3 3 0 0 0-3 3"/>',
  'air-purifier': '<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 7h6M9 10h6M9 13h6M9 16h6M12 3v-1"/>',
  'range-hood': '<path d="M3 17h18l-3-8h-3V3H9v6H6l-3 8Z"/><path d="M3 17v4h18v-4M8 19h8"/>',
  stove: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="8" r="2.5"/><circle cx="8" cy="14" r="2"/><circle cx="16" cy="14" r="2"/><path d="M3 18h18"/>',
  vacuum: '<rect x="3" y="11" width="11" height="9" rx="3"/><circle cx="6.5" cy="15.5" r="1.5"/><path d="M14 14h3a3 3 0 0 1 3 3v4M21 17l-3 4M8 11V6a3 3 0 0 1 6 0v5"/>',
  extinguisher: '<rect x="7" y="9" width="10" height="12" rx="3"/><path d="M10 9V6a2 2 0 0 1 4 0v3M8 6h8M6 4h4M12 13h3"/>',
  detector: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
  door: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M10 3v18M14 12h2"/>',
  elevator: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="m9 10 3-3 3 3M9 14l3 3 3-3"/>'
})

/**
 * Backward compatibility dictionary: maps legacy unicode emojis
 * stored in user data to modern vector icon keys.
 */
export var EMOJI_TO_ICON = Object.freeze({
  '🚗': 'car',
  '🏍️': 'motorcycle',
  '🏍': 'motorcycle',
  '🚲': 'bicycle',
  '❄️': 'cooler',
  '❄': 'cooler',
  '🌬️': 'split-ac',
  '🌬': 'split-ac',
  '🧺': 'washing-machine',
  '🍽️': 'dishwasher',
  '🍽': 'dishwasher',
  '🧊': 'refrigerator',
  '🔥': 'water-heater',
  '♨️': 'boiler',
  '♨': 'boiler',
  '🪔': 'heater',
  '💧': 'water-purifier',
  '🌫️': 'air-purifier',
  '🌫': 'air-purifier',
  '💨': 'range-hood',
  '🍳': 'stove',
  '🧹': 'vacuum',
  '🧯': 'extinguisher',
  '🚨': 'detector',
  '🚪': 'door',
  '🛗': 'elevator',
  '🔧': 'wrench',
  '🏠': 'box',
  '⏰': 'clock',
  '💡': 'bulb',
  '⚙️': 'sliders',
  '⚙': 'sliders',
  '✏️': 'pencil',
  '✏': 'pencil',
  '🗑️': 'trash',
  '🗑': 'trash',
  '📅': 'calendar',
  '✅': 'check-circle',
  '🔁': 'repeat',
  '⚠️': 'alert',
  '⏱️': 'clock',
  '⏱': 'clock'
})
