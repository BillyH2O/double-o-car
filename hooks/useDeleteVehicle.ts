import { useState, useCallback } from "react"
import { vehicleService } from "@/lib/services/vehicleService"

export function useDeleteVehicle() {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteVehicle = useCallback(async (id: string): Promise<boolean> => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      return false
    }

    try {
      setDeleting(true)
      setError(null)
      await vehicleService.deleteVehicle(id)
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression'
      setError(errorMessage)
      alert(errorMessage)
      return false
    } finally {
      setDeleting(false)
    }
  }, [])

  return {
    deleteVehicle,
    deleting,
    error,
  }
}

