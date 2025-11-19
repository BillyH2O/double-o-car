import { Vehicle, Car } from "@/types"

interface VehiclePricingProps {
  vehicle: Vehicle
  car: Car
}

export function VehiclePricing({ vehicle, car }: VehiclePricingProps) {
  return (
    <div className="bg-[#1a2847] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <h2 className="text-white font-montserrat text-lg sm:text-xl mb-4">Tarifs</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-white/80 font-montserrat">Par jour</span>
          <span className="text-white font-montserrat font-bold text-xl">{car.pricePerDay}€</span>
        </div>
        {vehicle.pricePerWeek && (
          <div className="flex justify-between items-center">
            <span className="text-white/80 font-montserrat">Par semaine</span>
            <span className="text-white font-montserrat font-bold text-xl">{Number(vehicle.pricePerWeek)}€</span>
          </div>
        )}
        {vehicle.pricePerMonth && (
          <div className="flex justify-between items-center">
            <span className="text-white/80 font-montserrat">Par mois</span>
            <span className="text-white font-montserrat font-bold text-xl">{Number(vehicle.pricePerMonth)}€</span>
          </div>
        )}
      </div>
    </div>
  )
}

