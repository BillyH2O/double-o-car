import { MONTH_NAMES, navigateMonth } from "@/lib/utils/calendarUtils"

interface CalendarControlsProps {
  currentMonth: Date
  compact?: boolean
  onMonthChange: (month: Date) => void
}

export function CalendarControls({ currentMonth, compact, onMonthChange }: CalendarControlsProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => onMonthChange(navigateMonth(currentMonth, 'prev'))}
        className={compact 
          ? "bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-xs font-montserrat"
          : "bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-montserrat"
        }
      >
        {compact ? "←" : "← Précédent"}
      </button>
      <h2 className={compact 
        ? "text-white text-sm font-montserrat font-semibold"
        : "text-white text-xl font-montserrat font-semibold"
      }>
        {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
      </h2>
      <button
        onClick={() => onMonthChange(navigateMonth(currentMonth, 'next'))}
        className={compact 
          ? "bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-xs font-montserrat"
          : "bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-montserrat"
        }
      >
        {compact ? "→" : "Suivant →"}
      </button>
    </div>
  )
}

