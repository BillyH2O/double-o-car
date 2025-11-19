import { useState, useEffect, startTransition } from "react"
import { Vehicle, Car } from "@/types"
import { mapVehicleToCar, mapVehiclesToCars } from "@/lib/utils/vehicleMapper"

export function useVehicleMapping(vehicle: Vehicle | null) {
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (vehicle) {
      // Utiliser startTransition pour éviter l'appel synchrone de setState dans l'effet
      startTransition(() => {
        setLoading(true)
      })
      
      mapVehicleToCar(vehicle).then((mappedCar) => {
        setCar(mappedCar)
        setLoading(false)
      })
    } else {
      // Utiliser startTransition pour éviter l'appel synchrone de setState dans l'effet
      startTransition(() => {
        setCar(null)
      })
    }
  }, [vehicle])

  return { car, loading }
}

export function useVehiclesMapping(vehicles: Vehicle[]) {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (vehicles.length > 0) {
      // Utiliser startTransition pour éviter l'appel synchrone de setState dans l'effet
      startTransition(() => {
        setLoading(true)
      })
      
      mapVehiclesToCars(vehicles).then((mappedCars) => {
        setCars(mappedCars)
        setLoading(false)
      })
    } else {
      // Utiliser startTransition pour éviter l'appel synchrone de setState dans l'effet
      startTransition(() => {
        setCars([])
        setLoading(false)
      })
    }
  }, [vehicles])

  return { cars, loading }
}

