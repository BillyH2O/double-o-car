"use client";

import { getNamespaceTranslations } from "@/lib/utils/messageLoader"

interface CalendarLegendProps {
  compact?: boolean
  locale?: 'fr' | 'en' | 'nl'
}

export function CalendarLegend({ compact, locale = 'fr' }: CalendarLegendProps) {
  const translations = getNamespaceTranslations(locale, 'calendarLegend') as Record<string, unknown>
  const available = String(translations.available || 'Disponible')
  const reserved = String(translations.reserved || 'Réservé')
  const reservedUnavailable = String(translations.reservedUnavailable || 'Réservé / Indisponible')
  
  return (
    <div className={compact 
      ? "flex gap-3 text-xs font-montserrat"
      : "flex gap-4 text-sm font-montserrat"
    }>
      <div className="flex items-center gap-1.5">
        <div className={compact ? "w-3 h-3 bg-red-500 rounded" : "w-4 h-4 bg-red-500 rounded"}></div>
        <span className={compact ? "text-white/80" : "text-white"}>
          {compact ? reserved : reservedUnavailable}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className={compact ? "w-3 h-3 bg-green-500 rounded" : "w-4 h-4 bg-green-500 rounded"}></div>
        <span className={compact ? "text-white/80" : "text-white"}>{available}</span>
      </div>
    </div>
  )
}

