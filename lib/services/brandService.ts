export interface Brand {
  id: string
  name: string
  logo: string
}

export interface CreateBrandData {
  name: string
  logo: string
}

class BrandService {
  async getBrands(): Promise<Brand[]> {
    const response = await fetch('/api/admin/brands')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des marques')
    }
    const brands = await response.json()
    // Filtrer les marques invalides
    return brands.filter((brand: Brand) => brand && brand.id && brand.name)
  }

  async createBrand(data: CreateBrandData): Promise<Brand> {
    const response = await fetch('/api/admin/brands', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name.trim(),
        logo: data.logo.trim(),
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erreur lors de la création')
    }

    return response.json()
  }
}

export const brandService = new BrandService()

