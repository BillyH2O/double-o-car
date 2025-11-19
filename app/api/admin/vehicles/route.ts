import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils/slug'

// GET - Récupérer tous les véhicules
export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(vehicles)
  } catch (error) {
    console.error('Erreur lors de la récupération des véhicules:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des véhicules' },
      { status: 500 }
    )
  }
}

// POST - Créer un nouveau véhicule
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
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
    } = body

    // Validation des champs requis
    if (!brand || !model || !year || !pricePerDay || !fuelType || !transmission || !seats || !doors || !image) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      )
    }

    // Générer le slug
    const slug = generateSlug(brand, model, year, transmission, fuelType)

    // Trouver ou créer la marque
    let brandId: string | null = null
    if (brand) {
      const existingBrand = await prisma.brand.findUnique({
        where: { name: brand },
      })
      
      if (existingBrand) {
        brandId = existingBrand.id
      }
    }

    // Vérifier si le slug existe déjà
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { slug },
    })

    if (existingVehicle) {
      // Ajouter un suffixe si le slug existe déjà
      const timestamp = Date.now()
      const uniqueSlug = `${slug}-${timestamp}`
      
      const vehicle = await prisma.vehicle.create({
        data: {
          brand,
          brandId,
          model,
          year: parseInt(year),
          pricePerDay: parseFloat(pricePerDay),
          pricePerWeek: pricePerWeek ? parseFloat(pricePerWeek) : null,
          pricePerMonth: pricePerMonth ? parseFloat(pricePerMonth) : null,
          fuelType: fuelType.toUpperCase(),
          transmission: transmission.toUpperCase(),
          seats: parseInt(seats),
          doors: parseInt(doors),
          image,
          images: images || [],
          bio: bio || null,
          features: features || [],
          isAvailable: isAvailable !== undefined ? isAvailable : true,
          slug: uniqueSlug,
        },
      })

      return NextResponse.json(vehicle, { status: 201 })
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        brand,
        brandId,
        model,
        year: parseInt(year),
        pricePerDay: parseFloat(pricePerDay),
        pricePerWeek: pricePerWeek ? parseFloat(pricePerWeek) : null,
        pricePerMonth: pricePerMonth ? parseFloat(pricePerMonth) : null,
        fuelType: fuelType.toUpperCase(),
        transmission: transmission.toUpperCase(),
        seats: parseInt(seats),
        doors: parseInt(doors),
        image,
        images: images || [],
        bio: bio || null,
        features: features || [],
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        slug,
      },
    })

    return NextResponse.json(vehicle, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création du véhicule:', error)
    return NextResponse.json(
      { error: `Erreur serveur: ${error instanceof Error ? error.message : 'Erreur inconnue'}` },
      { status: 500 }
    )
  }
}

