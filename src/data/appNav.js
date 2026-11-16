/**
 * Single source of truth for the main destinations, shared by the header
 * (desktop) and the bottom bar (mobile).
 */
export var NAV_ITEMS = Object.freeze([
  { id: 'home', to: '/', title: 'وسایل من', shortTitle: 'وسایل من', icon: 'box', routeNames: ['home', 'item-detail'] },
  { id: 'upcoming', to: '/upcoming', title: 'سرویس‌های پیش رو', shortTitle: 'پیش رو', icon: 'clock', routeNames: ['upcoming'] },
  { id: 'guide', to: '/guide', title: 'راهنما', shortTitle: 'راهنما', icon: 'bulb', routeNames: ['guide'] },
  { id: 'settings', to: '/settings', title: 'تنظیمات', shortTitle: 'تنظیمات', icon: 'sliders', routeNames: ['settings'] }
])

export function isNavActive(item, routeName) {
  return item.routeNames.includes(String(routeName ?? ''))
}
