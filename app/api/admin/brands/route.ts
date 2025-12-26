import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer toutes les marques
export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(brands)
  } catch (error) {
    console.error('Erreur lors de la récupération des marques:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des marques' },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle marque
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, logo } = body as {
      name?: string
      logo?: string
    }

    if (!name || !logo) {
      return NextResponse.json(
        { error: 'name et logo sont requis' },
        { status: 400 }
      )
    }

    // Vérifier si la marque existe déjà
    const existingBrand = await prisma.brand.findUnique({
      where: { name },
    })

    if (existingBrand) {
      return NextResponse.json(
        { error: 'Cette marque existe déjà' },
        { status: 400 }
      )
    }

    const brand = await prisma.brand.create({
      data: {
        name: name.trim(),
        logo: logo.trim(),
      },
    })

    return NextResponse.json(brand, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création de la marque:', error)
    return NextResponse.json(
      { error: `Erreur serveur: ${error instanceof Error ? error.message : 'Erreur inconnue'}` },
      { status: 500 }
    )
  }
}





