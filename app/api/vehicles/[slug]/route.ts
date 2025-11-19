import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    console.log('🔍 Recherche du véhicule avec le slug:', slug)
    
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        slug: slug,
      },
      include: {
        brandRelation: {
          select: {
            logo: true,
          },
        },
      },
    })
    
    console.log('📦 Véhicule trouvé:', vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Aucun')

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Véhicule non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Erreur lors de la récupération du véhicule:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération du véhicule' },
      { status: 500 }
    )
  }
}

