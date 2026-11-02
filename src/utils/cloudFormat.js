export function formatDateTimeFa(iso) {
  if (!iso) return ''
  var date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}

var ASCII_TO_PERSIAN = {
  '0': '۰',
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹'
}

export function toPersianDigits(value) {
  if (value === null || value === undefined) return ''
  return String(value).replace(/[0-9]/g, (digit) => ASCII_TO_PERSIAN[digit] || digit)
}
