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

    const { startDate, endDate, reason } = body as {
      startDate: string
      endDate: string
      reason?: string
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
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Véhicule non trouvé' },
        { status: 404 }
      )
    }

    const availability = await prisma.vehicleAvailability.create({
      data: {
        vehicleId: id,
        startDate: start,
        endDate: end,
        isAvailable: false,
        reason: reason || 'Indisponibilité',
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

