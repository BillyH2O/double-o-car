"use client"

import { useState, useEffect, useCallback } from 'react'
import { vehicleStatsService } from '@/lib/services/vehicleStatsService'

export type StatsPeriod = 
  | 'currentmonth' 
  | 'lastmonth' 
  | '3months' 
  | '6months' 
  | '1year'
  | 'nextmonth'
  | 'next3months'
  | 'next6months'
  | 'next1year'

export interface VehicleStats {
  period: StatsPeriod
  startDate: string
  endDate: string
  totalDays: number
  bookedDays: number
  availableDays: number
  fillRate: number
  revenue: number
}

interface UseVehicleStatsOptions {
  vehicleId: string
  period: StatsPeriod
}

interface UseVehicleStatsReturn {
  stats: VehicleStats | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useVehicleStats({ vehicleId, period }: UseVehicleStatsOptions): UseVehicleStatsReturn {
  const [stats, setStats] = useState<VehicleStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    if (!vehicleId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const data = await vehicleStatsService.getVehicleStats(vehicleId, period)
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      console.error('Erreur useVehicleStats:', err)
    } finally {
      setLoading(false)
    }
  }, [vehicleId, period])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}

