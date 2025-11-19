"use client"

import { useState, useEffect, useCallback } from 'react'
import { vehicleAvailabilityService } from '@/lib/services/vehicleAvailabilityService'

interface UseVehicleAvailabilityOptions {
  slug: string
  startDate?: string
  endDate?: string
}

interface AvailabilityResult {
  available: boolean
  reason?: string
  loading: boolean
  error: string | null
}

export function useVehicleAvailability({ slug, startDate, endDate }: UseVehicleAvailabilityOptions): AvailabilityResult {
  const [available, setAvailable] = useState<boolean>(true)
  const [reason, setReason] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkAvailability = useCallback(async () => {
    if (!startDate || !endDate || !slug) {
      setAvailable(true)
      setReason(undefined)
      setError(null)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const data = await vehicleAvailabilityService.checkAvailability(slug, startDate, endDate)
      setAvailable(data.available)
      setReason(data.reason)
    } catch (err) {
      // En cas d'erreur, on ne met pas available à false pour éviter d'afficher "non disponible" par erreur
      // On garde l'état précédent et on enregistre juste l'erreur
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      console.error('Erreur lors de la vérification de disponibilité:', err)
      // On garde available à true par défaut en cas d'erreur pour ne pas bloquer l'utilisateur
      setAvailable(true)
      setReason(undefined)
    } finally {
      setLoading(false)
    }
  }, [slug, startDate, endDate])

  useEffect(() => {
    checkAvailability()
  }, [checkAvailability])

  return { available, reason, loading, error }
}

