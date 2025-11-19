import { VehicleFormData } from "@/lib/services/vehicleService"

interface BasicInfoFieldsProps {
  formData: VehicleFormData
  updateField: <K extends keyof VehicleFormData>(field: K, value: VehicleFormData[K]) => void
}

export function BasicInfoFields({ formData, updateField }: BasicInfoFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-white font-montserrat font-semibold mb-2">Modèle *</label>
        <input
          type="text"
          required
          value={formData.model}
          onChange={(e) => updateField('model', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-white font-montserrat font-semibold mb-2">Année *</label>
        <input
          type="number"
          required
          value={formData.year}
          onChange={(e) => updateField('year', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-white font-montserrat font-semibold mb-2">Prix par jour (€) *</label>
        <input
          type="number"
          step="0.01"
          required
          value={formData.pricePerDay}
          onChange={(e) => updateField('pricePerDay', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-white font-montserrat font-semibold mb-2">Prix par semaine (€)</label>
        <input
          type="number"
          step="0.01"
          value={formData.pricePerWeek}
          onChange={(e) => updateField('pricePerWeek', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-white font-montserrat font-semibold mb-2">Prix par mois (€)</label>
        <input
          type="number"
          step="0.01"
          value={formData.pricePerMonth}
          onChange={(e) => updateField('pricePerMonth', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-white font-montserrat font-semibold mb-2">Carburant *</label>
        <select
          required
          value={formData.fuelType}
          onChange={(e) => updateField('fuelType', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ESSENCE">Essence</option>
          <option value="DIESEL">Diesel</option>
          <option value="ELECTRIC">Électrique</option>
          <option value="HYBRID">Hybride</option>
          <option value="HYBRID_PLUGIN">Hybride rechargeable</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-montserrat font-semibold mb-2">Transmission *</label>
        <select
          required
          value={formData.transmission}
          onChange={(e) => updateField('transmission', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MANUAL">Manuelle</option>
          <option value="AUTOMATIC">Automatique</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-montserrat font-semibold mb-2">Nombre de places *</label>
        <input
          type="number"
          required
          value={formData.seats}
          onChange={(e) => updateField('seats', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-white font-montserrat font-semibold mb-2">Nombre de portes *</label>
        <input
          type="number"
          required
          value={formData.doors}
          onChange={(e) => updateField('doors', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}

