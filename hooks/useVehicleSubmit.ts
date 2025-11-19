import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { vehicleService, VehiclePayload } from "@/lib/services/vehicleService"

export function useVehicleSubmit(vehicleId: string | null, isNew: boolean) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = useCallback(async (payload: VehiclePayload) => {
    setSaving(true)
    setError(null)

    try {
      if (isNew) {
        await vehicleService.createVehicle(payload)
      } else if (vehicleId && vehicleId !== 'new') {
        await vehicleService.updateVehicle(vehicleId, payload)
      } else {
        throw new Error('ID de véhicule manquant')
      }

      router.push('/admin/vehicles')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde')
      throw err
    } finally {
      setSaving(false)
    }
  }, [isNew, vehicleId, router])

  return {
    submit,
    saving,
    error,
    setError,
  }
}

