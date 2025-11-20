export interface AdminAuthResponse {
  success: boolean
  error?: string
}

export interface AdminAuthCheckResponse {
  authenticated: boolean
}

class AdminAuthService {
  async login(password: string): Promise<AdminAuthResponse> {
    const response = await fetch("/api/admin/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de la connexion")
    }

    return data
  }

  async checkAuth(): Promise<AdminAuthCheckResponse> {
    const response = await fetch("/api/admin/auth")

    if (!response.ok) {
      return { authenticated: false }
    }

    return response.json()
  }
}

export const adminAuthService = new AdminAuthService()

