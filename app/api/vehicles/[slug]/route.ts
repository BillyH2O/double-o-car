import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { transformVehicleWithTranslation } from '@/lib/utils/vehicleTranslations'
import { defaultLocale } from '@/i18n'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // Récupérer la locale depuis les headers ou utiliser la locale par défaut
    const locale = request.headers.get('x-locale') || defaultLocale
    
    console.log('🔍 Recherche du véhicule avec le slug:', slug, 'locale:', locale)
    
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
        translations: true, // Inclure toutes les traductions
      },
    })
    
    console.log('📦 Véhicule trouvé:', vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Aucun')

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Véhicule non trouvé' },
        { status: 404 }
      )
    }

    // Transformer le véhicule avec la traduction pour la locale demandée
    const vehicleWithTranslation = transformVehicleWithTranslation(vehicle, locale)

    return NextResponse.json(vehicleWithTranslation)
  } catch (error) {
    console.error('Erreur lors de la récupération du véhicule:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération du véhicule' },
      { status: 500 }
    )
  }
}

