"use client"

import { useState, useEffect, useCallback } from "react"
import { vehicleService } from "@/lib/services/vehicleService"
import { useLocale } from "next-intl"

export type UseVehicleBrandsOptions = {
  isAvailable?: boolean
  fuelType?: string
  transmission?: string
  startDate?: string
  endDate?: string
}

export function useVehicleBrands(options: UseVehicleBrandsOptions) {
  const locale = useLocale()
  const [brands, setBrands] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await vehicleService.getVehicleBrands(locale, {
        isAvailable: options.isAvailable,
        fuelType: options.fuelType || undefined,
        transmission: options.transmission || undefined,
        startDate: options.startDate,
        endDate: options.endDate,
      })
      setBrands(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue")
      console.error("Erreur useVehicleBrands:", err)
      setBrands([])
    } finally {
      setLoading(false)
    }
  }, [
    locale,
    options.isAvailable,
    options.fuelType,
    options.transmission,
    options.startDate,
    options.endDate,
  ])

  useEffect(() => {
    fetchBrands()
  }, [fetchBrands])

  return { brands, loading, error, refetch: fetchBrands }
}
