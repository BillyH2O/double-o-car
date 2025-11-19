import { Booking, Availability } from "@/lib/services/vehicleAvailabilityService"
import { isDateInPeriod } from "./calendarUtils"

export type DayStatus = 'booked' | 'unavailable' | 'available' | null

export function getDayStatus(
  date: Date | null,
  bookings: Booking[],
  availability: Availability[]
): DayStatus {
  if (!date) return null

  // Vérifier les réservations (rouge)
  const isBooked = bookings.some((booking) =>
    isDateInPeriod(date, booking.startDate, booking.endDate)
  )
  if (isBooked) return 'booked'

  // Vérifier les périodes d'indisponibilité (rouge)
  const isUnavailable = availability.some((period) =>
    !period.isAvailable && isDateInPeriod(date, period.startDate, period.endDate)
  )
  if (isUnavailable) return 'unavailable'

  return 'available'
}

