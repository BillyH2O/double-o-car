"use client"

import { useRouter } from 'next/navigation'
import { Vehicle } from '@/types'

interface UseVehicleNavigationOptions {
  urlStartDate?: string
  urlEndDate?: string
  urlPickupLocation?: string
  urlReturnLocation?: string
}

export function useVehicleNavigation(options: UseVehicleNavigationOptions = {}) {
  const router = useRouter()
  const { urlStartDate, urlEndDate, urlPickupLocation, urlReturnLocation } = options

  const navigateToVehicle = (vehicle: Vehicle) => {
    if (!vehicle?.slug) {
      console.error('❌ Slug non trouvé pour le véhicule:', vehicle)
      return
    }

    // Construire l'URL avec les paramètres de recherche
    const params = new URLSearchParams()
    if (urlStartDate) params.append('startDate', urlStartDate)
    if (urlEndDate) params.append('endDate', urlEndDate)
    if (urlPickupLocation) params.append('pickupLocation', urlPickupLocation)
    if (urlReturnLocation) params.append('returnLocation', urlReturnLocation)
    
    const queryString = params.toString()
    const url = `/vehicules/${vehicle.slug}${queryString ? `?${queryString}` : ''}`
    console.log('🚗 Navigation vers:', url)
    router.push(url)
  }

  return {
    navigateToVehicle,
  }
}





