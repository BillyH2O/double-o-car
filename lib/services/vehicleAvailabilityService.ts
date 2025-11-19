interface Booking {
  id: string
  startDate: string | Date
  endDate: string | Date
  status: string
}

interface Availability {
  id: string
  startDate: string | Date
  endDate: string | Date
  reason: string | null
  isAvailable: boolean
}

interface VehicleAvailabilityResponse {
  bookings: Booking[]
  availability: Availability[]
}

interface CreateAvailabilityPayload {
  startDate: string
  endDate: string
  reason?: string
}

interface CheckAvailabilityResponse {
  available: boolean
  reason?: string
}

class VehicleAvailabilityService {
  async checkAvailability(slug: string, startDate: string, endDate: string): Promise<CheckAvailabilityResponse> {
    const response = await fetch(
      `/api/vehicles/${slug}/availability?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
    )
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || 'Erreur lors de la vérification de disponibilité')
    }
    
    return response.json()
  }

  async getVehicleAvailability(vehicleId: string): Promise<VehicleAvailabilityResponse> {
    const response = await fetch(`/api/admin/vehicles/${vehicleId}/availability`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des périodes')
    }
    return response.json()
  }

  async createAvailabilityPeriod(vehicleId: string, data: CreateAvailabilityPayload): Promise<Availability> {
    const response = await fetch(`/api/admin/vehicles/${vehicleId}/availability`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erreur lors de la création')
    }

    return response.json()
  }

  async deleteAvailabilityPeriod(vehicleId: string, availabilityId: string): Promise<void> {
    const response = await fetch(
      `/api/admin/vehicles/${vehicleId}/availability?availabilityId=${availabilityId}`,
      { method: 'DELETE' }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression')
    }
  }
}

export const vehicleAvailabilityService = new VehicleAvailabilityService()
export type { Booking, Availability, VehicleAvailabilityResponse, CreateAvailabilityPayload, CheckAvailabilityResponse }
