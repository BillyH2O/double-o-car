import { useState } from "react"
import { VehicleFormData } from "@/lib/services/vehicleService"

interface TranslationFieldsProps {
  formData: VehicleFormData
  updateTranslation: (locale: 'en' | 'nl', field: 'bio' | 'features', value: string | string[]) => void
  addTranslationFeature: (locale: 'en' | 'nl', feature: string) => boolean
  removeTranslationFeature: (locale: 'en' | 'nl', index: number) => void
}

export function TranslationFields({
  formData,
  updateTranslation,
  addTranslationFeature,
  removeTranslationFeature,
}: TranslationFieldsProps) {
  const [newFeatureEn, setNewFeatureEn] = useState('')
  const [newFeatureNl, setNewFeatureNl] = useState('')

  const enTranslation = formData.translations.find(t => t.locale === 'en') || { locale: 'en' as const, bio: '', features: [] }
  const nlTranslation = formData.translations.find(t => t.locale === 'nl') || { locale: 'nl' as const, bio: '', features: [] }

  const handleAddFeatureEn = () => {
    if (addTranslationFeature('en', newFeatureEn)) {
      setNewFeatureEn('')
    }
  }

  const handleAddFeatureNl = () => {
    if (addTranslationFeature('nl', newFeatureNl)) {
      setNewFeatureNl('')
    }
  }

  return (
    <div className="space-y-6 border-t border-white/20 pt-6">
      <h3 className="text-xl font-bold text-white font-montserrat">Traductions</h3>
      
      {/* Traduction Anglaise */}
      <div className="bg-white/5 rounded-lg p-4 space-y-4">
        <h4 className="text-lg font-semibold text-white font-montserrat flex items-center gap-2">
          🇬🇧 Anglais (English)
        </h4>
        
        <div>
          <label className="block text-white font-montserrat font-semibold mb-2">Description (EN)</label>
          <textarea
            value={enTranslation.bio}
            onChange={(e) => updateTranslation('en', 'bio', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Vehicle description in English..."
          />
        </div>

        <div>
          <label className="block text-white font-montserrat font-semibold mb-2">Équipements (EN)</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newFeatureEn}
              onChange={(e) => setNewFeatureEn(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeatureEn())}
              className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="GPS, Air Conditioning, etc."
            />
            <button
              type="button"
              onClick={handleAddFeatureEn}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-montserrat"
            >
              Ajouter
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {enTranslation.features.map((feature, index) => (
              <span
                key={index}
                className="bg-blue-500/30 text-white px-3 py-1 rounded-full text-sm font-montserrat flex items-center gap-2"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeTranslationFeature('en', index)}
                  className="text-red-300 hover:text-red-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Traduction Néerlandaise */}
      <div className="bg-white/5 rounded-lg p-4 space-y-4">
        <h4 className="text-lg font-semibold text-white font-montserrat flex items-center gap-2">
          🇳🇱 Néerlandais (Nederlands)
        </h4>
        
        <div>
          <label className="block text-white font-montserrat font-semibold mb-2">Beschrijving (NL)</label>
          <textarea
            value={nlTranslation.bio}
            onChange={(e) => updateTranslation('nl', 'bio', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Voertuigbeschrijving in het Nederlands..."
          />
        </div>

        <div>
          <label className="block text-white font-montserrat font-semibold mb-2">Uitrusting (NL)</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newFeatureNl}
              onChange={(e) => setNewFeatureNl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeatureNl())}
              className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="GPS, Airconditioning, etc."
            />
            <button
              type="button"
              onClick={handleAddFeatureNl}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-montserrat"
            >
              Ajouter
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {nlTranslation.features.map((feature, index) => (
              <span
                key={index}
                className="bg-blue-500/30 text-white px-3 py-1 rounded-full text-sm font-montserrat flex items-center gap-2"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeTranslationFeature('nl', index)}
                  className="text-red-300 hover:text-red-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

