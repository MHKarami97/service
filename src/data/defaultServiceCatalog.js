export var defaultServiceCatalog = [
  {
    id: 'car',
    type: 'vehicle',
    name: 'خودرو سواری',
    icon: '🚗',
    version: 1,
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
    id: 'motorcycle',
    type: 'vehicle',
    name: 'موتورسیکلت',
    icon: '🏍️',
    version: 1,
    serviceTypes: [
      { id: 'moto-oil-change', title: 'تعویض روغن موتور' },
      { id: 'moto-chain-lube', title: 'روغن‌کاری و تنظیم زنجیر' },
      { id: 'moto-chain-replace', title: 'تعویض زنجیر و چرخ‌دنده' },
      { id: 'moto-brake-pads', title: 'لنت ترمز' },
      { id: 'moto-tires', title: 'تعویض یا بالانس تایر' },
      { id: 'moto-spark-plug', title: 'شمع' },
      { id: 'moto-air-filter', title: 'فیلتر هوا' },
      { id: 'moto-battery', title: 'باتری' },
      { id: 'moto-carburetor-injector', title: 'سرویس کاربراتور/انژکتور' },
      { id: 'moto-third-party-insurance', title: 'بیمه شخص ثالث' },
      { id: 'moto-technical-inspection', title: 'معاینه فنی' }
    ]
  },
  {
    id: 'bicycle',
    type: 'vehicle',
    name: 'دوچرخه',
    icon: '🚲',
    version: 1,
    serviceTypes: [
      { id: 'bike-chain-lube', title: 'روغن‌کاری زنجیر' },
      { id: 'bike-chain-replace', title: 'تعویض زنجیر' },
      { id: 'bike-brake-pads', title: 'لنت/پد ترمز' },
      { id: 'bike-tire-tube', title: 'تعویض تایر یا تیوپ' },
      { id: 'bike-gear-tuning', title: 'تنظیم دنده و ترمز' },
      { id: 'bike-bearing-service', title: 'سرویس یاتاقان و توپی چرخ' }
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
    id: 'split-ac',
    type: 'appliance',
    name: 'کولر گازی (اسپلیت)',
    icon: '🌬️',
    version: 1,
    serviceTypes: [
      { id: 'split-filter-cleaning', title: 'شستشوی فیلتر یونیت داخلی' },
      { id: 'split-gas-charge', title: 'شارژ گاز مبرد' },
      { id: 'split-outdoor-cleaning', title: 'شستشوی کندانسور یونیت بیرونی' },
      { id: 'split-drain-cleaning', title: 'رفع گرفتگی لوله تخلیه آب' }
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
    id: 'gas-heater',
    type: 'appliance',
    name: 'بخاری گازی/نفتی',
    icon: '🪔',
    version: 1,
    serviceTypes: [
      { id: 'heater-burner-cleaning', title: 'تمیزکاری مشعل' },
      { id: 'heater-filter-replace', title: 'تعویض فیلتر' },
      { id: 'heater-wick-replace', title: 'تعویض فتیله (نفتی)' },
      { id: 'heater-safety-check', title: 'بررسی سیستم قطع اضطراری' }
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
    id: 'air-purifier',
    type: 'appliance',
    name: 'دستگاه تصفیه هوا',
    icon: '🌫️',
    version: 1,
    serviceTypes: [
      { id: 'ap-hepa-filter', title: 'تعویض فیلتر HEPA' },
      { id: 'ap-carbon-filter', title: 'تعویض فیلتر کربن فعال' },
      { id: 'ap-sensor-cleaning', title: 'تمیزکاری سنسور کیفیت هوا' }
    ]
  },
  {
    id: 'range-hood',
    type: 'appliance',
    name: 'هود آشپزخانه',
    icon: '💨',
    version: 1,
    serviceTypes: [
      { id: 'hood-filter-cleaning', title: 'شستشوی فیلتر چربی‌گیر' },
      { id: 'hood-carbon-filter', title: 'تعویض فیلتر کربنی' },
      { id: 'hood-motor-check', title: 'بررسی موتور و روغن‌کاری' }
    ]
  },
  {
    id: 'gas-stove',
    type: 'appliance',
    name: 'اجاق گاز',
    icon: '🍳',
    version: 1,
    serviceTypes: [
      { id: 'stove-burner-cleaning', title: 'تمیزکاری شعله‌پخش‌کن‌ها' },
      { id: 'stove-hose-replace', title: 'تعویض شیلنگ گاز' },
      { id: 'stove-ignition-check', title: 'بررسی جوش‌آور و رگولاتور' }
    ]
  },
  {
    id: 'vacuum-cleaner',
    type: 'appliance',
    name: 'جاروبرقی',
    icon: '🧹',
    version: 1,
    serviceTypes: [
      { id: 'vac-filter-bag-replace', title: 'تعویض فیلتر یا کیسه خاک' },
      { id: 'vac-brush-roll-cleaning', title: 'تمیزکاری برس چرخان' },
      { id: 'vac-hose-check', title: 'بررسی گرفتگی شیلنگ' }
    ]
  },
  {
    id: 'fire-extinguisher',
    type: 'appliance',
    name: 'کپسول آتش‌نشانی',
    icon: '🧯',
    version: 1,
    serviceTypes: [
      { id: 'extinguisher-pressure-check', title: 'بازرسی فشار سنج' },
      { id: 'extinguisher-recharge', title: 'شارژ مجدد' },
      { id: 'extinguisher-replace', title: 'تعویض کپسول' }
    ]
  },
  {
    id: 'smoke-gas-detector',
    type: 'appliance',
    name: 'دتکتور دود/گاز',
    icon: '🚨',
    version: 1,
    serviceTypes: [
      { id: 'detector-battery-replace', title: 'تعویض باتری' },
      { id: 'detector-function-test', title: 'تست عملکرد آلارم' },
      { id: 'detector-sensor-cleaning', title: 'تمیزکاری سنسور' }
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
  },
  {
    id: 'elevator',
    type: 'appliance',
    name: 'آسانسور',
    icon: '🛗',
    version: 1,
    serviceTypes: [
      { id: 'elevator-monthly-service', title: 'سرویس ماهانه قرارداد' },
      { id: 'elevator-cable-check', title: 'بازرسی کابل و ریل' },
      { id: 'elevator-safety-inspection', title: 'بازرسی فنی دوره‌ای' }
    ]
  }
]

export var seedItemIds = [
  'car',
  'ac-cooler',
  'washing-machine',
  'dishwasher',
  'refrigerator'
]