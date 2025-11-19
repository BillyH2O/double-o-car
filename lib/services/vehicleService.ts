import { Vehicle } from "@/types"

export interface VehicleFormData {
  brand: string
  model: string
  year: string
  pricePerDay: string
  pricePerWeek: string
  pricePerMonth: string
  fuelType: string
  transmission: string
  seats: string
  doors: string
  image: string
  images: string[]
  bio: string
  features: string[]
  isAvailable: boolean
}

export interface VehiclePayload {
  brand: string
  model: string
  year: number
  pricePerDay: number
  pricePerWeek: number | null
  pricePerMonth: number | null
  fuelType: string
  transmission: string
  seats: number
  doors: number
  image: string
  images: string[]
  bio: string
  features: string[]
  isAvailable: boolean
}

class VehicleService {
  async getVehicle(id: string): Promise<Vehicle> {
    const response = await fetch(`/api/admin/vehicles/${id}`)
    if (!response.ok) {
      throw new Error('Véhicule non trouvé')
    }
    return response.json()
  }

  async getVehicleBySlug(slug: string): Promise<Vehicle & { brandRelation?: { logo: string } | null }> {
    const response = await fetch(`/api/vehicles/${slug}`)
    if (!response.ok) {
      throw new Error('Véhicule non trouvé')
    }
    return response.json()
  }

  async createVehicle(data: VehiclePayload): Promise<Vehicle> {
    const response = await fetch('/api/admin/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erreur lors de la création')
    }

    return response.json()
  }

  async updateVehicle(id: string, data: VehiclePayload): Promise<Vehicle> {
    const response = await fetch(`/api/admin/vehicles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erreur lors de la mise à jour')
    }

    return response.json()
  }

  transformFormDataToPayload(formData: VehicleFormData): VehiclePayload {
    return {
      ...formData,
      year: parseInt(formData.year),
      pricePerDay: parseFloat(formData.pricePerDay),
      pricePerWeek: formData.pricePerWeek ? parseFloat(formData.pricePerWeek) : null,
      pricePerMonth: formData.pricePerMonth ? parseFloat(formData.pricePerMonth) : null,
      seats: parseInt(formData.seats),
      doors: parseInt(formData.doors),
    }
  }

  transformVehicleToFormData(vehicle: Vehicle): VehicleFormData {
    return {
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year.toString(),
      pricePerDay: Number(vehicle.pricePerDay).toString(),
      pricePerWeek: vehicle.pricePerWeek ? Number(vehicle.pricePerWeek).toString() : '',
      pricePerMonth: vehicle.pricePerMonth ? Number(vehicle.pricePerMonth).toString() : '',
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      seats: vehicle.seats.toString(),
      doors: vehicle.doors.toString(),
      image: vehicle.image,
      images: vehicle.images || [],
      bio: vehicle.bio || '',
      features: vehicle.features || [],
      isAvailable: vehicle.isAvailable,
    }
  }

  async getVehicles(filters?: {
    isAvailable?: boolean
    brand?: string
    fuelType?: string
    transmission?: string
    startDate?: string
    endDate?: string
  }): Promise<Vehicle[]> {
    const params = new URLSearchParams()
    if (filters?.isAvailable !== undefined) {
      params.append('isAvailable', String(filters.isAvailable))
    }
    if (filters?.brand) {
      params.append('brand', filters.brand)
    }
    if (filters?.fuelType) {
      params.append('fuelType', filters.fuelType)
    }
    if (filters?.transmission) {
      params.append('transmission', filters.transmission)
    }
    if (filters?.startDate) {
      params.append('startDate', filters.startDate)
    }
    if (filters?.endDate) {
      params.append('endDate', filters.endDate)
    }

    const queryString = params.toString()
    const url = `/api/vehicles${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url)

    if (!response.ok) {
      let errorMessage = 'Erreur lors de la récupération des véhicules'
      try {
        const text = await response.text()
        try {
          const errorData = JSON.parse(text)
          errorMessage = errorData.error || errorMessage
        } catch {
          errorMessage = text || errorMessage
        }
      } catch {
        errorMessage = `Erreur HTTP ${response.status}`
      }
      throw new Error(`${errorMessage} (${response.status})`)
    }

    return response.json()
  }

  async getAdminVehicles(): Promise<Vehicle[]> {
    const response = await fetch('/api/admin/vehicles')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des véhicules')
    }
    return response.json()
  }

  async deleteVehicle(id: string): Promise<void> {
    const response = await fetch(`/api/admin/vehicles/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression')
    }
  }
}

export const vehicleService = new VehicleService()

