"use client"

import Image from "next/image"
import { Car } from "@/types"
import { useTranslations } from "next-intl"
import { translateTransmission } from "@/lib/utils/transmissionTranslations"

interface VehicleCardProps {
  car: Car
  onClick: () => void
}

export default function VehicleCard({ car, onClick }: VehicleCardProps) {
  const t = useTranslations("vehicle")
  const tFilters = useTranslations("vehicleFilters")
  
  return (
    <div
      className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6">
        <div className="flex sm:flex-col gap-4 sm:gap-8 md:gap-16 items-center sm:items-start mb-4 sm:mb-0">
          <Image
            src={car.logo}
            alt={car.brand}
            width={50}
            height={50}
            className={`w-10 h-10 sm:w-12 sm:h-12 ${car.brand === "Dacia" ? "brightness-0" : ""}`}
          />
          <h3 className="font-montserrat font-normal text-black text-base sm:text-lg md:text-xl">
            {car.brand} <span className="font-semibold">{car.model}</span>
          </h3>
        </div>
        <div className="flex items-start w-full sm:w-auto justify-center">
          <div className="w-full sm:w-80 h-48 sm:h-60 flex items-center justify-center">
            <Image 
              src={car.image} 
              alt={`${car.brand} ${car.model}`} 
              width={320} 
              height={240} 
              className="object-contain w-full h-full" 
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#D9D9D980] rounded-[20px] px-3 sm:px-4 py-1.5 sm:py-2">
            <Image src="/calendar2.png" alt="Calendar" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-[#000000] font-montserrat">{car.year}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#D9D9D980] rounded-[20px] px-3 sm:px-4 py-1.5 sm:py-2">
            <Image src="/pod.png" alt="Transmission" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-[#000000] font-montserrat">{translateTransmission(car.transmission, tFilters)}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#D9D9D980] rounded-[20px] px-3 sm:px-4 py-1.5 sm:py-2">
            <Image src="/essence.png" alt="Fuel" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-[#000000] font-montserrat">{car.fuel}</span>
          </div>
        </div>
        <div className="bg-[#003CF075] px-4 sm:px-6 py-1.5 sm:py-2 rounded-[20px]">
          <span className="text-black font-montserrat font-semibold font-weight-600 text-base sm:text-lg">{car.pricePerDay}€</span>
          <span className="text-black font-montserrat font-regular font-weight-400 text-xs sm:text-sm">{t("perDay")}</span>
        </div>
      </div>
    </div>
  )
}

