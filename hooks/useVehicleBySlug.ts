import { useState, useEffect, useCallback } from "react"
import { vehicleService } from "@/lib/services/vehicleService"
import { Vehicle } from "@/types"

export function useVehicleBySlug(slug: string | null) {
  const [vehicle, setVehicle] = useState<(Vehicle & { brandRelation?: { logo: string } | null }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVehicle = useCallback(async () => {
    if (!slug) return

    try {
      setLoading(true)
      setError(null)
      const fetchedVehicle = await vehicleService.getVehicleBySlug(slug)
      setVehicle(fetchedVehicle)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    if (slug) {
      fetchVehicle()
    }
  }, [slug, fetchVehicle])

  return {
    vehicle,
    loading,
    error,
    refetch: fetchVehicle,
  }
}

