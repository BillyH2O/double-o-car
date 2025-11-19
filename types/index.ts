// Enums
export enum FuelType {
  ESSENCE = 'ESSENCE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  HYBRID_PLUGIN = 'HYBRID_PLUGIN',
}

export enum Transmission {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
}

// Types de base de données (basés sur Prisma)
export interface Vehicle {
  id: string
  slug: string
  brand: string
  model: string
  year: number
  pricePerDay: number | string // Decimal de Prisma peut être string ou number
  pricePerWeek: number | string | null
  pricePerMonth: number | string | null
  fuelType: FuelType | string
  transmission: Transmission | string
  seats: number
  doors: number
  image: string
  images: string[]
  bio: string | null
  features: string[]
  isAvailable: boolean
  createdAt: Date | string
  updatedAt: Date | string
}

export interface Review {
  id: number
  name: string
  comment: string
}

// Types pour l'interface utilisateur
export interface Car {
  id: number
  brand: string
  model: string
  year: number
  transmission: 'Automatique' | 'Manuelle'
  fuel: 'Essence' | 'Diesel'
  pricePerDay: number
  image: string
  logo: string
}

export interface BookingFormData {
  pickupLocation: string
  returnLocation: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  sameLocation: boolean
}

// Types pour les hooks
export interface UseVehiclesOptions {
  isAvailable?: boolean
  brand?: string
  fuelType?: string
  transmission?: string
  startDate?: string
  endDate?: string
}

export interface UseVehiclesReturn {
  vehicles: Vehicle[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// Types pour les réservations
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Booking {
  id: string
  vehicle: {
    brand: string
    model: string
  }
  startDate: string
  endDate: string
  totalPrice: number | string
  status: BookingStatus | string
  guestEmail?: string
  guestFirstName?: string
  guestLastName?: string
  guestPhone?: string
  pickupLocation?: string
  dropoffLocation?: string
}

export interface UseBookingsReturn {
  bookings: Booking[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}
