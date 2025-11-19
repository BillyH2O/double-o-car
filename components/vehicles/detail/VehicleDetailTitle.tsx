import { Vehicle } from "@/types"

interface VehicleDetailTitleProps {
  vehicle: Vehicle
}

export function VehicleDetailTitle({ vehicle }: VehicleDetailTitleProps) {
  return (
    <div className="hidden lg:block">
      <h1 className="text-white text-3xl xl:text-4xl font-montserrat font-semibold mb-2">
        {vehicle.brand} <span className="font-bold">{vehicle.model}</span>
      </h1>
      <p className="text-white/60 font-montserrat text-lg">{vehicle.year}</p>
    </div>
  )
}

