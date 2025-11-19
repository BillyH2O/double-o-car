import { useState, useEffect, useCallback } from 'react'
import { Vehicle, UseVehiclesOptions, UseVehiclesReturn } from '@/types'
import { vehicleService } from '@/lib/services/vehicleService'

export function useVehicles(options: UseVehiclesOptions = {}): UseVehiclesReturn {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await vehicleService.getVehicles({
        isAvailable: options.isAvailable,
        brand: options.brand,
        fuelType: options.fuelType,
        transmission: options.transmission,
        startDate: options.startDate,
        endDate: options.endDate,
      })

      setVehicles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      console.error('Erreur useVehicles:', err)
    } finally {
      setLoading(false)
    }
  }, [options.isAvailable, options.brand, options.fuelType, options.transmission, options.startDate, options.endDate])

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

