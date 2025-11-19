"use client"

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function useVehicleFilters() {
  const searchParams = useSearchParams()
  
  // Récupérer les paramètres de l'URL
  const urlStartDate = searchParams?.get('startDate') || undefined
  const urlEndDate = searchParams?.get('endDate') || undefined
  const urlPickupLocation = searchParams?.get('pickupLocation') || undefined
  const urlReturnLocation = searchParams?.get('returnLocation') || undefined

  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    transmission: '',
  })

  return {
    filters,
    setFilters,
    urlStartDate,
    urlEndDate,
    urlPickupLocation,
    urlReturnLocation,
  }
}

