"use client";

import { navigateMonth } from "@/lib/utils/calendarUtils"
import { useTranslations } from "next-intl"
import { getMonthName } from "@/lib/utils/calendarTranslations"

interface CalendarControlsProps {
  currentMonth: Date
  compact?: boolean
  onMonthChange: (month: Date) => void
}

export function CalendarControls({ currentMonth, compact, onMonthChange }: CalendarControlsProps) {
  const t = useTranslations("calendar")
  const monthName = getMonthName(currentMonth.getMonth(), t)

  return (
    <div className="flex items-center justify-between gap-2">
      <button
        onClick={() => onMonthChange(navigateMonth(currentMonth, 'prev'))}
        className={compact 
          ? "bg-white/20 hover:bg-white/30 text-white p-2 rounded text-xs font-montserrat shrink-0"
          : "bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-lg font-montserrat shrink-0"
        }
        aria-label={t("previousMonth")}
      >
        <span className="hidden sm:inline">←</span>
        <span className="sm:hidden">←</span>
      </button>
      <h2 className={compact 
        ? "text-white text-sm font-montserrat font-semibold text-center flex-1"
        : "text-white text-base sm:text-xl font-montserrat font-semibold text-center flex-1 min-w-0"
      }>
        {monthName} {currentMonth.getFullYear()}
      </h2>
      <button
        onClick={() => onMonthChange(navigateMonth(currentMonth, 'next'))}
        className={compact 
          ? "bg-white/20 hover:bg-white/30 text-white p-2 rounded text-xs font-montserrat shrink-0"
          : "bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-lg font-montserrat shrink-0"
        }
        aria-label={t("nextMonth")}
      >
        <span className="hidden sm:inline">→</span>
        <span className="sm:hidden">→</span>
      </button>
    </div>
  )
}

