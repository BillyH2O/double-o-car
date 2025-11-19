import { PrismaClient } from '@prisma/client'
import { generateSlug } from '../lib/utils/slug'
import { FuelType, Transmission } from '@prisma/client/wasm'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seed...')

  // Nettoyer les données existantes (optionnel - commentez si vous voulez garder les données)
  console.log('🧹 Nettoyage des données existantes...')
  await prisma.booking.deleteMany()
  await prisma.vehicleAvailability.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.article.deleteMany()
  await prisma.user.deleteMany()
  console.log('✅ Données nettoyées')

  // Créer un admin par défaut
  // Note: En production, utilisez bcrypt pour hasher le mot de passe
  const admin = await prisma.user.create({
    data: {
      email: 'admin@doubleocar.com',
      password: 'admin123', // ⚠️ À remplacer par un hash bcrypt en production
      firstName: 'Admin',
      lastName: 'Double O Car',
      phone: '+33123456789',
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin créé:', admin.email)

  // Créer les véhicules depuis vos données
  const vehiclesData = [
    {
      brand: 'DC',
      model: 'BatMobile',
      year: 2024,
      pricePerDay: 35,
      pricePerWeek: 210, // ~6 jours
      pricePerMonth: 840, // ~24 jours
      fuelType: 'ESSENCE',
      transmission: 'AUTOMATIC',
      seats: 5,
      doors: 5,
      image: '/renault-1.png',
      images: ['/renault-1.png'],
      bio: 'Renault Clio V 2024 - Voiture compacte idéale pour la ville. Confortable et économique. Parfaite pour vos déplacements quotidiens.',
      features: ['GPS', 'Climatisation', 'Bluetooth', 'Caméra de recul', 'Régulateur de vitesse'],
      isAvailable: true,
    },
    {
      brand: 'Renault',
      model: 'Clio V',
      year: 2024,
      pricePerDay: 30,
      pricePerWeek: 180,
      pricePerMonth: 720,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      seats: 5,
      doors: 5,
      image: '/renault-2.jpg',
      images: ['/renault-2.jpg'],
      bio: 'Renault Clio V 2024 - Version diesel manuelle. Économique et performante. Idéale pour les longs trajets.',
      features: ['GPS', 'Climatisation', 'Bluetooth', 'Régulateur de vitesse'],
      isAvailable: true,
    },
    {
      brand: 'Dacia',
      model: 'Logan',
      year: 2024,
      pricePerDay: 35,
      pricePerWeek: 210,
      pricePerMonth: 840,
      fuelType: 'ESSENCE',
      transmission: 'AUTOMATIC',
      seats: 5,
      doors: 4,
      image: '/dacia-1.png',
      images: ['/dacia-1.png'],
      bio: 'Dacia Logan 2024 - Berline spacieuse et confortable. Parfaite pour les longs trajets et les familles.',
      features: ['GPS', 'Climatisation', 'Bluetooth', 'Caméra de recul', 'Régulateur de vitesse', 'Limiteur de vitesse'],
      isAvailable: true,
    },
    {
      brand: 'Dacia',
      model: 'Logan',
      year: 2024,
      pricePerDay: 30,
      pricePerWeek: 180,
      pricePerMonth: 720,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      seats: 5,
      doors: 4,
      image: '/dacia-2.jpg',
      images: ['/dacia-2.jpg'],
      bio: 'Dacia Logan 2024 - Version diesel manuelle. Idéale pour un usage quotidien et économique.',
      features: ['GPS', 'Climatisation', 'Bluetooth', 'Régulateur de vitesse'],
      isAvailable: true,
    },
  ]

  let batMobileId: string | null = null

  for (const vehicleData of vehiclesData) {
    // Générer le slug pour chaque véhicule
    const slug = generateSlug(
      vehicleData.brand,
      vehicleData.model,
      vehicleData.year,
      vehicleData.transmission,
      vehicleData.fuelType
    )
    
    const vehicle = await prisma.vehicle.create({
      data: {
        ...vehicleData,
        // Prisma attend des enums pour fuelType et transmission
        fuelType: vehicleData.fuelType.toString().toUpperCase() as FuelType,
        transmission: vehicleData.transmission.toString().toUpperCase() as Transmission,
        slug,
      },
    })
    console.log(`✅ Véhicule créé: ${vehicle.brand} ${vehicle.model} (${vehicle.fuelType}, ${vehicle.transmission}) - Slug: ${slug}`)
    
    // Sauvegarder l'ID de la BatMobile pour ajouter une période d'indisponibilité
    if (vehicleData.brand === 'DC' && vehicleData.model === 'BatMobile') {
      batMobileId = vehicle.id
    }
  }

  // Ajouter une période d'indisponibilité pour la BatMobile (tout le mois de mars)
  if (batMobileId) {
    const currentYear = new Date().getFullYear()
    const marchStart = new Date(`${currentYear}-03-01T00:00:00Z`)
    const marchEnd = new Date(`${currentYear}-03-31T23:59:59Z`)
    
    await prisma.vehicleAvailability.create({
      data: {
        vehicleId: batMobileId,
        startDate: marchStart,
        endDate: marchEnd,
        isAvailable: false,
        reason: 'Maintenance - Indisponible tout le mois de mars',
      },
    })
    console.log(`✅ Période d'indisponibilité ajoutée pour BatMobile: ${marchStart.toLocaleDateString('fr-FR')} - ${marchEnd.toLocaleDateString('fr-FR')}`)
  }

  console.log('🎉 Seed terminé avec succès!')
  console.log(`📊 ${vehiclesData.length} véhicules créés`)
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

