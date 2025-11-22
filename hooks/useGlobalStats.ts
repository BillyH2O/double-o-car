"use client"

import { useState, useEffect, useCallback } from 'react'
import { globalStatsService, GlobalStats } from '@/lib/services/globalStatsService'
import { StatsPeriod } from './useVehicleStats'

interface UseGlobalStatsReturn {
  stats: GlobalStats | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useGlobalStats(period: StatsPeriod): UseGlobalStatsReturn {
  const [stats, setStats] = useState<GlobalStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await globalStatsService.getGlobalStats(period)
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      console.error('Erreur useGlobalStats:', err)
    } finally {
      setLoading(false)
    }
  }, [period])

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

