import Image from "next/image"
import { Vehicle } from "@/types"

interface VehicleImageProps {
  vehicle: Vehicle
}

export function VehicleImage({ vehicle }: VehicleImageProps) {
  return (
    <div className="bg-[#1a2847] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <div className="relative w-full aspect-video">
        <Image
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-contain rounded-xl"
        />
      </div>
    </div>
  )
}

