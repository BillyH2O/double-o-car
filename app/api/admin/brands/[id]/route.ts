import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer une marque par ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const brand = await prisma.brand.findUnique({
      where: { id },
    })

    if (!brand) {
      return NextResponse.json(
        { error: 'Marque non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json(brand)
  } catch (error) {
    console.error('Erreur lors de la récupération de la marque:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour une marque
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { name, logo } = body as {
      name?: string
      logo?: string
    }

    // Vérifier si la marque existe
    const existingBrand = await prisma.brand.findUnique({
      where: { id },
    })

    if (!existingBrand) {
      return NextResponse.json(
        { error: 'Marque non trouvée' },
        { status: 404 }
      )
    }

    // Si le nom change, vérifier qu'il n'existe pas déjà
    if (name && name !== existingBrand.name) {
      const nameExists = await prisma.brand.findUnique({
        where: { name },
      })

      if (nameExists) {
        return NextResponse.json(
          { error: 'Ce nom de marque existe déjà' },
          { status: 400 }
        )
      }
    }

    const brand = await prisma.brand.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(logo && { logo: logo.trim() }),
      },
    })

    return NextResponse.json(brand)
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la marque:', error)
    return NextResponse.json(
      { error: `Erreur serveur: ${error instanceof Error ? error.message : 'Erreur inconnue'}` },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une marque
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Vérifier si des véhicules utilisent cette marque
    const vehiclesWithBrand = await prisma.vehicle.count({
      where: { brandId: id },
    })

    if (vehiclesWithBrand > 0) {
      return NextResponse.json(
        { error: `Impossible de supprimer cette marque car ${vehiclesWithBrand} véhicule(s) l'utilise(nt)` },
        { status: 400 }
      )
    }

    await prisma.brand.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Marque supprimée avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de la marque:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la suppression' },
      { status: 500 }
    )
  }
}





