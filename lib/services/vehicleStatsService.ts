import { StatsPeriod, VehicleStats } from "@/hooks/useVehicleStats"

class VehicleStatsService {
  async getVehicleStats(vehicleId: string, period: StatsPeriod): Promise<VehicleStats> {
    const response = await fetch(
      `/api/admin/vehicles/${vehicleId}/stats?period=${period}`
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || 'Erreur lors de la récupération des statistiques')
    }

    return response.json()
  }
}

export const vehicleStatsService = new VehicleStatsService()

