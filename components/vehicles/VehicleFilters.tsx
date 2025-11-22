"use client"

import { Vehicle } from "@/types"
import { useTranslations } from "next-intl"

interface VehicleFiltersProps {
  filters: {
    brand: string
    fuelType: string
    transmission: string
  }
  onFiltersChange: (filters: { brand: string; fuelType: string; transmission: string }) => void
  vehicles: Vehicle[]
}

export default function VehicleFilters({ filters, onFiltersChange, vehicles }: VehicleFiltersProps) {
  const t = useTranslations('vehicleFilters')
  // Obtenir les valeurs uniques pour les filtres
  const uniqueBrands = Array.from(new Set(vehicles.map(v => v.brand)))
  const uniqueFuelTypes = Array.from(new Set(vehicles.map(v => v.fuelType)))

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
      <h2 className="text-white text-xl font-montserrat font-semibold mb-4">{t('title')}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        {/* Filtre Marque */}
        <div>
          <label className="block text-white/80 text-sm font-montserrat mb-2">{t('brand')}</label>
          <select
            value={filters.brand}
            onChange={(e) => onFiltersChange({ ...filters, brand: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('all')}</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand} className="text-black">
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre Carburant */}
        <div>
          <label className="block text-white/80 text-sm font-montserrat mb-2">{t('fuelType')}</label>
          <select
            value={filters.fuelType}
            onChange={(e) => onFiltersChange({ ...filters, fuelType: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('all')}</option>
            {uniqueFuelTypes.map((fuel) => (
              <option key={fuel} value={fuel} className="text-black">
                {fuel === 'ESSENCE' ? 'Essence' : fuel === 'DIESEL' ? 'Diesel' : fuel}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre Transmission */}
        <div>
          <label className="block text-white/80 text-sm font-montserrat mb-2">{t('transmission')}</label>
          <select
            value={filters.transmission}
            onChange={(e) => onFiltersChange({ ...filters, transmission: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('all')}</option>
            <option value="AUTOMATIC" className="text-black">{t('automatic')}</option>
            <option value="MANUAL" className="text-black">{t('manual')}</option>
          </select>
        </div>
      </div>
    </div>
  )
}

