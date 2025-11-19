import { useState, useEffect, useCallback, startTransition } from "react"
import { VehicleFormData, vehicleService, VehiclePayload } from "@/lib/services/vehicleService"
import { Vehicle } from "@/types"

const initialFormData: VehicleFormData = {
  brand: '',
  model: '',
  year: '',
  pricePerDay: '',
  pricePerWeek: '',
  pricePerMonth: '',
  fuelType: 'ESSENCE',
  transmission: 'MANUAL',
  seats: '',
  doors: '',
  image: '',
  images: [],
  bio: '',
  features: [],
  isAvailable: true,
}

export function useVehicleForm(initialVehicle?: Vehicle) {
  const [formData, setFormData] = useState<VehicleFormData>(
    initialVehicle ? vehicleService.transformVehicleToFormData(initialVehicle) : initialFormData
  )

  useEffect(() => {
    if (initialVehicle) {
      // Utiliser startTransition pour éviter l'appel synchrone de setState dans l'effet
      startTransition(() => {
        setFormData(vehicleService.transformVehicleToFormData(initialVehicle))
      })
    }
  }, [initialVehicle])

  const updateField = useCallback(<K extends keyof VehicleFormData>(
    field: K,
    value: VehicleFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const addFeature = useCallback((feature: string) => {
    const trimmedFeature = feature.trim()
    if (trimmedFeature && !formData.features.includes(trimmedFeature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, trimmedFeature],
      }))
      return true
    }
    return false
  }, [formData.features])

  const removeFeature = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }, [])

  const addImage = useCallback((image: string) => {
    const trimmedImage = image.trim()
    if (trimmedImage && !formData.images.includes(trimmedImage)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, trimmedImage],
      }))
      return true
    }
    return false
  }, [formData.images])

  const removeImage = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
  }, [])

  const getPayload = useCallback((): VehiclePayload => {
    return vehicleService.transformFormDataToPayload(formData)
  }, [formData])

  return {
    formData,
    setFormData,
    updateField,
    addFeature,
    removeFeature,
    addImage,
    removeImage,
    resetForm,
    getPayload,
  }
}

