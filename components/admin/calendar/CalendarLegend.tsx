interface CalendarLegendProps {
  compact?: boolean
}

export function CalendarLegend({ compact }: CalendarLegendProps) {
  return (
    <div className={compact 
      ? "flex gap-3 text-xs font-montserrat"
      : "flex gap-4 text-sm font-montserrat"
    }>
      <div className="flex items-center gap-1.5">
        <div className={compact ? "w-3 h-3 bg-red-500 rounded" : "w-4 h-4 bg-red-500 rounded"}></div>
        <span className={compact ? "text-white/80" : "text-white"}>
          {compact ? "Réservé" : "Réservé / Indisponible"}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className={compact ? "w-3 h-3 bg-green-500 rounded" : "w-4 h-4 bg-green-500 rounded"}></div>
        <span className={compact ? "text-white/80" : "text-white"}>Disponible</span>
      </div>
    </div>
  )
}

