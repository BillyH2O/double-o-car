import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing startDate or endDate', available: false },
        { status: 400 }
      )
    }

    // Récupérer le véhicule avec ses relations
    const vehicle = await prisma.vehicle.findUnique({
      where: { slug },
      include: {
        bookings: {
          where: {
            status: {
              in: ['CONFIRMED', 'ACTIVE', 'COMPLETED'], // Exclure PENDING et CANCELLED
            },
          },
        },
        availability: {
          where: {
            isAvailable: false,
          },
        },
      },
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found', available: false },
        { status: 404 }
      )
    }

    // Vérifier la disponibilité générale
    if (!vehicle.isAvailable) {
      return NextResponse.json({
        available: false,
        reason: 'Véhicule actuellement indisponible',
      })
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

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
      return NextResponse.json({
        available: false,
        reason: 'Véhicule déjà réservé pour cette période',
      })
    }

    // Vérifier les périodes d'indisponibilité
    const hasUnavailability = vehicle.availability.some((period: { startDate: Date | string; endDate: Date | string; reason?: string | null }) => {
      const periodStart = new Date(period.startDate)
      const periodEnd = new Date(period.endDate)

      return (
        (periodStart <= start && periodEnd >= start) ||
        (periodStart >= start && periodStart <= end) ||
        (periodStart <= start && periodEnd >= end)
      )
    })

    if (hasUnavailability) {
      const unavailablePeriod = vehicle.availability.find((period: { startDate: Date | string; endDate: Date | string; reason?: string | null }) => {
        const periodStart = new Date(period.startDate)
        const periodEnd = new Date(period.endDate)
        return (
          (periodStart <= start && periodEnd >= start) ||
          (periodStart >= start && periodStart <= end) ||
          (periodStart <= start && periodEnd >= end)
        )
      })
      
      return NextResponse.json({
        available: false,
        reason: unavailablePeriod?.reason || 'Véhicule indisponible pour cette période',
      })
    }

    return NextResponse.json({
      available: true,
    })
  } catch (error) {
    console.error('Erreur lors de la vérification de disponibilité:', error)
    return NextResponse.json(
      { error: 'Erreur serveur', available: false },
      { status: 500 }
    )
  }
}

