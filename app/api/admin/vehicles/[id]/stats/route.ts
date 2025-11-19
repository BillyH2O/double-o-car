import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type StatsPeriod = 
  | 'currentmonth' 
  | 'lastmonth' 
  | '3months' 
  | '6months' 
  | '1year'
  | 'nextmonth'
  | 'next3months'
  | 'next6months'
  | 'next1year'

function getPeriodDates(period: StatsPeriod): { startDate: Date; endDate: Date } {
  const now = new Date()
  
  let startDate: Date
  let endDate: Date
  
  switch (period) {
    case 'currentmonth':
      // Mois en cours : du 1er au dernier jour du mois
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
      break
    case 'lastmonth':
      // Mois précédent : du 1er au dernier jour du mois précédent
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
      break
    case '3months':
      // 3 derniers mois : du 1er jour il y a 3 mois jusqu'à aujourd'hui
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
      break
    case '6months':
      // 6 derniers mois : du 1er jour il y a 6 mois jusqu'à aujourd'hui
      startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
      break
    case '1year':
      // 1 an : du 1er jour il y a 1 an jusqu'à aujourd'hui
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate(), 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
      break
    case 'nextmonth':
      // Mois prochain : du 1er au dernier jour du mois prochain
      startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth() + 2, 0, 23, 59, 59, 999)
      break
    case 'next3months':
      // 3 prochains mois : d'aujourd'hui jusqu'au dernier jour dans 3 mois
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth() + 3, 0, 23, 59, 59, 999)
      break
    case 'next6months':
      // 6 prochains mois : d'aujourd'hui jusqu'au dernier jour dans 6 mois
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth() + 6, 0, 23, 59, 59, 999)
      break
    case 'next1year':
      // 1 prochaine année : d'aujourd'hui jusqu'à dans 1 an
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
      endDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate(), 23, 59, 59, 999)
      break
    default:
      // Par défaut : mois en cours
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
  }
  
  return { startDate, endDate }
}

function calculateDaysBetween(start: Date, end: Date): number {
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}

