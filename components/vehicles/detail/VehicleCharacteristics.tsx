import { Vehicle, Car } from "@/types"
import { CalendarDays, Fuel, Gauge } from "lucide-react"
import { useTranslations } from "next-intl"
import { translateTransmission } from "@/lib/utils/transmissionTranslations"

interface VehicleCharacteristicsProps {
  vehicle: Vehicle
  car: Car
}

export function VehicleCharacteristics({ vehicle, car }: VehicleCharacteristicsProps) {
  const t = useTranslations("vehicle")
  const tFilters = useTranslations("vehicleFilters")
  
  return (
    <div className="bg-black/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <h2 className="text-white font-montserrat text-lg sm:text-xl mb-4">{t("characteristics")}</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
        <CalendarDays />
          <span className="text-white/80 font-montserrat">{t("year")}: {vehicle.year}</span>
        </div>
        <div className="flex items-center gap-3">
        <Gauge />
          <span className="text-white/80 font-montserrat">{t("transmission")}: {translateTransmission(car.transmission, tFilters)}</span>
        </div>
        <div className="flex items-center gap-3">
        <Fuel />
          <span className="text-white/80 font-montserrat">{t("fuel")}: {car.fuel}</span>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-white/80 font-montserrat">{t("seats")}: {vehicle.seats}</span>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-white/80 font-montserrat">{t("doors")}: {vehicle.doors}</span>
        </div>
      </div>
    </div>
  )
}

