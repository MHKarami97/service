/**
 * تبدیل تاریخ شمسی/میلادی بر پایه الگوریتم استاندارد محاسبات تقویم فارسی
 * (Borkowski / jalaali algorithm). خروجی toGregorian همیشه به فرمت ISO
 * میلادی (YYYY-MM-DD) تبدیل می‌شود تا با ServiceableItem.getDueStatus()
 * که بر پایه Date میلادی محاسبه می‌کند، سازگار بماند.
 */
function div(a, b) {
  var q = a / b
  return q >= 0 ? Math.trunc(q) : -Math.trunc(-q)
}

function mod(a, b) {
  return a - div(a, b) * b
}

var breaks = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
  1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
]

function jalCal(jy) {
  var bl = breaks.length
  var gy = jy + 621
  var leapJ = -14
  var jp = breaks[0]
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new RangeError('سال شمسی خارج از بازه پشتیبانی‌شده است: ' + jy)
  }
  var jump = 0
  for (var i = 1; i < bl; i += 1) {
    var jm = breaks[i]
    jump = jm - jp
    if (jy < jm) break
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4)
    jp = jm
  }
  var n = jy - jp
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4)
  if (mod(jump, 33) === 4 && jump - n === 4) {
    leapJ += 1
  }
  var leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150
  var march = 20 + leapJ - leapG
  if (jump - n < 6) {
    n = n - jump + div(jump + 4, 33) * 33
  }
  var leap = mod(mod(n + 1, 33) - 1, 4)
  if (leap === -1) leap = 4
  return { leap: leap, gy: gy, march: march }
}

export function isLeapJalaaliYear(jy) {
  return jalCal(jy).leap === 0
}

function g2d(gy, gm, gd) {
  var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
    + div(153 * mod(gm + 9, 12) + 2, 5)
    + gd - 34840408
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752
  return d
}

function d2g(jdn) {
  var j = 4 * jdn + 139361631
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908
  var i = div(mod(j, 1461), 4) * 5 + 308
  var gd = div(mod(i, 153), 5) + 1
  var gm = mod(div(i, 153), 12) + 1
  var gy = div(j, 1461) - 100100 + div(8 - gm, 6)
  return { gy: gy, gm: gm, gd: gd }
}

function j2d(jy, jm, jd) {
  var r = jalCal(jy)
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1
}

function d2j(jdn) {
  var gy = d2g(jdn).gy
  var jy = gy - 621
  var r = jalCal(jy)
  var jdn1f = g2d(gy, 3, r.march)
  var k = jdn - jdn1f
  var jm, jd

  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + div(k, 31)
      jd = mod(k, 31) + 1
      return { jy: jy, jm: jm, jd: jd }
    }
    k -= 186
  } else {
    jy -= 1
    k += 179
    if (r.leap === 1) k += 1
  }
  jm = 7 + div(k, 30)
  jd = mod(k, 30) + 1
  return { jy: jy, jm: jm, jd: jd }
}

export function toJalali(gy, gm, gd) {
  return d2j(g2d(gy, gm, gd))
}

export function toGregorian(jy, jm, jd) {
  return d2g(j2d(jy, jm, jd))
}

export function jalaaliMonthLength(jy, jm) {
  if (jm <= 6) return 31
  if (jm <= 11) return 30
  return isLeapJalaaliYear(jy) ? 30 : 29
}

export var JALALI_MONTH_NAMES = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
]

export var JALALI_WEEKDAY_LETTERS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']