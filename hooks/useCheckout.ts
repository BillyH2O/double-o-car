"use client"

import { useCallback, useState } from 'react'
import { checkoutService, StartCheckoutOptions } from '@/lib/services/checkoutService'

export type { StartCheckoutOptions }

export function useCheckout() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startCheckout = useCallback(async (vehicleId: string, opts?: StartCheckoutOptions) => {
    setLoading(true)
    setError(null)
    try {
      console.debug('[useCheckout] start', { vehicleId, opts })
      const session = await checkoutService.createCheckoutSession(vehicleId, opts)
      console.debug('[useCheckout] session created', session)
      const url: string | undefined = session.url
      if (!url) throw new Error('No checkout URL returned')
      window.location.href = url
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Checkout failed'
      console.error('[useCheckout] API error', e)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  return { startCheckout, loading, error }
}





