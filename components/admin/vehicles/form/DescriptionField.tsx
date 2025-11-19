import { VehicleFormData } from "@/lib/services/vehicleService"

interface DescriptionFieldProps {
  formData: VehicleFormData
  updateField: <K extends keyof VehicleFormData>(field: K, value: VehicleFormData[K]) => void
}

export function DescriptionField({ formData, updateField }: DescriptionFieldProps) {
  return (
    <div>
      <label className="block text-white font-montserrat font-semibold mb-2">Description</label>
      <textarea
        value={formData.bio}
        onChange={(e) => updateField('bio', e.target.value)}
        rows={4}
        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Description du véhicule..."
      />
    </div>
  )
}

