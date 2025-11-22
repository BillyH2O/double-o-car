import { Vehicle, Car } from "@/types"
import { useTranslations } from "next-intl"

interface VehiclePricingProps {
  vehicle: Vehicle
  car: Car
}

export function VehiclePricing({ vehicle, car }: VehiclePricingProps) {
  const t = useTranslations("vehicle")
  
  return (
    <div className="bg-black/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <h2 className="text-white font-montserrat text-lg sm:text-xl mb-4">{t("pricing")}</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-white/80 font-montserrat">{t("pricePerDay")}</span>
          <span className="text-white font-montserrat font-bold text-xl">{car.pricePerDay}€</span>
        </div>
        {vehicle.pricePerWeek && (
          <div className="flex justify-between items-center">
            <span className="text-white/80 font-montserrat">{t("pricePerWeek")}</span>
            <span className="text-white font-montserrat font-bold text-xl">{Number(vehicle.pricePerWeek)}€</span>
          </div>
        )}
        {vehicle.pricePerMonth && (
          <div className="flex justify-between items-center">
            <span className="text-white/80 font-montserrat">{t("pricePerMonth")}</span>
            <span className="text-white font-montserrat font-bold text-xl">{Number(vehicle.pricePerMonth)}€</span>
          </div>
        )}
      </div>
    </div>
  )
}

