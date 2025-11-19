import { useState, useEffect, useCallback } from "react"
import { vehicleService } from "@/lib/services/vehicleService"
import { Vehicle } from "@/types"

export function useVehicle(id: string | null) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchVehicle = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)
      const fetchedVehicle = await vehicleService.getVehicle(id)
      setVehicle(fetchedVehicle)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchVehicle()
    }
  }, [id, fetchVehicle])

  return {
    vehicle,
    loading,
    error,
    refetch: fetchVehicle,
  }
}

