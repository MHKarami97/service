/**
 * Presentation-layer mapping from the domain's due-status enum to Persian
 * labels + Tailwind classes. Kept separate from the model so the model
 * stays UI-agnostic (Single Responsibility).
 */
export var STATUS_META = {
  overdue: {
    label: 'گذشته از موعد',
    badgeClass: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    dotClass: 'bg-red-500'
  },
  soon: {
    label: 'رو به اتمام',
    badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    dotClass: 'bg-amber-500'
  },
  ok: {
    label: 'به‌موقع',
    badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    dotClass: 'bg-emerald-500'
  },
  unknown: {
    label: 'بدون سرویس ثبت‌شده',
    badgeClass: 'bg-slate-100 text-slate-500 dark:bg-slate-700/50 dark:text-slate-400',
    dotClass: 'bg-slate-400'
  }
}

export function describeStatus(status) {
  return STATUS_META[status] ?? STATUS_META.unknown
}

export function formatToman(amount) {
  return Number(amount || 0).toLocaleString('fa-IR') + ' تومان'
}

export function formatDate(isoDate) {
  if (!isoDate) return '—'
  try {
    return new Date(isoDate).toLocaleDateString('fa-IR')
  } catch {
    return isoDate
  }
}
