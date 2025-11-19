import { useState, useEffect, useCallback } from "react"
import { Vehicle } from "@/types"
import { vehicleService } from "@/lib/services/vehicleService"

export function useAdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await vehicleService.getAdminVehicles()
      setVehicles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  return {
    vehicles,
    loading,
    error,
    refetch: fetchVehicles,
  }
}

