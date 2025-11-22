export function getDaysInMonth(date: Date): (Date | null)[] {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days: (Date | null)[] = []
  
  // Jours vides au début
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  
  // Jours du mois
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }
  
  return days
}

export function isDateInPeriod(date: Date, start: Date | string, end: Date | string): boolean {
  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)
  const startDate = new Date(start)
  const endDate = new Date(end)
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(23, 59, 59, 999)
  return checkDate >= startDate && checkDate <= endDate
}

// DEPRECATED: Utiliser getMonthName depuis calendarTranslations.ts à la place
// Conservé pour compatibilité avec les composants qui n'ont pas encore été migrés
export const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

export function navigateMonth(currentMonth: Date, direction: 'prev' | 'next'): Date {
  const newMonth = new Date(currentMonth)
  if (direction === 'prev') {
    newMonth.setMonth(newMonth.getMonth() - 1)
  } else {
    newMonth.setMonth(newMonth.getMonth() + 1)
  }
  return newMonth
}

