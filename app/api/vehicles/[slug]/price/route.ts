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
        { error: 'Missing startDate or endDate' },
        { status: 400 }
      )
    }

    // Récupérer le véhicule
    const vehicle = await prisma.vehicle.findUnique({
      where: { slug },
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      )
    }

    // Calculer le nombre de jours
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    
    if (days <= 0) {
      return NextResponse.json(
        { error: 'Invalid date range' },
        { status: 400 }
      )
    }

    // Calculer le prix total
    const pricePerDay = Number(vehicle.pricePerDay)
    const totalPrice = pricePerDay * days

    return NextResponse.json({
      pricePerDay,
      totalPrice,
      days,
    })
  } catch (error) {
    console.error('Erreur lors du calcul du prix:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors du calcul du prix' },
      { status: 500 }
    )
  }
}

