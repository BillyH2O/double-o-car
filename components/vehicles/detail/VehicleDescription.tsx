import { Vehicle } from "@/types"

interface VehicleDescriptionProps {
  vehicle: Vehicle
}

export function VehicleDescription({ vehicle }: VehicleDescriptionProps) {
  if (!vehicle.bio) return null

  return (
    <div className="bg-[#1a2847] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <h2 className="text-white font-montserrat text-lg sm:text-xl mb-4">Description</h2>
      <p className="text-white/80 font-montserrat text-sm sm:text-base leading-relaxed">{vehicle.bio}</p>
    </div>
  )
}

