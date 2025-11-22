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
  translations: [
    { locale: 'en', bio: '', features: [] },
    { locale: 'nl', bio: '', features: [] },
  ],
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

  const updateTranslation = useCallback((locale: 'en' | 'nl', field: 'bio' | 'features', value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      translations: prev.translations.map(t =>
        t.locale === locale ? { ...t, [field]: value } : t
      ),
    }))
  }, [])

  const addTranslationFeature = useCallback((locale: 'en' | 'nl', feature: string) => {
    const trimmedFeature = feature.trim()
    if (trimmedFeature) {
      setFormData(prev => ({
        ...prev,
        translations: prev.translations.map(t => {
          if (t.locale === locale && !t.features.includes(trimmedFeature)) {
            return { ...t, features: [...t.features, trimmedFeature] }
          }
          return t
        }),
      }))
      return true
    }
    return false
  }, [])

  const removeTranslationFeature = useCallback((locale: 'en' | 'nl', index: number) => {
    setFormData(prev => ({
      ...prev,
      translations: prev.translations.map(t =>
        t.locale === locale
          ? { ...t, features: t.features.filter((_, i) => i !== index) }
          : t
      ),
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
    updateTranslation,
    addTranslationFeature,
    removeTranslationFeature,
    resetForm,
    getPayload,
  }
}

