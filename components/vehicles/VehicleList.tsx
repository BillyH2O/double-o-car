"use client"

import { Car } from "@/types"
import { Vehicle } from "@/types"
import VehicleCard from "./VehicleCard"
import Loader from "@/components/ui/Loader"
import { useTranslations } from "next-intl"

interface VehicleListProps {
  cars: Car[]
  vehicles: Vehicle[]
  onVehicleClick: (vehicle: Vehicle, index: number) => void
  loading?: boolean
  error?: string | null
}

export default function VehicleList({ cars, vehicles, onVehicleClick, loading, error }: VehicleListProps) {
  const t = useTranslations("vehicle")
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
        <p className="text-red-200 font-montserrat">{error}</p>
      </div>
    )
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 font-montserrat">{t("noVehiclesFound")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {cars.map((car, index) => (
        <VehicleCard
          key={car.id}
          car={car}
          onClick={() => onVehicleClick(vehicles[index], index)}
        />
      ))}
    </div>
  )
}

