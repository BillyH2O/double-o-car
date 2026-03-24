"use client"

import { useTranslations } from "next-intl"

const FUEL_TYPES = ["ESSENCE", "DIESEL", "ELECTRIC", "HYBRID", "HYBRID_PLUGIN"] as const

interface VehicleFiltersProps {
  filters: {
    brand: string
    fuelType: string
    transmission: string
  }
  onFiltersChange: (filters: { brand: string; fuelType: string; transmission: string }) => void
  allBrands: string[]
}

export default function VehicleFilters({ filters, onFiltersChange, allBrands }: VehicleFiltersProps) {
  const t = useTranslations("vehicleFilters")

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
      <h2 className="text-white text-xl font-montserrat font-semibold mb-4">{t("title")}</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-montserrat leading-snug text-white/80">{t("brand")}</label>
          <select
            value={filters.brand}
            onChange={(e) => onFiltersChange({ ...filters, brand: e.target.value })}
            className="h-10 w-full cursor-pointer rounded-lg border border-white/40 bg-white px-4 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="bg-white text-slate-900">
              {t("all")}
            </option>
            {allBrands.map((brand) => (
              <option key={brand} value={brand} className="bg-white text-slate-900">
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-montserrat leading-snug text-white/80">{t("fuelType")}</label>
          <select
            value={filters.fuelType}
            onChange={(e) => onFiltersChange({ ...filters, fuelType: e.target.value })}
            className="h-10 w-full cursor-pointer rounded-lg border border-white/40 bg-white px-4 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="bg-white text-slate-900">
              {t("all")}
            </option>
            {FUEL_TYPES.map((fuel) => (
              <option key={fuel} value={fuel} className="bg-white text-slate-900">
                {t(`fuel.${fuel}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-montserrat leading-snug text-white/80">{t("transmission")}</label>
          <select
            value={filters.transmission}
            onChange={(e) => onFiltersChange({ ...filters, transmission: e.target.value })}
            className="h-10 w-full cursor-pointer rounded-lg border border-white/40 bg-white px-4 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="bg-white text-slate-900">
              {t("all")}
            </option>
            <option value="AUTOMATIC" className="bg-white text-slate-900">
              {t("automatic")}
            </option>
            <option value="MANUAL" className="bg-white text-slate-900">
              {t("manual")}
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}
