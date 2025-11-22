import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils/slug'

// GET - Récupérer un véhicule par ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    })

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
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour un véhicule
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const {
      brand,
      model,
      year,
      pricePerDay,
      pricePerWeek,
      pricePerMonth,
      fuelType,
      transmission,
      seats,
      doors,
      image,
      images,
      bio,
      features,
      isAvailable,
      translations,
    } = body

    // Vérifier que le véhicule existe
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    })

    if (!existingVehicle) {
      return NextResponse.json(
        { error: 'Véhicule non trouvé' },
        { status: 404 }
      )
    }

    // Trouver ou créer la marque si elle a changé
    let brandId: string | null = null
    const finalBrand = brand || existingVehicle.brand
    if (finalBrand) {
      const existingBrand = await prisma.brand.findUnique({
        where: { name: finalBrand },
      })
      
      if (existingBrand) {
        brandId = existingBrand.id
      }
    }

    // Générer un nouveau slug si les informations ont changé
    const slug = generateSlug(
      finalBrand,
      model || existingVehicle.model,
      year || existingVehicle.year,
      transmission || existingVehicle.transmission,
      fuelType || existingVehicle.fuelType
    )

    // Vérifier si le slug existe déjà (sauf pour le véhicule actuel)
    const slugExists = await prisma.vehicle.findFirst({
      where: {
        slug,
        id: { not: id },
      },
    })

    let finalSlug = slug
    if (slugExists) {
      const timestamp = Date.now()
      finalSlug = `${slug}-${timestamp}`
    }

    await prisma.vehicle.update({
      where: { id },
      data: {
        ...(brand && { brand }),
        ...(brandId !== null && { brandId }),
        ...(model && { model }),
        ...(year && { year: parseInt(year) }),
        ...(pricePerDay !== undefined && { pricePerDay: parseFloat(pricePerDay) }),
        ...(pricePerWeek !== undefined && { pricePerWeek: pricePerWeek ? parseFloat(pricePerWeek) : null }),
        ...(pricePerMonth !== undefined && { pricePerMonth: pricePerMonth ? parseFloat(pricePerMonth) : null }),
        ...(fuelType && { fuelType: fuelType.toUpperCase() }),
        ...(transmission && { transmission: transmission.toUpperCase() }),
        ...(seats && { seats: parseInt(seats) }),
        ...(doors && { doors: parseInt(doors) }),
        ...(image && { image }),
        ...(images !== undefined && { images }),
        ...(bio !== undefined && { bio }),
        ...(features !== undefined && { features }),
        ...(isAvailable !== undefined && { isAvailable }),
        slug: finalSlug,
      },
    })

    // Gérer les traductions
    if (translations && Array.isArray(translations)) {
      for (const translation of translations) {
        if (translation.locale && (translation.bio || translation.features)) {
          await prisma.vehicleTranslation.upsert({
            where: {
              vehicleId_locale: {
                vehicleId: id,
                locale: translation.locale,
              },
            },
            update: {
              bio: translation.bio || null,
              features: translation.features || [],
            },
            create: {
              vehicleId: id,
              locale: translation.locale,
              bio: translation.bio || null,
              features: translation.features || [],
            },
          })
        }
      }
    }

    // Récupérer le véhicule avec ses traductions
    const vehicleWithTranslations = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    })

    return NextResponse.json(vehicleWithTranslations)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du véhicule:', error)
    return NextResponse.json(
      { error: `Erreur serveur: ${error instanceof Error ? error.message : 'Erreur inconnue'}` },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un véhicule
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Véhicule non trouvé' },
        { status: 404 }
      )
    }

    await prisma.vehicle.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Véhicule supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du véhicule:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la suppression' },
      { status: 500 }
    )
  }
}

