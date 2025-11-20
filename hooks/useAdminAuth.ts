import { useState, useCallback } from "react"
import { adminAuthService } from "@/lib/services/adminAuthService"

export function useAdminAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (password: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const result = await adminAuthService.login(password)
      if (result.success) {
        return true
      }
      setError("Mot de passe incorrect")
      return false
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue"
      setError(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      const result = await adminAuthService.checkAuth()
      return result.authenticated
    } catch {
      return false
    }
  }, [])

  return {
    login,
    checkAuth,
    loading,
    error,
    setError,
  }
}

