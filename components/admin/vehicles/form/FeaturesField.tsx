import { useState } from "react"
import { VehicleFormData } from "@/lib/services/vehicleService"

interface FeaturesFieldProps {
  formData: VehicleFormData
  addFeature: (feature: string) => boolean
  removeFeature: (index: number) => void
}

export function FeaturesField({ formData, addFeature, removeFeature }: FeaturesFieldProps) {
  const [newFeature, setNewFeature] = useState('')

  const handleAddFeature = () => {
    if (addFeature(newFeature)) {
      setNewFeature('')
    }
  }

  return (
    <div>
      <label className="block text-white font-montserrat font-semibold mb-2">Équipements</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
          className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="GPS, Climatisation, etc."
        />
        <button
          type="button"
          onClick={handleAddFeature}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-montserrat"
        >
          Ajouter
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData.features.map((feature, index) => (
          <span
            key={index}
            className="bg-blue-500/30 text-white px-3 py-1 rounded-full text-sm font-montserrat flex items-center gap-2"
          >
            {feature}
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="text-red-300 hover:text-red-200"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

