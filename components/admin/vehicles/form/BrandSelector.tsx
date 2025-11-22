import { useState } from "react"
import Image from "next/image"
import { VehicleFormData } from "@/lib/services/vehicleService"

interface Brand {
  id: string
  name: string
  logo: string
}

interface BrandSelectorProps {
  formData: VehicleFormData
  brands: Brand[]
  updateField: <K extends keyof VehicleFormData>(field: K, value: VehicleFormData[K]) => void
  createBrand: (data: { name: string; logo: string }) => Promise<Brand>
}

export function BrandSelector({ formData, brands, updateField, createBrand }: BrandSelectorProps) {
  const [showNewBrandInput, setShowNewBrandInput] = useState(false)
  const [newBrand, setNewBrand] = useState({ name: '', logo: '' })

  if (!showNewBrandInput) {
    return (
      <div>
        <label className="block  text-white font-montserrat font-semibold mb-2">Marque *</label>
        <div className="space-y-2">
          <select
            required
            value={formData.brand}
            onChange={(e) => {
              if (e.target.value === '__NEW__') {
                setShowNewBrandInput(true)
                updateField('brand', '')
              } else {
                updateField('brand', e.target.value)
              }
            }}
            className="w-full px-4 py-2 rounded-lg bg-blue-500/50 hover:bg-blue-500/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner une marque</option>
            {brands.map((brand, index) => (
              <option key={brand.id || `brand-${index}`} value={brand.name}>
                {brand.name}
              </option>
            ))}
            <option value="__NEW__">+ Ajouter une nouvelle marque</option>
          </select>
          {formData.brand && (
            <div className="flex items-center gap-2 mt-2">
              {brands.find(b => b.name === formData.brand)?.logo && (
                <Image
                  src={brands.find(b => b.name === formData.brand)?.logo || ''}
                  width={32}
                  height={32}
                  alt={formData.brand}
                  className="object-contain"
                />
              )}
              <p className="text-white/60 text-sm font-montserrat">Marque sélectionnée : {formData.brand}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <label className="block text-white font-montserrat font-semibold mb-2">Marque *</label>
      <div className="space-y-3">
        <div>
          <label className="block text-white/80 font-montserrat text-sm mb-1">Nom de la marque *</label>
          <input
            type="text"
            required
            value={newBrand.name}
            onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
            placeholder="Ex: Tesla, BMW, Mercedes..."
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-white/80 font-montserrat text-sm mb-1">Logo de la marque (URL) *</label>
          <input
            type="text"
            required
            value={newBrand.logo}
            onChange={(e) => setNewBrand({ ...newBrand, logo: e.target.value })}
            placeholder="https://example.com/logo.svg ou /logo.svg"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {newBrand.logo && (
            <div className="mt-2">
              <Image
                src={newBrand.logo}
                alt="Preview logo"
                className="object-contain bg-white/10 rounded p-2"
                width={64}
                height={64}
              />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={async () => {
              if (newBrand.name.trim() && newBrand.logo.trim()) {
                try {
                  const createdBrand = await createBrand({
                    name: newBrand.name.trim(),
                    logo: newBrand.logo.trim(),
                  })
                  updateField('brand', createdBrand.name)
                  setNewBrand({ name: '', logo: '' })
                  setShowNewBrandInput(false)
                } catch (err) {
                  alert(err instanceof Error ? err.message : 'Erreur lors de la création de la marque')
                }
              }
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-montserrat whitespace-nowrap"
          >
            Créer la marque
          </button>
          <button
            type="button"
            onClick={() => {
              setShowNewBrandInput(false)
              setNewBrand({ name: '', logo: '' })
              if (!formData.brand) {
                updateField('brand', '')
              }
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-montserrat"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}

