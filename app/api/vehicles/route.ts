import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
// Note: We avoid importing Prisma types here to keep the route lightweight

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const isAvailable = searchParams.get('isAvailable')
    const brand = searchParams.get('brand')
    const fuelType = searchParams.get('fuelType')
    const transmission = searchParams.get('transmission')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Construire les filtres (nous mapperons les valeurs correctement)
    // Types d'enums Prisma pour fuelType et transmission
    type FuelTypeEnum = 'ESSENCE' | 'DIESEL' | 'ELECTRIC' | 'HYBRID' | 'HYBRID_PLUGIN'
    type TransmissionEnum = 'MANUAL' | 'AUTOMATIC'
    
    type VehicleWhereFilter = {
      isAvailable?: boolean
      brand?: string
      fuelType?: FuelTypeEnum
      transmission?: TransmissionEnum
    }
    
    const where: VehicleWhereFilter = {}

    if (isAvailable !== null) {
      where.isAvailable = isAvailable === 'true'
    }

    if (brand) {
      where.brand = brand
    }

    if (fuelType) {
      // Valider et convertir en enum FuelType
      const upperFuelType = fuelType.toUpperCase() as FuelTypeEnum
      if (['ESSENCE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'HYBRID_PLUGIN'].includes(upperFuelType)) {
        where.fuelType = upperFuelType
      }
    }

    if (transmission) {
      // Valider et convertir en enum Transmission
      const upperTransmission = transmission.toUpperCase() as TransmissionEnum
      if (['MANUAL', 'AUTOMATIC'].includes(upperTransmission)) {
        where.transmission = upperTransmission
      }
    }

          let vehicles = await prisma.vehicle.findMany({
            where: where as unknown as {
              isAvailable?: boolean
              brand?: string
              fuelType?: FuelTypeEnum
              transmission?: TransmissionEnum
            },
            include: {
              brandRelation: {
                select: {
                  logo: true,
                },
              },
              bookings: {
                where: {
                  status: {
                    in: ['PENDING', 'CONFIRMED', 'ACTIVE'],
                  },
                },
              },
              availability: {
                where: {
                  isAvailable: false,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          })

    // Filtrer par disponibilité sur la période si des dates sont fournies
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      type VehicleWithRelations = {
        isAvailable: boolean
        bookings: Array<{ startDate: Date | string; endDate: Date | string }>
        availability: Array<{ startDate: Date | string; endDate: Date | string; isAvailable: boolean }>
      }

      vehicles = vehicles.filter((vehicle: VehicleWithRelations) => {
        // Vérifier si le véhicule est généralement disponible
        if (!vehicle.isAvailable) {
          return false
        }

        // Vérifier les réservations qui chevauchent la période
        const hasConflictingBooking = vehicle.bookings.some((booking: { startDate: Date | string; endDate: Date | string }) => {
          const bookingStart = new Date(booking.startDate)
          const bookingEnd = new Date(booking.endDate)

          return (
            (bookingStart <= start && bookingEnd >= start) ||
            (bookingStart >= start && bookingStart <= end) ||
            (bookingStart <= start && bookingEnd >= end)
          )
        })

        if (hasConflictingBooking) {
          return false
        }

        // Vérifier les périodes d'indisponibilité
        const hasUnavailability = vehicle.availability.some((period: { startDate: Date | string; endDate: Date | string }) => {
          const periodStart = new Date(period.startDate)
          const periodEnd = new Date(period.endDate)

          return (
            (periodStart <= start && periodEnd >= start) ||
            (periodStart >= start && periodStart <= end) ||
            (periodStart <= start && periodEnd >= end)
          )
        })

        if (hasUnavailability) {
          return false
        }

        return true
      })
    }

    // Retirer les relations pour la réponse (on ne veut que les données du véhicule)
    const vehiclesResponse = vehicles.map((vehicle: { [key: string]: unknown }) => {
      const { ...vehicleData } = vehicle
      return vehicleData
    })

    return NextResponse.json(vehiclesResponse)
  } catch (error) {
    console.error('Erreur lors de la récupération des véhicules:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erreur serveur inconnue'
    return NextResponse.json(
      { error: `Erreur serveur lors de la récupération des véhicules: ${errorMessage}` },
      { status: 500 }
    )
  }
}

