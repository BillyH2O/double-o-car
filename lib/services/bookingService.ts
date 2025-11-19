import { Booking } from "@/types"

class BookingService {
  async getBookings(): Promise<Booking[]> {
    const response = await fetch('/api/admin/bookings')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des réservations')
    }
    return response.json()
  }
}

export const bookingService = new BookingService()

