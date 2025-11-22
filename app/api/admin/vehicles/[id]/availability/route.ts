import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer toutes les périodes d'indisponibilité et réservations d'un véhicule
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        bookings: {
          where: {
            status: {
              in: ['PENDING', 'CONFIRMED', 'ACTIVE'],
            },
          },
        },
        availability: true,
      },
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Véhicule non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      bookings: vehicle.bookings,
      availability: vehicle.availability,
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des périodes:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// POST - Créer une période d'indisponibilité
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { startDate, endDate, reason, isFormalBooking } = body as {
      startDate: string
      endDate: string
      reason?: string
      isFormalBooking?: boolean
    }

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate et endDate sont requis' },
        { status: 400 }
      )
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start >= end) {
      return NextResponse.json(
        { error: 'La date de début doit être antérieure à la date de fin' },
        { status: 400 }
      )
    }

    // Vérifier que le véhicule existe
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
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
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Véhicule non trouvé' },
        { status: 404 }
      )
    }

    // Fonction pour vérifier si deux périodes se chevauchent
    const periodsOverlap = (
      start1: Date,
      end1: Date,
      start2: Date,
      end2: Date
    ): boolean => {
      return start1 <= end2 && end1 >= start2
    }

    // Vérifier les chevauchements avec les réservations existantes
    const hasConflictingBooking = vehicle.bookings.some((booking) => {
      const bookingStart = new Date(booking.startDate)
      const bookingEnd = new Date(booking.endDate)
      return periodsOverlap(start, end, bookingStart, bookingEnd)
    })

    if (hasConflictingBooking) {
      return NextResponse.json(
        { error: 'Cette période chevauche une réservation existante' },
        { status: 400 }
      )
    }

    // Vérifier les chevauchements avec les périodes d'indisponibilité existantes
    const hasConflictingAvailability = vehicle.availability.some((period) => {
      const periodStart = new Date(period.startDate)
      const periodEnd = new Date(period.endDate)
      return periodsOverlap(start, end, periodStart, periodEnd)
    })

    if (hasConflictingAvailability) {
      return NextResponse.json(
        { error: 'Cette période chevauche une autre période d\'indisponibilité existante' },
        { status: 400 }
      )
    }

    const availability = await prisma.vehicleAvailability.create({
      data: {
        vehicleId: id,
        startDate: start,
        endDate: end,
        isAvailable: false,
        reason: reason || (isFormalBooking ? 'Réservation présentielle' : 'Indisponibilité'),
        isFormalBooking: isFormalBooking ?? false,
      },
    })

    return NextResponse.json(availability, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création de la période:', error)
    return NextResponse.json(
      { error: `Erreur serveur: ${error instanceof Error ? error.message : 'Erreur inconnue'}` },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une période d'indisponibilité
export async function DELETE(
  request: NextRequest,
) {
  try {
    const { searchParams } = new URL(request.url)
    const availabilityId = searchParams.get('availabilityId')

    if (!availabilityId) {
      return NextResponse.json(
        { error: 'availabilityId est requis' },
        { status: 400 }
      )
    }

    await prisma.vehicleAvailability.delete({
      where: { id: availabilityId },
    })

    return NextResponse.json({ message: 'Période supprimée avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de la période:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la suppression' },
      { status: 500 }
    )
  }
}

