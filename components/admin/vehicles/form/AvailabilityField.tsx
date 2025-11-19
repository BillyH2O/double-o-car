import { VehicleFormData } from "@/lib/services/vehicleService"

interface AvailabilityFieldProps {
  formData: VehicleFormData
  updateField: <K extends keyof VehicleFormData>(field: K, value: VehicleFormData[K]) => void
}

export function AvailabilityField({ formData, updateField }: AvailabilityFieldProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-white font-montserrat font-semibold">
        <input
          type="checkbox"
          checked={formData.isAvailable}
          onChange={(e) => updateField('isAvailable', e.target.checked)}
          className="w-4 h-4 rounded"
        />
        Véhicule disponible
      </label>
    </div>
  )
}

