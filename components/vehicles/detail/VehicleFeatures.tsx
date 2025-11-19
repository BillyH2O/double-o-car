import { Vehicle } from "@/types"

interface VehicleFeaturesProps {
  vehicle: Vehicle
}

export function VehicleFeatures({ vehicle }: VehicleFeaturesProps) {
  if (!vehicle.features || vehicle.features.length === 0) return null

  return (
    <div className="bg-[#1a2847] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <h2 className="text-white font-montserrat text-lg sm:text-xl mb-4">Équipements</h2>
      <div className="flex flex-wrap gap-2">
        {vehicle.features.map((feature, index) => (
          <span
            key={index}
            className="bg-[#003CF0]/30 text-white px-3 py-1 rounded-full text-sm font-montserrat"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  )
}

