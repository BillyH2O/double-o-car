"use client"

import { useState, useRef, useEffect } from "react"
import { useGlobalStats } from "@/hooks/useGlobalStats"
import { StatsPeriod } from "@/hooks/useVehicleStats"
import Loader from "@/components/ui/Loader"

export function GlobalStats() {
  const [statsPeriod, setStatsPeriod] = useState<StatsPeriod>('currentmonth')
  const { stats, loading: statsLoading, refetch: refetchStats } = useGlobalStats(statsPeriod)
  const statsRefetchRef = useRef<(() => Promise<void>) | null>(null)

  // Exposer refetch pour les autres composants (dans useEffect pour éviter l'accès aux refs pendant le render)
  useEffect(() => {
    statsRefetchRef.current = refetchStats
  }, [refetchStats])

  return (
    <div className="bg-linear-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
        <h3 className="text-white text-base sm:text-lg font-montserrat font-semibold">
          Statistiques globales
        </h3>
        <select
          value={statsPeriod}
          onChange={(e) => setStatsPeriod(e.target.value as StatsPeriod)}
          className="bg-white/20 text-white border border-white/30 rounded-lg px-3 sm:px-4 py-2 font-montserrat text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:bg-[#001141] [&>option]:text-white w-full sm:w-auto min-w-0"
        >
          <optgroup label="Passé" className="bg-[#001141] text-white">
            <option value="lastmonth" className="bg-[#001141] text-white">Mois précédent</option>
            <option value="3months" className="bg-[#001141] text-white">3 derniers mois</option>
            <option value="6months" className="bg-[#001141] text-white">6 derniers mois</option>
            <option value="1year" className="bg-[#001141] text-white">1 dernière année</option>
          </optgroup>
          <optgroup label="Présent" className="bg-[#001141] text-white">
            <option value="currentmonth" className="bg-[#001141] text-white">Mois en cours</option>
          </optgroup>
          <optgroup label="Futur" className="bg-[#001141] text-white">
            <option value="nextmonth" className="bg-[#001141] text-white">Mois prochain</option>
            <option value="next3months" className="bg-[#001141] text-white">3 prochains mois</option>
            <option value="next6months" className="bg-[#001141] text-white">6 prochains mois</option>
            <option value="next1year" className="bg-[#001141] text-white">1 prochaine année</option>
          </optgroup>
        </select>
      </div>

      {statsLoading && (
        <div className="text-center py-4">
          <Loader />
        </div>
      )}

      {stats && !statsLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/70 text-sm font-montserrat mb-1">Véhicules</div>
              <div className="text-white text-2xl font-montserrat font-bold">
                {stats.totalVehicles}
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/70 text-sm font-montserrat mb-1">Jours réservés</div>
              <div className="text-white text-2xl font-montserrat font-bold">
                {stats.bookedDays}
                <span className="text-sm font-normal text-white/70 ml-1">
                  / {stats.totalVehicleDays}
                </span>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/70 text-sm font-montserrat mb-1">Taux de remplissage</div>
              <div className="text-white text-2xl font-montserrat font-bold">
                {stats.fillRate}%
              </div>
              <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(stats.fillRate, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/70 text-sm font-montserrat mb-1">Chiffre d&apos;affaires</div>
              <div className="text-white text-2xl font-montserrat font-bold">
                {stats.revenue.toFixed(2)}€
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-white/60 font-montserrat">
            Période : {new Date(stats.startDate).toLocaleDateString('fr-FR')} - {new Date(stats.endDate).toLocaleDateString('fr-FR')}
          </div>
        </>
      )}
    </div>
  )
}

