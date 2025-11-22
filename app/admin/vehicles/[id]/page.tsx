"use client"

import { useParams } from "next/navigation"
import { useVehicle } from "@/hooks/useVehicle"
import { useVehicleForm } from "@/hooks/useVehicleForm"
import { useVehicleSubmit } from "@/hooks/useVehicleSubmit"
import { useBrands } from "@/hooks/useBrands"
import Loader from "@/components/ui/Loader"
import Footer from "@/components/layout/footer"
import { VehicleFormHeader } from "@/components/admin/vehicles/VehicleFormHeader"
import { BrandSelector } from "@/components/admin/vehicles/form/BrandSelector"
import { BasicInfoFields } from "@/components/admin/vehicles/form/BasicInfoFields"
import { ImageFields } from "@/components/admin/vehicles/form/ImageFields"
import { DescriptionField } from "@/components/admin/vehicles/form/DescriptionField"
import { FeaturesField } from "@/components/admin/vehicles/form/FeaturesField"
import { TranslationFields } from "@/components/admin/vehicles/form/TranslationFields"
import { AvailabilityField } from "@/components/admin/vehicles/form/AvailabilityField"
import { FormActions } from "@/components/admin/vehicles/form/FormActions"

export default function EditVehiclePage() {
  const params = useParams()
  const id = params?.id as string
  const isNew = id === 'new'

  // Hooks pour la gestion des données
  const { vehicle, loading: vehicleLoading, error: vehicleError } = useVehicle(isNew ? null : id)
  const {
    formData,
    updateField,
    addFeature,
    removeFeature,
    addImage,
    removeImage,
    updateTranslation,
    addTranslationFeature,
    removeTranslationFeature,
    getPayload,
  } = useVehicleForm(vehicle || undefined)
  const { submit, saving, error: submitError } = useVehicleSubmit(id, isNew)
  const { brands, createBrand } = useBrands()

  const loading = vehicleLoading
  const error = vehicleError || submitError

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = getPayload()
      await submit(payload)
    } catch (error: unknown) {
      console.error('Error submitting vehicle:', error)
      // L'erreur est déjà gérée dans le hook
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex flex-col">
      <VehicleFormHeader isNew={isNew} />

      {/* Main Content */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
                <p className="text-red-200 font-montserrat">{error}</p>
              </div>
            )}

            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BrandSelector
                formData={formData}
                brands={brands}
                updateField={updateField}
                createBrand={createBrand}
              />
            </div>

            <BasicInfoFields formData={formData} updateField={updateField} />

            <ImageFields
              formData={formData}
              updateField={updateField}
              addImage={addImage}
              removeImage={removeImage}
            />

            <DescriptionField formData={formData} updateField={updateField} />

            <FeaturesField
              formData={formData}
              addFeature={addFeature}
              removeFeature={removeFeature}
            />

            <TranslationFields
              formData={formData}
              updateTranslation={updateTranslation}
              addTranslationFeature={addTranslationFeature}
              removeTranslationFeature={removeTranslationFeature}
            />

            <AvailabilityField formData={formData} updateField={updateField} />

            <FormActions isNew={isNew} saving={saving} />
          </form>
        </div>
      </section>
      <div className="mt-auto"><Footer /></div>
    </div>
  )
}

