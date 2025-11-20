import { MONTH_NAMES, navigateMonth } from "@/lib/utils/calendarUtils"

interface CalendarControlsProps {
  currentMonth: Date
  compact?: boolean
  onMonthChange: (month: Date) => void
}

export function CalendarControls({ currentMonth, compact, onMonthChange }: CalendarControlsProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <button
        onClick={() => onMonthChange(navigateMonth(currentMonth, 'prev'))}
        className={compact 
          ? "bg-white/20 hover:bg-white/30 text-white p-2 rounded text-xs font-montserrat flex-shrink-0"
          : "bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-lg font-montserrat flex-shrink-0"
        }
        aria-label="Mois précédent"
      >
        <span className="hidden sm:inline">← Précédent</span>
        <span className="sm:hidden">←</span>
      </button>
      <h2 className={compact 
        ? "text-white text-sm font-montserrat font-semibold text-center flex-1"
        : "text-white text-base sm:text-xl font-montserrat font-semibold text-center flex-1 min-w-0"
      }>
        {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
      </h2>
      <button
        onClick={() => onMonthChange(navigateMonth(currentMonth, 'next'))}
        className={compact 
          ? "bg-white/20 hover:bg-white/30 text-white p-2 rounded text-xs font-montserrat flex-shrink-0"
          : "bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-lg font-montserrat flex-shrink-0"
        }
        aria-label="Mois suivant"
      >
        <span className="hidden sm:inline">Suivant →</span>
        <span className="sm:hidden">→</span>
      </button>
    </div>
  )
}

