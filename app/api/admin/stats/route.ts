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
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
      break
    case 'lastmonth':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
      break
    case '3months':
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
      break
    case '6months':
      startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
      break
    case '1year':
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate(), 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
      break
    case 'nextmonth':
      startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth() + 2, 0, 23, 59, 59, 999)
      break
    case 'next3months':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth() + 3, 0, 23, 59, 59, 999)
      break
    case 'next6months':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth() + 6, 0, 23, 59, 59, 999)
      break
    case 'next1year':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
      endDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate(), 23, 59, 59, 999)
      break
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
  }
  
  return { startDate, endDate }
}

function calculateDaysBetween(start: Date, end: Date): number {
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = (searchParams.get('period') || 'currentmonth') as StatsPeriod

    const { startDate, endDate } = getPeriodDates(period)
    const totalDays = calculateDaysBetween(startDate, endDate)

    // Récupérer tous les véhicules disponibles avec leurs prix
    const vehicles = await prisma.vehicle.findMany({
      where: {
        isAvailable: true,
      },
      select: {
        id: true,
        pricePerDay: true,
      },
    })

    if (vehicles.length === 0) {
      return NextResponse.json({
        period,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        totalDays: 0,
        totalVehicles: 0,
        bookedDays: 0,
        availableDays: 0,
        fillRate: 0,
        revenue: 0,
      })
    }

    // Calculer le nombre total de jours-véhicules (nombre de véhicules × nombre de jours)
    const totalVehicleDays = vehicles.length * totalDays

    // Récupérer toutes les réservations confirmées et actives qui chevauchent la période
    const bookings = await prisma.booking.findMany({
      where: {
        status: {
          in: ['CONFIRMED', 'ACTIVE'],
        },
        OR: [
          {
            startDate: { lte: endDate },
            endDate: { gte: startDate },
          },
        ],
      },
      include: {
        vehicle: true,
      },
    })

    // Récupérer toutes les périodes d'indisponibilité qui chevauchent la période
    const allUnavailabilityPeriods = await prisma.vehicleAvailability.findMany({
      where: {
        isAvailable: false,
        OR: [
          {
            startDate: { lte: endDate },
            endDate: { gte: startDate },
          },
        ],
      },
      include: {
        vehicle: true,
      },
    })

    // Filtrer pour ne garder que les réservations présentielle (isFormalBooking=true)
    const formalBookingPeriods = allUnavailabilityPeriods.filter((p): p is typeof p & { isFormalBooking: true } => 
      'isFormalBooking' in p && p.isFormalBooking === true
    )

    // Calculer les jours réservés et le revenu pour chaque véhicule
    let totalBookedDays = 0
    let totalRevenue = 0

    // Utiliser un Set pour éviter de compter deux fois la même réservation
    const processedBookings = new Set<string>()

    vehicles.forEach((vehicle) => {
      const vehicleBookings = bookings.filter((b) => b.vehicleId === vehicle.id)

      vehicleBookings.forEach((booking) => {
        // Éviter de traiter la même réservation plusieurs fois
        const bookingId = booking.id
        if (processedBookings.has(bookingId)) {
          return
        }
        processedBookings.add(bookingId)

        const bookingStart = new Date(booking.startDate)
        const bookingEnd = new Date(booking.endDate)

        // Calculer la période effective de la réservation dans la période demandée
        const effectiveStart = bookingStart < startDate ? startDate : bookingStart
        const effectiveEnd = bookingEnd > endDate ? endDate : bookingEnd

        if (effectiveStart <= effectiveEnd) {
          const daysInPeriod = calculateDaysBetween(effectiveStart, effectiveEnd)
          totalBookedDays += daysInPeriod

          // Calculer la part proportionnelle du revenu
          const totalBookingDays = calculateDaysBetween(bookingStart, bookingEnd)
          if (totalBookingDays > 0) {
            const bookingRevenue = Number(booking.totalPrice)
            const proportionalRevenue = (daysInPeriod / totalBookingDays) * bookingRevenue
            totalRevenue += proportionalRevenue
          }
        }
      })

      // Ajouter les jours et le revenu des réservations présentielle pour ce véhicule
      const vehicleFormalBookings = formalBookingPeriods.filter((p) => p.vehicleId === vehicle.id)
      const vehiclePricePerDay = Number(vehicle.pricePerDay)
      
      vehicleFormalBookings.forEach((period) => {
        const periodStart = new Date(period.startDate)
        const periodEnd = new Date(period.endDate)

        const effectiveStart = periodStart < startDate ? startDate : periodStart
        const effectiveEnd = periodEnd > endDate ? endDate : periodEnd

        if (effectiveStart <= effectiveEnd) {
          const daysInPeriod = calculateDaysBetween(effectiveStart, effectiveEnd)
          totalBookedDays += daysInPeriod
          // Calculer le revenu : prix par jour × nombre de jours dans la période
          totalRevenue += vehiclePricePerDay * daysInPeriod
        }
      })
    })

    const totalAvailableDays = totalVehicleDays - totalBookedDays
    const fillRate = totalVehicleDays > 0 ? (totalBookedDays / totalVehicleDays) * 100 : 0

    return NextResponse.json({
      period,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalDays,
      totalVehicles: vehicles.length,
      totalVehicleDays,
      bookedDays: totalBookedDays,
      availableDays: totalAvailableDays,
      fillRate: Math.round(fillRate * 100) / 100,
      revenue: Math.round(totalRevenue * 100) / 100,
    })
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques globales:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors du calcul des statistiques globales' },
      { status: 500 }
    )
  }
}

