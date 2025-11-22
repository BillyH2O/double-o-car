"use client";

import { getDaysInMonth } from "@/lib/utils/calendarUtils"
import { getDayStatus } from "@/lib/utils/calendarStatusUtils"
import { Booking, Availability } from "@/lib/services/vehicleAvailabilityService"
import { useTranslations } from "next-intl"
import { getDayNames } from "@/lib/utils/calendarTranslations"

interface CalendarGridProps {
  currentMonth: Date
  bookings: Booking[]
  availability: Availability[]
  compact?: boolean
}

export function CalendarGrid({ currentMonth, bookings, availability, compact }: CalendarGridProps) {
  const days = getDaysInMonth(currentMonth)
  const t = useTranslations("calendar")
  const dayNames = getDayNames(t)

  return (
    <div className={compact 
      ? "bg-white/10 backdrop-blur-sm rounded-lg p-2"
      : "bg-white/10 backdrop-blur-sm rounded-xl p-4"
    }>
      <div className={compact 
        ? "grid grid-cols-7 gap-1 mb-1"
        : "grid grid-cols-7 gap-2 mb-2"
      }>
        {dayNames.map((day) => (
          <div key={day} className={compact
            ? "text-center text-white/80 font-montserrat font-semibold text-xs py-1"
            : "text-center text-white/80 font-montserrat font-semibold text-sm py-2"
          }>
            {day}
          </div>
        ))}
      </div>
      <div className={compact ? "grid grid-cols-7 gap-1" : "grid grid-cols-7 gap-2"}>
        {days.map((date, index) => {
          const status = getDayStatus(date, bookings, availability)
          return (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center ${compact ? "rounded" : "rounded-lg"} font-montserrat ${compact ? "text-xs" : "text-sm"}
                ${status === 'booked' || status === 'unavailable'
                  ? 'bg-red-500 text-white'
                  : status === 'available'
                  ? 'bg-green-500 text-white'
                  : 'bg-white/5 text-white/30'
                }
              `}
            >
              {date ? date.getDate() : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}

