import Image from "next/image"
import { Vehicle } from "@/types"

interface VehicleImageProps {
  vehicle: Vehicle
}

export function VehicleImage({ vehicle }: VehicleImageProps) {
  return (
    <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-12">
      <div className="relative w-full aspect-video flex items-end justify-center">
        {/* Ellipse en arrière-plan, positionnée en bas */}
        <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-full h-[40%]">
          <Image 
            src="/elipse.png" 
            alt="" 
            fill 
            className="object-contain opacity-60" 
          />
        </div>
        {/* Image de la voiture au-dessus de l'ellipse */}
        <div className="relative w-full h-full z-10 flex items-end justify-center">
          <Image
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className="object-contain rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}

