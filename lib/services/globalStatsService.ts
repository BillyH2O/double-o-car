import { StatsPeriod } from "@/hooks/useVehicleStats"

export interface GlobalStats {
  period: StatsPeriod
  startDate: string
  endDate: string
  totalDays: number
  totalVehicles: number
  totalVehicleDays: number
  bookedDays: number
  availableDays: number
  fillRate: number
  revenue: number
}

class GlobalStatsService {
  async getGlobalStats(period: StatsPeriod): Promise<GlobalStats> {
    const response = await fetch(`/api/admin/stats?period=${period}`)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || 'Erreur lors de la récupération des statistiques globales')
    }
    return response.json()
  }
}

export const globalStatsService = new GlobalStatsService()

