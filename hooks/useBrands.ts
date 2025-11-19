import { useState, useEffect, useCallback } from "react"
import { brandService, Brand, CreateBrandData } from "@/lib/services/brandService"

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedBrands = await brandService.getBrands()
      setBrands(fetchedBrands)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la récupération des marques')
      console.error('Erreur lors de la récupération des marques:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createBrand = useCallback(async (data: CreateBrandData): Promise<Brand> => {
    try {
      const newBrand = await brandService.createBrand(data)
      // Éviter les doublons
      setBrands(prevBrands => {
        const exists = prevBrands.some(b => b.id === newBrand.id || b.name === newBrand.name)
        if (exists) {
          return prevBrands
        }
        return [...prevBrands, newBrand].sort((a, b) => a.name.localeCompare(b.name))
      })
      return newBrand
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création'
      setError(errorMessage)
      throw err
    }
  }, [])

  useEffect(() => {
    fetchBrands()
  }, [fetchBrands])

  return {
    brands,
    loading,
    error,
    fetchBrands,
    createBrand,
  }
}

