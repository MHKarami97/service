/**
 * defaultServiceCatalog
 * ---------------------
 * Read-only reference data (Value Objects), never persisted per-user.
 * Two roles:
 *  1. `serviceTypes` feed the quick-select suggestions in the service
 *     history form (ServiceHistoryForm) for a given item, matched by the
 *     item's `catalogId`.
 *  2. The whole entry can be turned into an owned ServiceableItem via
 *     ServiceableItemFactory.createFromCatalog() when the user adds a new
 *     device from the picker (AddItemModal), or automatically on first run
 *     for `seedItemIds`.
 *
 * `version` bump convention mirrors the original app: increment when you
 * add/rename serviceTypes so future maintenance is traceable, even though
 * no reconciliation is required here (serviceTypes are looked up live, not
 * copied into the user's data).
 */
export var defaultServiceCatalog = [
  {
    id: 'car-samand-soren',
    type: 'vehicle',
    name: 'سمند سورن',
    icon: '🚗',
    version: 2,
    serviceTypes: [
      { id: 'oil-change', title: 'تعویض روغن موتور' },
      { id: 'oil-filter', title: 'فیلتر روغن' },
      { id: 'brake-pads-front', title: 'لنت ترمز جلو' },
      { id: 'brake-pads-rear', title: 'ترمزهای چرخ عقب' },
      { id: 'hydraulic-oil', title: 'روغن هیدرولیک فرمان' },
      { id: 'brake-fluid', title: 'روغن ترمز' },
      { id: 'tires', title: 'تعویض یا بالانس چرخ' },
      { id: 'wheel-alignment', title: 'تنظیم فرمان (آلاینمنت)' },
      { id: 'timing-belt', title: 'تسمه تایم' },
      { id: 'timing-chain-tensioner', title: 'زنجیر و کشش‌گیر تایم' },
      { id: 'spark-plugs', title: 'شمع' },
      { id: 'fuel-filter', title: 'فیلتر سوخت' },
      { id: 'air-filter', title: 'فیلتر هوا' },
      { id: 'cabin-filter', title: 'فیلتر کابین (بخاری و کولر)' },
      { id: 'ecu-update', title: 'آپدیت ECU' },
      { id: 'injector-service', title: 'سرویس انژکتور' },
      { id: 'coolant', title: 'مایع ضدیخ' },
      { id: 'suspension', title: 'کمک‌فنر و جلوبندی' },
      { id: 'clutch-disc', title: 'دیسک و صفحه کلاچ' },
      { id: 'transmission-oil', title: 'روغن گیربکس' },
      { id: 'battery', title: 'باتری خودرو' },
      { id: 'full-engine-service', title: 'سرویس کامل موتور' },
      { id: 'third-party-insurance', title: 'بیمه شخص ثالث' },
      { id: 'body-insurance', title: 'بیمه بدنه' },
      { id: 'technical-inspection', title: 'معاینه فنی' }
    ]
  },
  {
    id: 'ac-cooler',
    type: 'appliance',
    name: 'کولر آبی',
    icon: '❄️',
    version: 1,
    serviceTypes: [
      { id: 'cooler-belt', title: 'تسمه کولر' },
      { id: 'cooler-pads', title: 'پوشال کولر' },
      { id: 'cooler-pump', title: 'پمپ آب کولر' },
      { id: 'cooler-cleaning', title: 'شستشوی کامل بدنه' },
      { id: 'cooler-motor-oil', title: 'روغن‌کاری موتور' }
    ]
  },
  {
    id: 'washing-machine',
    type: 'appliance',
    name: 'ماشین لباسشویی',
    icon: '🧺',
    version: 1,
    serviceTypes: [
      { id: 'wm-filter-cleaning', title: 'تخلیه و شستشوی فیلتر' },
      { id: 'wm-drum-cleaning', title: 'شستشوی جرم‌گیری درام' },
      { id: 'wm-belt', title: 'تسمه موتور' },
      { id: 'wm-bearing', title: 'بلبرینگ درام' },
      { id: 'wm-inlet-hose', title: 'شیر و شیلنگ ورودی آب' }
    ]
  },
  {
    id: 'dishwasher',
    type: 'appliance',
    name: 'ماشین ظرفشویی',
    icon: '🍽️',
    version: 1,
    serviceTypes: [
      { id: 'dw-filter-cleaning', title: 'شستشوی فیلتر' },
      { id: 'dw-salt-refill', title: 'شارژ نمک مخصوص' },
      { id: 'dw-spray-arm', title: 'بازوی پاشش آب' },
      { id: 'dw-descaling', title: 'جرم‌گیری' }
    ]
  },
  {
    id: 'refrigerator',
    type: 'appliance',
    name: 'یخچال فریزر',
    icon: '🧊',
    version: 1,
    serviceTypes: [
      { id: 'fridge-gas-charge', title: 'شارژ گاز' },
      { id: 'fridge-gasket', title: 'تعویض لاستیک درب' },
      { id: 'fridge-coil-cleaning', title: 'گردگیری کندانسور پشت یخچال' },
      { id: 'fridge-defrost-check', title: 'بررسی سیستم دیفراست' }
    ]
  },
  {
    id: 'gas-water-heater',
    type: 'appliance',
    name: 'آبگرمکن',
    icon: '🔥',
    version: 1,
    serviceTypes: [
      { id: 'wh-anode-rod', title: 'تعویض آنُد فداشونده' },
      { id: 'wh-descaling', title: 'رسوب‌گیری مخزن' },
      { id: 'wh-thermostat', title: 'بررسی ترموستات' }
    ]
  },
  {
    id: 'gas-package',
    type: 'appliance',
    name: 'پکیج شوفاژ',
    icon: '♨️',
    version: 1,
    serviceTypes: [
      { id: 'boiler-annual-service', title: 'سرویس سالانه پکیج' },
      { id: 'boiler-pressure-check', title: 'تنظیم فشار آب مدار' },
      { id: 'boiler-filter-cleaning', title: 'شستشوی فیلتر آب' },
      { id: 'boiler-anode-descale', title: 'رسوب‌گیری مبدل' }
    ]
  },
  {
    id: 'water-purifier',
    type: 'appliance',
    name: 'دستگاه تصفیه آب',
    icon: '💧',
    version: 1,
    serviceTypes: [
      { id: 'wp-sediment-filter', title: 'تعویض فیلتر شفاف (رسوب‌گیر)' },
      { id: 'wp-carbon-filter', title: 'تعویض فیلتر کربنی' },
      { id: 'wp-membrane', title: 'تعویض ممبران RO' },
      { id: 'wp-uv-lamp', title: 'تعویض لامپ UV' }
    ]
  },
  {
    id: 'parking-door-motor',
    type: 'appliance',
    name: 'موتور درب پارکینگ',
    icon: '🚪',
    version: 1,
    serviceTypes: [
      { id: 'pdm-chain-lube', title: 'روغن‌کاری زنجیر/شافت' },
      { id: 'pdm-battery-backup', title: 'تعویض باتری پشتیبان' },
      { id: 'pdm-limit-switch', title: 'تنظیم لیمیت سوییچ' }
    ]
  }
]

// دستگاه‌هایی که در نخستین اجرای برنامه به‌صورت خودکار به دارایی کاربر اضافه می‌شوند.
export var seedItemIds = [
  'car-samand-soren',
  'ac-cooler',
  'washing-machine',
  'dishwasher',
  'refrigerator'
]
