/**
 * Source registry for every guide. A guide references sources by id so the
 * same reference is never duplicated. `trust` mirrors the reliability
 * rating of the source: authoritative | trusted | credible | unrated.
 */
export var GUIDE_SOURCES = {
  'api-oil': {
    title: 'API — Engine Oil Categories',
    url: 'https://www.api.org/products-and-services/engine-oil/eolcs-categories-and-classifications/oil-categories',
    trust: 'credible'
  },
  'liquimoly-specs': {
    title: 'LIQUI MOLY — Classifications and specifications',
    url: 'https://www.liqui-moly.com/en/products/classifications-and-specifications.html',
    trust: 'trusted'
  },
  'precision-oil': {
    title: 'Precision Lubrication — Engine Oil Types and How to Choose',
    url: 'https://precisionlubrication.com/articles/engine-oil-types/',
    trust: 'credible'
  },
  'algroup-filters': {
    title: 'a.l. group — How Often Should You Replace Your Car Filters',
    url: 'https://algroup.com/blog/how-often-should-you-really-replace-your-cars-filters/',
    trust: 'unrated'
  },
  'autozone-cabin': {
    title: 'AutoZone — Signs of a Bad Cabin Air Filter',
    url: 'https://www.autozone.com/diy/filters/signs-of-a-bad-cabin-air-filter',
    trust: 'unrated'
  },
  'rac-cabin': {
    title: 'RAC Drive — Cabin and pollen filters',
    url: 'https://www.rac.co.uk/drive/advice/car-maintenance/cabin-and-pollen-filters-get-your-car-ready-for-the-summer/',
    trust: 'unrated'
  },
  'nhtsa-tires': {
    title: 'NHTSA — Tire Safety (TireWise)',
    url: 'https://www.nhtsa.gov/vehicle-safety/tires',
    trust: 'authoritative'
  },
  'nhtsa-coolant': {
    title: 'NHTSA TSB — Engine Coolant OAT technology',
    url: 'https://static.nhtsa.gov/odi/tsbs/2013/SB-10069646-2280.pdf',
    trust: 'authoritative'
  },
  'prestone-coolant': {
    title: 'Prestone UK — Coolant types, colour and mixing',
    url: 'https://www.prestoneuk.com/blog/different-coolant-types-explained/',
    trust: 'credible'
  },
  'aaa-battery': {
    title: 'AAA — Car Battery Maintenance Guide',
    url: 'https://www.acg.aaa.com/connect/blogs/4c/auto/car-battery-maintenance-guide',
    trust: 'trusted'
  },
  'aaa-battery-signs': {
    title: 'AAA — 8 Key Warning Signs of a Failing Battery',
    url: 'https://www.aaa.com/autorepair/articles/know-when-to-replace-the-car-battery-8-key-warning-signs',
    trust: 'unrated'
  },
  'gates-waterpump': {
    title: 'Gates Tech Zone — Water pump change interval',
    url: 'https://www.gatestechzone.com/gb/en/articles/the-importance-of-respecting-the-water-pump-change-interval.html',
    trust: 'trusted'
  },
  'carparts-timing': {
    title: 'CarParts — Replace timing belt and water pump together',
    url: 'https://www.carparts.com/blog/why-should-you-replace-the-timing-belt-and-water-pump-together/',
    trust: 'unrated'
  },
  'sdt-brake-fluid': {
    title: 'SDT Brakes — When to change the brake fluid',
    url: 'https://sdtbrakes.com/en/blog/noticias/when-to-change-the-brake-fluid-symptoms-and-maintenance',
    trust: 'unrated'
  },
  'autool-brake-fluid': {
    title: 'Autool — Brake fluid change interval (cites HELLA guidance)',
    url: 'https://autoolstore.com/how-often-to-change-brake-fluid-2-3-or-4-years/',
    trust: 'unrated'
  },
  'torquewise-plugs': {
    title: 'Torque Wise Auto — Spark plug replacement interval',
    url: 'https://torquewiseauto.com/spark-plug-replacement-interval/',
    trust: 'unrated'
  },
  'pro-stuk-ps': {
    title: 'Pro-Stuk — Power steering whine when turning',
    url: 'https://pro-stuk.com/en/articles/power-steering-whine-when-turning/',
    trust: 'unrated'
  },
  'ps-456': {
    title: '456 Auto Fix — Power steering whining noise',
    url: 'https://456autofix.com/power-steering-whining-noise/',
    trust: 'unrated'
  },
  'widman-gl': {
    title: 'R. Widman — Difference between GL-4 and GL-5 gear oils',
    url: 'https://www.widman.biz/uploads/Transaxle_oil.pdf',
    trust: 'credible'
  },
  'southbend-clutch': {
    title: 'South Bend Clutch — Throw-out bearing symptoms and replacement',
    url: 'https://southbendclutch.com/blogs/articles/throw-out-bearing-symptoms-failure-replacement',
    trust: 'unrated'
  },
  'carfriend-clutch': {
    title: 'Car Friend — Clutch and flywheel replacement',
    url: 'https://carfriend.co.uk/clutch-and-flywheel-replacement/',
    trust: 'unrated'
  }
}
