import { useState, useEffect, useCallback } from "react"
import { vehicleAvailabilityService, Booking, Availability } from "@/lib/services/vehicleAvailabilityService"

interface UseVehicleAvailabilityPeriodsReturn {
  bookings: Booking[]
  availability: Availability[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  createPeriod: (data: { startDate: string; endDate: string; reason?: string }) => Promise<void>
  deletePeriod: (availabilityId: string) => Promise<void>
}

export function useVehicleAvailabilityPeriods(vehicleId: string): UseVehicleAvailabilityPeriodsReturn {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [availability, setAvailability] = useState<Availability[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPeriods = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await vehicleAvailabilityService.getVehicleAvailability(vehicleId)
      setBookings(data.bookings || [])
      setAvailability(data.availability || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }, [vehicleId])

  const createPeriod = useCallback(async (data: { startDate: string; endDate: string; reason?: string }) => {
    if (!data.startDate || !data.endDate) {
      throw new Error('Veuillez remplir les dates')
    }

    await vehicleAvailabilityService.createAvailabilityPeriod(vehicleId, data)
    await fetchPeriods()
  }, [vehicleId, fetchPeriods])

  const deletePeriod = useCallback(async (availabilityId: string) => {
    await vehicleAvailabilityService.deleteAvailabilityPeriod(vehicleId, availabilityId)
    await fetchPeriods()
  }, [vehicleId, fetchPeriods])

  useEffect(() => {
    if (vehicleId) {
      fetchPeriods()
    }
  }, [vehicleId, fetchPeriods])

  return {
    bookings,
    availability,
    loading,
    error,
    refetch: fetchPeriods,
    createPeriod,
    deletePeriod,
  }
}

