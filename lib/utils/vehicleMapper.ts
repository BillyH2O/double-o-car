import { Vehicle, Car } from '@/types'

/**
 * Génère un ID numérique unique à partir d'une string
 */
function generateNumericId(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

/**
 * Mappe un véhicule de la base de données vers le format Car utilisé dans l'interface
 */
export async function mapVehicleToCar(vehicle: Vehicle & { brandRelation?: { logo: string } | null }): Promise<Car> {
  // Mapping du type de carburant
  const fuelMap: Record<string, 'Essence' | 'Diesel'> = {
    ESSENCE: 'Essence',
    DIESEL: 'Diesel',
    ELECTRIC: 'Essence', // Fallback
    HYBRID: 'Essence', // Fallback
    HYBRID_PLUGIN: 'Essence', // Fallback
  }

  // Mapping de la transmission
  const transmissionMap: Record<string, 'Automatique' | 'Manuelle'> = {
    AUTOMATIC: 'Automatique',
    MANUAL: 'Manuelle',
  }

  // Récupérer le logo depuis la relation Brand si disponible, sinon utiliser le mapping par défaut
  let logo = '/logo.png'
  if (vehicle.brandRelation?.logo) {
    logo = vehicle.brandRelation.logo
  } else {
    // Fallback vers le mapping hardcodé pour compatibilité
    const brandLogos: Record<string, string> = {
      Renault: '/renault.svg',
      Dacia: '/dacia.svg',
      Peugeot: '/peugeot.svg',
      Hyundai: '/hyundai.svg',
    }
    logo = brandLogos[vehicle.brand] || '/logo.png'
  }

  return {
    id: generateNumericId(vehicle.id),
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    transmission: transmissionMap[vehicle.transmission] || 'Manuelle',
    fuel: fuelMap[vehicle.fuelType] || 'Essence',
    pricePerDay: Number(vehicle.pricePerDay),
    image: vehicle.image,
    logo: logo,
  }
}

export async function mapVehiclesToCars(vehicles: (Vehicle & { brandRelation?: { logo: string } | null })[]): Promise<Car[]> {
  return Promise.all(vehicles.map(mapVehicleToCar))
}

// Version synchrone pour compatibilité (utilise le fallback des logos hardcodés)
export function mapVehiclesToCarsSync(vehicles: Vehicle[]): Car[] {
  const brandLogos: Record<string, string> = {
    Renault: '/renault.svg',
    Dacia: '/dacia.svg',
    Peugeot: '/peugeot.svg',
    Hyundai: '/hyundai.svg',
  }

  const fuelMap: Record<string, 'Essence' | 'Diesel'> = {
    ESSENCE: 'Essence',
    DIESEL: 'Diesel',
    ELECTRIC: 'Essence',
    HYBRID: 'Essence',
    HYBRID_PLUGIN: 'Essence',
  }

  const transmissionMap: Record<string, 'Automatique' | 'Manuelle'> = {
    AUTOMATIC: 'Automatique',
    MANUAL: 'Manuelle',
  }

  return vehicles.map((vehicle) => ({
    id: generateNumericId(vehicle.id),
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    transmission: transmissionMap[vehicle.transmission] || 'Manuelle',
    fuel: fuelMap[vehicle.fuelType] || 'Essence',
    pricePerDay: Number(vehicle.pricePerDay),
    image: vehicle.image,
    logo: brandLogos[vehicle.brand] || '/logo.png',
  }))
}