// GET - Récupérer les statistiques d'un véhicule pour une période donnée
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const period = (searchParams.get('period') || 'currentmonth') as StatsPeriod
    const year = searchParams.get('year')
    const month = searchParams.get('month') // Optionnel : pour compatibilité avec le calendrier mensuel

    let startDate: Date
    let endDate: Date
    let totalDays: number

    // Si year et month sont fournis, utiliser le mode mensuel (pour le calendrier)
    if (year && month !== null) {
      const yearNum = parseInt(year, 10)
      const monthNum = parseInt(month, 10)
      startDate = new Date(yearNum, monthNum, 1, 0, 0, 0, 0)
      endDate = new Date(yearNum, monthNum + 1, 0, 23, 59, 59, 999)
      totalDays = endDate.getDate() // Nombre de jours dans le mois
    } else {
      // Sinon, utiliser la période spécifiée
      const periodDates = getPeriodDates(period)
      startDate = periodDates.startDate
      endDate = periodDates.endDate
      
      // Pour les mois calendaires, utiliser le nombre de jours dans le mois
      if (period === 'currentmonth' || period === 'lastmonth' || period === 'nextmonth') {
        totalDays = endDate.getDate() // Le dernier jour du mois = nombre de jours dans le mois
      } else {
        // Pour les autres périodes, calculer le nombre de jours entre les dates
        totalDays = calculateDaysBetween(startDate, endDate)
      }
    }

    // Récupérer toutes les réservations confirmées qui chevauchent la période
    const bookings = await prisma.booking.findMany({
      where: {
        vehicleId: id,
        status: {
          in: ['CONFIRMED', 'ACTIVE'],
        },
        AND: [
          {
            startDate: {
              lte: endDate,
            },
          },
          {
            endDate: {
              gte: startDate,
            },
          },
        ],
      },
    })

    // Récupérer toutes les périodes d'indisponibilité qui chevauchent la période
    const unavailabilityPeriods = await prisma.vehicleAvailability.findMany({
      where: {
        vehicleId: id,
        isAvailable: false,
        AND: [
          {
            startDate: {
              lte: endDate,
            },
          },
          {
            endDate: {
              gte: startDate,
            },
          },
        ],
      },
    })

    // Calculer les jours réservés dans la période
    const bookedDaysSet = new Set<string>()
    
    bookings.forEach((booking: { startDate: Date | string; endDate: Date | string }) => {
      const bookingStart = new Date(booking.startDate)
      const bookingEnd = new Date(booking.endDate)
      
      // Ajuster les dates pour ne considérer que la période en question
      const effectiveStart = bookingStart < startDate ? startDate : bookingStart
      const effectiveEnd = bookingEnd > endDate ? endDate : bookingEnd
      
      // Ajouter chaque jour de la réservation (utiliser une clé unique par jour)
      const currentDate = new Date(effectiveStart)
      while (currentDate <= effectiveEnd) {
        const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
        bookedDaysSet.add(dayKey)
        currentDate.setDate(currentDate.getDate() + 1)
      }
    })

    // Ajouter les jours d'indisponibilité
    unavailabilityPeriods.forEach((period: { startDate: Date | string; endDate: Date | string }) => {
      const periodStart = new Date(period.startDate)
      const periodEnd = new Date(period.endDate)
      
      const effectiveStart = periodStart < startDate ? startDate : periodStart
      const effectiveEnd = periodEnd > endDate ? endDate : periodEnd
      
      const currentDate = new Date(effectiveStart)
      while (currentDate <= effectiveEnd) {
        const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
        bookedDaysSet.add(dayKey)
        currentDate.setDate(currentDate.getDate() + 1)
      }
    })

    const bookedDaysCount = bookedDaysSet.size
    const availableDaysCount = totalDays - bookedDaysCount
    const fillRate = totalDays > 0 ? (bookedDaysCount / totalDays) * 100 : 0

    // Calculer le chiffre d'affaires pour la période
    // On prend les réservations CONFIRMED qui chevauchent la période
    let revenue = 0
    
    type BookingWithDecimal = {
      startDate: Date
      endDate: Date
      totalPrice: { toString: () => string } | number | string
      status: string
    }
    
    bookings
      .filter((booking: BookingWithDecimal) => booking.status === 'CONFIRMED')
      .forEach((booking: BookingWithDecimal) => {
        const bookingStart = new Date(booking.startDate)
        const bookingEnd = new Date(booking.endDate)
        
        // Si la réservation chevauche la période, calculer la part du CA pour cette période
        if (bookingStart <= endDate && bookingEnd >= startDate) {
          // Calculer le nombre de jours dans la période pour cette réservation
          const effectiveStart = bookingStart < startDate ? startDate : bookingStart
          const effectiveEnd = bookingEnd > endDate ? endDate : bookingEnd
          
          const daysInPeriod = Math.ceil(
            (effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60 * 60 * 24)
          ) + 1
          
          const totalBookingDays = Math.ceil(
            (bookingEnd.getTime() - bookingStart.getTime()) / (1000 * 60 * 60 * 24)
          ) + 1
          
          // Calculer la part proportionnelle du CA
          // totalPrice est de type Decimal de Prisma, on le convertit en nombre
          const bookingRevenue = Number(booking.totalPrice)
          const proportionalRevenue = totalBookingDays > 0 ? (daysInPeriod / totalBookingDays) * bookingRevenue : 0
          
          revenue += proportionalRevenue
        }
      })

    return NextResponse.json({
      period: year && month !== null ? undefined : period,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalDays,
      bookedDays: bookedDaysCount,
      availableDays: availableDaysCount,
      fillRate: Math.round(fillRate * 100) / 100, // Arrondir à 2 décimales
      revenue: Math.round(revenue * 100) / 100, // Arrondir à 2 décimales
      ...(year && month !== null ? { year: parseInt(year, 10), month: parseInt(month, 10) } : {}),
    })
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors du calcul des statistiques' },
      { status: 500 }
    )
  }
}

